import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/procesar.js";

test("procesar convierte el nombre a mayúsculas", () => {
  const req = { query: { nombre: "juan" } };

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

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {
  "resultado": "Nombre procesado: JUAN",
  "longitud": 4
}
);
});

test("procesar maneja nombre ausente", () => {
  const req = { query: {} };

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

  assert.equal(res.statusCode, 200);
  assert.ok(res.body.resultado.includes("ANÓNIMO"));
});


test("procesar devuelve JSON con estructura válida", () => {
  const req = { query: { nombre: "ana" } };
  
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

  // Validar que existen las propiedades requeridas
  assert.ok(res.body.hasOwnProperty("resultado"), "Debe tener 'resultado'");
  assert.ok(res.body.hasOwnProperty("longitud"), "Debe tener 'longitud'");
  
  // Validar tipos de datos
  assert.equal(typeof res.body.resultado, "string", "'resultado' debe ser string");
  assert.equal(typeof res.body.longitud, "number", "'longitud' debe ser number");
  
  // Validar que no haya propiedades extras
  const keys = Object.keys(res.body);
  assert.equal(keys.length, 2, "Solo debe tener 2 propiedades");
});