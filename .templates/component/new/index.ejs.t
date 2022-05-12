---
inject: true
to: <%= h.paths.components %>/index.ts
# after: "/* @PLACEHOLDER */"
append: true
skip_if: export * from './<%= h.kebobCase(name) %>'
---
export * from './<%= h.kebobCase(name) %>'