# REFLEXION.md

## 1. ¿Qué tipo de error evita el CI?

- Errores de sintaxis y código que no compila
- Regresiones: cambios que rompen funcionalidad existente
- Errores de lógica cubiertos por los tests automatizados
- Inconsistencias de formato y reglas de calidad

## 2. ¿Qué tipo de error NO evita?

- Errores de requisitos: implementar mal lo que pidió el cliente
- Bugs no cubiertos por tests: lógica de negocio sin probar
- Problemas de producción: errores que solo aparecen con datos/tráfico real
- Errores de diseño/UX: el código funciona pero la solución es incorrecta

## 3. ¿Qué pasaría si un equipo ignora el CI?

- Los bugs llegarían directamente a producción
- Sería difícil identificar quién/cuándo rompió el código
- Más conflictos al integrar código de diferentes desarrolladores
- Se perdería tiempo debuggeando en lugar de desarrollando
- Disminuiría la confianza en la estabilidad del proyecto