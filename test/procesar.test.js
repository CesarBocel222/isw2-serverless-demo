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
  assert.deepEqual(res.body, { resultado: "Nombre procesado: JUAN" });
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
