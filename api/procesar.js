export default function handler(req, res) {
  const nombre = req.query.nombre ?? "";

  const normalizado = String(nombre).trim();
  const finalNombre = normalizado === "" ? "anónimo" : normalizado;

  const payload = {
    resultado: `Nombre procesado: ${finalNombre.toUpperCase()}`,
    longitud: finalNombre.length
  };

  return res.status(200).json(payload);
}
