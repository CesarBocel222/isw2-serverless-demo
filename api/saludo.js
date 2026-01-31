export default function handler(req, res) {
  const nombre = req.query.nombre || "César Bocel 1094921";

  res.status(200).json({
    mensaje: `Hola ${nombre}`,
    curso: "Ingeniería de Software II",
    timestamp: new Date().toISOString()
  });
}
