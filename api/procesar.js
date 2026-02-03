export default function handler(req, res) {
  // Obtenemos el nombre (query param)
  const nombre = req.query.nombre || "anónimo";

  // --- RETO PARTE 1: Simular error ---
  if (nombre === "error") {
    return res.status(500).json({ 
      error: "Simulación de fallo activada: El servicio de procesamiento falló." 
    });
  }

  // --- RETO PARTE 2: Agregar Timestamp ---
  const timestamp = new Date().toISOString();

  res.status(200).json({
    resultado: `Nombre procesado: ${nombre.toUpperCase()}`,
    timestamp: timestamp
  });
}