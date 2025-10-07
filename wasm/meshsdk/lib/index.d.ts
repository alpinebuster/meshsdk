import createMeshSDK from './MRJavaScript.js';
export { createMeshSDK };
export declare const create: typeof createMeshSDK;
export type MeshSDK = Awaited<ReturnType<typeof createMeshSDK>>;
export declare const MeshSDK: {
    init: typeof createMeshSDK;
};
