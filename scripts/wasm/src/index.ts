import createMeshSDK from './MRJavaScript.js';

export { createMeshSDK };
export const create = createMeshSDK;

export type MeshSDK = Awaited<ReturnType<typeof createMeshSDK>>;
export const MeshSDK = { init: createMeshSDK };
