import fs from 'node:fs/promises'
import { builtinModules } from 'node:module'
import { build } from 'esbuild'
import esbuildPluginNodeProtocolImports from 'esbuild-plugin-node-protocol-imports'
const MINIFY = process.env.MINIFY === 'false' ? false : true
const allBuiltinModules = [
  ...builtinModules,
  ...builtinModules.map((builtinModule) => `node:${builtinModule}`),
]
await fs.rm('dist', {
  recursive: true,
  force: true,
})
await build({
  banner: {
    js: '',
  },
  bundle: true,
  define: { 'process.env.NODE_ENV': '"production"' },
  entryPoints: ['src/handler.ts'],
  external: allBuiltinModules,
  format: 'esm',
  keepNames: !MINIFY,
  minify: MINIFY,
  outdir: 'dist',
  packages: 'bundle',
  platform: 'node',
  sourcemap: !MINIFY,
  target: 'node20.17.0',
  plugins: [esbuildPluginNodeProtocolImports],
})