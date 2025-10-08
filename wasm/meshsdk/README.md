# AS MeshSDK - Javascript/Typescript Binding

MeshSDK JS/TS wrapper by compiling to WASM via [Emscripten](https://emscripten.org/) so that all native features can be used in browser/nodejs environments.

## Using `as-mesh` in JavaScript/TypeScript

### Install

`as-mesh` is available as a UMD module compatible with both NodeJS and browsers,
and includes TypeScript definitions.

```sh
npm install as-mesh
```

### Usage

To use the `as-mesh`, do the following:

```js
import { createMeshSDK } from 'as-mesh';

const mrmesh = await createMeshSDK();
```

Ensure cross-origin isolation (COOP + COEP) is supported:

1.Vite

```js
export default defineConfig({
  ...,

  server: {
    headers: {
      // Enforcing cross-origin isolation of pages
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },

  ...
});
```

2.Nginx

```nginx
server {
  listen 80;
  server_name your.domain.com;
  
  add_header Cross-Origin-Opener-Policy same-origin;
  add_header Cross-Origin-Embedder-Policy require-corp;
  
  root /var/www/your-app;
  index index.html;
}
```

## Local Development

```sh
# npm install
npm install  --registry=https://registry.npmmirror.com

npm run build
```

## Release

```sh
npm config delete proxy
npm config delete https-proxy

npm config get proxy
npm config get https-proxy

npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890

npm config set registry https://registry.npmmirror.com
npm config set registry https://registry.npmmirror.com --location=project
npm config set registry https://registry.npmjs.org/

npm login
npm publish --tag beta --access public
npm publish --tag latest --access public
```
