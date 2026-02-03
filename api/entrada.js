export default async function handler(req, res) {
  try {
    const nombre = req.query.nombre || "anónimo";

    // Service Discovery (descubriendo dónde está el otro servicio)
    const proto = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host; 
    const baseUrl = `${proto}://${host}`;

    // Llamada síncrona (esperamos respuesta = Latencia)
    const response = await fetch(
      `${baseUrl}/api/procesar?nombre=${encodeURIComponent(nombre)}`
    );

    // --- MANEJO DE FALLOS (Resiliencia) ---
    if (!response.ok) {
      const text = await response.text();
      // Devolvemos 502 para indicar que el error vino del "backend"
      return res.status(502).json({
        error: "Fallo llamando a /api/procesar",
        upstream_status: response.status, // Observabilidad: qué código dio el otro
        detalle: text
      });
    }

    const data = await response.json();

    // --- RESPUESTA FINAL ---
    res.status(200).json({
      entrada: nombre,
      resultado: data.resultado,
      // Agregamos el timestamp que nos mandó procesar
      procesado_en: data.timestamp, 
      flujo: "entrada -> procesar"
    });

  } catch (err) {
    // Esto captura errores de red (ej. si /api/procesar estuviera apagado)
    res.status(500).json({
      error: "entrada crashed",
      detalle: String(err)
    });
  }
}