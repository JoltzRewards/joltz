---
to: <%= h.paths.components %>/<%= h.kebobCase(name) %>/index.ts
---
export * from './<%= h.componentCase(name) %>'
