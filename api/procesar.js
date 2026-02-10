export default function handler(req, res) {
  const nombre = req.query.nombre || "anónimo";

  res.status(200).json({
    resultado: `Nombre procesado: ${nombre.toUpperCase()}`,
    longitud: nombre.length
  });
}


test("procesar siempre retorna nombre en mayúsculas", () => {
  const testCases = [
    { input: "pedro", expected: "PEDRO" },
    { input: "MARÍA", expected: "MARÍA" },
    { input: "JoSé", expected: "JOSÉ" },
    { input: "ana maría", expected: "ANA MARÍA" }
  ];

  testCases.forEach(({ input, expected }) => {
    const req = { query: { nombre: input } };
    const res = {
      statusCode: null,
      body: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.body = payload;
        return this;
      }
    };

    handler(req, res);

    // Verificar que el nombre en el resultado esté en mayúsculas
    assert.ok(
      res.body.resultado.includes(expected),
      `"${input}" debe convertirse a "${expected}"`
    );
  });
});

// En procesar.test.js - AGREGAR este test

test("procesar mantiene formato consistente del mensaje", () => {
  const req = { query: { nombre: "carlos" } };
  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  // Validar que el mensaje siga el patrón: "Nombre procesado: XXXX"
  const pattern = /^Nombre procesado: [A-ZÁÉÍÓÚÑ\s]+$/;
  assert.match(
    res.body.resultado,
    pattern,
    "El mensaje debe seguir el formato 'Nombre procesado: XXXX'"
  );
  
  // Validar que la longitud coincida con el nombre
  const nombreExtraido = res.body.resultado.replace("Nombre procesado: ", "");
  assert.equal(
    res.body.longitud,
    nombreExtraido.length,
    "La longitud debe coincidir con el nombre procesado"
  );
});