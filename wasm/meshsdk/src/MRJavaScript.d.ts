// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
declare namespace RuntimeExports {
    /**
     * @param {string|null=} returnType
     * @param {Array=} argTypes
     * @param {IArguments|Array=} args
     * @param {Object=} opts
     */
    function ccall(ident: any, returnType?: (string | null) | undefined, argTypes?: any[] | undefined, args?: (IArguments | any[]) | undefined, opts?: any | undefined): any;
    let HEAPU8: any;
    let HEAP32: any;
    let HEAPF32: any;
    let HEAPU32: any;
    namespace FS {
        export let root: any;
        export let mounts: any[];
        export let devices: {};
        export let streams: any[];
        export let nextInode: number;
        export let nameTable: any;
        export let currentPath: string;
        export let initialized: boolean;
        export let ignorePermissions: boolean;
        export let filesystems: any;
        export let syncFSRequests: number;
        export let readFiles: {};
        export { ErrnoError };
        export { FSStream };
        export { FSNode };
        export function lookupPath(path: any, opts?: {}): {
            path: string;
            node?: undefined;
        } | {
            path: string;
            node: any;
        };
        export function getPath(node: any): any;
        export function hashName(parentid: any, name: any): number;
        export function hashAddNode(node: any): void;
        export function hashRemoveNode(node: any): void;
        export function lookupNode(parent: any, name: any): any;
        export function createNode(parent: any, name: any, mode: any, rdev: any): any;
        export function destroyNode(node: any): void;
        export function isRoot(node: any): boolean;
        export function isMountpoint(node: any): boolean;
        export function isFile(mode: any): boolean;
        export function isDir(mode: any): boolean;
        export function isLink(mode: any): boolean;
        export function isChrdev(mode: any): boolean;
        export function isBlkdev(mode: any): boolean;
        export function isFIFO(mode: any): boolean;
        export function isSocket(mode: any): boolean;
        export function flagsToPermissionString(flag: any): string;
        export function nodePermissions(node: any, perms: any): 0 | 2;
        export function mayLookup(dir: any): any;
        export function mayCreate(dir: any, name: any): any;
        export function mayDelete(dir: any, name: any, isdir: any): any;
        export function mayOpen(node: any, flags: any): any;
        export function checkOpExists(op: any, err: any): any;
        export let MAX_OPEN_FDS: number;
        export function nextfd(): number;
        export function getStreamChecked(fd: any): any;
        export function getStream(fd: any): any;
        export function createStream(stream: any, fd?: number): any;
        export function closeStream(fd: any): void;
        export function dupStream(origStream: any, fd?: number): any;
        export function doSetAttr(stream: any, node: any, attr: any): void;
        export namespace chrdev_stream_ops {
            function open(stream: any): void;
            function llseek(): never;
        }
        export function major(dev: any): number;
        export function minor(dev: any): number;
        export function makedev(ma: any, mi: any): number;
        export function registerDevice(dev: any, ops: any): void;
        export function getDevice(dev: any): any;
        export function getMounts(mount: any): any[];
        export function syncfs(populate: any, callback: any): void;
        export function mount(type: any, opts: any, mountpoint: any): any;
        export function unmount(mountpoint: any): void;
        export function lookup(parent: any, name: any): any;
        export function mknod(path: any, mode: any, dev: any): any;
        export function statfs(path: any): any;
        export function statfsStream(stream: any): any;
        export function statfsNode(node: any): {
            bsize: number;
            frsize: number;
            blocks: number;
            bfree: number;
            bavail: number;
            files: any;
            ffree: number;
            fsid: number;
            flags: number;
            namelen: number;
        };
        export function create(path: any, mode?: number): any;
        export function mkdir(path: any, mode?: number): any;
        export function mkdirTree(path: any, mode: any): void;
        export function mkdev(path: any, mode: any, dev: any): any;
        export function symlink(oldpath: any, newpath: any): any;
        export function rename(old_path: any, new_path: any): void;
        export function rmdir(path: any): void;
        export function readdir(path: any): any;
        export function unlink(path: any): void;
        export function readlink(path: any): any;
        export function stat(path: any, dontFollow: any): any;
        export function fstat(fd: any): any;
        export function lstat(path: any): any;
        export function doChmod(stream: any, node: any, mode: any, dontFollow: any): void;
        export function chmod(path: any, mode: any, dontFollow: any): void;
        export function lchmod(path: any, mode: any): void;
        export function fchmod(fd: any, mode: any): void;
        export function doChown(stream: any, node: any, dontFollow: any): void;
        export function chown(path: any, uid: any, gid: any, dontFollow: any): void;
        export function lchown(path: any, uid: any, gid: any): void;
        export function fchown(fd: any, uid: any, gid: any): void;
        export function doTruncate(stream: any, node: any, len: any): void;
        export function truncate(path: any, len: any): void;
        export function ftruncate(fd: any, len: any): void;
        export function utime(path: any, atime: any, mtime: any): void;
        export function open(path: any, flags: any, mode?: number): any;
        export function close(stream: any): void;
        export function isClosed(stream: any): boolean;
        export function llseek(stream: any, offset: any, whence: any): any;
        export function read(stream: any, buffer: any, offset: any, length: any, position: any): any;
        export function write(stream: any, buffer: any, offset: any, length: any, position: any, canOwn: any): any;
        export function mmap(stream: any, length: any, position: any, prot: any, flags: any): any;
        export function msync(stream: any, buffer: any, offset: any, length: any, mmapFlags: any): any;
        export function ioctl(stream: any, cmd: any, arg: any): any;
        export function readFile(path: any, opts?: {}): Uint8Array<any>;
        export function writeFile(path: any, data: any, opts?: {}): void;
        export function cwd(): any;
        export function chdir(path: any): void;
        export function createDefaultDirectories(): void;
        export function createDefaultDevices(): void;
        export function createSpecialDirectories(): void;
        export function createStandardStreams(input: any, output: any, error: any): void;
        export function staticInit(): void;
        export function init(input: any, output: any, error: any): void;
        export function quit(): void;
        export function findObject(path: any, dontResolveLastLink: any): any;
        export function analyzePath(path: any, dontResolveLastLink: any): {
            isRoot: boolean;
            exists: boolean;
            error: number;
            name: any;
            path: any;
            object: any;
            parentExists: boolean;
            parentPath: any;
            parentObject: any;
        };
        export function createPath(parent: any, path: any, canRead: any, canWrite: any): any;
        export function createFile(parent: any, name: any, properties: any, canRead: any, canWrite: any): any;
        export function createDataFile(parent: any, name: any, data: any, canRead: any, canWrite: any, canOwn: any): void;
        export function createDevice(parent: any, name: any, input: any, output: any): any;
        export function forceLoadFile(obj: any): boolean;
        export function createLazyFile(parent: any, name: any, url: any, canRead: any, canWrite: any): any;
    }
}
declare class ErrnoError {
    constructor(errno: any);
    name: string;
    errno: any;
}
declare class FSStream {
    shared: {};
    set object(val: any);
    get object(): any;
    node: any;
    get isRead(): boolean;
    get isWrite(): boolean;
    get isAppend(): number;
    set flags(val: any);
    get flags(): any;
    set position(val: any);
    get position(): any;
}
declare class FSNode {
    constructor(parent: any, name: any, mode: any, rdev: any);
    node_ops: {};
    stream_ops: {};
    readMode: number;
    writeMode: number;
    mounted: any;
    parent: any;
    mount: any;
    id: number;
    name: any;
    mode: any;
    rdev: any;
    atime: number;
    mtime: number;
    ctime: number;
    set read(val: boolean);
    get read(): boolean;
    set write(val: boolean);
    get write(): boolean;
    get isFolder(): any;
    get isDevice(): any;
}
interface WasmModule {
  _malloc(_0: number): number;
  _free(_0: number): void;
  _printtt(): void;
  _main(_0: number, _1: number): number;
}

type EmbindString = ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
export interface ClassHandle {
  isAliasOf(other: ClassHandle): boolean;
  delete(): void;
  deleteLater(): this;
  isDeleted(): boolean;
  // @ts-ignore - If targeting lower than ESNext, this symbol might not exist.
  [Symbol.dispose](): void;
  clone(): this;
}
export interface AABBTree extends ClassHandle {
}

export interface AABBTreeObjects extends ClassHandle {
}

export interface AABBTreePointsNode extends ClassHandle {
  box: Box3f;
  l: NodeId;
  r: NodeId;
}

export interface AABBTreePoints extends ClassHandle {
  heapBytes(): number;
  getBoundingBox(): Box3f;
  getLeafOrder(_0: VertBMap): void;
  getLeafOrderAndReset(_0: VertBMap): void;
  refit(_0: VertCoords, _1: VertBitSet): void;
  nodes(): NodeVec;
  orderedPoints(): VectorAABBTreePointsPoint;
}

export interface AffineXf2f extends ClassHandle {
  A: Matrix2f;
  b: Vector2f;
  equals(_0: AffineXf2f): boolean;
  notEquals(_0: AffineXf2f): boolean;
  inverse(): AffineXf2f;
  operatorCall(_0: Vector2f): Vector2f;
  linearOnly(_0: Vector2f): Vector2f;
}

export interface AffineXf2d extends ClassHandle {
  A: Matrix2d;
  b: Vector2d;
  equals(_0: AffineXf2d): boolean;
  notEquals(_0: AffineXf2d): boolean;
  inverse(): AffineXf2d;
  operatorCall(_0: Vector2d): Vector2d;
  linearOnly(_0: Vector2d): Vector2d;
}

export interface AffineXf3f extends ClassHandle {
  A: Matrix3f;
  b: Vector3f;
  equals(_0: AffineXf3f): boolean;
  notEquals(_0: AffineXf3f): boolean;
  inverse(): AffineXf3f;
  operatorCall(_0: Vector3f): Vector3f;
  linearOnly(_0: Vector3f): Vector3f;
}

export interface AffineXf3d extends ClassHandle {
  A: Matrix3d;
  b: Vector3d;
  equals(_0: AffineXf3d): boolean;
  notEquals(_0: AffineXf3d): boolean;
  inverse(): AffineXf3d;
  operatorCall(_0: Vector3d): Vector3d;
  linearOnly(_0: Vector3d): Vector3d;
}

export interface AxisValue<T extends number> {
  value: T;
}
export type Axis = AxisValue<0>|AxisValue<1>|AxisValue<2>|AxisValue<3>;

export interface CubicBezierCurve2f extends ClassHandle {
  getPoint(_0: number): Vector2f;
  setPoint(_0: number, _1: Vector2f): void;
}

export interface CubicBezierCurve2d extends ClassHandle {
  getPoint(_0: number): Vector2d;
  setPoint(_0: number, _1: Vector2d): void;
}

export interface CubicBezierCurve3f extends ClassHandle {
  getPoint(_0: number): Vector3f;
  setPoint(_0: number, _1: Vector3f): void;
}

export interface CubicBezierCurve3d extends ClassHandle {
  getPoint(_0: number): Vector3d;
  setPoint(_0: number, _1: Vector3d): void;
}

export interface CubicBezierCurve4f extends ClassHandle {
  getPoint(_0: number): Vector4f;
  setPoint(_0: number, _1: Vector4f): void;
}

export interface CubicBezierCurve4d extends ClassHandle {
  getPoint(_0: number): Vector4d;
  setPoint(_0: number, _1: Vector4d): void;
}

export interface __InternalDynamicBitset extends ClassHandle {
  size_(): number;
  count_(): number;
  empty_(): boolean;
  clear_(): void;
  find_first_(): number;
  find_next_(_0: number): number;
  resize_(_0: number, _1: boolean): void;
  push_back_(_0: boolean): void;
  pop_back_(): void;
  size(): number;
  count(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number, _1: boolean): void;
  push_back(_0: boolean): void;
  pop_back(): void;
  size(): number;
  count(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number, _1: boolean): void;
  push_back(_0: boolean): void;
  pop_back(): void;
  size(): number;
  count(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number, _1: boolean): void;
  push_back(_0: boolean): void;
  pop_back(): void;
  size(): number;
  count(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number, _1: boolean): void;
  push_back(_0: boolean): void;
  pop_back(): void;
  size(): number;
  count(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number, _1: boolean): void;
  push_back(_0: boolean): void;
  pop_back(): void;
  size(): number;
  count(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number, _1: boolean): void;
  push_back(_0: boolean): void;
  pop_back(): void;
  size(): number;
  count(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number, _1: boolean): void;
  push_back(_0: boolean): void;
  pop_back(): void;
  size(): number;
  count(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number, _1: boolean): void;
  push_back(_0: boolean): void;
  pop_back(): void;
  size(): number;
  count(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number, _1: boolean): void;
  push_back(_0: boolean): void;
  pop_back(): void;
  size(): number;
  count(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number, _1: boolean): void;
  push_back(_0: boolean): void;
  pop_back(): void;
  size(): number;
  count(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number, _1: boolean): void;
  push_back(_0: boolean): void;
  pop_back(): void;
  size(): number;
  count(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number, _1: boolean): void;
  push_back(_0: boolean): void;
  pop_back(): void;
  size(): number;
  count(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number, _1: boolean): void;
  push_back(_0: boolean): void;
  pop_back(): void;
}

export interface BitSet extends ClassHandle {
  test_(_0: number): boolean;
  set_(_0: number, _1: boolean): BitSet;
  setAll_(): BitSet;
  setRange_(_0: number, _1: number, _2: boolean): BitSet;
  reset_(_0: number): BitSet;
  resetAll_(): BitSet;
  resetRange_(_0: number, _1: number): BitSet;
  flip_(_0: number): BitSet;
  flipAll_(): BitSet;
  find_last_(): number;
  nthSetBit_(_0: number): number;
  isSubsetOf_(_0: BitSet): boolean;
  bitwiseAndAssign_(_0: BitSet): BitSet;
  bitwiseOrAssign_(_0: BitSet): BitSet;
  bitwiseXorAssign_(_0: BitSet): BitSet;
  subtractAssign_(_0: BitSet): BitSet;
  subtract_(_0: BitSet, _1: number): BitSet;
  autoResizeSet_(_0: number, _1: boolean): void;
  autoResizeSetRange_(_0: number, _1: number, _2: boolean): void;
  autoResizeTestSet_(_0: number, _1: boolean): boolean;
  heapBytes_(): number;
  resizeWithReserve_(_0: number): void;
  backId_(): number;
  endId_(): number;
  heapBytes(): number;
  resizeWithReserve(_0: number): void;
  heapBytes(): number;
  resizeWithReserve(_0: number): void;
  heapBytes(): number;
  resizeWithReserve(_0: number): void;
  heapBytes(): number;
  resizeWithReserve(_0: number): void;
  heapBytes(): number;
  resizeWithReserve(_0: number): void;
  heapBytes(): number;
  resizeWithReserve(_0: number): void;
  heapBytes(): number;
  resizeWithReserve(_0: number): void;
  heapBytes(): number;
  resizeWithReserve(_0: number): void;
  heapBytes(): number;
  resizeWithReserve(_0: number): void;
  heapBytes(): number;
  resizeWithReserve(_0: number): void;
  heapBytes(): number;
  resizeWithReserve(_0: number): void;
  heapBytes(): number;
  resizeWithReserve(_0: number): void;
  heapBytes(): number;
  resizeWithReserve(_0: number): void;
}

export interface FaceBitSet extends BitSet {
  setAll(): FaceBitSet;
  resetAll(): FaceBitSet;
  flipAll(): FaceBitSet;
  bitwiseAndAssign(_0: FaceBitSet): FaceBitSet;
  bitwiseOrAssign(_0: FaceBitSet): FaceBitSet;
  bitwiseXorAssign(_0: FaceBitSet): FaceBitSet;
  subtractAssign(_0: FaceBitSet): FaceBitSet;
  subtract(_0: FaceBitSet, _1: number): FaceBitSet;
  isSubsetOf(_0: FaceBitSet): boolean;
  intersects(_0: FaceBitSet): boolean;
  test(_0: FaceId): boolean;
  testSet(_0: FaceId, _1: boolean): boolean;
  set(_0: FaceId, _1: boolean): FaceBitSet;
  setRange(_0: FaceId, _1: number, _2: boolean): FaceBitSet;
  reset(_0: FaceId): FaceBitSet;
  resetRange(_0: FaceId, _1: number): FaceBitSet;
  flip(_0: FaceId): FaceBitSet;
  findFirst(): FaceId;
  findNext(_0: FaceId): FaceId;
  findLast(): FaceId;
  nthSetBit(_0: number): FaceId;
  autoResizeSet(_0: FaceId, _1: boolean): void;
  autoResizeSetRange(_0: FaceId, _1: number, _2: boolean): void;
  autoResizeTestSet(_0: FaceId, _1: boolean): boolean;
  backId(): FaceId;
  endId(): FaceId;
}

export interface VertBitSet extends BitSet {
  setAll(): VertBitSet;
  resetAll(): VertBitSet;
  flipAll(): VertBitSet;
  bitwiseAndAssign(_0: VertBitSet): VertBitSet;
  bitwiseOrAssign(_0: VertBitSet): VertBitSet;
  bitwiseXorAssign(_0: VertBitSet): VertBitSet;
  subtractAssign(_0: VertBitSet): VertBitSet;
  subtract(_0: VertBitSet, _1: number): VertBitSet;
  isSubsetOf(_0: VertBitSet): boolean;
  intersects(_0: VertBitSet): boolean;
  test(_0: VertId): boolean;
  testSet(_0: VertId, _1: boolean): boolean;
  set(_0: VertId, _1: boolean): VertBitSet;
  setRange(_0: VertId, _1: number, _2: boolean): VertBitSet;
  reset(_0: VertId): VertBitSet;
  resetRange(_0: VertId, _1: number): VertBitSet;
  flip(_0: VertId): VertBitSet;
  findFirst(): VertId;
  findNext(_0: VertId): VertId;
  findLast(): VertId;
  nthSetBit(_0: number): VertId;
  autoResizeSet(_0: VertId, _1: boolean): void;
  autoResizeSetRange(_0: VertId, _1: number, _2: boolean): void;
  autoResizeTestSet(_0: VertId, _1: boolean): boolean;
  backId(): VertId;
  endId(): VertId;
}

export interface EdgeBitSet extends BitSet {
  setAll(): EdgeBitSet;
  resetAll(): EdgeBitSet;
  flipAll(): EdgeBitSet;
  bitwiseAndAssign(_0: EdgeBitSet): EdgeBitSet;
  bitwiseOrAssign(_0: EdgeBitSet): EdgeBitSet;
  bitwiseXorAssign(_0: EdgeBitSet): EdgeBitSet;
  subtractAssign(_0: EdgeBitSet): EdgeBitSet;
  subtract(_0: EdgeBitSet, _1: number): EdgeBitSet;
  isSubsetOf(_0: EdgeBitSet): boolean;
  intersects(_0: EdgeBitSet): boolean;
  test(_0: EdgeId): boolean;
  testSet(_0: EdgeId, _1: boolean): boolean;
  set(_0: EdgeId, _1: boolean): EdgeBitSet;
  setRange(_0: EdgeId, _1: number, _2: boolean): EdgeBitSet;
  reset(_0: EdgeId): EdgeBitSet;
  resetRange(_0: EdgeId, _1: number): EdgeBitSet;
  flip(_0: EdgeId): EdgeBitSet;
  findFirst(): EdgeId;
  findNext(_0: EdgeId): EdgeId;
  findLast(): EdgeId;
  nthSetBit(_0: number): EdgeId;
  autoResizeSet(_0: EdgeId, _1: boolean): void;
  autoResizeSetRange(_0: EdgeId, _1: number, _2: boolean): void;
  autoResizeTestSet(_0: EdgeId, _1: boolean): boolean;
  backId(): EdgeId;
  endId(): EdgeId;
}

export interface UndirectedEdgeBitSet extends BitSet {
  setAll(): UndirectedEdgeBitSet;
  resetAll(): UndirectedEdgeBitSet;
  flipAll(): UndirectedEdgeBitSet;
  bitwiseAndAssign(_0: UndirectedEdgeBitSet): UndirectedEdgeBitSet;
  bitwiseOrAssign(_0: UndirectedEdgeBitSet): UndirectedEdgeBitSet;
  bitwiseXorAssign(_0: UndirectedEdgeBitSet): UndirectedEdgeBitSet;
  subtractAssign(_0: UndirectedEdgeBitSet): UndirectedEdgeBitSet;
  subtract(_0: UndirectedEdgeBitSet, _1: number): UndirectedEdgeBitSet;
  isSubsetOf(_0: UndirectedEdgeBitSet): boolean;
  intersects(_0: UndirectedEdgeBitSet): boolean;
  test(_0: UndirectedEdgeId): boolean;
  testSet(_0: UndirectedEdgeId, _1: boolean): boolean;
  set(_0: UndirectedEdgeId, _1: boolean): UndirectedEdgeBitSet;
  setRange(_0: UndirectedEdgeId, _1: number, _2: boolean): UndirectedEdgeBitSet;
  reset(_0: UndirectedEdgeId): UndirectedEdgeBitSet;
  resetRange(_0: UndirectedEdgeId, _1: number): UndirectedEdgeBitSet;
  flip(_0: UndirectedEdgeId): UndirectedEdgeBitSet;
  findFirst(): UndirectedEdgeId;
  findNext(_0: UndirectedEdgeId): UndirectedEdgeId;
  findLast(): UndirectedEdgeId;
  nthSetBit(_0: number): UndirectedEdgeId;
  autoResizeSet(_0: UndirectedEdgeId, _1: boolean): void;
  autoResizeSetRange(_0: UndirectedEdgeId, _1: number, _2: boolean): void;
  autoResizeTestSet(_0: UndirectedEdgeId, _1: boolean): boolean;
  backId(): UndirectedEdgeId;
  endId(): UndirectedEdgeId;
}

export interface PixelBitSet extends BitSet {
  setAll(): PixelBitSet;
  resetAll(): PixelBitSet;
  flipAll(): PixelBitSet;
  bitwiseAndAssign(_0: PixelBitSet): PixelBitSet;
  bitwiseOrAssign(_0: PixelBitSet): PixelBitSet;
  bitwiseXorAssign(_0: PixelBitSet): PixelBitSet;
  subtractAssign(_0: PixelBitSet): PixelBitSet;
  subtract(_0: PixelBitSet, _1: number): PixelBitSet;
  isSubsetOf(_0: PixelBitSet): boolean;
  intersects(_0: PixelBitSet): boolean;
  test(_0: PixelId): boolean;
  testSet(_0: PixelId, _1: boolean): boolean;
  set(_0: PixelId, _1: boolean): PixelBitSet;
  setRange(_0: PixelId, _1: number, _2: boolean): PixelBitSet;
  reset(_0: PixelId): PixelBitSet;
  resetRange(_0: PixelId, _1: number): PixelBitSet;
  flip(_0: PixelId): PixelBitSet;
  findFirst(): PixelId;
  findNext(_0: PixelId): PixelId;
  findLast(): PixelId;
  nthSetBit(_0: number): PixelId;
  autoResizeSet(_0: PixelId, _1: boolean): void;
  autoResizeSetRange(_0: PixelId, _1: number, _2: boolean): void;
  autoResizeTestSet(_0: PixelId, _1: boolean): boolean;
  backId(): PixelId;
  endId(): PixelId;
}

export interface VoxelBitSet extends BitSet {
  setAll(): VoxelBitSet;
  resetAll(): VoxelBitSet;
  flipAll(): VoxelBitSet;
  bitwiseAndAssign(_0: VoxelBitSet): VoxelBitSet;
  bitwiseOrAssign(_0: VoxelBitSet): VoxelBitSet;
  bitwiseXorAssign(_0: VoxelBitSet): VoxelBitSet;
  subtractAssign(_0: VoxelBitSet): VoxelBitSet;
  subtract(_0: VoxelBitSet, _1: number): VoxelBitSet;
  isSubsetOf(_0: VoxelBitSet): boolean;
  intersects(_0: VoxelBitSet): boolean;
  test(_0: VoxelId): boolean;
  testSet(_0: VoxelId, _1: boolean): boolean;
  set(_0: VoxelId, _1: boolean): VoxelBitSet;
  setRange(_0: VoxelId, _1: number, _2: boolean): VoxelBitSet;
  reset(_0: VoxelId): VoxelBitSet;
  resetRange(_0: VoxelId, _1: number): VoxelBitSet;
  flip(_0: VoxelId): VoxelBitSet;
  findFirst(): VoxelId;
  findNext(_0: VoxelId): VoxelId;
  findLast(): VoxelId;
  nthSetBit(_0: number): VoxelId;
  autoResizeSet(_0: VoxelId, _1: boolean): void;
  autoResizeSetRange(_0: VoxelId, _1: number, _2: boolean): void;
  autoResizeTestSet(_0: VoxelId, _1: boolean): boolean;
  backId(): VoxelId;
  endId(): VoxelId;
}

export interface RegionBitSet extends BitSet {
  setAll(): RegionBitSet;
  resetAll(): RegionBitSet;
  flipAll(): RegionBitSet;
  bitwiseAndAssign(_0: RegionBitSet): RegionBitSet;
  bitwiseOrAssign(_0: RegionBitSet): RegionBitSet;
  bitwiseXorAssign(_0: RegionBitSet): RegionBitSet;
  subtractAssign(_0: RegionBitSet): RegionBitSet;
  subtract(_0: RegionBitSet, _1: number): RegionBitSet;
  isSubsetOf(_0: RegionBitSet): boolean;
  intersects(_0: RegionBitSet): boolean;
  test(_0: RegionId): boolean;
  testSet(_0: RegionId, _1: boolean): boolean;
  set(_0: RegionId, _1: boolean): RegionBitSet;
  setRange(_0: RegionId, _1: number, _2: boolean): RegionBitSet;
  reset(_0: RegionId): RegionBitSet;
  resetRange(_0: RegionId, _1: number): RegionBitSet;
  flip(_0: RegionId): RegionBitSet;
  findFirst(): RegionId;
  findNext(_0: RegionId): RegionId;
  findLast(): RegionId;
  nthSetBit(_0: number): RegionId;
  autoResizeSet(_0: RegionId, _1: boolean): void;
  autoResizeSetRange(_0: RegionId, _1: number, _2: boolean): void;
  autoResizeTestSet(_0: RegionId, _1: boolean): boolean;
  backId(): RegionId;
  endId(): RegionId;
}

export interface NodeBitSet extends BitSet {
  setAll(): NodeBitSet;
  resetAll(): NodeBitSet;
  flipAll(): NodeBitSet;
  bitwiseAndAssign(_0: NodeBitSet): NodeBitSet;
  bitwiseOrAssign(_0: NodeBitSet): NodeBitSet;
  bitwiseXorAssign(_0: NodeBitSet): NodeBitSet;
  subtractAssign(_0: NodeBitSet): NodeBitSet;
  subtract(_0: NodeBitSet, _1: number): NodeBitSet;
  isSubsetOf(_0: NodeBitSet): boolean;
  intersects(_0: NodeBitSet): boolean;
  test(_0: NodeId): boolean;
  testSet(_0: NodeId, _1: boolean): boolean;
  set(_0: NodeId, _1: boolean): NodeBitSet;
  setRange(_0: NodeId, _1: number, _2: boolean): NodeBitSet;
  reset(_0: NodeId): NodeBitSet;
  resetRange(_0: NodeId, _1: number): NodeBitSet;
  flip(_0: NodeId): NodeBitSet;
  findFirst(): NodeId;
  findNext(_0: NodeId): NodeId;
  findLast(): NodeId;
  nthSetBit(_0: number): NodeId;
  autoResizeSet(_0: NodeId, _1: boolean): void;
  autoResizeSetRange(_0: NodeId, _1: number, _2: boolean): void;
  autoResizeTestSet(_0: NodeId, _1: boolean): boolean;
  backId(): NodeId;
  endId(): NodeId;
}

export interface ObjBitSet extends BitSet {
  setAll(): ObjBitSet;
  resetAll(): ObjBitSet;
  flipAll(): ObjBitSet;
  bitwiseAndAssign(_0: ObjBitSet): ObjBitSet;
  bitwiseOrAssign(_0: ObjBitSet): ObjBitSet;
  bitwiseXorAssign(_0: ObjBitSet): ObjBitSet;
  subtractAssign(_0: ObjBitSet): ObjBitSet;
  subtract(_0: ObjBitSet, _1: number): ObjBitSet;
  isSubsetOf(_0: ObjBitSet): boolean;
  intersects(_0: ObjBitSet): boolean;
  test(_0: ObjId): boolean;
  testSet(_0: ObjId, _1: boolean): boolean;
  set(_0: ObjId, _1: boolean): ObjBitSet;
  setRange(_0: ObjId, _1: number, _2: boolean): ObjBitSet;
  reset(_0: ObjId): ObjBitSet;
  resetRange(_0: ObjId, _1: number): ObjBitSet;
  flip(_0: ObjId): ObjBitSet;
  findFirst(): ObjId;
  findNext(_0: ObjId): ObjId;
  findLast(): ObjId;
  nthSetBit(_0: number): ObjId;
  autoResizeSet(_0: ObjId, _1: boolean): void;
  autoResizeSetRange(_0: ObjId, _1: number, _2: boolean): void;
  autoResizeTestSet(_0: ObjId, _1: boolean): boolean;
  backId(): ObjId;
  endId(): ObjId;
}

export interface TextureBitSet extends BitSet {
  setAll(): TextureBitSet;
  resetAll(): TextureBitSet;
  flipAll(): TextureBitSet;
  bitwiseAndAssign(_0: TextureBitSet): TextureBitSet;
  bitwiseOrAssign(_0: TextureBitSet): TextureBitSet;
  bitwiseXorAssign(_0: TextureBitSet): TextureBitSet;
  subtractAssign(_0: TextureBitSet): TextureBitSet;
  subtract(_0: TextureBitSet, _1: number): TextureBitSet;
  isSubsetOf(_0: TextureBitSet): boolean;
  intersects(_0: TextureBitSet): boolean;
  test(_0: TextureId): boolean;
  testSet(_0: TextureId, _1: boolean): boolean;
  set(_0: TextureId, _1: boolean): TextureBitSet;
  setRange(_0: TextureId, _1: number, _2: boolean): TextureBitSet;
  reset(_0: TextureId): TextureBitSet;
  resetRange(_0: TextureId, _1: number): TextureBitSet;
  flip(_0: TextureId): TextureBitSet;
  findFirst(): TextureId;
  findNext(_0: TextureId): TextureId;
  findLast(): TextureId;
  nthSetBit(_0: number): TextureId;
  autoResizeSet(_0: TextureId, _1: boolean): void;
  autoResizeSetRange(_0: TextureId, _1: number, _2: boolean): void;
  autoResizeTestSet(_0: TextureId, _1: boolean): boolean;
  backId(): TextureId;
  endId(): TextureId;
}

export interface GraphVertBitSet extends BitSet {
  setAll(): GraphVertBitSet;
  resetAll(): GraphVertBitSet;
  flipAll(): GraphVertBitSet;
  bitwiseAndAssign(_0: GraphVertBitSet): GraphVertBitSet;
  bitwiseOrAssign(_0: GraphVertBitSet): GraphVertBitSet;
  bitwiseXorAssign(_0: GraphVertBitSet): GraphVertBitSet;
  subtractAssign(_0: GraphVertBitSet): GraphVertBitSet;
  subtract(_0: GraphVertBitSet, _1: number): GraphVertBitSet;
  isSubsetOf(_0: GraphVertBitSet): boolean;
  intersects(_0: GraphVertBitSet): boolean;
  test(_0: GraphVertId): boolean;
  testSet(_0: GraphVertId, _1: boolean): boolean;
  set(_0: GraphVertId, _1: boolean): GraphVertBitSet;
  setRange(_0: GraphVertId, _1: number, _2: boolean): GraphVertBitSet;
  reset(_0: GraphVertId): GraphVertBitSet;
  resetRange(_0: GraphVertId, _1: number): GraphVertBitSet;
  flip(_0: GraphVertId): GraphVertBitSet;
  findFirst(): GraphVertId;
  findNext(_0: GraphVertId): GraphVertId;
  findLast(): GraphVertId;
  nthSetBit(_0: number): GraphVertId;
  autoResizeSet(_0: GraphVertId, _1: boolean): void;
  autoResizeSetRange(_0: GraphVertId, _1: number, _2: boolean): void;
  autoResizeTestSet(_0: GraphVertId, _1: boolean): boolean;
  backId(): GraphVertId;
  endId(): GraphVertId;
}

export interface GraphEdgeBitSet extends BitSet {
  setAll(): GraphEdgeBitSet;
  resetAll(): GraphEdgeBitSet;
  flipAll(): GraphEdgeBitSet;
  bitwiseAndAssign(_0: GraphEdgeBitSet): GraphEdgeBitSet;
  bitwiseOrAssign(_0: GraphEdgeBitSet): GraphEdgeBitSet;
  bitwiseXorAssign(_0: GraphEdgeBitSet): GraphEdgeBitSet;
  subtractAssign(_0: GraphEdgeBitSet): GraphEdgeBitSet;
  subtract(_0: GraphEdgeBitSet, _1: number): GraphEdgeBitSet;
  isSubsetOf(_0: GraphEdgeBitSet): boolean;
  intersects(_0: GraphEdgeBitSet): boolean;
  test(_0: GraphEdgeId): boolean;
  testSet(_0: GraphEdgeId, _1: boolean): boolean;
  set(_0: GraphEdgeId, _1: boolean): GraphEdgeBitSet;
  setRange(_0: GraphEdgeId, _1: number, _2: boolean): GraphEdgeBitSet;
  reset(_0: GraphEdgeId): GraphEdgeBitSet;
  resetRange(_0: GraphEdgeId, _1: number): GraphEdgeBitSet;
  flip(_0: GraphEdgeId): GraphEdgeBitSet;
  findFirst(): GraphEdgeId;
  findNext(_0: GraphEdgeId): GraphEdgeId;
  findLast(): GraphEdgeId;
  nthSetBit(_0: number): GraphEdgeId;
  autoResizeSet(_0: GraphEdgeId, _1: boolean): void;
  autoResizeSetRange(_0: GraphEdgeId, _1: number, _2: boolean): void;
  autoResizeTestSet(_0: GraphEdgeId, _1: boolean): boolean;
  backId(): GraphEdgeId;
  endId(): GraphEdgeId;
}

export interface ICPElementBitSet extends BitSet {
  setAll(): ICPElementBitSet;
  resetAll(): ICPElementBitSet;
  flipAll(): ICPElementBitSet;
  bitwiseAndAssign(_0: ICPElementBitSet): ICPElementBitSet;
  bitwiseOrAssign(_0: ICPElementBitSet): ICPElementBitSet;
  bitwiseXorAssign(_0: ICPElementBitSet): ICPElementBitSet;
  subtractAssign(_0: ICPElementBitSet): ICPElementBitSet;
  subtract(_0: ICPElementBitSet, _1: number): ICPElementBitSet;
  isSubsetOf(_0: ICPElementBitSet): boolean;
  intersects(_0: ICPElementBitSet): boolean;
  test(_0: ICPElementId): boolean;
  testSet(_0: ICPElementId, _1: boolean): boolean;
  set(_0: ICPElementId, _1: boolean): ICPElementBitSet;
  setRange(_0: ICPElementId, _1: number, _2: boolean): ICPElementBitSet;
  reset(_0: ICPElementId): ICPElementBitSet;
  resetRange(_0: ICPElementId, _1: number): ICPElementBitSet;
  flip(_0: ICPElementId): ICPElementBitSet;
  findFirst(): ICPElementId;
  findNext(_0: ICPElementId): ICPElementId;
  findLast(): ICPElementId;
  nthSetBit(_0: number): ICPElementId;
  autoResizeSet(_0: ICPElementId, _1: boolean): void;
  autoResizeSetRange(_0: ICPElementId, _1: number, _2: boolean): void;
  autoResizeTestSet(_0: ICPElementId, _1: boolean): boolean;
  backId(): ICPElementId;
  endId(): ICPElementId;
}

export interface BooleanOperationValue<T extends number> {
  value: T;
}
export type BooleanOperation = BooleanOperationValue<0>|BooleanOperationValue<1>|BooleanOperationValue<2>|BooleanOperationValue<3>|BooleanOperationValue<4>|BooleanOperationValue<5>|BooleanOperationValue<6>|BooleanOperationValue<7>|BooleanOperationValue<8>;

export interface BooleanResultMapObjectValue<T extends number> {
  value: T;
}
export type BooleanResultMapObject = BooleanResultMapObjectValue<0>|BooleanResultMapObjectValue<1>|BooleanResultMapObjectValue<2>;

export interface BooleanResultMaps extends ClassHandle {
  identity: boolean;
  cut2origin: FaceMap;
  cut2newFaces: FaceMap;
  old2newVerts: VertMap;
  old2newEdges: WholeEdgeMap;
}

export interface BooleanInternalParameters extends ClassHandle {
  originalMeshA: Mesh | null;
  originalMeshB: Mesh | null;
  optionalOutCut: VectorEdgePath | null;
}

export interface BooleanResultMapper extends ClassHandle {
  map(_0: FaceBitSet, _1: BooleanResultMapObject): FaceBitSet;
  mapFaces(_0: FaceBitSet, _1: BooleanResultMapObject): FaceBitSet;
  mapVerts(_0: VertBitSet, _1: BooleanResultMapObject): VertBitSet;
  mapEdges(_0: EdgeBitSet, _1: BooleanResultMapObject): EdgeBitSet;
  newFaces(): FaceBitSet;
  filteredOldFaceBitSet(_0: FaceBitSet, _1: BooleanResultMapObject): FaceBitSet;
  getMaps(_0: BooleanResultMapObject): BooleanResultMaps;
}

export interface Box1f extends ClassHandle {
  min: number;
  max: number;
  valid(): boolean;
  center(): number;
  corner(_0: boolean): number;
  size(): number;
  diagonal(): number;
  volume(): number;
  include(_0: number): void;
  includeBox(_0: Box1f): void;
  contains(_0: number): boolean;
  containsBox(_0: Box1f): boolean;
  getBoxClosestPointTo(_0: number): number;
  intersects(_0: Box1f): boolean;
  intersection(_0: Box1f): Box1f;
  intersect(_0: Box1f): Box1f;
  getDistanceSqToBox(_0: Box1f): number;
  getDistanceSqToPoint(_0: number): number;
  expanded(_0: number): Box1f;
  insignificantlyExpanded(): Box1f;
}

export interface Box1i extends ClassHandle {
  min: number;
  max: number;
  valid(): boolean;
  center(): number;
  corner(_0: boolean): number;
  size(): number;
  diagonal(): number;
  volume(): number;
  include(_0: number): void;
  includeBox(_0: Box1i): void;
  contains(_0: number): boolean;
  containsBox(_0: Box1i): boolean;
  getBoxClosestPointTo(_0: number): number;
  intersects(_0: Box1i): boolean;
  intersection(_0: Box1i): Box1i;
  intersect(_0: Box1i): Box1i;
  getDistanceSqToBox(_0: Box1i): number;
  getDistanceSqToPoint(_0: number): number;
  expanded(_0: number): Box1i;
  insignificantlyExpanded(): Box1i;
}

export interface Box1i64 extends ClassHandle {
  min: bigint;
  max: bigint;
  valid(): boolean;
  center(): bigint;
  corner(_0: boolean): bigint;
  size(): bigint;
  diagonal(): bigint;
  volume(): bigint;
  include(_0: bigint): void;
  includeBox(_0: Box1i64): void;
  contains(_0: bigint): boolean;
  containsBox(_0: Box1i64): boolean;
  getBoxClosestPointTo(_0: bigint): bigint;
  intersects(_0: Box1i64): boolean;
  intersection(_0: Box1i64): Box1i64;
  intersect(_0: Box1i64): Box1i64;
  getDistanceSqToBox(_0: Box1i64): bigint;
  getDistanceSqToPoint(_0: bigint): bigint;
  expanded(_0: bigint): Box1i64;
  insignificantlyExpanded(): Box1i64;
}

export interface Box1d extends ClassHandle {
  min: number;
  max: number;
  valid(): boolean;
  center(): number;
  corner(_0: boolean): number;
  size(): number;
  diagonal(): number;
  volume(): number;
  include(_0: number): void;
  includeBox(_0: Box1d): void;
  contains(_0: number): boolean;
  containsBox(_0: Box1d): boolean;
  getBoxClosestPointTo(_0: number): number;
  intersects(_0: Box1d): boolean;
  intersection(_0: Box1d): Box1d;
  intersect(_0: Box1d): Box1d;
  getDistanceSqToBox(_0: Box1d): number;
  getDistanceSqToPoint(_0: number): number;
  expanded(_0: number): Box1d;
  insignificantlyExpanded(): Box1d;
}

export interface Box2f extends ClassHandle {
  min: Vector2f;
  max: Vector2f;
  valid(): boolean;
  diagonal(): number;
  volume(): number;
  includeBox(_0: Box2f): void;
  containsBox(_0: Box2f): boolean;
  intersects(_0: Box2f): boolean;
  intersection(_0: Box2f): Box2f;
  intersect(_0: Box2f): Box2f;
  getDistanceSqToBox(_0: Box2f): number;
  insignificantlyExpanded(): Box2f;
  center(): Vector2f;
  size(): Vector2f;
  include(_0: Vector2f): void;
  contains(_0: Vector2f): boolean;
  getBoxClosestPointTo(_0: Vector2f): Vector2f;
  getDistanceSqToPoint(_0: Vector2f): number;
  expanded(_0: Vector2f): Box2f;
  corner(_0: Vector2b): Vector2f;
}

export interface Box2i extends ClassHandle {
  min: Vector2i;
  max: Vector2i;
  valid(): boolean;
  diagonal(): number;
  volume(): number;
  includeBox(_0: Box2i): void;
  containsBox(_0: Box2i): boolean;
  intersects(_0: Box2i): boolean;
  intersection(_0: Box2i): Box2i;
  intersect(_0: Box2i): Box2i;
  getDistanceSqToBox(_0: Box2i): number;
  insignificantlyExpanded(): Box2i;
  center(): Vector2i;
  size(): Vector2i;
  include(_0: Vector2i): void;
  contains(_0: Vector2i): boolean;
  getBoxClosestPointTo(_0: Vector2i): Vector2i;
  getDistanceSqToPoint(_0: Vector2i): number;
  expanded(_0: Vector2i): Box2i;
  corner(_0: Vector2b): Vector2i;
}

export interface Box2i64 extends ClassHandle {
  min: Vector2i64;
  max: Vector2i64;
  valid(): boolean;
  diagonal(): bigint;
  volume(): bigint;
  includeBox(_0: Box2i64): void;
  containsBox(_0: Box2i64): boolean;
  intersects(_0: Box2i64): boolean;
  intersection(_0: Box2i64): Box2i64;
  intersect(_0: Box2i64): Box2i64;
  getDistanceSqToBox(_0: Box2i64): bigint;
  insignificantlyExpanded(): Box2i64;
  center(): Vector2i64;
  size(): Vector2i64;
  include(_0: Vector2i64): void;
  contains(_0: Vector2i64): boolean;
  getBoxClosestPointTo(_0: Vector2i64): Vector2i64;
  getDistanceSqToPoint(_0: Vector2i64): bigint;
  expanded(_0: Vector2i64): Box2i64;
  corner(_0: Vector2b): Vector2i64;
}

export interface Box2d extends ClassHandle {
  min: Vector2d;
  max: Vector2d;
  valid(): boolean;
  diagonal(): number;
  volume(): number;
  includeBox(_0: Box2d): void;
  containsBox(_0: Box2d): boolean;
  intersects(_0: Box2d): boolean;
  intersection(_0: Box2d): Box2d;
  intersect(_0: Box2d): Box2d;
  getDistanceSqToBox(_0: Box2d): number;
  insignificantlyExpanded(): Box2d;
  center(): Vector2d;
  corner(_0: Vector2b): Vector2d;
  size(): Vector2d;
  include(_0: Vector2d): void;
  contains(_0: Vector2d): boolean;
  getBoxClosestPointTo(_0: Vector2d): Vector2d;
  getDistanceSqToPoint(_0: Vector2d): number;
  expanded(_0: Vector2d): Box2d;
}

export interface Box3f extends ClassHandle {
  min: Vector3f;
  max: Vector3f;
  valid(): boolean;
  diagonal(): number;
  volume(): number;
  includeBox(_0: Box3f): void;
  containsBox(_0: Box3f): boolean;
  intersects(_0: Box3f): boolean;
  intersection(_0: Box3f): Box3f;
  intersect(_0: Box3f): Box3f;
  getDistanceSqToBox(_0: Box3f): number;
  insignificantlyExpanded(): Box3f;
  center(): Vector3f;
  size(): Vector3f;
  include(_0: Vector3f): void;
  contains(_0: Vector3f): boolean;
  getBoxClosestPointTo(_0: Vector3f): Vector3f;
  getDistanceSqToPoint(_0: Vector3f): number;
  expanded(_0: Vector3f): Box3f;
  corner(_0: Vector3b): Vector3f;
}

export interface Box3i extends ClassHandle {
  min: Vector3i;
  max: Vector3i;
  valid(): boolean;
  diagonal(): number;
  volume(): number;
  includeBox(_0: Box3i): void;
  containsBox(_0: Box3i): boolean;
  intersects(_0: Box3i): boolean;
  intersection(_0: Box3i): Box3i;
  intersect(_0: Box3i): Box3i;
  getDistanceSqToBox(_0: Box3i): number;
  insignificantlyExpanded(): Box3i;
  center(): Vector3i;
  corner(_0: Vector3b): Vector3i;
  size(): Vector3i;
  include(_0: Vector3i): void;
  contains(_0: Vector3i): boolean;
  getBoxClosestPointTo(_0: Vector3i): Vector3i;
  getDistanceSqToPoint(_0: Vector3i): number;
  expanded(_0: Vector3i): Box3i;
}

export interface Box3i64 extends ClassHandle {
  min: Vector3i64;
  max: Vector3i64;
  valid(): boolean;
  diagonal(): bigint;
  volume(): bigint;
  includeBox(_0: Box3i64): void;
  containsBox(_0: Box3i64): boolean;
  intersects(_0: Box3i64): boolean;
  intersection(_0: Box3i64): Box3i64;
  intersect(_0: Box3i64): Box3i64;
  getDistanceSqToBox(_0: Box3i64): bigint;
  insignificantlyExpanded(): Box3i64;
  center(): Vector3i64;
  corner(_0: Vector3b): Vector3i64;
  size(): Vector3i64;
  include(_0: Vector3i64): void;
  contains(_0: Vector3i64): boolean;
  getBoxClosestPointTo(_0: Vector3i64): Vector3i64;
  getDistanceSqToPoint(_0: Vector3i64): bigint;
  expanded(_0: Vector3i64): Box3i64;
}

export interface Box3d extends ClassHandle {
  min: Vector3d;
  max: Vector3d;
  valid(): boolean;
  diagonal(): number;
  volume(): number;
  includeBox(_0: Box3d): void;
  containsBox(_0: Box3d): boolean;
  intersects(_0: Box3d): boolean;
  intersection(_0: Box3d): Box3d;
  intersect(_0: Box3d): Box3d;
  getDistanceSqToBox(_0: Box3d): number;
  insignificantlyExpanded(): Box3d;
  center(): Vector3d;
  corner(_0: Vector3b): Vector3d;
  size(): Vector3d;
  include(_0: Vector3d): void;
  contains(_0: Vector3d): boolean;
  getBoxClosestPointTo(_0: Vector3d): Vector3d;
  getDistanceSqToPoint(_0: Vector3d): number;
  expanded(_0: Vector3d): Box3d;
}

export interface FaceBMapBuffer extends ClassHandle {
  capacity(): number;
  size(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number): void;
  heapBytes(): number;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  get(_0: FaceId): FaceId;
  set(_0: FaceId, _1: FaceId): void;
  dataConst(): FaceId | null;
  data(): NoDefInitFaceId | null;
}

export interface VertBMapBuffer extends ClassHandle {
  capacity(): number;
  size(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number): void;
  heapBytes(): number;
  beginId(): VertId;
  backId(): VertId;
  endId(): VertId;
  get(_0: VertId): VertId;
  set(_0: VertId, _1: VertId): void;
  dataConst(): VertId | null;
  data(): NoDefInitVertId | null;
}

export interface EdgeBMapBuffer extends ClassHandle {
  capacity(): number;
  size(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number): void;
  heapBytes(): number;
  beginId(): EdgeId;
  backId(): EdgeId;
  endId(): EdgeId;
  get(_0: EdgeId): EdgeId;
  set(_0: EdgeId, _1: EdgeId): void;
  dataConst(): EdgeId | null;
  data(): NoDefInitEdgeId | null;
}

export interface UndirectedEdgeBMapBuffer extends ClassHandle {
  capacity(): number;
  size(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number): void;
  heapBytes(): number;
  beginId(): UndirectedEdgeId;
  backId(): UndirectedEdgeId;
  endId(): UndirectedEdgeId;
  get(_0: UndirectedEdgeId): UndirectedEdgeId;
  set(_0: UndirectedEdgeId, _1: UndirectedEdgeId): void;
  dataConst(): UndirectedEdgeId | null;
  data(): NoDefInitUndirectedEdgeId | null;
}

export interface WholeEdgeBMapBuffer extends ClassHandle {
  capacity(): number;
  size(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number): void;
  heapBytes(): number;
  dataConst(): EdgeId | null;
  beginId(): UndirectedEdgeId;
  backId(): UndirectedEdgeId;
  endId(): UndirectedEdgeId;
  get(_0: UndirectedEdgeId): EdgeId;
  set(_0: UndirectedEdgeId, _1: EdgeId): void;
  data(): NoDefInitEdgeId | null;
}

export interface FaceIdEdgeIdSizeTBMapBuffer extends ClassHandle {
  capacity(): number;
  size(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number): void;
  beginId(): number;
  backId(): number;
  endId(): number;
  heapBytes(): number;
  get(_0: number): FaceId;
  set(_0: number, _1: FaceId): void;
  dataConst(): FaceId | null;
  data(): NoDefInitFaceId | null;
}

export interface VertIdSizeTBMapBuffer extends ClassHandle {
  capacity(): number;
  size(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number): void;
  beginId(): number;
  backId(): number;
  endId(): number;
  heapBytes(): number;
  get(_0: number): VertId;
  set(_0: number, _1: VertId): void;
  dataConst(): VertId | null;
  data(): NoDefInitVertId | null;
}

export interface EdgeIdSizeTBMapBuffer extends ClassHandle {
  capacity(): number;
  size(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number): void;
  beginId(): number;
  backId(): number;
  endId(): number;
  heapBytes(): number;
  get(_0: number): EdgeId;
  set(_0: number, _1: EdgeId): void;
  dataConst(): EdgeId | null;
  data(): NoDefInitEdgeId | null;
}

export interface UndirectedEdgeIdSizeTBMapBuffer extends ClassHandle {
  capacity(): number;
  size(): number;
  empty(): boolean;
  clear(): void;
  resize(_0: number): void;
  beginId(): number;
  backId(): number;
  endId(): number;
  heapBytes(): number;
  get(_0: number): UndirectedEdgeId;
  set(_0: number, _1: UndirectedEdgeId): void;
  dataConst(): UndirectedEdgeId | null;
  data(): NoDefInitUndirectedEdgeId | null;
}

export interface PackMapping extends ClassHandle {
  setF(_0: FaceBMap): void;
  getF(): FaceBMap | null;
  setFWithPtr(_0: FaceBMap | null): void;
  setV(_0: VertBMap): void;
  getV(): VertBMap | null;
  setVWithPtr(_0: VertBMap | null): void;
  setE(_0: UndirectedEdgeBMap): void;
  getE(): UndirectedEdgeBMap | null;
  setEWithPtr(_0: UndirectedEdgeBMap | null): void;
}

export interface CloudPartMapping extends ClassHandle {
  src2tgtVerts: VertMap | null;
  tgt2srcVerts: VertMap | null;
}

export interface Color extends ClassHandle {
  r: number;
  g: number;
  b: number;
  a: number;
  getUInt32(): number;
  scaledAlpha(_0: number): Color;
  get(_0: number): number;
  set(_0: number): number;
}

export interface NewEdgesMap extends ClassHandle {
  splitEdges: UndirectedEdgeBitSet;
  map: UndirectedEdgeIdIntHashMap;
}

export interface ForceFillValue<T extends number> {
  value: T;
}
export type ForceFill = ForceFillValue<0>|ForceFillValue<1>|ForceFillValue<2>;

export interface CutMeshParameters extends ClassHandle {
  forceFillMode: ForceFill;
  new2oldEdgesMap: NewEdgesMap | null;
  new2OldMap: FaceMap | null;
  sortData: SortIntersectionsData | null;
}

export interface Dipole extends ClassHandle {
  area: number;
  rr: number;
  pos: Vector3f;
  dirArea: Vector3f;
  addIfGoodApprox(_0: Vector3f, _1: number, _2: number): any;
}

export interface EdgeLengthMesh extends ClassHandle {
  edgeLengths: UndirectedEdgeScalars;
  topology: MeshTopology;
  leftCotan(_0: EdgeId): number;
  flipEdge(_0: EdgeId): boolean;
  cotan(_0: UndirectedEdgeId): number;
  isDelone(_0: UndirectedEdgeId, _1: number): boolean;
  edgeLengthAfterFlip(_0: EdgeId): number | undefined;
}

export interface EdgePoint extends ClassHandle {
  e: EdgeId;
  a: SegmPointf;
  inVertex(): boolean;
  moveToClosestVertex(): void;
  valid(): boolean;
  opbool(): boolean;
  sym(): EdgePoint;
  equals(_0: EdgePoint): boolean;
  inVertexFromMeshTopology(_0: MeshTopology): VertId;
  getClosestVertex(_0: MeshTopology): VertId;
  isBd(_0: MeshTopology, _1: FaceBitSet | null): boolean;
  inVertexFromPolylineTopology(_0: PolylineTopology): VertId;
  getClosestVertexFromPolylineTopology(_0: PolylineTopology): VertId;
}

export interface EdgePointPair extends ClassHandle {
  a: EdgePoint;
  b: EdgePoint;
  equals(_0: EdgePointPair): boolean;
}

export interface EdgeSegment extends ClassHandle {
  e: EdgeId;
  a: SegmPointf;
  b: SegmPointf;
  edgePointA(): EdgePoint;
  edgePointB(): EdgePoint;
  valid(): boolean;
  equals(_0: EdgeSegment): boolean;
  sym(): EdgeSegment;
}

export interface VertexMassValue<T extends number> {
  value: T;
}
export type VertexMass = VertexMassValue<0>|VertexMassValue<1>;

export interface EdgeWeightsValue<T extends number> {
  value: T;
}
export type EdgeWeights = EdgeWeightsValue<0>|EdgeWeightsValue<1>;

export interface ProcessingValue<T extends number> {
  value: T;
}
export type Processing = ProcessingValue<0>|ProcessingValue<1>;

export interface OrientNormalsValue<T extends number> {
  value: T;
}
export type OrientNormals = OrientNormalsValue<0>|OrientNormalsValue<1>|OrientNormalsValue<2>;

export interface OffsetModeValue<T extends number> {
  value: T;
}
export type OffsetMode = OffsetModeValue<0>|OffsetModeValue<1>|OffsetModeValue<2>;

export interface ColoringTypeValue<T extends number> {
  value: T;
}
export type ColoringType = ColoringTypeValue<0>|ColoringTypeValue<1>|ColoringTypeValue<1>|ColoringTypeValue<1>|ColoringTypeValue<2>;

export interface UseAABBTreeValue<T extends number> {
  value: T;
}
export type UseAABBTree = UseAABBTreeValue<0>|UseAABBTreeValue<1>|UseAABBTreeValue<2>;

export interface GeodesicPathApproxValue<T extends number> {
  value: T;
}
export type GeodesicPathApprox = GeodesicPathApproxValue<0>|GeodesicPathApproxValue<1>|GeodesicPathApproxValue<2>;

export interface ExpectedVoid extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  hasError(): boolean;
  error(): string;
}

export interface ExpectedStdString extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): string;
  get(): string;
  getValuePtr(): string;
  valueOr(_0: EmbindString): string;
}

export interface ExpectedBool extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): boolean;
  getValuePtr(): boolean;
  get(): boolean;
  valueOr(_0: boolean): boolean;
}

export interface ExpectedMeshTopology extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): MeshTopology;
  get(): MeshTopology;
  valueOr(_0: MeshTopology): MeshTopology;
  getValuePtr(): MeshTopology | null;
}

export interface ExpectedMesh extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): Mesh;
  get(): Mesh;
  valueOr(_0: Mesh): Mesh;
  getValuePtr(): Mesh | null;
}

export interface ExpectedEdgeLengthMesh extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): EdgeLengthMesh;
  get(): EdgeLengthMesh;
  getValuePtr(): EdgeLengthMesh | null;
  valueOr(_0: EdgeLengthMesh): EdgeLengthMesh;
}

export interface ExpectedMeshOrPoints extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): MeshOrPoints;
  get(): MeshOrPoints;
  valueOr(_0: MeshOrPoints): MeshOrPoints;
  getValuePtr(): MeshOrPoints | null;
}

export interface ExpectedPointCloud extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): PointCloud;
  get(): PointCloud;
  valueOr(_0: PointCloud): PointCloud;
  getValuePtr(): PointCloud | null;
}

export interface ExpectedAABBTree extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): AABBTree;
  get(): AABBTree;
  getValuePtr(): AABBTree | null;
}

export interface ExpectedAABBTreePoints extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): AABBTreePoints;
  get(): AABBTreePoints;
  getValuePtr(): AABBTreePoints | null;
}

export interface ExpectedAABBTreeObjects extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): AABBTreeObjects;
  get(): AABBTreeObjects;
  getValuePtr(): AABBTreeObjects | null;
  valueOr(_0: AABBTreeObjects): AABBTreeObjects;
}

export interface ExpectedCloudPartMapping extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): CloudPartMapping;
  get(): CloudPartMapping;
  getValuePtr(): CloudPartMapping | null;
  valueOr(_0: CloudPartMapping): CloudPartMapping;
}

export interface ExpectedPartMapping extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): PartMapping;
  get(): PartMapping;
  valueOr(_0: PartMapping): PartMapping;
  getValuePtr(): PartMapping | null;
}

export interface ExpectedMeshOrPointsXf extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): MeshOrPointsXf;
  get(): MeshOrPointsXf;
  valueOr(_0: MeshOrPointsXf): MeshOrPointsXf;
  getValuePtr(): MeshOrPointsXf | null;
}

export interface ExpectedMeshTexture extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): MeshTexture;
  get(): MeshTexture;
  valueOr(_0: MeshTexture): MeshTexture;
  getValuePtr(): MeshTexture | null;
}

export interface ExpectedGridSettings extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): GridSettings;
  get(): GridSettings;
  getValuePtr(): GridSettings | null;
}

export interface ExpectedTriMesh extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): TriMesh;
  get(): TriMesh;
  valueOr(_0: TriMesh): TriMesh;
  getValuePtr(): TriMesh | null;
}

export interface ExpectedFaceFace extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): FaceFace;
  get(): FaceFace;
  valueOr(_0: FaceFace): FaceFace;
  getValuePtr(): FaceFace | null;
}

export interface ExpectedBooleanResultPoints extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): BooleanResultPoints;
  get(): BooleanResultPoints;
  valueOr(_0: BooleanResultPoints): BooleanResultPoints;
  getValuePtr(): BooleanResultPoints | null;
}

export interface ExpectedVectorFaceFace extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): VectorFaceFace;
  get(): VectorFaceFace;
  valueOr(_0: VectorFaceFace): VectorFaceFace;
  getValuePtr(): VectorFaceFace | null;
}

export interface ExpectedVertIdPair extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): VertIdPair;
  get(): VertIdPair;
  valueOr(_0: VertIdPair): VertIdPair;
}

export interface ExpectedFaceIdPair extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): FaceIdPair;
  get(): FaceIdPair;
  valueOr(_0: FaceIdPair): FaceIdPair;
}

export interface ExpectedEdgeIdPair extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): EdgeIdPair;
  get(): EdgeIdPair;
  valueOr(_0: EdgeIdPair): EdgeIdPair;
}

export interface ExpectedUndirectedIdPair extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): UndirectedEdgeIdPair;
  get(): UndirectedEdgeIdPair;
  valueOr(_0: UndirectedEdgeIdPair): UndirectedEdgeIdPair;
}

export interface ExpectedUndirectedE2EIdPair extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): UndirectedE2EIdPair;
  get(): UndirectedE2EIdPair;
  valueOr(_0: UndirectedE2EIdPair): UndirectedE2EIdPair;
}

export interface ExpectedVertHashMapEntries extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): VertHashMapEntries;
  get(): VertHashMapEntries;
  valueOr(_0: VertHashMapEntries): VertHashMapEntries;
  getValuePtr(): VertHashMapEntries | null;
}

export interface ExpectedFaceHashMapEntries extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): FaceHashMapEntries;
  get(): FaceHashMapEntries;
  valueOr(_0: FaceHashMapEntries): FaceHashMapEntries;
  getValuePtr(): FaceHashMapEntries | null;
}

export interface ExpectedEdgeHashMapEntries extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): EdgeHashMapEntries;
  get(): EdgeHashMapEntries;
  valueOr(_0: EdgeHashMapEntries): EdgeHashMapEntries;
  getValuePtr(): EdgeHashMapEntries | null;
}

export interface ExpectedUndirectedEdgeHashMapEntries extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): UndirectedEdgeHashMapEntries;
  get(): UndirectedEdgeHashMapEntries;
  valueOr(_0: UndirectedEdgeHashMapEntries): UndirectedEdgeHashMapEntries;
  getValuePtr(): UndirectedEdgeHashMapEntries | null;
}

export interface ExpectedWholeEdgeHashMapEntries extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): WholeEdgeHashMapEntries;
  get(): WholeEdgeHashMapEntries;
  valueOr(_0: WholeEdgeHashMapEntries): WholeEdgeHashMapEntries;
  getValuePtr(): WholeEdgeHashMapEntries | null;
}

export interface ExpectedFaceBitSet extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): FaceBitSet;
  get(): FaceBitSet;
  getValuePtr(): FaceBitSet | null;
  valueOr(_0: FaceBitSet): FaceBitSet;
}

export interface ExpectedVertBitSet extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): VertBitSet;
  get(): VertBitSet;
  getValuePtr(): VertBitSet | null;
  valueOr(_0: VertBitSet): VertBitSet;
}

export interface ExpectedEdgeBitSet extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): EdgeBitSet;
  get(): EdgeBitSet;
  getValuePtr(): EdgeBitSet | null;
  valueOr(_0: EdgeBitSet): EdgeBitSet;
}

export interface ExpectedUndirectedEdgeBitSet extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): UndirectedEdgeBitSet;
  get(): UndirectedEdgeBitSet;
  getValuePtr(): UndirectedEdgeBitSet | null;
  valueOr(_0: UndirectedEdgeBitSet): UndirectedEdgeBitSet;
}

export interface ExpectedPixelBitSet extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): PixelBitSet;
  get(): PixelBitSet;
  getValuePtr(): PixelBitSet | null;
  valueOr(_0: PixelBitSet): PixelBitSet;
}

export interface ExpectedVoxelBitSet extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): VoxelBitSet;
  get(): VoxelBitSet;
  getValuePtr(): VoxelBitSet | null;
  valueOr(_0: VoxelBitSet): VoxelBitSet;
}

export interface ExpectedRegionBitSet extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): RegionBitSet;
  get(): RegionBitSet;
  getValuePtr(): RegionBitSet | null;
  valueOr(_0: RegionBitSet): RegionBitSet;
}

export interface ExpectedNodeBitSet extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): NodeBitSet;
  get(): NodeBitSet;
  getValuePtr(): NodeBitSet | null;
  valueOr(_0: NodeBitSet): NodeBitSet;
}

export interface ExpectedObjBitSet extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): ObjBitSet;
  get(): ObjBitSet;
  getValuePtr(): ObjBitSet | null;
  valueOr(_0: ObjBitSet): ObjBitSet;
}

export interface ExpectedTextureBitSet extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): TextureBitSet;
  get(): TextureBitSet;
  getValuePtr(): TextureBitSet | null;
  valueOr(_0: TextureBitSet): TextureBitSet;
}

export interface ExpectedGraphVertBitSet extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): GraphVertBitSet;
  get(): GraphVertBitSet;
  getValuePtr(): GraphVertBitSet | null;
  valueOr(_0: GraphVertBitSet): GraphVertBitSet;
}

export interface ExpectedGraphEdgeBitSet extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): GraphEdgeBitSet;
  get(): GraphEdgeBitSet;
  getValuePtr(): GraphEdgeBitSet | null;
  valueOr(_0: GraphEdgeBitSet): GraphEdgeBitSet;
}

export interface ExpectedPackMapping extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): PackMapping;
  get(): PackMapping;
  getValuePtr(): PackMapping | null;
}

export interface ExpectedEdgePath extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): VectorEdgeId;
  get(): VectorEdgeId;
  valueOr(_0: VectorEdgeId): VectorEdgeId;
  getValuePtr(): VectorEdgeId | null;
}

export interface ExpectedEdgeLoops extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): VectorEdgePath;
  get(): VectorEdgePath;
  valueOr(_0: VectorEdgePath): VectorEdgePath;
  getValuePtr(): VectorEdgePath | null;
}

export interface ExpectedOneMeshContour extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): OneMeshContour;
  get(): OneMeshContour;
  valueOr(_0: OneMeshContour): OneMeshContour;
  getValuePtr(): OneMeshContour | null;
}

export interface ExpectedOneMeshContours extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): OneMeshContours;
  get(): OneMeshContours;
  valueOr(_0: OneMeshContours): OneMeshContours;
  getValuePtr(): OneMeshContours | null;
}

export interface ExpectedSurfacePath extends ClassHandle {
  hasValue(): boolean;
  opbool(): boolean;
  error(): string;
  hasError(): boolean;
  value(): SurfacePath;
  get(): SurfacePath;
  valueOr(_0: SurfacePath): SurfacePath;
  getValuePtr(): SurfacePath | null;
}

export interface FaceFace extends ClassHandle {
  aFace: FaceId;
  bFace: FaceId;
  equals(_0: FaceFace): boolean;
}

export interface UndirectedEdgeUndirectedEdge extends ClassHandle {
  aUndirEdge: UndirectedEdgeId;
  bUndirEdge: UndirectedEdgeId;
  equals(_0: UndirectedEdgeUndirectedEdge): boolean;
}

export interface FillHoleNicelySettings extends ClassHandle {
  triangulateOnly: boolean;
  maxEdgeLen: number;
  maxEdgeSplits: number;
  maxAngleChangeAfterFlip: number;
  smoothCurvature: boolean;
  naturalSmooth: boolean;
  edgeWeights: EdgeWeights;
  vmass: VertexMass;
  triangulateParams: FillHoleParams;
  uvCoords: VertCoords2 | null;
  colorMap: VertColors | null;
  faceColors: FaceColors | null;
  onEdgeSplit: VoidFunctorEdgeIdEdgeId;
  beforeEdgeSplit: EdgePredicate;
}

export interface FixParams extends ClassHandle {
  voxelSize: number;
  bottomExtension: number;
  smooth: boolean;
  findParameters: FindParams;
}

export interface FreeFormDeformer extends ClassHandle {
  apply(): void;
  getAllRefGridPositions(): VectorVector3f;
  setAllRefGridPositions(_0: VectorVector3f): void;
  applySinglePoint(_0: Vector3f): Vector3f;
  init(_0: Vector3i, _1: Box3f): void;
  setRefGridPointPosition(_0: Vector3i, _1: Vector3f): void;
  getRefGridPointPosition(_0: Vector3i): Vector3f;
  getIndex(_0: Vector3i): number;
  getCoord(_0: number): Vector3i;
  getResolution(): Vector3i;
}

export interface FreeFormBestFit extends ClassHandle {
  addOther(_0: FreeFormBestFit): void;
  setStabilizer(_0: number): void;
  getStabilizer(): number;
  findBestDeformationReferenceGrid(): VectorVector3f;
  addPairf(_0: Vector3f, _1: Vector3f, _2: number): void;
  addPaird(_0: Vector3d, _1: Vector3d, _2: number): void;
}

export interface ModelPointsData extends ClassHandle {
  validPoints: VertBitSet | null;
  xf: AffineXf3f | null;
  fakeObjId: ObjId;
  points: VertCoords | null;
}

export interface ObjVertId extends ClassHandle {
  vId: VertId;
  objId: ObjId;
  equals(_0: ObjVertId): boolean;
}

export interface EdgeTypeValue<T extends number> {
  value: T;
}
export type EdgeType = EdgeTypeValue<0>|EdgeTypeValue<1>|EdgeTypeValue<2>|EdgeTypeValue<3>;

export interface TriTypeValue<T extends number> {
  value: T;
}
export type TriType = TriTypeValue<0>|TriTypeValue<1>;

export interface GridSettings extends ClassHandle {
  dim: Vector2i;
  setVertIds(_0: VertIdSizeTBMap): void;
  getVertIds(): VertIdSizeTBMap | null;
  setVertIdsWithPtr(_0: VertIdSizeTBMap | null): void;
  setUEdgeIds(_0: UndirectedEdgeIdSizeTBMap): void;
  getUEdgeIds(): UndirectedEdgeIdSizeTBMap | null;
  setUEdgeIdsWithPtr(_0: UndirectedEdgeIdSizeTBMap | null): void;
  setFaceIds(_0: FaceIdSizeTBMap): void;
  getFaceIds(): FaceIdSizeTBMap | null;
  setFaceIdsWithPtr(_0: FaceIdSizeTBMap | null): void;
}

export interface __phmap_internal_FlatHashMapPolicy_EdgeId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_EdgeId extends ClassHandle {
  size(): number;
  clear(): void;
}

export interface __phmap_internal_raw_hash_map_EdgeId extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_UndirectedEdgeId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_UndirectedEdgeId extends ClassHandle {
  size(): number;
  clear(): void;
}

export interface __phmap_internal_raw_hash_map_UndirectedEdgeId extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_FaceId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_FaceId extends ClassHandle {
  size(): number;
  clear(): void;
}

export interface __phmap_internal_raw_hash_map_FaceId extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_VertId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_VertId extends ClassHandle {
  size(): number;
  clear(): void;
}

export interface __phmap_internal_raw_hash_map_VertId extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_PixelId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_PixelId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_map_PixelId extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_VoxelId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_VoxelId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_map_VoxelId extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_RegionId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_RegionId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_map_RegionId extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_NodeId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_NodeId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_map_NodeId extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_ObjId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_ObjId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_map_ObjId extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_TextureId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_TextureId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_map_TextureId extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_GraphVertId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_GraphVertId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_map_GraphVertId extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_GraphEdgeId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_GraphEdgeId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_map_GraphEdgeId extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_UndirectedEdgeIdEdgeId extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_UndirectedEdgeIdEdgeId extends ClassHandle {
  size(): number;
  clear(): void;
}

export interface __phmap_internal_raw_hash_map_UndirectedEdgeIdEdgeId extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_UndirectedEdgeIdInt extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_UndirectedEdgeIdInt extends ClassHandle {
  size(): number;
  clear(): void;
}

export interface __phmap_internal_raw_hash_map_UndirectedEdgeIdInt extends ClassHandle {
}

export interface __phmap_internal_FlatHashMapPolicy_IntBox3i extends ClassHandle {
}

export interface __phmap_internal_raw_hash_set_IntBox3i extends ClassHandle {
  size(): number;
  clear(): void;
}

export interface __phmap_internal_raw_hash_map_IntBox3i extends ClassHandle {
}

export interface VertHashMap extends ClassHandle {
  insert(_0: VertId, _1: VertId): void;
  get(_0: VertId): any;
  has(_0: VertId): boolean;
  erase(_0: VertId): void;
  keys(): VectorVertId;
  values(): VectorVertId;
}

export interface FaceHashMap extends ClassHandle {
  insert(_0: FaceId, _1: FaceId): void;
  get(_0: FaceId): any;
  has(_0: FaceId): boolean;
  erase(_0: FaceId): void;
  keys(): VectorFaceId;
  values(): VectorFaceId;
}

export interface EdgeHashMap extends ClassHandle {
  insert(_0: EdgeId, _1: EdgeId): void;
  get(_0: EdgeId): any;
  has(_0: EdgeId): boolean;
  erase(_0: EdgeId): void;
  keys(): VectorEdgeId;
  values(): VectorEdgeId;
}

export interface UndirectedEdgeHashMap extends ClassHandle {
  insert(_0: UndirectedEdgeId, _1: UndirectedEdgeId): void;
  get(_0: UndirectedEdgeId): any;
  has(_0: UndirectedEdgeId): boolean;
  erase(_0: UndirectedEdgeId): void;
  keys(): VectorUndirectedEdgeId;
  values(): VectorUndirectedEdgeId;
}

export interface WholeEdgeHashMap extends ClassHandle {
  insert(_0: UndirectedEdgeId, _1: EdgeId): void;
  get(_0: UndirectedEdgeId): any;
  has(_0: UndirectedEdgeId): boolean;
  erase(_0: UndirectedEdgeId): void;
  values(): VectorEdgeId;
  keys(): VectorUndirectedEdgeId;
}

export interface UndirectedEdgeIdIntHashMap extends ClassHandle {
  insert(_0: UndirectedEdgeId, _1: number): void;
  get(_0: UndirectedEdgeId): any;
  has(_0: UndirectedEdgeId): boolean;
  erase(_0: UndirectedEdgeId): void;
  values(): StdVectori;
  keys(): VectorUndirectedEdgeId;
}

export interface IntBox3iHashMap extends ClassHandle {
  insert(_0: number, _1: Box3i): void;
  get(_0: number): any;
  has(_0: number): boolean;
  erase(_0: number): void;
  keys(): StdVectori;
  values(): VectorBox3i;
}

export interface ICPPairData extends ClassHandle {
  distSq_: number;
  weight_: number;
  srcPoint_: Vector3f;
  srcNorm_: Vector3f;
  tgtPoint_: Vector3f;
  tgtNorm_: Vector3f;
  equals_(_0: ICPPairData): boolean;
}

export interface PointPair extends ICPPairData {
  normalsAngleCos: number;
  tgtOnBd: boolean;
  srcVertId: VertId;
  tgtCloseVert: VertId;
  equals(_0: PointPair): boolean;
}

export interface IPointPairs extends ClassHandle {
  getActive_(): BitSet;
  setActive_(_0: BitSet): void;
  size_(): number;
}

export interface PointPairs extends IPointPairs {
  vec: VectorPointPair;
  getActive(): BitSet;
  setActive(_0: BitSet): void;
  get(_0: number): PointPair;
  size(): number;
}

export interface NumSum extends ClassHandle {
  num: number;
  sum: number;
  opadd(_0: NumSum): NumSum;
  rootMeanSqF(): number;
}

export interface ICP extends ClassHandle {
  setCosineLimit(_0: number): void;
  setDistanceLimit(_0: number): void;
  setBadIterCount(_0: number): void;
  setFarDistFactor(_0: number): void;
  setFltSamples(_0: VertBitSet): void;
  sampleFltPoints(_0: number): void;
  setRefSamples(_0: VertBitSet): void;
  sampleRefPoints(_0: number): void;
  samplePoints(_0: number): void;
  setXfs(_0: AffineXf3f, _1: AffineXf3f): void;
  setFloatXf(_0: AffineXf3f): void;
  autoSelectFloatXf(): AffineXf3f;
  updatePointPairs(): void;
  getStatusInfo(): string;
  getNumSamples(): number;
  getNumActivePairs(): number;
  getMeanSqDistToPoint(): number;
  getMeanSqDistToPlane(): number;
  getFlt2RefPairs(): PointPairs;
  getRef2FltPairs(): PointPairs;
  calculateTransformation(): AffineXf3f;
  setParams(_0: ICPProperties): void;
  getParams(): ICPProperties;
}

export interface ICPMethodValue<T extends number> {
  value: T;
}
export type ICPMethod = ICPMethodValue<0>|ICPMethodValue<1>|ICPMethodValue<2>;

export interface ICPModeValue<T extends number> {
  value: T;
}
export type ICPMode = ICPModeValue<0>|ICPModeValue<1>|ICPModeValue<2>|ICPModeValue<3>|ICPModeValue<4>;

export interface ICPExitTypeValue<T extends number> {
  value: T;
}
export type ICPExitType = ICPExitTypeValue<0>|ICPExitTypeValue<1>|ICPExitTypeValue<2>|ICPExitTypeValue<3>|ICPExitTypeValue<4>;

export interface VertexIdentifier extends ClassHandle {
  reserve(_0: number): void;
  numTris(): number;
  takeTriangulation(): Triangulation;
  takePoints(): VertCoords;
}

export interface EqualVector3f extends ClassHandle {
  opcall(_0: Vector3f, _1: Vector3f): boolean;
}

export interface MyClass extends ClassHandle {
  x: number;
  readonly x_readonly: number;
  incrementX(): void;
}

export interface RememberShapeValue<T extends number> {
  value: T;
}
export type RememberShape = RememberShapeValue<0>|RememberShapeValue<1>;

export interface Laplacian extends ClassHandle {
  init(_0: VertBitSet, _1: EdgeWeights, _2: VertexMass, _3: RememberShape): void;
  updateSolver(): void;
  apply(): void;
  region(): VertBitSet;
  freeVerts(): VertBitSet;
  firstLayerFixedVerts(): VertBitSet;
  fixVertex(_0: VertId, _1: boolean): void;
  applyToScalar(_0: VertScalars): void;
  fixVertexWithPos(_0: VertId, _1: Vector3f, _2: boolean): void;
}

export interface Line2f extends ClassHandle {
  p: Vector2f;
  d: Vector2f;
  normalized(): Line2f;
  project(_0: Vector2f): Vector2f;
  distanceSq(_0: Vector2f): number;
  opcall(_0: number): Vector2f;
}

export interface Line2d extends ClassHandle {
  p: Vector2d;
  d: Vector2d;
  normalized(): Line2d;
  project(_0: Vector2d): Vector2d;
  distanceSq(_0: Vector2d): number;
  opcall(_0: number): Vector2d;
}

export interface Line3f extends ClassHandle {
  p: Vector3f;
  d: Vector3f;
  normalized(): Line3f;
  project(_0: Vector3f): Vector3f;
  distanceSq(_0: Vector3f): number;
  opcall(_0: number): Vector3f;
}

export interface Line3d extends ClassHandle {
  p: Vector3d;
  d: Vector3d;
  normalized(): Line3d;
  project(_0: Vector3d): Vector3d;
  distanceSq(_0: Vector3d): number;
  opcall(_0: number): Vector3d;
}

export interface LineSegm2f extends ClassHandle {
  a: Vector2f;
  b: Vector2f;
  lengthSq(): number;
  length(): number;
  equals(_0: LineSegm2f): boolean;
  dir(): Vector2f;
  opcall(_0: number): Vector2f;
}

export interface LineSegm2d extends ClassHandle {
  a: Vector2d;
  b: Vector2d;
  lengthSq(): number;
  length(): number;
  equals(_0: LineSegm2d): boolean;
  dir(): Vector2d;
  opcall(_0: number): Vector2d;
}

export interface LineSegm3f extends ClassHandle {
  a: Vector3f;
  b: Vector3f;
  lengthSq(): number;
  length(): number;
  equals(_0: LineSegm3f): boolean;
  dir(): Vector3f;
  opcall(_0: number): Vector3f;
}

export interface LineSegm3d extends ClassHandle {
  a: Vector3d;
  b: Vector3d;
  lengthSq(): number;
  length(): number;
  equals(_0: LineSegm3d): boolean;
  dir(): Vector3d;
  opcall(_0: number): Vector3d;
}

export interface Matrix2b extends ClassHandle {
}

export interface Matrix2i extends ClassHandle {
}

export interface Matrix2i64 extends ClassHandle {
}

export interface Matrix2f extends ClassHandle {
}

export interface Matrix2d extends ClassHandle {
}

export interface Matrix3b extends ClassHandle {
}

export interface Matrix3i extends ClassHandle {
}

export interface Matrix3i64 extends ClassHandle {
}

export interface Matrix3f extends ClassHandle {
}

export interface Matrix3d extends ClassHandle {
}

export interface Matrix4b extends ClassHandle {
}

export interface Matrix4i extends ClassHandle {
}

export interface Matrix4i64 extends ClassHandle {
}

export interface Matrix4f extends ClassHandle {
}

export interface Matrix4d extends ClassHandle {
}

export interface Mesh extends ClassHandle {
  points: VertCoords;
  topology: MeshTopology;
  equals(_0: Mesh): boolean;
  volume(_0: FaceBitSet | null): number;
  getBoundingBox(): Box3f;
  computeBoundingBoxWithFaceBitSet(_0: AffineXf3f | null): Box3f;
  computeBoundingBox(_0: FaceBitSet | null, _1: AffineXf3f | null): Box3f;
  transform(_0: AffineXf3f, _1: VertBitSet | null): void;
  packOptimally(_0: boolean): PackMapping;
  packOptimallyWithThreadLocalPtr(_0: boolean): PackMapping | null;
  packOptimallyByNew(_0: boolean): PackMapping | null;
  deleteFaces(_0: FaceBitSet, _1: UndirectedEdgeBitSet | null): void;
  getAABBTree(): AABBTree | null;
  getAABBTreeNotCreate(): AABBTree | null;
  getAABBTreePoints(): AABBTreePoints | null;
  getAABBTreePointsNotCreate(): AABBTreePoints | null;
  invalidateCaches(_0: boolean): void;
  updateCaches(_0: VertBitSet): void;
  heapBytes(): number;
  shrinkToFit(): void;
  edgeSegment(_0: EdgeId): LineSegm3f;
  triangleAspectRatio(_0: FaceId): number;
  circumcircleDiameterSq(_0: FaceId): number;
  circumcircleDiameter(_0: FaceId): number;
  toEdgePoint(_0: VertId): EdgePoint;
  getDipolesNotCreate(): Dipoles | null;
  addMesh(_0: Mesh, _1: FaceMap | null, _2: VertMap | null, _3: WholeEdgeMap | null, _4: boolean): void;
  packWithMap(_0: FaceMap | null, _1: VertMap | null, _2: WholeEdgeMap | null, _3: boolean): void;
  toTriPoint(_0: VertId): MeshTriPoint;
  getClosestVertexWithMeshTriPoint(_0: MeshTriPoint): VertId;
  getClosestEdgeWithMeshTriPoint(_0: MeshTriPoint): UndirectedEdgeId;
  addMeshWithPartMapping(_0: Mesh, _1: PartMapping, _2: boolean): void;
  addMeshPartWithPartMapping(_0: MeshPart, _1: PartMapping): void;
  cloneRegion(_0: FaceBitSet, _1: boolean, _2: PartMapping): Mesh;
  packWithPartMapping(_0: PartMapping, _1: boolean): void;
  mirror(_0: Plane3f): void;
  toTriPointWithPointOnFace(_0: PointOnFace): MeshTriPoint;
  getClosestVertex(_0: PointOnFace): VertId;
  getClosestEdge(_0: PointOnFace): UndirectedEdgeId;
  addMeshPart(_0: MeshPart, _1: boolean, _2: VectorEdgePath, _3: VectorEdgePath, _4: PartMapping): void;
  addSeparateEdgeLoop(_0: VectorVector3f): EdgeId;
  attachEdgeLoopPart(_0: EdgeId, _1: EdgeId, _2: VectorVector3f): void;
  addSeparateContours(_0: VectorVectorVector3f, _1: AffineXf3f | null): EdgeId;
  pack(_0: PackMapping, _1: ProgressCallback): ExpectedVoid;
  packOptimallyWithProgressCallback(_0: boolean, _1: ProgressCallback): PackMapping;
  orgPnt(_0: EdgeId): Vector3f;
  destPnt(_0: EdgeId): Vector3f;
  edgeVector(_0: EdgeId): Vector3f;
  edgePoint(_0: EdgeId, _1: number): Vector3f;
  edgePointWithMeshEdgePoint(_0: EdgePoint): Vector3f;
  edgeCenter(_0: UndirectedEdgeId): Vector3f;
  getLeftTriPoints(_0: EdgeId, _1: Vector3f, _2: Vector3f, _3: Vector3f): void;
  getTriPoints(_0: FaceId, _1: Vector3f, _2: Vector3f, _3: Vector3f): void;
  triPoint(_0: MeshTriPoint): Vector3f;
  triCenter(_0: FaceId): Vector3f;
  toTriPointWithFaceId(_0: FaceId, _1: Vector3f): MeshTriPoint;
  toEdgePointWithEdgeId(_0: EdgeId, _1: Vector3f): EdgePoint;
  normalWithFaceId(_0: FaceId): Vector3f;
  normalWithMeshTriPoint(_0: VertId): Vector3f;
  normal(_0: MeshTriPoint): Vector3f;
  addPoint(_0: Vector3f): VertId;
  projectPointWithPointOnFace(_0: Vector3f, _1: PointOnFace, _2: number, _3: FaceBitSet | null, _4: AffineXf3f | null): boolean;
  projectPointWithProjectionResult(_0: Vector3f, _1: MeshProjectionResult, _2: number, _3: FaceBitSet | null, _4: AffineXf3f | null): boolean;
  projectPoint(_0: Vector3f, _1: number, _2: FaceBitSet | null, _3: AffineXf3f | null): MeshProjectionResult;
  findClosestPointWithProjectionResult(_0: Vector3f, _1: MeshProjectionResult, _2: number, _3: FaceBitSet | null, _4: AffineXf3f | null): boolean;
  findClosestPoint(_0: Vector3f, _1: number, _2: FaceBitSet | null, _3: AffineXf3f | null): MeshProjectionResult;
  signedDistance(_0: Vector3f): number;
  getLeftTriPointsWithTriangle3f(_0: EdgeId): Array3Triangle3f;
  getTriPointsWithTriangle3f(_0: FaceId): Array3Triangle3f;
}

export interface BooleanResult extends ClassHandle {
  mesh: Mesh;
  meshABadContourFaces: FaceBitSet;
  meshBBadContourFaces: FaceBitSet;
  get errorString(): string;
  set errorString(value: EmbindString);
  valid(): boolean;
  getMesh(): Mesh;
}

export interface BooleanPreCutResult extends ClassHandle {
  mesh: Mesh;
  contours: OneMeshContours;
}

export interface BooleanParameters extends ClassHandle {
  rigidB2A: AffineXf3f | null;
  mapper: BooleanResultMapper | null;
  outPreCutA: BooleanPreCutResult | null;
  outPreCutB: BooleanPreCutResult | null;
  mergeAllNonIntersectingComponents: boolean;
  forceCut: boolean;
  outCutEdges: VectorEdgePath | null;
  cb: ProgressCallback;
}

export interface BooleanResultPoints extends ClassHandle {
  meshAVerts: VertBitSet;
  meshBVerts: VertBitSet;
  intersectionPoints: VectorVector3f;
}

export interface UniteCloseParams extends ClassHandle {
  closeDist: number;
  uniteOnlyBd: boolean;
  region: VertBitSet | null;
  duplicateNonManifold: boolean;
  optionalVertOldToNew: VertMap | null;
  optionalDuplications: VectorVertDuplication | null;
}

export interface Triangle extends ClassHandle {
  f: FaceId;
  v: Array3VertId;
  equals(_0: Triangle): boolean;
}

export interface BuildSettings extends ClassHandle {
  shiftFaceId: number;
  allowNonManifoldEdge: boolean;
  getRegion(): FaceBitSet | null;
  setRegion(_0: FaceBitSet): void;
  setRegionCopy(_0: FaceBitSet): void;
  setRegionWithPtr(_0: FaceBitSet | null): void;
  getSkippedFaceCount(): number;
  setSkippedFaceCount(_0: number): void;
}

export type VertSpan = {
  firstVertex: number,
  lastVertex: number
};

export interface EdgeTri extends ClassHandle {
  edge: EdgeId;
  tri: FaceId;
}

export interface FlaggedTri extends ClassHandle {
  getIsEdgeATriB(): boolean;
  setIsEdgeATriB(_0: boolean): void;
  getFace(): number;
  setFace(_0: number): void;
  equals(_0: FlaggedTri): boolean;
}

export interface VarEdgeTri extends ClassHandle {
  flaggedTri: FlaggedTri;
  edge: EdgeId;
  isEdgeATriB(): boolean;
  edgeTri(): EdgeTri;
  valid(): boolean;
  opbool(): boolean;
  equals(_0: VarEdgeTri): boolean;
  tri(): FaceId;
}

export interface FaceIncidenceValue<T extends number> {
  value: T;
}
export type FaceIncidence = FaceIncidenceValue<0>|FaceIncidenceValue<1>;

export interface ExpandToComponentsParams extends ClassHandle {
  coverRatio: number;
  incidence: FaceIncidence;
  isCompBd: UndirectedEdgeBitSet | null;
  cb: ProgressCallback;
  getOptOutNumComponents(): number;
  setOptOutNumComponents(_0: number): void;
}

export interface LargeByAreaComponentsSettings extends ClassHandle {
  maxLargeComponents: number;
  minArea: number;
  isCompBd: UndirectedEdgeBitSet | null;
  getNumSmallerComponents(): number;
  setNumSmallerComponents(_0: number): void;
}

export interface MakeDegenerateBandAroundRegionParams extends ClassHandle {
  outNewFaces: FaceBitSet | null;
  outExtrudedEdges: UndirectedEdgeBitSet | null;
  new2OldMap: VertHashMap | null;
  getMaxEdgeLength(): number;
  setMaxEdgeLength(_0: number): void;
}

export interface MultipleEdgesResolveModeValue<T extends number> {
  value: T;
}
export type MultipleEdgesResolveMode = MultipleEdgesResolveModeValue<0>|MultipleEdgesResolveModeValue<1>|MultipleEdgesResolveModeValue<2>;

export interface FillHoleParams extends ClassHandle {
  outNewFaces: FaceBitSet | null;
  multipleEdgesResolveMode: MultipleEdgesResolveMode;
  makeDegenerateBand: boolean;
  maxPolygonSubdivisions: number;
  metric: FillHoleMetric;
  getStopBeforeBadTriangulation(): boolean;
  setStopBeforeBadTriangulation(_0: boolean): void;
}

export interface StitchHolesParams extends ClassHandle {
  outNewFaces: FaceBitSet | null;
  metric: FillHoleMetric;
}

export type FillHoleItem = {
  edgeCode1: number,
  edgeCode2: number
};

export interface MakeBridgeResult extends ClassHandle {
  newFaces: number;
  na: EdgeId;
  nb: EdgeId;
  opbool(): boolean;
}

export interface FixMeshDegeneraciesParams extends ClassHandle {
  maxDeviation: number;
  tinyEdgeLength: number;
  criticalTriAspectRatio: number;
  maxAngleChange: number;
  stabilizer: number;
  region: FaceBitSet | null;
  mode: FixMeshDegeneraciesMode;
  cb: ProgressCallback;
}

export interface FixMeshDegeneraciesModeValue<T extends number> {
  value: T;
}
export type FixMeshDegeneraciesMode = FixMeshDegeneraciesModeValue<0>|FixMeshDegeneraciesModeValue<1>|FixMeshDegeneraciesModeValue<2>;

export interface FixCreasesParams extends ClassHandle {
  creaseAngle: number;
  criticalTriAspectRatio: number;
  maxIters: number;
}

export interface FindDisorientationParams extends ClassHandle {
  virtualFillHoles: boolean;
  mode: RayMode;
  cb: ProgressCallback;
}

export interface RayModeValue<T extends number> {
  value: T;
}
export type RayMode = RayModeValue<0>|RayModeValue<1>|RayModeValue<2>;

export interface FilterTypeValue<T extends number> {
  value: T;
}
export type FilterType = FilterTypeValue<0>|FilterTypeValue<1>;

export interface WrapTypeValue<T extends number> {
  value: T;
}
export type WrapType = WrapTypeValue<0>|WrapTypeValue<1>|WrapTypeValue<2>;

export interface ReorderValue<T extends number> {
  value: T;
}
export type Reorder = ReorderValue<0>|ReorderValue<1>|ReorderValue<2>;

export type NoInit = {

};

export interface EdgeId extends ClassHandle {
  opint(): number;
  valid(): boolean;
  opbool(): boolean;
  get(): number;
  sym(): EdgeId;
  even(): boolean;
  odd(): boolean;
  equals(_0: EdgeId): boolean;
  notEquals(_0: EdgeId): boolean;
  lessThan(_0: EdgeId): boolean;
  increment(): EdgeId;
  decrement(): EdgeId;
  incrementByInt(_0: number): EdgeId;
  decrementByInt(_0: number): EdgeId;
  addAssign(_0: number): EdgeId;
  subAssign(_0: number): EdgeId;
  undirected(): UndirectedEdgeId;
  toUndirected(): UndirectedEdgeId;
}

export interface VoxelId extends ClassHandle {
  opint(): number;
  valid(): boolean;
  opbool(): boolean;
  get(): number;
  equals(_0: VoxelId): boolean;
  notEquals(_0: VoxelId): boolean;
  lessThan(_0: VoxelId): boolean;
  increment(): VoxelId;
  decrement(): VoxelId;
  incrementByInt(_0: number): VoxelId;
  decrementByInt(_0: number): VoxelId;
  addAssign(_0: number): VoxelId;
  subAssign(_0: number): VoxelId;
}

export interface ICPElementId extends ClassHandle {
  opint(): number;
  valid(): boolean;
  opbool(): boolean;
  get(): number;
  equals(_0: ICPElementId): boolean;
  notEquals(_0: ICPElementId): boolean;
  lessThan(_0: ICPElementId): boolean;
  increment(): ICPElementId;
  decrement(): ICPElementId;
  incrementByInt(_0: number): ICPElementId;
  decrementByInt(_0: number): ICPElementId;
  addAssign(_0: number): ICPElementId;
  subAssign(_0: number): ICPElementId;
}

export interface UndirectedEdgeId extends ClassHandle {
  opint(): number;
  valid(): boolean;
  opbool(): boolean;
  get(): number;
  equals(_0: UndirectedEdgeId): boolean;
  notEquals(_0: UndirectedEdgeId): boolean;
  lessThan(_0: UndirectedEdgeId): boolean;
  increment(): UndirectedEdgeId;
  decrement(): UndirectedEdgeId;
  incrementByInt(_0: number): UndirectedEdgeId;
  decrementByInt(_0: number): UndirectedEdgeId;
  addAssign(_0: number): UndirectedEdgeId;
  subAssign(_0: number): UndirectedEdgeId;
}

export interface FaceId extends ClassHandle {
  opint(): number;
  valid(): boolean;
  opbool(): boolean;
  get(): number;
  equals(_0: FaceId): boolean;
  notEquals(_0: FaceId): boolean;
  lessThan(_0: FaceId): boolean;
  increment(): FaceId;
  decrement(): FaceId;
  incrementByInt(_0: number): FaceId;
  decrementByInt(_0: number): FaceId;
  addAssign(_0: number): FaceId;
  subAssign(_0: number): FaceId;
}

export interface VertId extends ClassHandle {
  opint(): number;
  valid(): boolean;
  opbool(): boolean;
  get(): number;
  equals(_0: VertId): boolean;
  notEquals(_0: VertId): boolean;
  lessThan(_0: VertId): boolean;
  increment(): VertId;
  decrement(): VertId;
  incrementByInt(_0: number): VertId;
  decrementByInt(_0: number): VertId;
  addAssign(_0: number): VertId;
  subAssign(_0: number): VertId;
}

export type VertDuplication = {
  srcVert: VertId,
  dupVert: VertId
};

export interface PixelId extends ClassHandle {
  opint(): number;
  valid(): boolean;
  opbool(): boolean;
  get(): number;
  equals(_0: PixelId): boolean;
  notEquals(_0: PixelId): boolean;
  lessThan(_0: PixelId): boolean;
  increment(): PixelId;
  decrement(): PixelId;
  incrementByInt(_0: number): PixelId;
  decrementByInt(_0: number): PixelId;
  addAssign(_0: number): PixelId;
  subAssign(_0: number): PixelId;
}

export interface RegionId extends ClassHandle {
  opint(): number;
  valid(): boolean;
  opbool(): boolean;
  get(): number;
  equals(_0: RegionId): boolean;
  notEquals(_0: RegionId): boolean;
  lessThan(_0: RegionId): boolean;
  increment(): RegionId;
  decrement(): RegionId;
  incrementByInt(_0: number): RegionId;
  decrementByInt(_0: number): RegionId;
  addAssign(_0: number): RegionId;
  subAssign(_0: number): RegionId;
}

export interface NodeId extends ClassHandle {
  opint(): number;
  valid(): boolean;
  opbool(): boolean;
  get(): number;
  equals(_0: NodeId): boolean;
  notEquals(_0: NodeId): boolean;
  lessThan(_0: NodeId): boolean;
  increment(): NodeId;
  decrement(): NodeId;
  incrementByInt(_0: number): NodeId;
  decrementByInt(_0: number): NodeId;
  addAssign(_0: number): NodeId;
  subAssign(_0: number): NodeId;
}

export interface ObjId extends ClassHandle {
  opint(): number;
  valid(): boolean;
  opbool(): boolean;
  get(): number;
  equals(_0: ObjId): boolean;
  notEquals(_0: ObjId): boolean;
  lessThan(_0: ObjId): boolean;
  increment(): ObjId;
  decrement(): ObjId;
  incrementByInt(_0: number): ObjId;
  decrementByInt(_0: number): ObjId;
  addAssign(_0: number): ObjId;
  subAssign(_0: number): ObjId;
}

export interface TextureId extends ClassHandle {
  opint(): number;
  valid(): boolean;
  opbool(): boolean;
  get(): number;
  equals(_0: TextureId): boolean;
  notEquals(_0: TextureId): boolean;
  lessThan(_0: TextureId): boolean;
  increment(): TextureId;
  decrement(): TextureId;
  incrementByInt(_0: number): TextureId;
  decrementByInt(_0: number): TextureId;
  addAssign(_0: number): TextureId;
  subAssign(_0: number): TextureId;
}

export interface GraphVertId extends ClassHandle {
  opint(): number;
  valid(): boolean;
  opbool(): boolean;
  get(): number;
  equals(_0: GraphVertId): boolean;
  notEquals(_0: GraphVertId): boolean;
  lessThan(_0: GraphVertId): boolean;
  increment(): GraphVertId;
  decrement(): GraphVertId;
  incrementByInt(_0: number): GraphVertId;
  decrementByInt(_0: number): GraphVertId;
  addAssign(_0: number): GraphVertId;
  subAssign(_0: number): GraphVertId;
}

export interface GraphEdgeId extends ClassHandle {
  opint(): number;
  valid(): boolean;
  opbool(): boolean;
  get(): number;
  equals(_0: GraphEdgeId): boolean;
  notEquals(_0: GraphEdgeId): boolean;
  lessThan(_0: GraphEdgeId): boolean;
  increment(): GraphEdgeId;
  decrement(): GraphEdgeId;
  incrementByInt(_0: number): GraphEdgeId;
  decrementByInt(_0: number): GraphEdgeId;
  addAssign(_0: number): GraphEdgeId;
  subAssign(_0: number): GraphEdgeId;
}

export interface FaceBMap extends ClassHandle {
  tsize: number;
  getB(): FaceBMapBuffer | null;
  setB(_0: FaceBMapBuffer): void;
  setBWithPtr(_0: FaceBMapBuffer | null): void;
}

export interface VertBMap extends ClassHandle {
  tsize: number;
  getB(): VertBMapBuffer | null;
  setB(_0: VertBMapBuffer): void;
  setBWithPtr(_0: VertBMapBuffer | null): void;
}

export interface EdgeBMap extends ClassHandle {
  tsize: number;
  getB(): EdgeBMapBuffer | null;
  setB(_0: EdgeBMapBuffer): void;
  setBWithPtr(_0: EdgeBMapBuffer | null): void;
}

export interface UndirectedEdgeBMap extends ClassHandle {
  tsize: number;
  getB(): UndirectedEdgeBMapBuffer | null;
  setB(_0: UndirectedEdgeBMapBuffer): void;
  setBWithPtr(_0: UndirectedEdgeBMapBuffer | null): void;
}

export interface WholeEdgeBMap extends ClassHandle {
  tsize: number;
  getB(): WholeEdgeBMapBuffer | null;
  setB(_0: WholeEdgeBMapBuffer): void;
  setBWithPtr(_0: WholeEdgeBMapBuffer | null): void;
}

export interface VertIdSizeTBMap extends ClassHandle {
  tsize: number;
  getB(): VertIdSizeTBMapBuffer | null;
  setB(_0: VertIdSizeTBMapBuffer): void;
  setBWithPtr(_0: VertIdSizeTBMapBuffer | null): void;
}

export interface UndirectedEdgeIdSizeTBMap extends ClassHandle {
  tsize: number;
  getB(): UndirectedEdgeIdSizeTBMapBuffer | null;
  setB(_0: UndirectedEdgeIdSizeTBMapBuffer): void;
  setBWithPtr(_0: UndirectedEdgeIdSizeTBMapBuffer | null): void;
}

export interface FaceIdSizeTBMap extends ClassHandle {
  tsize: number;
  getB(): FaceIdEdgeIdSizeTBMapBuffer | null;
  setB(_0: FaceIdEdgeIdSizeTBMapBuffer): void;
  setBWithPtr(_0: FaceIdEdgeIdSizeTBMapBuffer | null): void;
}

export interface Triangulation extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  popBack(): void;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  swap(_0: Triangulation): void;
  heapBytes(): number;
  equals(_0: Triangulation): boolean;
  notEquals(_0: Triangulation): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  resizeWithValue(_0: number, _1: Array3VertId): void;
  resizeWithReserveAndValue(_0: number, _1: Array3VertId): void;
  get(_0: FaceId): Array3VertId;
  set(_0: FaceId): Array3VertId;
  getByIndex(_0: FaceId): Array3VertId;
  getByIndexMutable(_0: FaceId): Array3VertId;
  getAt(_0: FaceId): Array3VertId;
  setAt(_0: FaceId, _1: Array3VertId): boolean;
  frontConst(): Array3VertId;
  front(): Array3VertId;
  backConst(): Array3VertId;
  back(): Array3VertId;
  pushBack(_0: Array3VertId): void;
  emplaceBack(_0: Array3VertId): Array3VertId;
  autoResizeSetWithRange(_0: FaceId, _1: number, _2: Array3VertId): void;
  autoResizeSet(_0: FaceId, _1: Array3VertId): void;
  autoResizeAt(_0: FaceId): Array3VertId;
}

export interface Dipoles extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: Dipole): void;
  resizeWithReserveAndValue(_0: number, _1: Dipole): void;
  get(_0: NodeId): Dipole;
  set(_0: NodeId): Dipole;
  getByIndex(_0: NodeId): Dipole;
  getByIndexMutable(_0: NodeId): Dipole;
  getAt(_0: NodeId): Dipole;
  setAt(_0: NodeId, _1: Dipole): boolean;
  frontConst(): Dipole;
  front(): Dipole;
  backConst(): Dipole;
  back(): Dipole;
  pushBack(_0: Dipole): void;
  popBack(): void;
  emplaceBack(_0: Dipole): Dipole;
  beginId(): NodeId;
  backId(): NodeId;
  endId(): NodeId;
  autoResizeSetWithRange(_0: NodeId, _1: number, _2: Dipole): void;
  autoResizeSet(_0: NodeId, _1: Dipole): void;
  swap(_0: Dipoles): void;
  heapBytes(): number;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: NodeId): Dipole;
}

export interface EdgeMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: EdgeId): void;
  resizeWithReserveAndValue(_0: number, _1: EdgeId): void;
  get(_0: EdgeId): EdgeId;
  set(_0: EdgeId): EdgeId;
  getByIndex(_0: EdgeId): EdgeId;
  getByIndexMutable(_0: EdgeId): EdgeId;
  getAt(_0: EdgeId): EdgeId;
  setAt(_0: EdgeId, _1: EdgeId): boolean;
  frontConst(): EdgeId;
  front(): EdgeId;
  backConst(): EdgeId;
  back(): EdgeId;
  pushBack(_0: EdgeId): void;
  popBack(): void;
  emplaceBack(_0: EdgeId): EdgeId;
  beginId(): EdgeId;
  backId(): EdgeId;
  endId(): EdgeId;
  autoResizeSetWithRange(_0: EdgeId, _1: number, _2: EdgeId): void;
  autoResizeSet(_0: EdgeId, _1: EdgeId): void;
  swap(_0: EdgeMap): void;
  heapBytes(): number;
  equals(_0: EdgeMap): boolean;
  notEquals(_0: EdgeMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: EdgeId): EdgeId;
}

export interface UndirectedEdgeMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: UndirectedEdgeId): void;
  resizeWithReserveAndValue(_0: number, _1: UndirectedEdgeId): void;
  get(_0: UndirectedEdgeId): UndirectedEdgeId;
  set(_0: UndirectedEdgeId): UndirectedEdgeId;
  getByIndex(_0: UndirectedEdgeId): UndirectedEdgeId;
  getByIndexMutable(_0: UndirectedEdgeId): UndirectedEdgeId;
  getAt(_0: UndirectedEdgeId): UndirectedEdgeId;
  setAt(_0: UndirectedEdgeId, _1: UndirectedEdgeId): boolean;
  frontConst(): UndirectedEdgeId;
  front(): UndirectedEdgeId;
  backConst(): UndirectedEdgeId;
  back(): UndirectedEdgeId;
  pushBack(_0: UndirectedEdgeId): void;
  popBack(): void;
  emplaceBack(_0: UndirectedEdgeId): UndirectedEdgeId;
  beginId(): UndirectedEdgeId;
  backId(): UndirectedEdgeId;
  endId(): UndirectedEdgeId;
  autoResizeSetWithRange(_0: UndirectedEdgeId, _1: number, _2: UndirectedEdgeId): void;
  autoResizeSet(_0: UndirectedEdgeId, _1: UndirectedEdgeId): void;
  swap(_0: UndirectedEdgeMap): void;
  heapBytes(): number;
  equals(_0: UndirectedEdgeMap): boolean;
  notEquals(_0: UndirectedEdgeMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: UndirectedEdgeId): UndirectedEdgeId;
}

export interface FaceMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: FaceId): void;
  resizeWithReserveAndValue(_0: number, _1: FaceId): void;
  get(_0: FaceId): FaceId;
  set(_0: FaceId): FaceId;
  getByIndex(_0: FaceId): FaceId;
  getByIndexMutable(_0: FaceId): FaceId;
  getAt(_0: FaceId): FaceId;
  setAt(_0: FaceId, _1: FaceId): boolean;
  frontConst(): FaceId;
  front(): FaceId;
  backConst(): FaceId;
  back(): FaceId;
  pushBack(_0: FaceId): void;
  popBack(): void;
  emplaceBack(_0: FaceId): FaceId;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  autoResizeSetWithRange(_0: FaceId, _1: number, _2: FaceId): void;
  autoResizeSet(_0: FaceId, _1: FaceId): void;
  swap(_0: FaceMap): void;
  heapBytes(): number;
  equals(_0: FaceMap): boolean;
  notEquals(_0: FaceMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: FaceId): FaceId;
}

export interface VertMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: VertId): void;
  resizeWithReserveAndValue(_0: number, _1: VertId): void;
  get(_0: VertId): VertId;
  set(_0: VertId): VertId;
  getByIndex(_0: VertId): VertId;
  getByIndexMutable(_0: VertId): VertId;
  getAt(_0: VertId): VertId;
  setAt(_0: VertId, _1: VertId): boolean;
  frontConst(): VertId;
  front(): VertId;
  backConst(): VertId;
  back(): VertId;
  pushBack(_0: VertId): void;
  popBack(): void;
  emplaceBack(_0: VertId): VertId;
  beginId(): VertId;
  backId(): VertId;
  endId(): VertId;
  autoResizeSetWithRange(_0: VertId, _1: number, _2: VertId): void;
  autoResizeSet(_0: VertId, _1: VertId): void;
  swap(_0: VertMap): void;
  heapBytes(): number;
  equals(_0: VertMap): boolean;
  notEquals(_0: VertMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: VertId): VertId;
}

export interface ObjMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: ObjId): void;
  resizeWithReserveAndValue(_0: number, _1: ObjId): void;
  get(_0: ObjId): ObjId;
  set(_0: ObjId): ObjId;
  getByIndex(_0: ObjId): ObjId;
  getByIndexMutable(_0: ObjId): ObjId;
  getAt(_0: ObjId): ObjId;
  setAt(_0: ObjId, _1: ObjId): boolean;
  frontConst(): ObjId;
  front(): ObjId;
  backConst(): ObjId;
  back(): ObjId;
  pushBack(_0: ObjId): void;
  popBack(): void;
  emplaceBack(_0: ObjId): ObjId;
  beginId(): ObjId;
  backId(): ObjId;
  endId(): ObjId;
  autoResizeSetWithRange(_0: ObjId, _1: number, _2: ObjId): void;
  autoResizeSet(_0: ObjId, _1: ObjId): void;
  swap(_0: ObjMap): void;
  heapBytes(): number;
  equals(_0: ObjMap): boolean;
  notEquals(_0: ObjMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: ObjId): ObjId;
}

export interface PixelIdPixelIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: PixelId): void;
  resizeWithReserveAndValue(_0: number, _1: PixelId): void;
  get(_0: PixelId): PixelId;
  set(_0: PixelId): PixelId;
  getByIndex(_0: PixelId): PixelId;
  getByIndexMutable(_0: PixelId): PixelId;
  getAt(_0: PixelId): PixelId;
  setAt(_0: PixelId, _1: PixelId): boolean;
  frontConst(): PixelId;
  front(): PixelId;
  backConst(): PixelId;
  back(): PixelId;
  pushBack(_0: PixelId): void;
  popBack(): void;
  emplaceBack(_0: PixelId): PixelId;
  beginId(): PixelId;
  backId(): PixelId;
  endId(): PixelId;
  autoResizeSetWithRange(_0: PixelId, _1: number, _2: PixelId): void;
  autoResizeSet(_0: PixelId, _1: PixelId): void;
  swap(_0: PixelIdPixelIdMap): void;
  heapBytes(): number;
  equals(_0: PixelIdPixelIdMap): boolean;
  notEquals(_0: PixelIdPixelIdMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: PixelId): PixelId;
}

export interface VoxelIdVoxelIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: VoxelId): void;
  resizeWithReserveAndValue(_0: number, _1: VoxelId): void;
  get(_0: VoxelId): VoxelId;
  set(_0: VoxelId): VoxelId;
  getByIndex(_0: VoxelId): VoxelId;
  getByIndexMutable(_0: VoxelId): VoxelId;
  getAt(_0: VoxelId): VoxelId;
  setAt(_0: VoxelId, _1: VoxelId): boolean;
  frontConst(): VoxelId;
  front(): VoxelId;
  backConst(): VoxelId;
  back(): VoxelId;
  pushBack(_0: VoxelId): void;
  popBack(): void;
  emplaceBack(_0: VoxelId): VoxelId;
  beginId(): VoxelId;
  backId(): VoxelId;
  endId(): VoxelId;
  autoResizeSetWithRange(_0: VoxelId, _1: number, _2: VoxelId): void;
  autoResizeSet(_0: VoxelId, _1: VoxelId): void;
  swap(_0: VoxelIdVoxelIdMap): void;
  heapBytes(): number;
  equals(_0: VoxelIdVoxelIdMap): boolean;
  notEquals(_0: VoxelIdVoxelIdMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: VoxelId): VoxelId;
}

export interface RegionIdRegionIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: RegionId): void;
  resizeWithReserveAndValue(_0: number, _1: RegionId): void;
  get(_0: RegionId): RegionId;
  set(_0: RegionId): RegionId;
  getByIndex(_0: RegionId): RegionId;
  getByIndexMutable(_0: RegionId): RegionId;
  getAt(_0: RegionId): RegionId;
  setAt(_0: RegionId, _1: RegionId): boolean;
  frontConst(): RegionId;
  front(): RegionId;
  backConst(): RegionId;
  back(): RegionId;
  pushBack(_0: RegionId): void;
  popBack(): void;
  emplaceBack(_0: RegionId): RegionId;
  beginId(): RegionId;
  backId(): RegionId;
  endId(): RegionId;
  autoResizeSetWithRange(_0: RegionId, _1: number, _2: RegionId): void;
  autoResizeSet(_0: RegionId, _1: RegionId): void;
  swap(_0: RegionIdRegionIdMap): void;
  heapBytes(): number;
  equals(_0: RegionIdRegionIdMap): boolean;
  notEquals(_0: RegionIdRegionIdMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: RegionId): RegionId;
}

export interface NodeIdNodeIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: NodeId): void;
  resizeWithReserveAndValue(_0: number, _1: NodeId): void;
  get(_0: NodeId): NodeId;
  set(_0: NodeId): NodeId;
  getByIndex(_0: NodeId): NodeId;
  getByIndexMutable(_0: NodeId): NodeId;
  getAt(_0: NodeId): NodeId;
  setAt(_0: NodeId, _1: NodeId): boolean;
  frontConst(): NodeId;
  front(): NodeId;
  backConst(): NodeId;
  back(): NodeId;
  pushBack(_0: NodeId): void;
  popBack(): void;
  emplaceBack(_0: NodeId): NodeId;
  beginId(): NodeId;
  backId(): NodeId;
  endId(): NodeId;
  autoResizeSetWithRange(_0: NodeId, _1: number, _2: NodeId): void;
  autoResizeSet(_0: NodeId, _1: NodeId): void;
  swap(_0: NodeIdNodeIdMap): void;
  heapBytes(): number;
  equals(_0: NodeIdNodeIdMap): boolean;
  notEquals(_0: NodeIdNodeIdMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: NodeId): NodeId;
}

export interface TextureIdTextureIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: TextureId): void;
  resizeWithReserveAndValue(_0: number, _1: TextureId): void;
  get(_0: TextureId): TextureId;
  set(_0: TextureId): TextureId;
  getByIndex(_0: TextureId): TextureId;
  getByIndexMutable(_0: TextureId): TextureId;
  getAt(_0: TextureId): TextureId;
  setAt(_0: TextureId, _1: TextureId): boolean;
  frontConst(): TextureId;
  front(): TextureId;
  backConst(): TextureId;
  back(): TextureId;
  pushBack(_0: TextureId): void;
  popBack(): void;
  emplaceBack(_0: TextureId): TextureId;
  beginId(): TextureId;
  backId(): TextureId;
  endId(): TextureId;
  autoResizeSetWithRange(_0: TextureId, _1: number, _2: TextureId): void;
  autoResizeSet(_0: TextureId, _1: TextureId): void;
  swap(_0: TextureIdTextureIdMap): void;
  heapBytes(): number;
  equals(_0: TextureIdTextureIdMap): boolean;
  notEquals(_0: TextureIdTextureIdMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: TextureId): TextureId;
}

export interface GraphVertIdGraphVertIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: GraphVertId): void;
  resizeWithReserveAndValue(_0: number, _1: GraphVertId): void;
  get(_0: GraphVertId): GraphVertId;
  set(_0: GraphVertId): GraphVertId;
  getByIndex(_0: GraphVertId): GraphVertId;
  getByIndexMutable(_0: GraphVertId): GraphVertId;
  getAt(_0: GraphVertId): GraphVertId;
  setAt(_0: GraphVertId, _1: GraphVertId): boolean;
  frontConst(): GraphVertId;
  front(): GraphVertId;
  backConst(): GraphVertId;
  back(): GraphVertId;
  pushBack(_0: GraphVertId): void;
  popBack(): void;
  emplaceBack(_0: GraphVertId): GraphVertId;
  beginId(): GraphVertId;
  backId(): GraphVertId;
  endId(): GraphVertId;
  autoResizeSetWithRange(_0: GraphVertId, _1: number, _2: GraphVertId): void;
  autoResizeSet(_0: GraphVertId, _1: GraphVertId): void;
  swap(_0: GraphVertIdGraphVertIdMap): void;
  heapBytes(): number;
  equals(_0: GraphVertIdGraphVertIdMap): boolean;
  notEquals(_0: GraphVertIdGraphVertIdMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: GraphVertId): GraphVertId;
}

export interface GraphEdgeIdGraphEdgeIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: GraphEdgeId): void;
  resizeWithReserveAndValue(_0: number, _1: GraphEdgeId): void;
  get(_0: GraphEdgeId): GraphEdgeId;
  set(_0: GraphEdgeId): GraphEdgeId;
  getByIndex(_0: GraphEdgeId): GraphEdgeId;
  getByIndexMutable(_0: GraphEdgeId): GraphEdgeId;
  getAt(_0: GraphEdgeId): GraphEdgeId;
  setAt(_0: GraphEdgeId, _1: GraphEdgeId): boolean;
  frontConst(): GraphEdgeId;
  front(): GraphEdgeId;
  backConst(): GraphEdgeId;
  back(): GraphEdgeId;
  pushBack(_0: GraphEdgeId): void;
  popBack(): void;
  emplaceBack(_0: GraphEdgeId): GraphEdgeId;
  beginId(): GraphEdgeId;
  backId(): GraphEdgeId;
  endId(): GraphEdgeId;
  autoResizeSetWithRange(_0: GraphEdgeId, _1: number, _2: GraphEdgeId): void;
  autoResizeSet(_0: GraphEdgeId, _1: GraphEdgeId): void;
  swap(_0: GraphEdgeIdGraphEdgeIdMap): void;
  heapBytes(): number;
  equals(_0: GraphEdgeIdGraphEdgeIdMap): boolean;
  notEquals(_0: GraphEdgeIdGraphEdgeIdMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: GraphEdgeId): GraphEdgeId;
}

export interface VertIdEdgeIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: VertId): void;
  resizeWithReserveAndValue(_0: number, _1: VertId): void;
  get(_0: EdgeId): VertId;
  set(_0: EdgeId): VertId;
  getByIndex(_0: EdgeId): VertId;
  getByIndexMutable(_0: EdgeId): VertId;
  getAt(_0: EdgeId): VertId;
  setAt(_0: EdgeId, _1: VertId): boolean;
  frontConst(): VertId;
  front(): VertId;
  backConst(): VertId;
  back(): VertId;
  pushBack(_0: VertId): void;
  popBack(): void;
  emplaceBack(_0: VertId): VertId;
  beginId(): EdgeId;
  backId(): EdgeId;
  endId(): EdgeId;
  autoResizeSetWithRange(_0: EdgeId, _1: number, _2: VertId): void;
  autoResizeSet(_0: EdgeId, _1: VertId): void;
  swap(_0: VertIdEdgeIdMap): void;
  heapBytes(): number;
  equals(_0: VertIdEdgeIdMap): boolean;
  notEquals(_0: VertIdEdgeIdMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: EdgeId): VertId;
}

export interface EdgeIdVertIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: EdgeId): void;
  resizeWithReserveAndValue(_0: number, _1: EdgeId): void;
  get(_0: VertId): EdgeId;
  set(_0: VertId): EdgeId;
  getByIndex(_0: VertId): EdgeId;
  getByIndexMutable(_0: VertId): EdgeId;
  getAt(_0: VertId): EdgeId;
  setAt(_0: VertId, _1: EdgeId): boolean;
  frontConst(): EdgeId;
  front(): EdgeId;
  backConst(): EdgeId;
  back(): EdgeId;
  pushBack(_0: EdgeId): void;
  popBack(): void;
  emplaceBack(_0: EdgeId): EdgeId;
  beginId(): VertId;
  backId(): VertId;
  endId(): VertId;
  autoResizeSetWithRange(_0: VertId, _1: number, _2: EdgeId): void;
  autoResizeSet(_0: VertId, _1: EdgeId): void;
  swap(_0: EdgeIdVertIdMap): void;
  heapBytes(): number;
  equals(_0: EdgeIdVertIdMap): boolean;
  notEquals(_0: EdgeIdVertIdMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: VertId): EdgeId;
}

export interface EdgeIdFaceIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: EdgeId): void;
  resizeWithReserveAndValue(_0: number, _1: EdgeId): void;
  get(_0: FaceId): EdgeId;
  set(_0: FaceId): EdgeId;
  getByIndex(_0: FaceId): EdgeId;
  getByIndexMutable(_0: FaceId): EdgeId;
  getAt(_0: FaceId): EdgeId;
  setAt(_0: FaceId, _1: EdgeId): boolean;
  frontConst(): EdgeId;
  front(): EdgeId;
  backConst(): EdgeId;
  back(): EdgeId;
  pushBack(_0: EdgeId): void;
  popBack(): void;
  emplaceBack(_0: EdgeId): EdgeId;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  autoResizeSetWithRange(_0: FaceId, _1: number, _2: EdgeId): void;
  autoResizeSet(_0: FaceId, _1: EdgeId): void;
  swap(_0: EdgeIdFaceIdMap): void;
  heapBytes(): number;
  equals(_0: EdgeIdFaceIdMap): boolean;
  notEquals(_0: EdgeIdFaceIdMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: FaceId): EdgeId;
}

export interface FaceIdEdgeIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: FaceId): void;
  resizeWithReserveAndValue(_0: number, _1: FaceId): void;
  get(_0: EdgeId): FaceId;
  set(_0: EdgeId): FaceId;
  getByIndex(_0: EdgeId): FaceId;
  getByIndexMutable(_0: EdgeId): FaceId;
  getAt(_0: EdgeId): FaceId;
  setAt(_0: EdgeId, _1: FaceId): boolean;
  frontConst(): FaceId;
  front(): FaceId;
  backConst(): FaceId;
  back(): FaceId;
  pushBack(_0: FaceId): void;
  popBack(): void;
  emplaceBack(_0: FaceId): FaceId;
  beginId(): EdgeId;
  backId(): EdgeId;
  endId(): EdgeId;
  autoResizeSetWithRange(_0: EdgeId, _1: number, _2: FaceId): void;
  autoResizeSet(_0: EdgeId, _1: FaceId): void;
  swap(_0: FaceIdEdgeIdMap): void;
  heapBytes(): number;
  equals(_0: FaceIdEdgeIdMap): boolean;
  notEquals(_0: FaceIdEdgeIdMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: EdgeId): FaceId;
}

export interface VoxelIdFaceIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: VoxelId): void;
  resizeWithReserveAndValue(_0: number, _1: VoxelId): void;
  get(_0: FaceId): VoxelId;
  set(_0: FaceId): VoxelId;
  getByIndex(_0: FaceId): VoxelId;
  getByIndexMutable(_0: FaceId): VoxelId;
  getAt(_0: FaceId): VoxelId;
  setAt(_0: FaceId, _1: VoxelId): boolean;
  frontConst(): VoxelId;
  front(): VoxelId;
  backConst(): VoxelId;
  back(): VoxelId;
  pushBack(_0: VoxelId): void;
  popBack(): void;
  emplaceBack(_0: VoxelId): VoxelId;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  autoResizeSetWithRange(_0: FaceId, _1: number, _2: VoxelId): void;
  autoResizeSet(_0: FaceId, _1: VoxelId): void;
  swap(_0: VoxelIdFaceIdMap): void;
  heapBytes(): number;
  equals(_0: VoxelIdFaceIdMap): boolean;
  notEquals(_0: VoxelIdFaceIdMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: FaceId): VoxelId;
}

export interface ModelPointsDataObjIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: ModelPointsData): void;
  resizeWithReserveAndValue(_0: number, _1: ModelPointsData): void;
  get(_0: ObjId): ModelPointsData;
  set(_0: ObjId): ModelPointsData;
  getByIndex(_0: ObjId): ModelPointsData;
  getByIndexMutable(_0: ObjId): ModelPointsData;
  getAt(_0: ObjId): ModelPointsData;
  setAt(_0: ObjId, _1: ModelPointsData): boolean;
  frontConst(): ModelPointsData;
  front(): ModelPointsData;
  backConst(): ModelPointsData;
  back(): ModelPointsData;
  pushBack(_0: ModelPointsData): void;
  popBack(): void;
  emplaceBack(_0: ModelPointsData): ModelPointsData;
  beginId(): ObjId;
  backId(): ObjId;
  endId(): ObjId;
  autoResizeSetWithRange(_0: ObjId, _1: number, _2: ModelPointsData): void;
  autoResizeSet(_0: ObjId, _1: ModelPointsData): void;
  swap(_0: ModelPointsDataObjIdMap): void;
  heapBytes(): number;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: ObjId): ModelPointsData;
}

export interface VertSpanFaceIdMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: VertSpan): void;
  resizeWithReserveAndValue(_0: number, _1: VertSpan): void;
  get(_0: FaceId): VertSpan;
  set(_0: FaceId): VertSpan;
  getByIndex(_0: FaceId): VertSpan;
  getByIndexMutable(_0: FaceId): VertSpan;
  getAt(_0: FaceId): VertSpan;
  setAt(_0: FaceId, _1: VertSpan): boolean;
  frontConst(): VertSpan;
  front(): VertSpan;
  backConst(): VertSpan;
  back(): VertSpan;
  pushBack(_0: VertSpan): void;
  popBack(): void;
  emplaceBack(_0: VertSpan): VertSpan;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  autoResizeSetWithRange(_0: FaceId, _1: number, _2: VertSpan): void;
  autoResizeSet(_0: FaceId, _1: VertSpan): void;
  swap(_0: VertSpanFaceIdMap): void;
  heapBytes(): number;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: FaceId): VertSpan;
}

export interface WholeEdgeMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: EdgeId): void;
  resizeWithReserveAndValue(_0: number, _1: EdgeId): void;
  get(_0: UndirectedEdgeId): EdgeId;
  set(_0: UndirectedEdgeId): EdgeId;
  getByIndex(_0: UndirectedEdgeId): EdgeId;
  getByIndexMutable(_0: UndirectedEdgeId): EdgeId;
  getAt(_0: UndirectedEdgeId): EdgeId;
  setAt(_0: UndirectedEdgeId, _1: EdgeId): boolean;
  frontConst(): EdgeId;
  front(): EdgeId;
  backConst(): EdgeId;
  back(): EdgeId;
  pushBack(_0: EdgeId): void;
  popBack(): void;
  emplaceBack(_0: EdgeId): EdgeId;
  beginId(): UndirectedEdgeId;
  backId(): UndirectedEdgeId;
  endId(): UndirectedEdgeId;
  autoResizeSetWithRange(_0: UndirectedEdgeId, _1: number, _2: EdgeId): void;
  autoResizeSet(_0: UndirectedEdgeId, _1: EdgeId): void;
  swap(_0: WholeEdgeMap): void;
  heapBytes(): number;
  equals(_0: WholeEdgeMap): boolean;
  notEquals(_0: WholeEdgeMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: UndirectedEdgeId): EdgeId;
}

export interface UndirectedEdge2RegionMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: RegionId): void;
  resizeWithReserveAndValue(_0: number, _1: RegionId): void;
  get(_0: UndirectedEdgeId): RegionId;
  set(_0: UndirectedEdgeId): RegionId;
  getByIndex(_0: UndirectedEdgeId): RegionId;
  getByIndexMutable(_0: UndirectedEdgeId): RegionId;
  getAt(_0: UndirectedEdgeId): RegionId;
  setAt(_0: UndirectedEdgeId, _1: RegionId): boolean;
  frontConst(): RegionId;
  front(): RegionId;
  backConst(): RegionId;
  back(): RegionId;
  pushBack(_0: RegionId): void;
  popBack(): void;
  emplaceBack(_0: RegionId): RegionId;
  beginId(): UndirectedEdgeId;
  backId(): UndirectedEdgeId;
  endId(): UndirectedEdgeId;
  autoResizeSetWithRange(_0: UndirectedEdgeId, _1: number, _2: RegionId): void;
  autoResizeSet(_0: UndirectedEdgeId, _1: RegionId): void;
  swap(_0: UndirectedEdge2RegionMap): void;
  heapBytes(): number;
  equals(_0: UndirectedEdge2RegionMap): boolean;
  notEquals(_0: UndirectedEdge2RegionMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: UndirectedEdgeId): RegionId;
}

export interface Face2RegionMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: RegionId): void;
  resizeWithReserveAndValue(_0: number, _1: RegionId): void;
  get(_0: FaceId): RegionId;
  set(_0: FaceId): RegionId;
  getByIndex(_0: FaceId): RegionId;
  getByIndexMutable(_0: FaceId): RegionId;
  getAt(_0: FaceId): RegionId;
  setAt(_0: FaceId, _1: RegionId): boolean;
  frontConst(): RegionId;
  front(): RegionId;
  backConst(): RegionId;
  back(): RegionId;
  pushBack(_0: RegionId): void;
  popBack(): void;
  emplaceBack(_0: RegionId): RegionId;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  autoResizeSetWithRange(_0: FaceId, _1: number, _2: RegionId): void;
  autoResizeSet(_0: FaceId, _1: RegionId): void;
  swap(_0: Face2RegionMap): void;
  heapBytes(): number;
  equals(_0: Face2RegionMap): boolean;
  notEquals(_0: Face2RegionMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: FaceId): RegionId;
}

export interface Vert2RegionMap extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: RegionId): void;
  resizeWithReserveAndValue(_0: number, _1: RegionId): void;
  get(_0: VertId): RegionId;
  set(_0: VertId): RegionId;
  getByIndex(_0: VertId): RegionId;
  getByIndexMutable(_0: VertId): RegionId;
  getAt(_0: VertId): RegionId;
  setAt(_0: VertId, _1: RegionId): boolean;
  frontConst(): RegionId;
  front(): RegionId;
  backConst(): RegionId;
  back(): RegionId;
  pushBack(_0: RegionId): void;
  popBack(): void;
  emplaceBack(_0: RegionId): RegionId;
  beginId(): VertId;
  backId(): VertId;
  endId(): VertId;
  autoResizeSetWithRange(_0: VertId, _1: number, _2: RegionId): void;
  autoResizeSet(_0: VertId, _1: RegionId): void;
  swap(_0: Vert2RegionMap): void;
  heapBytes(): number;
  equals(_0: Vert2RegionMap): boolean;
  notEquals(_0: Vert2RegionMap): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: VertId): RegionId;
}

export interface VertCoords extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  popBack(): void;
  beginId(): VertId;
  backId(): VertId;
  endId(): VertId;
  swap(_0: VertCoords): void;
  heapBytes(): number;
  equals(_0: VertCoords): boolean;
  notEquals(_0: VertCoords): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  fromTrianglesDuplicatingNonManifoldVertices(_0: Triangulation, _1: VectorVertDuplication | null, _2: BuildSettings): Mesh;
  fromTriangles(_0: Triangulation, _1: BuildSettings, _2: ProgressCallback): Mesh;
  fromFaceSoup(_0: VectorVertId, _1: VertSpanFaceIdMap, _2: BuildSettings, _3: ProgressCallback): Mesh;
  resizeWithValue(_0: number, _1: Vector3f): void;
  resizeWithReserveAndValue(_0: number, _1: Vector3f): void;
  get(_0: VertId): Vector3f;
  set(_0: VertId): Vector3f;
  getByIndex(_0: VertId): Vector3f;
  getByIndexMutable(_0: VertId): Vector3f;
  getAt(_0: VertId): Vector3f;
  setAt(_0: VertId, _1: Vector3f): boolean;
  frontConst(): Vector3f;
  front(): Vector3f;
  backConst(): Vector3f;
  back(): Vector3f;
  pushBack(_0: Vector3f): void;
  emplaceBack(_0: Vector3f): Vector3f;
  autoResizeSetWithRange(_0: VertId, _1: number, _2: Vector3f): void;
  autoResizeSet(_0: VertId, _1: Vector3f): void;
  autoResizeAt(_0: VertId): Vector3f;
}

export interface VertCoords2 extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  popBack(): void;
  beginId(): VertId;
  backId(): VertId;
  endId(): VertId;
  swap(_0: VertCoords2): void;
  heapBytes(): number;
  equals(_0: VertCoords2): boolean;
  notEquals(_0: VertCoords2): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  resizeWithValue(_0: number, _1: Vector2f): void;
  resizeWithReserveAndValue(_0: number, _1: Vector2f): void;
  get(_0: VertId): Vector2f;
  set(_0: VertId): Vector2f;
  getByIndex(_0: VertId): Vector2f;
  getByIndexMutable(_0: VertId): Vector2f;
  getAt(_0: VertId): Vector2f;
  setAt(_0: VertId, _1: Vector2f): boolean;
  frontConst(): Vector2f;
  front(): Vector2f;
  backConst(): Vector2f;
  back(): Vector2f;
  pushBack(_0: Vector2f): void;
  emplaceBack(_0: Vector2f): Vector2f;
  autoResizeSetWithRange(_0: VertId, _1: number, _2: Vector2f): void;
  autoResizeSet(_0: VertId, _1: Vector2f): void;
  autoResizeAt(_0: VertId): Vector2f;
}

export interface FaceNormals extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  popBack(): void;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  swap(_0: FaceNormals): void;
  heapBytes(): number;
  equals(_0: FaceNormals): boolean;
  notEquals(_0: FaceNormals): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  resizeWithValue(_0: number, _1: Vector3f): void;
  resizeWithReserveAndValue(_0: number, _1: Vector3f): void;
  get(_0: FaceId): Vector3f;
  set(_0: FaceId): Vector3f;
  getByIndex(_0: FaceId): Vector3f;
  getByIndexMutable(_0: FaceId): Vector3f;
  getAt(_0: FaceId): Vector3f;
  setAt(_0: FaceId, _1: Vector3f): boolean;
  frontConst(): Vector3f;
  front(): Vector3f;
  backConst(): Vector3f;
  back(): Vector3f;
  pushBack(_0: Vector3f): void;
  emplaceBack(_0: Vector3f): Vector3f;
  autoResizeSetWithRange(_0: FaceId, _1: number, _2: Vector3f): void;
  autoResizeSet(_0: FaceId, _1: Vector3f): void;
  autoResizeAt(_0: FaceId): Vector3f;
}

export interface TexturePerFace extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: TextureId): void;
  resizeWithReserveAndValue(_0: number, _1: TextureId): void;
  get(_0: FaceId): TextureId;
  set(_0: FaceId): TextureId;
  getByIndex(_0: FaceId): TextureId;
  getByIndexMutable(_0: FaceId): TextureId;
  getAt(_0: FaceId): TextureId;
  setAt(_0: FaceId, _1: TextureId): boolean;
  frontConst(): TextureId;
  front(): TextureId;
  backConst(): TextureId;
  back(): TextureId;
  pushBack(_0: TextureId): void;
  popBack(): void;
  emplaceBack(_0: TextureId): TextureId;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  autoResizeSetWithRange(_0: FaceId, _1: number, _2: TextureId): void;
  autoResizeSet(_0: FaceId, _1: TextureId): void;
  swap(_0: TexturePerFace): void;
  heapBytes(): number;
  equals(_0: TexturePerFace): boolean;
  notEquals(_0: TexturePerFace): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: FaceId): TextureId;
}

export interface VertColors extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: Color): void;
  resizeWithReserveAndValue(_0: number, _1: Color): void;
  get(_0: VertId): Color;
  set(_0: VertId): Color;
  getByIndex(_0: VertId): Color;
  getByIndexMutable(_0: VertId): Color;
  getAt(_0: VertId): Color;
  setAt(_0: VertId, _1: Color): boolean;
  frontConst(): Color;
  front(): Color;
  backConst(): Color;
  back(): Color;
  pushBack(_0: Color): void;
  popBack(): void;
  emplaceBack(_0: Color): Color;
  beginId(): VertId;
  backId(): VertId;
  endId(): VertId;
  autoResizeSetWithRange(_0: VertId, _1: number, _2: Color): void;
  autoResizeSet(_0: VertId, _1: Color): void;
  swap(_0: VertColors): void;
  heapBytes(): number;
  equals(_0: VertColors): boolean;
  notEquals(_0: VertColors): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: VertId): Color;
}

export interface FaceColors extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: Color): void;
  resizeWithReserveAndValue(_0: number, _1: Color): void;
  get(_0: FaceId): Color;
  set(_0: FaceId): Color;
  getByIndex(_0: FaceId): Color;
  getByIndexMutable(_0: FaceId): Color;
  getAt(_0: FaceId): Color;
  setAt(_0: FaceId, _1: Color): boolean;
  frontConst(): Color;
  front(): Color;
  backConst(): Color;
  back(): Color;
  pushBack(_0: Color): void;
  popBack(): void;
  emplaceBack(_0: Color): Color;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  autoResizeSetWithRange(_0: FaceId, _1: number, _2: Color): void;
  autoResizeSet(_0: FaceId, _1: Color): void;
  swap(_0: FaceColors): void;
  heapBytes(): number;
  equals(_0: FaceColors): boolean;
  notEquals(_0: FaceColors): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: FaceId): Color;
}

export interface EdgeColors extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: Color): void;
  resizeWithReserveAndValue(_0: number, _1: Color): void;
  get(_0: EdgeId): Color;
  set(_0: EdgeId): Color;
  getByIndex(_0: EdgeId): Color;
  getByIndexMutable(_0: EdgeId): Color;
  getAt(_0: EdgeId): Color;
  setAt(_0: EdgeId, _1: Color): boolean;
  frontConst(): Color;
  front(): Color;
  backConst(): Color;
  back(): Color;
  pushBack(_0: Color): void;
  popBack(): void;
  emplaceBack(_0: Color): Color;
  beginId(): EdgeId;
  backId(): EdgeId;
  endId(): EdgeId;
  autoResizeSetWithRange(_0: EdgeId, _1: number, _2: Color): void;
  autoResizeSet(_0: EdgeId, _1: Color): void;
  swap(_0: EdgeColors): void;
  heapBytes(): number;
  equals(_0: EdgeColors): boolean;
  notEquals(_0: EdgeColors): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: EdgeId): Color;
}

export interface UndirectedEdgeColors extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: Color): void;
  resizeWithReserveAndValue(_0: number, _1: Color): void;
  get(_0: UndirectedEdgeId): Color;
  set(_0: UndirectedEdgeId): Color;
  getByIndex(_0: UndirectedEdgeId): Color;
  getByIndexMutable(_0: UndirectedEdgeId): Color;
  getAt(_0: UndirectedEdgeId): Color;
  setAt(_0: UndirectedEdgeId, _1: Color): boolean;
  frontConst(): Color;
  front(): Color;
  backConst(): Color;
  back(): Color;
  pushBack(_0: Color): void;
  popBack(): void;
  emplaceBack(_0: Color): Color;
  beginId(): UndirectedEdgeId;
  backId(): UndirectedEdgeId;
  endId(): UndirectedEdgeId;
  autoResizeSetWithRange(_0: UndirectedEdgeId, _1: number, _2: Color): void;
  autoResizeSet(_0: UndirectedEdgeId, _1: Color): void;
  swap(_0: UndirectedEdgeColors): void;
  heapBytes(): number;
  equals(_0: UndirectedEdgeColors): boolean;
  notEquals(_0: UndirectedEdgeColors): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: UndirectedEdgeId): Color;
}

export interface VertScalars extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: VertId): number;
  set(_0: VertId): number;
  getByIndex(_0: VertId): number;
  getByIndexMutable(_0: VertId): number;
  getAt(_0: VertId): number;
  setAt(_0: VertId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): VertId;
  backId(): VertId;
  endId(): VertId;
  autoResizeSetWithRange(_0: VertId, _1: number, _2: number): void;
  autoResizeSet(_0: VertId, _1: number): void;
  swap(_0: VertScalars): void;
  heapBytes(): number;
  equals(_0: VertScalars): boolean;
  notEquals(_0: VertScalars): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: VertId): number;
}

export interface FaceScalars extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: FaceId): number;
  set(_0: FaceId): number;
  getByIndex(_0: FaceId): number;
  getByIndexMutable(_0: FaceId): number;
  getAt(_0: FaceId): number;
  setAt(_0: FaceId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  autoResizeSetWithRange(_0: FaceId, _1: number, _2: number): void;
  autoResizeSet(_0: FaceId, _1: number): void;
  swap(_0: FaceScalars): void;
  heapBytes(): number;
  equals(_0: FaceScalars): boolean;
  notEquals(_0: FaceScalars): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: FaceId): number;
}

export interface EdgeScalars extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: EdgeId): number;
  set(_0: EdgeId): number;
  getByIndex(_0: EdgeId): number;
  getByIndexMutable(_0: EdgeId): number;
  getAt(_0: EdgeId): number;
  setAt(_0: EdgeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): EdgeId;
  backId(): EdgeId;
  endId(): EdgeId;
  autoResizeSetWithRange(_0: EdgeId, _1: number, _2: number): void;
  autoResizeSet(_0: EdgeId, _1: number): void;
  swap(_0: EdgeScalars): void;
  heapBytes(): number;
  equals(_0: EdgeScalars): boolean;
  notEquals(_0: EdgeScalars): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: EdgeId): number;
}

export interface UndirectedEdgeScalars extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: UndirectedEdgeId): number;
  set(_0: UndirectedEdgeId): number;
  getByIndex(_0: UndirectedEdgeId): number;
  getByIndexMutable(_0: UndirectedEdgeId): number;
  getAt(_0: UndirectedEdgeId): number;
  setAt(_0: UndirectedEdgeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): UndirectedEdgeId;
  backId(): UndirectedEdgeId;
  endId(): UndirectedEdgeId;
  autoResizeSetWithRange(_0: UndirectedEdgeId, _1: number, _2: number): void;
  autoResizeSet(_0: UndirectedEdgeId, _1: number): void;
  swap(_0: UndirectedEdgeScalars): void;
  heapBytes(): number;
  equals(_0: UndirectedEdgeScalars): boolean;
  notEquals(_0: UndirectedEdgeScalars): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: UndirectedEdgeId): number;
}

export interface NodeVec extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: AABBTreePointsNode): void;
  resizeWithReserveAndValue(_0: number, _1: AABBTreePointsNode): void;
  get(_0: NodeId): AABBTreePointsNode;
  set(_0: NodeId): AABBTreePointsNode;
  getByIndex(_0: NodeId): AABBTreePointsNode;
  getByIndexMutable(_0: NodeId): AABBTreePointsNode;
  getAt(_0: NodeId): AABBTreePointsNode;
  setAt(_0: NodeId, _1: AABBTreePointsNode): boolean;
  frontConst(): AABBTreePointsNode;
  front(): AABBTreePointsNode;
  backConst(): AABBTreePointsNode;
  back(): AABBTreePointsNode;
  pushBack(_0: AABBTreePointsNode): void;
  popBack(): void;
  emplaceBack(_0: AABBTreePointsNode): AABBTreePointsNode;
  beginId(): NodeId;
  backId(): NodeId;
  endId(): NodeId;
  autoResizeSetWithRange(_0: NodeId, _1: number, _2: AABBTreePointsNode): void;
  autoResizeSet(_0: NodeId, _1: AABBTreePointsNode): void;
  swap(_0: NodeVec): void;
  heapBytes(): number;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: NodeId): AABBTreePointsNode;
}

export interface MeshLoadWrapper extends ClassHandle {
}

export interface FillHoleMetric extends ClassHandle {
}

export interface FillTriangleMetric extends ClassHandle {
}

export interface FillEdgeMetric extends ClassHandle {
}

export interface FillCombineMetric extends ClassHandle {
}

export interface FillHoleMetricWrapper extends ClassHandle {
}

export interface MeshOrPoints extends ClassHandle {
  getObjBoundingBox(): Box3f;
  cacheAABBTree(): void;
  computeBoundingBox(_0: AffineXf3f | null): Box3f;
  points(): VertCoords;
  validPoints(): VertBitSet;
  asMeshPart(): MeshPart | null;
  asPointCloudPart(): PointCloudPart | null;
}

export interface MeshOrPointsXf extends ClassHandle {
  obj: MeshOrPoints;
  xf: AffineXf3f;
}

export interface MeshPart extends ClassHandle {
  region: FaceBitSet | null;
  getMesh(): Mesh;
}

export interface MeshVertPart extends ClassHandle {
  region: VertBitSet | null;
  getMesh(): Mesh;
}

export interface MeshProjectionResult extends ClassHandle {
  distSq: number;
  mtp: MeshTriPoint;
  proj: PointOnFace;
  valid(): boolean;
  opbool(): boolean;
}

export interface SubdivideSettings extends ClassHandle {
  maxEdgeLen: number;
  maxEdgeSplits: number;
  maxDeviationAfterFlip: number;
  maxAngleChangeAfterFlip: number;
  criticalAspectRatioFlip: number;
  region: FaceBitSet | null;
  notFlippable: UndirectedEdgeBitSet | null;
  newVerts: VertBitSet | null;
  subdivideBorder: boolean;
  maxTriAspectRatio: number;
  maxSplittableTriAspectRatio: number;
  smoothMode: boolean;
  minSharpDihedralAngle: number;
  projectOnOriginalMesh: boolean;
}

export interface MeshTexture extends ClassHandle {
  filter: FilterType;
  wrap: WrapType;
}

export interface MeshTopology extends ClassHandle {
  makeEdge(): EdgeId;
  isLoneEdge(_0: EdgeId): boolean;
  lastNotLoneEdge(): EdgeId;
  excludeLoneEdges(_0: UndirectedEdgeBitSet): void;
  edgeSize(): number;
  edgeCapacity(): number;
  undirectedEdgeSize(): number;
  undirectedEdgeCapacity(): number;
  computeNotLoneUndirectedEdges(): number;
  findNotLoneUndirectedEdges(): UndirectedEdgeBitSet;
  edgeReserve(_0: number): void;
  hasEdge(_0: EdgeId): boolean;
  heapBytes(): number;
  shrinkToFit(): void;
  splice(_0: EdgeId, _1: EdgeId): void;
  next(_0: EdgeId): EdgeId;
  prev(_0: EdgeId): EdgeId;
  org(_0: EdgeId): VertId;
  dest(_0: EdgeId): VertId;
  left(_0: EdgeId): FaceId;
  right(_0: EdgeId): FaceId;
  setOrg(_0: EdgeId, _1: VertId): void;
  setLeft(_0: EdgeId, _1: FaceId): void;
  fromSameOriginRing(_0: EdgeId, _1: EdgeId): boolean;
  fromSameLeftRing(_0: EdgeId, _1: EdgeId): boolean;
  getOrgDegree(_0: EdgeId): number;
  getVertDegree(_0: VertId): number;
  getLeftDegree(_0: EdgeId): number;
  getFaceDegree(_0: FaceId): number;
  isLeftTri(_0: EdgeId): boolean;
  getTriVerts(_0: FaceId, _1: VertId, _2: VertId, _3: VertId): void;
  isTriVert(_0: FaceId, _1: VertId): boolean;
  getTriangulation(): Triangulation;
  getLeftTriVerts(_0: EdgeId, _1: VertId, _2: VertId, _3: VertId): void;
  getLeftTriEdges(_0: EdgeId, _1: EdgeId, _2: EdgeId): void;
  getTriEdges(_0: FaceId, _1: EdgeId, _2: EdgeId, _3: EdgeId): void;
  isLeftQuad(_0: EdgeId): boolean;
  edgePerVertex(): EdgeIdVertIdMap;
  edgeWithOrg(_0: VertId): EdgeId;
  hasVert(_0: VertId): boolean;
  numValidVerts(): number;
  lastValidVert(): VertId;
  addVertId(): VertId;
  vertResize(_0: number): void;
  vertResizeWithReserve(_0: number): void;
  vertReserve(_0: number): void;
  vertSize(): number;
  vertCapacity(): number;
  getValidVerts(): VertBitSet;
  getVertIds(_0: VertBitSet | null): VertBitSet;
  flip(_0: VertBitSet): void;
  flipWithFaceBitSet(_0: FaceBitSet): void;
  edgePerFace(): EdgeIdFaceIdMap;
  edgeWithLeft(_0: FaceId): EdgeId;
  hasFace(_0: FaceId): boolean;
  sharedEdge(_0: FaceId, _1: FaceId): EdgeId;
  sharedVertInOrg(_0: EdgeId, _1: EdgeId): EdgeId;
  sharedVertInOrgWithFaces(_0: FaceId, _1: FaceId): EdgeId;
  sharedFace(_0: EdgeId, _1: EdgeId): FaceId;
  numValidFaces(): number;
  lastValidFace(): FaceId;
  addFaceId(): FaceId;
  deleteFace(_0: FaceId, _1: UndirectedEdgeBitSet | null): void;
  deleteFaces(_0: FaceBitSet, _1: UndirectedEdgeBitSet | null): void;
  faceResize(_0: number): void;
  faceResizeWithReserve(_0: number): void;
  faceReserve(_0: number): void;
  faceSize(): number;
  faceCapacity(): number;
  getValidFaces(): FaceBitSet;
  getFaceIds(_0: FaceBitSet | null): FaceBitSet;
  bdEdgeSameLeft(_0: EdgeId, _1: FaceBitSet | null): EdgeId;
  isLeftBdFace(_0: EdgeId, _1: FaceBitSet | null): boolean;
  bdEdgeWithLeft(_0: FaceId, _1: FaceBitSet | null): EdgeId;
  isBdFace(_0: FaceId, _1: FaceBitSet | null): boolean;
  findBdFaces(_0: FaceBitSet | null): FaceBitSet;
  isLeftInRegion(_0: EdgeId, _1: FaceBitSet | null): boolean;
  isInnerEdge(_0: EdgeId, _1: FaceBitSet | null): boolean;
  isBdEdge(_0: EdgeId, _1: FaceBitSet | null): boolean;
  findLeftBdEdges(_0: FaceBitSet | null, _1: EdgeBitSet | null): EdgeBitSet;
  bdEdgeSameOrigin(_0: EdgeId, _1: FaceBitSet | null): EdgeId;
  isBdVertexInOrg(_0: EdgeId, _1: FaceBitSet | null): boolean;
  bdEdgeWithOrigin(_0: VertId, _1: FaceBitSet | null): EdgeId;
  isBdVertex(_0: VertId, _1: FaceBitSet | null): boolean;
  findBdVerts(_0: FaceBitSet | null, _1: VertBitSet | null): VertBitSet;
  isInnerOrBdVertex(_0: VertId, _1: FaceBitSet | null): boolean;
  isLeftBdEdge(_0: EdgeId, _1: FaceBitSet | null): boolean;
  isInnerOrBdEdge(_0: EdgeId, _1: FaceBitSet | null): boolean;
  nextLeftBd(_0: EdgeId, _1: FaceBitSet | null): EdgeId;
  prevLeftBd(_0: EdgeId, _1: FaceBitSet | null): EdgeId;
  findEdge(_0: VertId, _1: VertId): EdgeId;
  isClosed(_0: FaceBitSet | null): boolean;
  findNumHoles(_0: EdgeBitSet | null): number;
  flipEdge(_0: EdgeId): void;
  splitEdge(_0: EdgeId, _1: FaceBitSet | null, _2: FaceHashMap | null): EdgeId;
  splitFace(_0: FaceId, _1: FaceBitSet | null, _2: FaceHashMap | null): VertId;
  flipOrientation(_0: UndirectedEdgeBitSet | null): void;
  addPart(_0: MeshTopology, _1: FaceMap | null, _2: VertMap | null, _3: WholeEdgeMap | null, _4: boolean): void;
  rotateTriangles(): void;
  pack(_0: FaceMap | null, _1: VertMap | null, _2: WholeEdgeMap | null, _3: boolean): void;
  packWithPackMapping(_0: PackMapping): void;
  packMinMem(_0: PackMapping): void;
  equals(_0: MeshTopology): boolean;
  resizeBeforeParallelAdd(_0: number, _1: number, _2: number): void;
  addPackedPart(_0: MeshTopology, _1: EdgeId, _2: FaceMap, _3: VertMap): void;
  stopUpdatingValids(): void;
  updatingValids(): boolean;
  preferEdges(_0: UndirectedEdgeBitSet): void;
  addPartWithPartMapping(_0: MeshTopology, _1: PartMapping, _2: boolean): void;
  addPartByMaskWithPtr(_0: MeshTopology, _1: FaceBitSet | null, _2: PartMapping): void;
  addPartByMask(_0: MeshTopology, _1: FaceBitSet, _2: PartMapping): void;
  findHoleRepresentiveEdges(_0: FaceBitSet | null): VectorEdgeId;
  getLeftRing(_0: EdgeId): VectorEdgeId;
  getPathVertices(_0: VectorEdgeId): VertBitSet;
  getPathLeftFaces(_0: VectorEdgeId): FaceBitSet;
  getPathRightFaces(_0: VectorEdgeId): FaceBitSet;
  getLeftRings(_0: VectorEdgeId): VectorEdgePath;
  addPartByMaskWithEdgePathPtr(_0: MeshTopology, _1: FaceBitSet | null, _2: boolean, _3: VectorEdgePath, _4: VectorEdgePath, _5: PartMapping): void;
  addPartByMaskWithEdgePath(_0: MeshTopology, _1: FaceBitSet, _2: boolean, _3: VectorEdgePath, _4: VectorEdgePath, _5: PartMapping): void;
  getAllTriVerts(): VectorArray3VertId;
  getTriVertsWithArray3VertId(_0: FaceId, _1: Array3VertId): void;
  getTriVertsWithThreeVertIds(_0: FaceId, _1: Array3VertId): void;
  getTriVertsWithFaceId(_0: FaceId): Array3VertId;
  getLeftTriVertsWithArray3VertId(_0: EdgeId, _1: Array3VertId): void;
  getLeftTriVertsWithThreeVertIds(_0: EdgeId, _1: Array3VertId): void;
  getLeftTriVertsWithEdgeId(_0: EdgeId): Array3VertId;
  computeValidsFromEdges(_0: ProgressCallback): boolean;
  buildGridMesh(_0: GridSettings, _1: ProgressCallback): boolean;
  checkValidity(_0: ProgressCallback, _1: boolean): boolean;
  collapseEdge(_0: EdgeId, _1: VoidFunctorEdgeIdEdgeId): EdgeId;
}

export type MeshPiece = {
  fmap: FaceMap,
  vmap: VertMap,
  topology: MeshTopology,
  rem: FaceBitSet
};

export type WeightedVertex = {
  v: VertId,
  weight: number
};

export interface MeshTriPoint extends ClassHandle {
  e: EdgeId;
  bary: TriPointf;
  valid(): boolean;
  opbool(): boolean;
  inVertex(): boolean;
  onEdge(_0: MeshTopology): EdgePoint;
  isBd(_0: MeshTopology, _1: FaceBitSet | null): boolean;
  fromTriangle(_0: MeshTopology, _1: FaceId): boolean;
  lnext(_0: MeshTopology): MeshTriPoint;
  canonical(_0: MeshTopology): MeshTriPoint;
  getWeightedVerts(_0: MeshTopology): Array3WeightedVertex;
}

export interface MovementBuildBodyParams extends ClassHandle {
  allowRotation: boolean;
  b2tXf: AffineXf3f | null;
  center: Vector3f | undefined;
  bodyNormal: Vector3f | undefined;
}

export type MultiwayAligningTransformStabilizer = {
  rot: number,
  shift: number
};

export interface MultiwayAligningTransform extends ClassHandle {
  reset(_0: number): void;
  add(_0: MultiwayAligningTransform): void;
  solve(): VectorRigidXf3d;
  solveWithStabilizer(_0: MultiwayAligningTransformStabilizer): VectorRigidXf3d;
  add3DLinkFromVector3f(_0: number, _1: Vector3f, _2: number, _3: Vector3f, _4: number): void;
  add1DLinkFromVector3f(_0: number, _1: Vector3f, _2: number, _3: Vector3f, _4: Vector3f, _5: number): void;
  add3DLinkFromVector3d(_0: number, _1: Vector3d, _2: number, _3: Vector3d, _4: number): void;
  add1DLinkFromVector3d(_0: number, _1: Vector3d, _2: number, _3: Vector3d, _4: Vector3d, _5: number): void;
}

export interface ICPGroupPair extends ICPPairData {
  srcId_: ObjVertId;
  tgtClosestId_: ObjVertId;
}

export interface ICPGroupPairs extends IPointPairs {
  vec_: VectorICPGroupPair;
  getVecConst_(_0: number): ICPGroupPair;
  getVec_(_0: number): ICPGroupPair;
  size_(): number;
}

export interface IICPTreeIndexer extends ClassHandle {
  fromSameNode(_0: number, _1: ICPElementId, _2: ICPElementId): boolean;
  getElementLeaves(_0: number, _1: ICPElementId): ObjBitSet;
  getElementNodes(_0: number, _1: ICPElementId): ICPElementBitSet;
  getNumElements(_0: number): number;
  getNumLayers(): number;
}

export interface IICPTreeIndexerWrapper extends IICPTreeIndexer {
  notifyOnDestruction(): void;
}

export interface MultiwayICPSamplingParametersCascadeModeValue<T extends number> {
  value: T;
}
export type MultiwayICPSamplingParametersCascadeMode = MultiwayICPSamplingParametersCascadeModeValue<0>|MultiwayICPSamplingParametersCascadeModeValue<1>;

export interface MultiwayICP extends ClassHandle {
  getNumSamples(): number;
  getNumActivePairs(): number;
  devIndependentEquationsModeEnabled(): boolean;
  devEnableIndependentEquationsMode(_0: boolean): void;
  getStatusInfo(): string;
  getCascadeIndexer(): IICPTreeIndexer | null;
  getMeanSqDistToPoint(_0?: number): number;
  getMeanSqDistToPlane(_0?: number): number;
  resamplePoints(_0: MultiwayICPSamplingParameters): boolean;
  updateAllPointPairs(_0: ProgressCallback): boolean;
  setPerIterationCallback(_0: VoidFunctorInt): void;
  getPairsPerLayer(): VectorICPPairsGridICPLayer;
  calculateTransformations(_0: ProgressCallback): VectorAffineXf3fObjId;
  calculateTransformationsFixFirst(_0: ProgressCallback): VectorAffineXf3fObjId;
  setParams(_0: ICPProperties): void;
  getParams(): ICPProperties;
}

export interface NoDefInitFaceId extends ClassHandle {
}

export interface NoDefInitVertId extends ClassHandle {
}

export interface NoDefInitEdgeId extends ClassHandle {
}

export interface NoDefInitUndirectedEdgeId extends ClassHandle {
}

export interface BaseShellParameters extends ClassHandle {
  voxelSize: number;
  callBack: ProgressCallback;
}

export interface OffsetParameters extends BaseShellParameters {
  closeHolesInHoleWindingNumber: boolean;
  windingNumberThreshold: number;
  windingNumberBeta: number;
  memoryEfficient: boolean;
  signDetectionMode: SignDetectionMode;
}

export interface SharpOffsetParameters extends OffsetParameters {
  outSharpEdges: UndirectedEdgeBitSet | null;
  minNewVertDev: number;
  maxNewRank2VertDev: number;
  maxNewRank3VertDev: number;
  maxOldVertPosCorrection: number;
}

export interface GeneralOffsetParameters extends SharpOffsetParameters {
  mode: OffsetMode;
}

export interface SortIntersectionsData extends ClassHandle {
  rigidB2A: AffineXf3f | null;
  meshAVertsNum: number;
  isOtherA: boolean;
  getOtherMesh(): Mesh;
  getConverter(): ConvertToIntVector;
  getContours(): ContinuousContours;
}

export interface OneMeshContour extends ClassHandle {
  closed: boolean;
  intersections: VectorOneMeshIntersection;
}

export interface OneMeshIntersection extends ClassHandle {
  coordinate: Vector3f;
  primitiveIndex(): number;
  getFaceId(): FaceId;
  getEdgeId(): EdgeId;
  getVertId(): VertId;
  setFaceId(_0: FaceId): void;
  setEdgeId(_0: EdgeId): void;
  setVertId(_0: VertId): void;
}

export type SearchPathSettings = {
  geodesicPathApprox: GeodesicPathApprox,
  maxReduceIters: number
};

export interface PartMapping extends ClassHandle {
  clear(): void;
}

export interface Plane3f extends ClassHandle {
  d: number;
  n: Vector3f;
  negate(): Plane3f;
  positive(): Plane3f;
  normalized(): Plane3f;
  distance(_0: Vector3f): number;
  project(_0: Vector3f): Vector3f;
}

export interface Plane3d extends ClassHandle {
  d: number;
  n: Vector3d;
  negate(): Plane3d;
  positive(): Plane3d;
  normalized(): Plane3d;
  distance(_0: Vector3d): number;
  project(_0: Vector3d): Vector3d;
}

export interface PointCloud extends ClassHandle {
  points: VertCoords;
  normals: VertCoords;
  validPoints: VertBitSet;
  calcNumValidPoints(): number;
  hasNormals(): boolean;
  getVertIds(_0: VertBitSet | null): VertBitSet;
  getAABBTreeNotCreate(): AABBTreePoints | null;
  getBoundingBox(): Box3f;
  computeBoundingBox(_0: AffineXf3f | null): Box3f;
  addPartByMask(_0: PointCloud, _1: VertBitSet, _2: CloudPartMapping, _3: VertCoords | null): void;
  mirror(_0: Plane3f): void;
  flipOrientation(_0: VertBitSet | null): void;
  pack(_0: VertMap | null): boolean;
  packReorder(_0: Reorder): VertBMap;
  invalidateCaches(): void;
  heapBytes(): number;
  getLexicographicalOrder(): VectorVertId;
  findCenterFromPoints(): Vector3f;
  findCenterFromBBox(): Vector3f;
  addPoint(_0: Vector3f): VertId;
  addPointNormal(_0: Vector3f, _1: Vector3f): VertId;
}

export interface PointCloudPart extends ClassHandle {
  getCloud(): PointCloud;
  getRegion(): VertBitSet | null;
  equals(_0: PointCloudPart): PointCloudPart;
}

export interface PointOnFace extends ClassHandle {
  face: FaceId;
  point: Vector3f;
  valid(): boolean;
  opbool(): boolean;
}

export type MeshMeshDistanceResult = {
  a: PointOnFace,
  b: PointOnFace,
  distSq: number
};

export type MeshMeshSignedDistanceResult = {
  a: PointOnFace,
  b: PointOnFace,
  signedDist: number
};

export interface PointToPlaneAligningTransform extends ClassHandle {
  prepare(): void;
  clear(): void;
  findBestRigidXf(): AffineXf3d;
  findBestRigidScaleXf(): AffineXf3d;
  calculateAmendment(): RigidScaleXf3d;
  calculateAmendmentWithScale(): RigidScaleXf3d;
  add(_0: Vector3f, _1: Vector3f, _2: Vector3f, _3: number): void;
  addDouble(_0: Vector3d, _1: Vector3d, _2: Vector3d, _3: number): void;
  findBestRigidXfFixedRotationAxis(_0: Vector3d): AffineXf3d;
  findBestRigidXfOrthogonalRotationAxis(_0: Vector3d): AffineXf3d;
  findBestTranslation(_0: Vector3d, _1: number): Vector3d;
  calculateFixedAxisAmendment(_0: Vector3d): RigidScaleXf3d;
  calculateOrthogonalAxisAmendment(_0: Vector3d): RigidScaleXf3d;
}

export interface IPointsToMeshProjector extends ClassHandle {
  updateMeshData(_0: Mesh | null): void;
  projectionsHeapBytes(_0: number): number;
  findProjections(_0: VectorMeshProjectionResult, _1: VectorVector3f, _2: AffineXf3f | null, _3: AffineXf3f | null, _4: number, _5: number): void;
}

export interface PointsToMeshProjector extends IPointsToMeshProjector {
  updateMeshData(_0: Mesh | null): void;
  projectionsHeapBytes(_0: number): number;
  findProjections(_0: VectorMeshProjectionResult, _1: VectorVector3f, _2: AffineXf3f | null, _3: AffineXf3f | null, _4: number, _5: number): void;
}

export interface MeshProjectionParameters extends ClassHandle {
  loDistLimitSq: number;
  upDistLimitSq: number;
  refXf: AffineXf3f | null;
  xf: AffineXf3f | null;
}

export interface Polyline3 extends ClassHandle {
  points: VertCoords;
  topology: PolylineTopology;
  addPart(_0: Polyline3, _1: VertMap | null, _2: WholeEdgeMap | null): void;
  addPartByMask(_0: Polyline3, _1: UndirectedEdgeBitSet, _2: VertMap | null, _3: EdgeMap | null): void;
  pack(_0: VertMap | null, _1: WholeEdgeMap | null): void;
  edgeSegment(_0: EdgeId): LineSegm3f;
  toEdgePoint(_0: VertId): EdgePoint;
  edgeLength(_0: EdgeId): number;
  edgeLengthSq(_0: EdgeId): number;
  totalLength(): number;
  getBoundingBox(): Box3f;
  computeBoundingBox(_0: AffineXf3f | null): Box3f;
  transform(_0: AffineXf3f): void;
  invalidateCaches(): void;
  splitEdge(_0: EdgeId): EdgeId;
  heapBytes(): number;
  addFromEdgePath(_0: Mesh, _1: VectorEdgeId): EdgeId;
  contours(_0: VectorVectorVertId | null): VectorVectorVector3f;
  orgPnt(_0: EdgeId): Vector3f;
  destPnt(_0: EdgeId): Vector3f;
  edgePointFromEdgeId(_0: EdgeId, _1: number): Vector3f;
  edgePoint(_0: EdgePoint): Vector3f;
  edgeCenter(_0: EdgeId): Vector3f;
  edgeVector(_0: EdgeId): Vector3f;
  toEdgePointWithEdgeId(_0: EdgeId, _1: Vector3f): EdgePoint;
  loopDirArea(_0: EdgeId): Vector3f;
  findCenterFromPoints(): Vector3f;
  splitEdgeWithEdgeId(_0: EdgeId, _1: Vector3f): EdgeId;
  addFromPointsAsClosed(_0: Vector3f | null, _1: number, _2: boolean): EdgeId;
  addFromPoints(_0: Vector3f | null, _1: number): EdgeId;
}

export interface Polyline2 extends ClassHandle {
  points: VertCoords2;
  topology: PolylineTopology;
  addPart(_0: Polyline2, _1: VertMap | null, _2: WholeEdgeMap | null): void;
  addPartByMask(_0: Polyline2, _1: UndirectedEdgeBitSet, _2: VertMap | null, _3: EdgeMap | null): void;
  pack(_0: VertMap | null, _1: WholeEdgeMap | null): void;
  edgeSegment(_0: EdgeId): LineSegm2f;
  toEdgePoint(_0: VertId): EdgePoint;
  edgeLength(_0: EdgeId): number;
  edgeLengthSq(_0: EdgeId): number;
  totalLength(): number;
  getBoundingBox(): Box2f;
  computeBoundingBox(_0: AffineXf2f | null): Box2f;
  transform(_0: AffineXf2f): void;
  invalidateCaches(): void;
  splitEdge(_0: EdgeId): EdgeId;
  heapBytes(): number;
  addFromEdgePath(_0: Mesh, _1: VectorEdgeId): EdgeId;
  contours(_0: VectorVectorVertId | null): VectorVectorVector2f;
  orgPnt(_0: EdgeId): Vector2f;
  destPnt(_0: EdgeId): Vector2f;
  edgePointFromEdgeId(_0: EdgeId, _1: number): Vector2f;
  edgePoint(_0: EdgePoint): Vector2f;
  edgeCenter(_0: EdgeId): Vector2f;
  edgeVector(_0: EdgeId): Vector2f;
  toEdgePointWithEdgeId(_0: EdgeId, _1: Vector2f): EdgePoint;
  findCenterFromPoints(): Vector2f;
  splitEdgeWithEdgeId(_0: EdgeId, _1: Vector2f): EdgeId;
  addFromPointsAsClosed(_0: Vector2f | null, _1: number, _2: boolean): EdgeId;
  addFromPoints(_0: Vector2f | null, _1: number): EdgeId;
  loopDirArea(_0: EdgeId): Vector3f;
}

export interface PolylineTopology extends ClassHandle {
  makeEdge(): EdgeId;
  makeEdgeWithVertId(_0: VertId, _1: VertId, _2: EdgeId): EdgeId;
  isLoneEdge(_0: EdgeId): boolean;
  lastNotLoneEdge(): EdgeId;
  edgeSize(): number;
  undirectedEdgeSize(): number;
  computeNotLoneUndirectedEdges(): number;
  edgeReserve(_0: number): void;
  hasEdge(_0: EdgeId): boolean;
  deleteEdge(_0: UndirectedEdgeId): void;
  deleteEdges(_0: UndirectedEdgeBitSet): void;
  heapBytes(): number;
  splice(_0: EdgeId, _1: EdgeId): void;
  next(_0: EdgeId): EdgeId;
  org(_0: EdgeId): VertId;
  dest(_0: EdgeId): VertId;
  setOrg(_0: EdgeId, _1: VertId): void;
  edgePerVertex(): EdgeIdVertIdMap;
  getOrgs(): VertIdEdgeIdMap;
  edgeWithOrg(_0: VertId): EdgeId;
  hasVert(_0: VertId): boolean;
  getVertDegree(_0: VertId): number;
  numValidVerts(): number;
  lastValidVert(): VertId;
  addVertId(): VertId;
  vertResize(_0: number): void;
  vertResizeWithReserve(_0: number): void;
  vertReserve(_0: number): void;
  vertSize(): number;
  vertCapacity(): number;
  getValidVerts(): VertBitSet;
  getVertIds(_0: VertBitSet | null): VertBitSet;
  findEdge(_0: VertId, _1: VertId): EdgeId;
  splitEdge(_0: EdgeId): EdgeId;
  makePolyline(_0: VertId | null, _1: number): EdgeId;
  addPart(_0: PolylineTopology, _1: VertMap | null, _2: WholeEdgeMap | null): void;
  addPartByMask(_0: PolylineTopology, _1: UndirectedEdgeBitSet, _2: VertMap | null, _3: EdgeMap | null): void;
  pack(_0: VertMap | null, _1: WholeEdgeMap | null): void;
  equals(_0: PolylineTopology): boolean;
  notEquals(_0: PolylineTopology): boolean;
  isConsistentlyOriented(): boolean;
  flip(): void;
  checkValidity(): boolean;
  computeValidsFromEdges(): void;
  isClosed(): boolean;
  getPathVertices(_0: VectorEdgeId): VertBitSet;
  buildOpenLines(_0: VectorVertId): void;
}

export interface PolylineMaker extends ClassHandle {
  start(_0: VertId): EdgeId;
  proceed(_0: VertId): EdgeId;
  close(): void;
  finishOpen(_0: VertId): void;
}

export interface SpacingSettings extends ClassHandle {
  region: VertBitSet | null;
  numIters: number;
  stabilizer: number;
  maxSumNegW: number;
  isInverted: FacePredicate;
  dist: UndirectedEdgeMetric;
}

export type InflateSettings = {
  pressure: number,
  iterations: number,
  preSmooth: boolean,
  gradualPressureGrowth: boolean
};

export interface ConvertToFloatVector extends ClassHandle {
}

export interface ConvertToIntVector extends ClassHandle {
}

export interface CoordinateConverters extends ClassHandle {
  setToInt(_0: any): void;
  setToFloat(_0: any): void;
  callToInt(_0: Vector3f): Vector3i;
  callToFloat(_0: Vector3i): Vector3f;
}

export interface RebuildMeshSettings extends ClassHandle {
  preSubdivide: boolean;
  voxelSize: number;
  closeHolesInHoleWindingNumber: boolean;
  offsetMode: OffsetMode;
  outSharpEdges: UndirectedEdgeBitSet | null;
  windingNumberThreshold: number;
  windingNumberBeta: number;
  decimate: boolean;
  tinyEdgeLength: number;
  signMode: SignDetectionModeShort;
  progress: ProgressCallback;
  onSignDetectionModeSelected: VoidFunctorSignDetectionMode;
}

export interface RelaxApproxTypeValue<T extends number> {
  value: T;
}
export type RelaxApproxType = RelaxApproxTypeValue<0>|RelaxApproxTypeValue<1>;

export interface RelaxParams extends ClassHandle {
  iterations: number;
  region: VertBitSet | null;
  force: number;
  limitNearInitial: boolean;
  maxInitialDist: number;
}

export interface MeshRelaxParams extends RelaxParams {
  hardSmoothTetrahedrons: boolean;
  weights: VertScalars | null;
}

export interface MeshEqualizeTriAreasParams extends MeshRelaxParams {
  noShrinkage: boolean;
}

export interface MeshApproxRelaxParams extends MeshRelaxParams {
  surfaceDilateRadius: number;
  type: RelaxApproxType;
}

export interface RigidScaleXf3f extends ClassHandle {
  s: number;
  a: Vector3f;
  b: Vector3f;
  rigidScaleXf(): AffineXf3f;
  linearXf(): AffineXf3f;
}

export interface RigidScaleXf3d extends ClassHandle {
  s: number;
  a: Vector3d;
  b: Vector3d;
  rigidScaleXf(): AffineXf3d;
  linearXf(): AffineXf3d;
}

export interface RigidXf3f extends ClassHandle {
  a: Vector3f;
  b: Vector3f;
  rigidXf(): AffineXf3f;
  linearXf(): AffineXf3f;
}

export interface RigidXf3d extends ClassHandle {
  a: Vector3d;
  b: Vector3d;
  rigidXf(): AffineXf3d;
  linearXf(): AffineXf3d;
}

export interface SegmPointf extends ClassHandle {
}

export interface SegmPointd extends ClassHandle {
}

export interface SignDetectionModeValue<T extends number> {
  value: T;
}
export type SignDetectionMode = SignDetectionModeValue<0>|SignDetectionModeValue<1>|SignDetectionModeValue<2>|SignDetectionModeValue<3>|SignDetectionModeValue<4>;

export interface SignDetectionModeShortValue<T extends number> {
  value: T;
}
export type SignDetectionModeShort = SignDetectionModeShortValue<0>|SignDetectionModeShortValue<1>|SignDetectionModeShortValue<2>;

export interface SymMatrix2b extends ClassHandle {
}

export interface SymMatrix2i extends ClassHandle {
}

export interface SymMatrix2i64 extends ClassHandle {
}

export interface SymMatrix2f extends ClassHandle {
}

export interface SymMatrix2d extends ClassHandle {
}

export interface SymMatrix3b extends ClassHandle {
}

export interface SymMatrix3i extends ClassHandle {
}

export interface SymMatrix3i64 extends ClassHandle {
}

export interface SymMatrix3f extends ClassHandle {
}

export interface SymMatrix3d extends ClassHandle {
}

export interface SymMatrix4b extends ClassHandle {
}

export interface SymMatrix4i extends ClassHandle {
}

export interface SymMatrix4i64 extends ClassHandle {
}

export interface SymMatrix4f extends ClassHandle {
}

export interface SymMatrix4d extends ClassHandle {
}

export interface DentalId extends ClassHandle {
  fdi(): number;
  equals(_0: DentalId): boolean;
  lessThan(_0: DentalId): boolean;
  greaterThan(_0: DentalId): boolean;
  hash(): number;
  toString(): string;
}

export interface TriMesh extends ClassHandle {
  tris: Triangulation;
  points: VertCoords;
  fromTriMeshWithoutProgressCallback(_0: BuildSettings): Mesh;
  fromTriMeshWithDefaultSettings(): Mesh;
  fromTriMesh(_0: BuildSettings, _1: ProgressCallback): Mesh;
  fromTriMeshWithUniquePtr(_0: BuildSettings, _1: ProgressCallback): Mesh;
}

export interface TriPointf extends ClassHandle {
}

export interface TriPointd extends ClassHandle {
}

export interface UnionFindVertId extends ClassHandle {
  size(): number;
  reset(_0: number): void;
  united(_0: VertId, _1: VertId): boolean;
  isRoot(_0: VertId): boolean;
  parent(_0: VertId): VertId;
  find(_0: VertId): VertId;
  findUpdateRange(_0: VertId, _1: VertId, _2: VertId): VertId;
  roots(): VertMap;
  parents(): VertMap;
  sizeOfComp(_0: VertId): number;
  unite(_0: VertId, _1: VertId): VertIdBoolPair;
}

export interface UnionFindEdgeId extends ClassHandle {
  size(): number;
  reset(_0: number): void;
  united(_0: EdgeId, _1: EdgeId): boolean;
  isRoot(_0: EdgeId): boolean;
  parent(_0: EdgeId): EdgeId;
  find(_0: EdgeId): EdgeId;
  findUpdateRange(_0: EdgeId, _1: EdgeId, _2: EdgeId): EdgeId;
  roots(): EdgeMap;
  parents(): EdgeMap;
  sizeOfComp(_0: EdgeId): number;
  unite(_0: EdgeId, _1: EdgeId): EdgeIdBoolPair;
}

export interface UnionFindUndirectedEdgeId extends ClassHandle {
  size(): number;
  reset(_0: number): void;
  united(_0: UndirectedEdgeId, _1: UndirectedEdgeId): boolean;
  isRoot(_0: UndirectedEdgeId): boolean;
  parent(_0: UndirectedEdgeId): UndirectedEdgeId;
  find(_0: UndirectedEdgeId): UndirectedEdgeId;
  findUpdateRange(_0: UndirectedEdgeId, _1: UndirectedEdgeId, _2: UndirectedEdgeId): UndirectedEdgeId;
  roots(): UndirectedEdgeMap;
  parents(): UndirectedEdgeMap;
  sizeOfComp(_0: UndirectedEdgeId): number;
  unite(_0: UndirectedEdgeId, _1: UndirectedEdgeId): UndirectedEdgeIdBoolPair;
}

export interface UnionFindFaceId extends ClassHandle {
  size(): number;
  reset(_0: number): void;
  united(_0: FaceId, _1: FaceId): boolean;
  isRoot(_0: FaceId): boolean;
  parent(_0: FaceId): FaceId;
  find(_0: FaceId): FaceId;
  findUpdateRange(_0: FaceId, _1: FaceId, _2: FaceId): FaceId;
  roots(): FaceMap;
  parents(): FaceMap;
  sizeOfComp(_0: FaceId): number;
  unite(_0: FaceId, _1: FaceId): FaceIdBoolPair;
}

export interface UnionFindPixelId extends ClassHandle {
  size(): number;
  reset(_0: number): void;
  united(_0: PixelId, _1: PixelId): boolean;
  isRoot(_0: PixelId): boolean;
  parent(_0: PixelId): PixelId;
  find(_0: PixelId): PixelId;
  findUpdateRange(_0: PixelId, _1: PixelId, _2: PixelId): PixelId;
  roots(): PixelIdPixelIdMap;
  parents(): PixelIdPixelIdMap;
  sizeOfComp(_0: PixelId): number;
  unite(_0: PixelId, _1: PixelId): PixelIdBoolPair;
}

export interface UnionFindVoxelId extends ClassHandle {
  size(): number;
  reset(_0: number): void;
  united(_0: VoxelId, _1: VoxelId): boolean;
  isRoot(_0: VoxelId): boolean;
  parent(_0: VoxelId): VoxelId;
  find(_0: VoxelId): VoxelId;
  findUpdateRange(_0: VoxelId, _1: VoxelId, _2: VoxelId): VoxelId;
  roots(): VoxelIdVoxelIdMap;
  parents(): VoxelIdVoxelIdMap;
  sizeOfComp(_0: VoxelId): number;
  unite(_0: VoxelId, _1: VoxelId): VoxelIdBoolPair;
}

export interface UnionFindRegionId extends ClassHandle {
  size(): number;
  reset(_0: number): void;
  united(_0: RegionId, _1: RegionId): boolean;
  isRoot(_0: RegionId): boolean;
  parent(_0: RegionId): RegionId;
  find(_0: RegionId): RegionId;
  findUpdateRange(_0: RegionId, _1: RegionId, _2: RegionId): RegionId;
  roots(): RegionIdRegionIdMap;
  parents(): RegionIdRegionIdMap;
  sizeOfComp(_0: RegionId): number;
  unite(_0: RegionId, _1: RegionId): RegionIdBoolPair;
}

export interface UnionFindNodeId extends ClassHandle {
  size(): number;
  reset(_0: number): void;
  united(_0: NodeId, _1: NodeId): boolean;
  isRoot(_0: NodeId): boolean;
  parent(_0: NodeId): NodeId;
  find(_0: NodeId): NodeId;
  findUpdateRange(_0: NodeId, _1: NodeId, _2: NodeId): NodeId;
  roots(): NodeIdNodeIdMap;
  parents(): NodeIdNodeIdMap;
  sizeOfComp(_0: NodeId): number;
  unite(_0: NodeId, _1: NodeId): NodeIdBoolPair;
}

export interface UnionFindObjId extends ClassHandle {
  size(): number;
  reset(_0: number): void;
  united(_0: ObjId, _1: ObjId): boolean;
  isRoot(_0: ObjId): boolean;
  parent(_0: ObjId): ObjId;
  find(_0: ObjId): ObjId;
  findUpdateRange(_0: ObjId, _1: ObjId, _2: ObjId): ObjId;
  roots(): ObjMap;
  parents(): ObjMap;
  sizeOfComp(_0: ObjId): number;
  unite(_0: ObjId, _1: ObjId): ObjIdBoolPair;
}

export interface UnionFindTextureId extends ClassHandle {
  size(): number;
  reset(_0: number): void;
  united(_0: TextureId, _1: TextureId): boolean;
  isRoot(_0: TextureId): boolean;
  parent(_0: TextureId): TextureId;
  find(_0: TextureId): TextureId;
  findUpdateRange(_0: TextureId, _1: TextureId, _2: TextureId): TextureId;
  roots(): TextureIdTextureIdMap;
  parents(): TextureIdTextureIdMap;
  sizeOfComp(_0: TextureId): number;
  unite(_0: TextureId, _1: TextureId): TextureIdBoolPair;
}

export interface UnionFindGraphVertId extends ClassHandle {
  size(): number;
  reset(_0: number): void;
  united(_0: GraphVertId, _1: GraphVertId): boolean;
  isRoot(_0: GraphVertId): boolean;
  parent(_0: GraphVertId): GraphVertId;
  find(_0: GraphVertId): GraphVertId;
  findUpdateRange(_0: GraphVertId, _1: GraphVertId, _2: GraphVertId): GraphVertId;
  roots(): GraphVertIdGraphVertIdMap;
  parents(): GraphVertIdGraphVertIdMap;
  sizeOfComp(_0: GraphVertId): number;
  unite(_0: GraphVertId, _1: GraphVertId): GraphVertIdBoolPair;
}

export interface UnionFindGraphEdgeId extends ClassHandle {
  size(): number;
  reset(_0: number): void;
  united(_0: GraphEdgeId, _1: GraphEdgeId): boolean;
  isRoot(_0: GraphEdgeId): boolean;
  parent(_0: GraphEdgeId): GraphEdgeId;
  find(_0: GraphEdgeId): GraphEdgeId;
  findUpdateRange(_0: GraphEdgeId, _1: GraphEdgeId, _2: GraphEdgeId): GraphEdgeId;
  roots(): GraphEdgeIdGraphEdgeIdMap;
  parents(): GraphEdgeIdGraphEdgeIdMap;
  sizeOfComp(_0: GraphEdgeId): number;
  unite(_0: GraphEdgeId, _1: GraphEdgeId): GraphEdgeIdBoolPair;
}

export interface NestedComponenetsModeValue<T extends number> {
  value: T;
}
export type NestedComponenetsMode = NestedComponenetsModeValue<0>|NestedComponenetsModeValue<1>|NestedComponenetsModeValue<2>;

export interface UniteManyMeshesParams extends ClassHandle {
  useRandomShifts: boolean;
  fixDegenerations: boolean;
  maxAllowedError: number;
  randomShiftsSeed: number;
  newFaces: FaceBitSet | null;
  nestedComponentsMode: NestedComponenetsMode;
  mergeOnFail: boolean;
  forceCut: boolean;
  progressCb: ProgressCallback;
}

export interface GeometryBuffer extends ClassHandle {
  vertices: any;
  indices: any;
}

export type EdgeIdBoolPair = [ EdgeId, boolean ];

export type UndirectedEdgeIdBoolPair = [ UndirectedEdgeId, boolean ];

export type FaceIdBoolPair = [ FaceId, boolean ];

export type VertIdBoolPair = [ VertId, boolean ];

export type PixelIdBoolPair = [ PixelId, boolean ];

export type VoxelIdBoolPair = [ VoxelId, boolean ];

export type RegionIdBoolPair = [ RegionId, boolean ];

export type NodeIdBoolPair = [ NodeId, boolean ];

export type ObjIdBoolPair = [ ObjId, boolean ];

export type TextureIdBoolPair = [ TextureId, boolean ];

export type GraphVertIdBoolPair = [ GraphVertId, boolean ];

export type GraphEdgeIdBoolPair = [ GraphEdgeId, boolean ];

export type EdgeIdPair = [ EdgeId, EdgeId ];

export type VertIdPair = [ VertId, VertId ];

export type FaceIdPair = [ FaceId, FaceId ];

export type UndirectedEdgeIdPair = [ UndirectedEdgeId, UndirectedEdgeId ];

export type UndirectedE2EIdPair = [ UndirectedEdgeId, EdgeId ];

export type MeshPair = [ Mesh, Mesh ];

export type Face2RegionMapIntPair = [ Face2RegionMap, number ];

export type FaceBitSetFaceBitSetPair = [ FaceBitSet, FaceBitSet ];

export type VertBitSetVertBitSetPair = [ VertBitSet, VertBitSet ];

export type EdgeBitSetEdgeBitSetPair = [ EdgeBitSet, EdgeBitSet ];

export type UndirectedEdgeBitSetUndirectedEdgeBitSetPair = [ UndirectedEdgeBitSet, UndirectedEdgeBitSet ];

export type PixelBitSetPixelBitSetPair = [ PixelBitSet, PixelBitSet ];

export type VoxelBitSetVoxelBitSetPair = [ VoxelBitSet, VoxelBitSet ];

export type RegionBitSetRegionBitSetPair = [ RegionBitSet, RegionBitSet ];

export type NodeBitSetNodeBitSetPair = [ NodeBitSet, NodeBitSet ];

export type ObjBitSetObjBitSetPair = [ ObjBitSet, ObjBitSet ];

export type TextureBitSetTextureBitSetPair = [ TextureBitSet, TextureBitSet ];

export type GraphVertBitSetGraphVertBitSetPair = [ GraphVertBitSet, GraphVertBitSet ];

export type GraphEdgeBitSetGraphEdgeBitSetPair = [ GraphEdgeBitSet, GraphEdgeBitSet ];

export type FaceBitSetIntPair = [ FaceBitSet, number ];

export type VertBitSetIntPair = [ VertBitSet, number ];

export type EdgeBitSetIntPair = [ EdgeBitSet, number ];

export type UndirectedEdgeBitSetIntPair = [ UndirectedEdgeBitSet, number ];

export type PixelBitSetIntPair = [ PixelBitSet, number ];

export type VoxelBitSetIntPair = [ VoxelBitSet, number ];

export type RegionBitSetIntPair = [ RegionBitSet, number ];

export type NodeBitSetIntPair = [ NodeBitSet, number ];

export type ObjBitSetIntPair = [ ObjBitSet, number ];

export type TextureBitSetIntPair = [ TextureBitSet, number ];

export type GraphVertBitSetIntPair = [ GraphVertBitSet, number ];

export type GraphEdgeBitSetIntPair = [ GraphEdgeBitSet, number ];

export interface StdVectori extends ClassHandle {
  push_back(_0: number): void;
  resize(_0: number, _1: number): void;
  size(): number;
  get(_0: number): number | undefined;
  set(_0: number, _1: number): boolean;
}

export type VectorStdIntIntPair = [ StdVectori, number ];

export interface StdVectorf extends ClassHandle {
  push_back(_0: number): void;
  resize(_0: number, _1: number): void;
  size(): number;
  get(_0: number): number | undefined;
  set(_0: number, _1: number): boolean;
}

export type VectorStdFloatIntPair = [ StdVectorf, number ];

export type VectorStdFloatFloatPair = [ StdVectorf, number ];

export interface StdVectord extends ClassHandle {
  push_back(_0: number): void;
  resize(_0: number, _1: number): void;
  size(): number;
  get(_0: number): number | undefined;
  set(_0: number, _1: number): boolean;
}

export interface StdVectorll extends ClassHandle {
  push_back(_0: bigint): void;
  resize(_0: number, _1: bigint): void;
  size(): number;
  get(_0: number): bigint | undefined;
  set(_0: number, _1: bigint): boolean;
}

export interface VectorStdVectori extends ClassHandle {
  push_back(_0: StdVectori): void;
  resize(_0: number, _1: StdVectori): void;
  size(): number;
  get(_0: number): StdVectori | undefined;
  set(_0: number, _1: StdVectori): boolean;
}

export interface VectorStdVectorf extends ClassHandle {
  push_back(_0: StdVectorf): void;
  resize(_0: number, _1: StdVectorf): void;
  size(): number;
  get(_0: number): StdVectorf | undefined;
  set(_0: number, _1: StdVectorf): boolean;
}

export interface VectorStdVectord extends ClassHandle {
  push_back(_0: StdVectord): void;
  resize(_0: number, _1: StdVectord): void;
  size(): number;
  get(_0: number): StdVectord | undefined;
  set(_0: number, _1: StdVectord): boolean;
}

export interface VectorStdVectorll extends ClassHandle {
  push_back(_0: StdVectorll): void;
  resize(_0: number, _1: StdVectorll): void;
  size(): number;
  get(_0: number): StdVectorll | undefined;
  set(_0: number, _1: StdVectorll): boolean;
}

export interface VectorArray3StdVectori extends ClassHandle {
  size(): number;
  get(_0: number): Array3Stdi | undefined;
  push_back(_0: Array3Stdi): void;
  resize(_0: number, _1: Array3Stdi): void;
  set(_0: number, _1: Array3Stdi): boolean;
}

export interface VectorArray3StdVectorf extends ClassHandle {
  size(): number;
  get(_0: number): Array3Stdf | undefined;
  push_back(_0: Array3Stdf): void;
  resize(_0: number, _1: Array3Stdf): void;
  set(_0: number, _1: Array3Stdf): boolean;
}

export interface VectorArray3StdVectord extends ClassHandle {
  size(): number;
  get(_0: number): Array3Stdd | undefined;
  push_back(_0: Array3Stdd): void;
  resize(_0: number, _1: Array3Stdd): void;
  set(_0: number, _1: Array3Stdd): boolean;
}

export interface VectorArray3StdVectorll extends ClassHandle {
  size(): number;
  get(_0: number): Array3Stdll | undefined;
  push_back(_0: Array3Stdll): void;
  resize(_0: number, _1: Array3Stdll): void;
  set(_0: number, _1: Array3Stdll): boolean;
}

export interface VectorVectorStdi extends ClassHandle {
  size(): number;
  get(_0: number): VectorIntSizeT | undefined;
  push_back(_0: VectorIntSizeT): void;
  resize(_0: number, _1: VectorIntSizeT): void;
  set(_0: number, _1: VectorIntSizeT): boolean;
}

export interface VectorVectorStdd extends ClassHandle {
  size(): number;
  get(_0: number): VectorFloatSizeT | undefined;
  push_back(_0: VectorFloatSizeT): void;
  resize(_0: number, _1: VectorFloatSizeT): void;
  set(_0: number, _1: VectorFloatSizeT): boolean;
}

export interface VectorVectorStdf extends ClassHandle {
  size(): number;
  get(_0: number): VectorDoubleSizeT | undefined;
  push_back(_0: VectorDoubleSizeT): void;
  resize(_0: number, _1: VectorDoubleSizeT): void;
  set(_0: number, _1: VectorDoubleSizeT): boolean;
}

export interface VectorVectorStdll extends ClassHandle {
  size(): number;
  get(_0: number): VectorLongLongSizeT | undefined;
  push_back(_0: VectorLongLongSizeT): void;
  resize(_0: number, _1: VectorLongLongSizeT): void;
  set(_0: number, _1: VectorLongLongSizeT): boolean;
}

export interface VectorConstMeshPtr extends ClassHandle {
  push_back(_0: Mesh | null): void;
  resize(_0: number, _1: Mesh | null): void;
  size(): number;
  get(_0: number): Mesh | undefined;
  set(_0: number, _1: Mesh | null): boolean;
}

export interface VectorConstMeshTopologyPtr extends ClassHandle {
  push_back(_0: MeshTopology | null): void;
  resize(_0: number, _1: MeshTopology | null): void;
  size(): number;
  get(_0: number): MeshTopology | undefined;
  set(_0: number, _1: MeshTopology | null): boolean;
}

export interface VectorMeshPiece extends ClassHandle {
  push_back(_0: MeshPiece): void;
  resize(_0: number, _1: MeshPiece): void;
  size(): number;
  get(_0: number): MeshPiece | undefined;
  set(_0: number, _1: MeshPiece): boolean;
}

export interface SurfacePath extends ClassHandle {
  push_back(_0: EdgePoint): void;
  resize(_0: number, _1: EdgePoint): void;
  size(): number;
  get(_0: number): EdgePoint | undefined;
  set(_0: number, _1: EdgePoint): boolean;
}

export interface VectorAABBTreePointsPoint extends ClassHandle {
  size(): number;
  get(_0: number): AABBTreePointsPoint | undefined;
  push_back(_0: AABBTreePointsPoint): void;
  resize(_0: number, _1: AABBTreePointsPoint): void;
  set(_0: number, _1: AABBTreePointsPoint): boolean;
}

export interface VectorAABBTreePointsNode extends ClassHandle {
  push_back(_0: AABBTreePointsNode): void;
  resize(_0: number, _1: AABBTreePointsNode): void;
  size(): number;
  get(_0: number): AABBTreePointsNode | undefined;
  set(_0: number, _1: AABBTreePointsNode): boolean;
}

export interface VectorModelPointsData extends ClassHandle {
  push_back(_0: ModelPointsData): void;
  resize(_0: number, _1: ModelPointsData): void;
  size(): number;
  get(_0: number): ModelPointsData | undefined;
  set(_0: number, _1: ModelPointsData): boolean;
}

export interface VectorObjVertId extends ClassHandle {
  push_back(_0: ObjVertId): void;
  resize(_0: number, _1: ObjVertId): void;
  size(): number;
  get(_0: number): ObjVertId | undefined;
  set(_0: number, _1: ObjVertId): boolean;
}

export interface VectorMeshProjectionResult extends ClassHandle {
  push_back(_0: MeshProjectionResult): void;
  resize(_0: number, _1: MeshProjectionResult): void;
  size(): number;
  get(_0: number): MeshProjectionResult | undefined;
  set(_0: number, _1: MeshProjectionResult): boolean;
}

export interface VectorVertDuplication extends ClassHandle {
  push_back(_0: VertDuplication): void;
  resize(_0: number, _1: VertDuplication): void;
  size(): number;
  get(_0: number): VertDuplication | undefined;
  set(_0: number, _1: VertDuplication): boolean;
}

export interface VectorEdgeTri extends ClassHandle {
  push_back(_0: EdgeTri): void;
  resize(_0: number, _1: EdgeTri): void;
  size(): number;
  get(_0: number): EdgeTri | undefined;
  set(_0: number, _1: EdgeTri): boolean;
}

export interface ContinuousContour extends ClassHandle {
  push_back(_0: VarEdgeTri): void;
  resize(_0: number, _1: VarEdgeTri): void;
  size(): number;
  get(_0: number): VarEdgeTri | undefined;
  set(_0: number, _1: VarEdgeTri): boolean;
}

export interface ContinuousContours extends ClassHandle {
  push_back(_0: ContinuousContour): void;
  resize(_0: number, _1: ContinuousContour): void;
  size(): number;
  get(_0: number): ContinuousContour | undefined;
  set(_0: number, _1: ContinuousContour): boolean;
}

export interface OneMeshContours extends ClassHandle {
  push_back(_0: OneMeshContour): void;
  resize(_0: number, _1: OneMeshContour): void;
  size(): number;
  get(_0: number): OneMeshContour | undefined;
  set(_0: number, _1: OneMeshContour): boolean;
}

export interface VectorOneMeshIntersection extends ClassHandle {
  push_back(_0: OneMeshIntersection): void;
  resize(_0: number, _1: OneMeshIntersection): void;
  size(): number;
  get(_0: number): OneMeshIntersection | undefined;
  set(_0: number, _1: OneMeshIntersection): boolean;
}

export interface VectorMeshTriPoint extends ClassHandle {
  push_back(_0: MeshTriPoint): void;
  resize(_0: number, _1: MeshTriPoint): void;
  size(): number;
  get(_0: number): MeshTriPoint | undefined;
  set(_0: number, _1: MeshTriPoint): boolean;
}

export interface VectorFillHoleItem extends ClassHandle {
  push_back(_0: FillHoleItem): void;
  resize(_0: number, _1: FillHoleItem): void;
  size(): number;
  get(_0: number): FillHoleItem | undefined;
  set(_0: number, _1: FillHoleItem): boolean;
}

export type HoleFillPlan = {
  items: VectorFillHoleItem,
  numTris: number
};

export interface VectorHoleFillPlan extends ClassHandle {
  push_back(_0: HoleFillPlan): void;
  resize(_0: number, _1: HoleFillPlan): void;
  size(): number;
  get(_0: number): HoleFillPlan | undefined;
  set(_0: number, _1: HoleFillPlan): boolean;
}

export interface VectorFaceFace extends ClassHandle {
  push_back(_0: FaceFace): void;
  resize(_0: number, _1: FaceFace): void;
  size(): number;
  get(_0: number): FaceFace | undefined;
  set(_0: number, _1: FaceFace): boolean;
}

export interface VectorPointPair extends ClassHandle {
  push_back(_0: PointPair): void;
  resize(_0: number, _1: PointPair): void;
  size(): number;
  get(_0: number): PointPair | undefined;
  set(_0: number, _1: PointPair): boolean;
}

export interface VectorRigidXf3d extends ClassHandle {
  push_back(_0: RigidXf3d): void;
  resize(_0: number, _1: RigidXf3d): void;
  size(): number;
  get(_0: number): RigidXf3d | undefined;
  set(_0: number, _1: RigidXf3d): boolean;
}

export interface VectorRigidXf3f extends ClassHandle {
  push_back(_0: RigidXf3f): void;
  resize(_0: number, _1: RigidXf3f): void;
  size(): number;
  get(_0: number): RigidXf3f | undefined;
  set(_0: number, _1: RigidXf3f): boolean;
}

export interface VectorVectorMeshPiece extends ClassHandle {
  push_back(_0: VectorMeshPiece): void;
  resize(_0: number, _1: VectorMeshPiece): void;
  size(): number;
  get(_0: number): VectorMeshPiece | undefined;
  set(_0: number, _1: VectorMeshPiece): boolean;
}

export interface SurfacePaths extends ClassHandle {
  push_back(_0: SurfacePath): void;
  resize(_0: number, _1: SurfacePath): void;
  size(): number;
  get(_0: number): SurfacePath | undefined;
  set(_0: number, _1: SurfacePath): boolean;
}

export interface VectorVectorAABBTreePointsPoint extends ClassHandle {
  push_back(_0: VectorAABBTreePointsPoint): void;
  resize(_0: number, _1: VectorAABBTreePointsPoint): void;
  size(): number;
  get(_0: number): VectorAABBTreePointsPoint | undefined;
  set(_0: number, _1: VectorAABBTreePointsPoint): boolean;
}

export interface VectorVectorAABBTreePointsNode extends ClassHandle {
  push_back(_0: VectorAABBTreePointsNode): void;
  resize(_0: number, _1: VectorAABBTreePointsNode): void;
  size(): number;
  get(_0: number): VectorAABBTreePointsNode | undefined;
  set(_0: number, _1: VectorAABBTreePointsNode): boolean;
}

export interface VectorVectorModelPointsData extends ClassHandle {
  push_back(_0: VectorModelPointsData): void;
  resize(_0: number, _1: VectorModelPointsData): void;
  size(): number;
  get(_0: number): VectorModelPointsData | undefined;
  set(_0: number, _1: VectorModelPointsData): boolean;
}

export interface VectorVectorObjVertId extends ClassHandle {
  push_back(_0: VectorObjVertId): void;
  resize(_0: number, _1: VectorObjVertId): void;
  size(): number;
  get(_0: number): VectorObjVertId | undefined;
  set(_0: number, _1: VectorObjVertId): boolean;
}

export interface VectorVectorMeshProjectionResult extends ClassHandle {
  push_back(_0: VectorMeshProjectionResult): void;
  resize(_0: number, _1: VectorMeshProjectionResult): void;
  size(): number;
  get(_0: number): VectorMeshProjectionResult | undefined;
  set(_0: number, _1: VectorMeshProjectionResult): boolean;
}

export interface VectorVectorVertDuplication extends ClassHandle {
  push_back(_0: VectorVertDuplication): void;
  resize(_0: number, _1: VectorVertDuplication): void;
  size(): number;
  get(_0: number): VectorVertDuplication | undefined;
  set(_0: number, _1: VectorVertDuplication): boolean;
}

export interface VectorVectorEdgeTri extends ClassHandle {
  push_back(_0: VectorEdgeTri): void;
  resize(_0: number, _1: VectorEdgeTri): void;
  size(): number;
  get(_0: number): VectorEdgeTri | undefined;
  set(_0: number, _1: VectorEdgeTri): boolean;
}

export interface VectorContinuousContours extends ClassHandle {
  push_back(_0: ContinuousContours): void;
  resize(_0: number, _1: ContinuousContours): void;
  size(): number;
  get(_0: number): ContinuousContours | undefined;
  set(_0: number, _1: ContinuousContours): boolean;
}

export interface VectorOneMeshContours extends ClassHandle {
  push_back(_0: OneMeshContours): void;
  resize(_0: number, _1: OneMeshContours): void;
  size(): number;
  get(_0: number): OneMeshContours | undefined;
  set(_0: number, _1: OneMeshContours): boolean;
}

export interface VectorVectorOneMeshIntersection extends ClassHandle {
  push_back(_0: VectorOneMeshIntersection): void;
  resize(_0: number, _1: VectorOneMeshIntersection): void;
  size(): number;
  get(_0: number): VectorOneMeshIntersection | undefined;
  set(_0: number, _1: VectorOneMeshIntersection): boolean;
}

export interface VectorVectorMeshTriPoint extends ClassHandle {
  push_back(_0: VectorMeshTriPoint): void;
  resize(_0: number, _1: VectorMeshTriPoint): void;
  size(): number;
  get(_0: number): VectorMeshTriPoint | undefined;
  set(_0: number, _1: VectorMeshTriPoint): boolean;
}

export interface VectorVectorFaceFace extends ClassHandle {
  push_back(_0: VectorFaceFace): void;
  resize(_0: number, _1: VectorFaceFace): void;
  size(): number;
  get(_0: number): VectorFaceFace | undefined;
  set(_0: number, _1: VectorFaceFace): boolean;
}

export interface VectorBox3f extends ClassHandle {
  push_back(_0: Box3f): void;
  resize(_0: number, _1: Box3f): void;
  size(): number;
  get(_0: number): Box3f | undefined;
  set(_0: number, _1: Box3f): boolean;
}

export interface VectorBox3i extends ClassHandle {
  push_back(_0: Box3i): void;
  resize(_0: number, _1: Box3i): void;
  size(): number;
  get(_0: number): Box3i | undefined;
  set(_0: number, _1: Box3i): boolean;
}

export interface VectorBox3i64 extends ClassHandle {
  push_back(_0: Box3i64): void;
  resize(_0: number, _1: Box3i64): void;
  size(): number;
  get(_0: number): Box3i64 | undefined;
  set(_0: number, _1: Box3i64): boolean;
}

export interface VectorBox3d extends ClassHandle {
  push_back(_0: Box3d): void;
  resize(_0: number, _1: Box3d): void;
  size(): number;
  get(_0: number): Box3d | undefined;
  set(_0: number, _1: Box3d): boolean;
}

export interface VectorICPGroupPair extends ClassHandle {
  push_back(_0: ICPGroupPair): void;
  resize(_0: number, _1: ICPGroupPair): void;
  size(): number;
  get(_0: number): ICPGroupPair | undefined;
  set(_0: number, _1: ICPGroupPair): boolean;
}

export interface VectorArray2Vector2i extends ClassHandle {
  size(): number;
  get(_0: number): Array2Vector2i | undefined;
  push_back(_0: Array2Vector2i): void;
  resize(_0: number, _1: Array2Vector2i): void;
  set(_0: number, _1: Array2Vector2i): boolean;
}

export interface VectorArray2Vector2f extends ClassHandle {
  size(): number;
  get(_0: number): Array2Vector2f | undefined;
  push_back(_0: Array2Vector2f): void;
  resize(_0: number, _1: Array2Vector2f): void;
  set(_0: number, _1: Array2Vector2f): boolean;
}

export interface VectorArray2Vector2d extends ClassHandle {
  size(): number;
  get(_0: number): Array2Vector2d | undefined;
  push_back(_0: Array2Vector2d): void;
  resize(_0: number, _1: Array2Vector2d): void;
  set(_0: number, _1: Array2Vector2d): boolean;
}

export interface VectorArray3Vector2i extends ClassHandle {
  size(): number;
  get(_0: number): Array3Vector2i | undefined;
  push_back(_0: Array3Vector2i): void;
  resize(_0: number, _1: Array3Vector2i): void;
  set(_0: number, _1: Array3Vector2i): boolean;
}

export interface VectorArray3Vector2f extends ClassHandle {
  size(): number;
  get(_0: number): Array3Vector2f | undefined;
  push_back(_0: Array3Vector2f): void;
  resize(_0: number, _1: Array3Vector2f): void;
  set(_0: number, _1: Array3Vector2f): boolean;
}

export interface VectorArray3Vector2d extends ClassHandle {
  size(): number;
  get(_0: number): Array3Vector2d | undefined;
  push_back(_0: Array3Vector2d): void;
  resize(_0: number, _1: Array3Vector2d): void;
  set(_0: number, _1: Array3Vector2d): boolean;
}

export interface VectorArray2Triangle3i extends ClassHandle {
  size(): number;
  get(_0: number): Array2Triangle3i | undefined;
  push_back(_0: Array2Triangle3i): void;
  resize(_0: number, _1: Array2Triangle3i): void;
  set(_0: number, _1: Array2Triangle3i): boolean;
}

export interface VectorArray2Triangle3f extends ClassHandle {
  size(): number;
  get(_0: number): Array2Triangle3f | undefined;
  push_back(_0: Array2Triangle3f): void;
  resize(_0: number, _1: Array2Triangle3f): void;
  set(_0: number, _1: Array2Triangle3f): boolean;
}

export interface VectorArray2Triangle3d extends ClassHandle {
  size(): number;
  get(_0: number): Array2Triangle3d | undefined;
  push_back(_0: Array2Triangle3d): void;
  resize(_0: number, _1: Array2Triangle3d): void;
  set(_0: number, _1: Array2Triangle3d): boolean;
}

export interface VectorArray3Triangle3i extends ClassHandle {
  size(): number;
  get(_0: number): Array3Triangle3i | undefined;
  push_back(_0: Array3Triangle3i): void;
  resize(_0: number, _1: Array3Triangle3i): void;
  set(_0: number, _1: Array3Triangle3i): boolean;
}

export interface VectorArray3Triangle3f extends ClassHandle {
  fromPointTriples(_0: boolean): Mesh;
  size(): number;
  get(_0: number): Array3Triangle3f | undefined;
  push_back(_0: Array3Triangle3f): void;
  resize(_0: number, _1: Array3Triangle3f): void;
  set(_0: number, _1: Array3Triangle3f): boolean;
}

export interface VectorArray3Triangle3d extends ClassHandle {
  size(): number;
  get(_0: number): Array3Triangle3d | undefined;
  push_back(_0: Array3Triangle3d): void;
  resize(_0: number, _1: Array3Triangle3d): void;
  set(_0: number, _1: Array3Triangle3d): boolean;
}

export interface VectorEdgeId extends ClassHandle {
  push_back(_0: EdgeId): void;
  resize(_0: number, _1: EdgeId): void;
  size(): number;
  get(_0: number): EdgeId | undefined;
  set(_0: number, _1: EdgeId): boolean;
}

export interface VectorUndirectedEdgeId extends ClassHandle {
  push_back(_0: UndirectedEdgeId): void;
  resize(_0: number, _1: UndirectedEdgeId): void;
  size(): number;
  get(_0: number): UndirectedEdgeId | undefined;
  set(_0: number, _1: UndirectedEdgeId): boolean;
}

export interface VectorFaceId extends ClassHandle {
  push_back(_0: FaceId): void;
  resize(_0: number, _1: FaceId): void;
  size(): number;
  get(_0: number): FaceId | undefined;
  set(_0: number, _1: FaceId): boolean;
}

export interface VectorVertId extends ClassHandle {
  push_back(_0: VertId): void;
  resize(_0: number, _1: VertId): void;
  size(): number;
  get(_0: number): VertId | undefined;
  set(_0: number, _1: VertId): boolean;
}

export interface VectorPixelId extends ClassHandle {
  push_back(_0: PixelId): void;
  resize(_0: number, _1: PixelId): void;
  size(): number;
  get(_0: number): PixelId | undefined;
  set(_0: number, _1: PixelId): boolean;
}

export interface VectorVoxelId extends ClassHandle {
  push_back(_0: VoxelId): void;
  resize(_0: number, _1: VoxelId): void;
  size(): number;
  get(_0: number): VoxelId | undefined;
  set(_0: number, _1: VoxelId): boolean;
}

export interface VectorRegionId extends ClassHandle {
  push_back(_0: RegionId): void;
  resize(_0: number, _1: RegionId): void;
  size(): number;
  get(_0: number): RegionId | undefined;
  set(_0: number, _1: RegionId): boolean;
}

export interface VectorNodeId extends ClassHandle {
  push_back(_0: NodeId): void;
  resize(_0: number, _1: NodeId): void;
  size(): number;
  get(_0: number): NodeId | undefined;
  set(_0: number, _1: NodeId): boolean;
}

export interface VectorObjId extends ClassHandle {
  push_back(_0: ObjId): void;
  resize(_0: number, _1: ObjId): void;
  size(): number;
  get(_0: number): ObjId | undefined;
  set(_0: number, _1: ObjId): boolean;
}

export interface VectorTextureId extends ClassHandle {
  push_back(_0: TextureId): void;
  resize(_0: number, _1: TextureId): void;
  size(): number;
  get(_0: number): TextureId | undefined;
  set(_0: number, _1: TextureId): boolean;
}

export interface VectorGraphVertId extends ClassHandle {
  push_back(_0: GraphVertId): void;
  resize(_0: number, _1: GraphVertId): void;
  size(): number;
  get(_0: number): GraphVertId | undefined;
  set(_0: number, _1: GraphVertId): boolean;
}

export interface VectorGraphEdgeId extends ClassHandle {
  push_back(_0: GraphEdgeId): void;
  resize(_0: number, _1: GraphEdgeId): void;
  size(): number;
  get(_0: number): GraphEdgeId | undefined;
  set(_0: number, _1: GraphEdgeId): boolean;
}

export interface VectorEdgePath extends ClassHandle {
  push_back(_0: VectorEdgeId): void;
  resize(_0: number, _1: VectorEdgeId): void;
  size(): number;
  get(_0: number): VectorEdgeId | undefined;
  set(_0: number, _1: VectorEdgeId): boolean;
}

export type CutMeshResult = {
  resultCut: VectorEdgePath,
  fbsWithContourIntersections: FaceBitSet
};

export interface VectorVectorEdgePath extends ClassHandle {
  push_back(_0: VectorEdgePath): void;
  resize(_0: number, _1: VectorEdgePath): void;
  size(): number;
  get(_0: number): VectorEdgePath | undefined;
  set(_0: number, _1: VectorEdgePath): boolean;
}

export interface VectorSurfacePaths extends ClassHandle {
  push_back(_0: SurfacePaths): void;
  resize(_0: number, _1: SurfacePaths): void;
  size(): number;
  get(_0: number): SurfacePaths | undefined;
  set(_0: number, _1: SurfacePaths): boolean;
}

export interface VectorVectorUndirectedEdgeId extends ClassHandle {
  push_back(_0: VectorUndirectedEdgeId): void;
  resize(_0: number, _1: VectorUndirectedEdgeId): void;
  size(): number;
  get(_0: number): VectorUndirectedEdgeId | undefined;
  set(_0: number, _1: VectorUndirectedEdgeId): boolean;
}

export interface VectorVectorFaceId extends ClassHandle {
  push_back(_0: VectorFaceId): void;
  resize(_0: number, _1: VectorFaceId): void;
  size(): number;
  get(_0: number): VectorFaceId | undefined;
  set(_0: number, _1: VectorFaceId): boolean;
}

export interface VectorVectorVertId extends ClassHandle {
  push_back(_0: VectorVertId): void;
  resize(_0: number, _1: VectorVertId): void;
  size(): number;
  get(_0: number): VectorVertId | undefined;
  set(_0: number, _1: VectorVertId): boolean;
}

export interface VectorVectorPixelId extends ClassHandle {
  push_back(_0: VectorPixelId): void;
  resize(_0: number, _1: VectorPixelId): void;
  size(): number;
  get(_0: number): VectorPixelId | undefined;
  set(_0: number, _1: VectorPixelId): boolean;
}

export interface VectorVectorVoxelId extends ClassHandle {
  push_back(_0: VectorVoxelId): void;
  resize(_0: number, _1: VectorVoxelId): void;
  size(): number;
  get(_0: number): VectorVoxelId | undefined;
  set(_0: number, _1: VectorVoxelId): boolean;
}

export interface VectorVectorRegionId extends ClassHandle {
  push_back(_0: VectorRegionId): void;
  resize(_0: number, _1: VectorRegionId): void;
  size(): number;
  get(_0: number): VectorRegionId | undefined;
  set(_0: number, _1: VectorRegionId): boolean;
}

export interface VectorVectorNodeId extends ClassHandle {
  push_back(_0: VectorNodeId): void;
  resize(_0: number, _1: VectorNodeId): void;
  size(): number;
  get(_0: number): VectorNodeId | undefined;
  set(_0: number, _1: VectorNodeId): boolean;
}

export interface VectorVectorObjId extends ClassHandle {
  push_back(_0: VectorObjId): void;
  resize(_0: number, _1: VectorObjId): void;
  size(): number;
  get(_0: number): VectorObjId | undefined;
  set(_0: number, _1: VectorObjId): boolean;
}

export interface VectorVectorTextureId extends ClassHandle {
  push_back(_0: VectorTextureId): void;
  resize(_0: number, _1: VectorTextureId): void;
  size(): number;
  get(_0: number): VectorTextureId | undefined;
  set(_0: number, _1: VectorTextureId): boolean;
}

export interface VectorVectorGraphVertId extends ClassHandle {
  push_back(_0: VectorGraphVertId): void;
  resize(_0: number, _1: VectorGraphVertId): void;
  size(): number;
  get(_0: number): VectorGraphVertId | undefined;
  set(_0: number, _1: VectorGraphVertId): boolean;
}

export interface VectorVectorGraphEdgeId extends ClassHandle {
  push_back(_0: VectorGraphEdgeId): void;
  resize(_0: number, _1: VectorGraphEdgeId): void;
  size(): number;
  get(_0: number): VectorGraphEdgeId | undefined;
  set(_0: number, _1: VectorGraphEdgeId): boolean;
}

export interface VectorFaceBitSet extends ClassHandle {
  push_back(_0: FaceBitSet): void;
  resize(_0: number, _1: FaceBitSet): void;
  size(): number;
  get(_0: number): FaceBitSet | undefined;
  set(_0: number, _1: FaceBitSet): boolean;
}

export type VectorFaceBitSetIntPair = [ VectorFaceBitSet, number ];

export interface VectorVertBitSet extends ClassHandle {
  push_back(_0: VertBitSet): void;
  resize(_0: number, _1: VertBitSet): void;
  size(): number;
  get(_0: number): VertBitSet | undefined;
  set(_0: number, _1: VertBitSet): boolean;
}

export type VectorVertBitSetIntPair = [ VectorVertBitSet, number ];

export interface VectorEdgeBitSet extends ClassHandle {
  push_back(_0: EdgeBitSet): void;
  resize(_0: number, _1: EdgeBitSet): void;
  size(): number;
  get(_0: number): EdgeBitSet | undefined;
  set(_0: number, _1: EdgeBitSet): boolean;
}

export type VectorEdgeBitSetIntPair = [ VectorEdgeBitSet, number ];

export interface VectorUndirectedEdgeBitSet extends ClassHandle {
  push_back(_0: UndirectedEdgeBitSet): void;
  resize(_0: number, _1: UndirectedEdgeBitSet): void;
  size(): number;
  get(_0: number): UndirectedEdgeBitSet | undefined;
  set(_0: number, _1: UndirectedEdgeBitSet): boolean;
}

export type VectorUndirectedEdgeBitSetIntPair = [ VectorUndirectedEdgeBitSet, number ];

export interface VectorPixelBitSet extends ClassHandle {
  push_back(_0: PixelBitSet): void;
  resize(_0: number, _1: PixelBitSet): void;
  size(): number;
  get(_0: number): PixelBitSet | undefined;
  set(_0: number, _1: PixelBitSet): boolean;
}

export type VectorPixelBitSetIntPair = [ VectorPixelBitSet, number ];

export interface VectorVoxelBitSet extends ClassHandle {
  push_back(_0: VoxelBitSet): void;
  resize(_0: number, _1: VoxelBitSet): void;
  size(): number;
  get(_0: number): VoxelBitSet | undefined;
  set(_0: number, _1: VoxelBitSet): boolean;
}

export type VectorVoxelBitSetIntPair = [ VectorVoxelBitSet, number ];

export interface VectorRegionBitSet extends ClassHandle {
  push_back(_0: RegionBitSet): void;
  resize(_0: number, _1: RegionBitSet): void;
  size(): number;
  get(_0: number): RegionBitSet | undefined;
  set(_0: number, _1: RegionBitSet): boolean;
}

export type VectorRegionBitSetIntPair = [ VectorRegionBitSet, number ];

export interface VectorNodeBitSet extends ClassHandle {
  push_back(_0: NodeBitSet): void;
  resize(_0: number, _1: NodeBitSet): void;
  size(): number;
  get(_0: number): NodeBitSet | undefined;
  set(_0: number, _1: NodeBitSet): boolean;
}

export type VectorNodeBitSetIntPair = [ VectorNodeBitSet, number ];

export interface VectorObjBitSet extends ClassHandle {
  push_back(_0: ObjBitSet): void;
  resize(_0: number, _1: ObjBitSet): void;
  size(): number;
  get(_0: number): ObjBitSet | undefined;
  set(_0: number, _1: ObjBitSet): boolean;
}

export type VectorObjBitSetIntPair = [ VectorObjBitSet, number ];

export interface VectorTextureBitSet extends ClassHandle {
  push_back(_0: TextureBitSet): void;
  resize(_0: number, _1: TextureBitSet): void;
  size(): number;
  get(_0: number): TextureBitSet | undefined;
  set(_0: number, _1: TextureBitSet): boolean;
}

export type VectorTextureBitSetIntPair = [ VectorTextureBitSet, number ];

export interface VectorGraphVertBitSet extends ClassHandle {
  push_back(_0: GraphVertBitSet): void;
  resize(_0: number, _1: GraphVertBitSet): void;
  size(): number;
  get(_0: number): GraphVertBitSet | undefined;
  set(_0: number, _1: GraphVertBitSet): boolean;
}

export type VectorGraphVertBitSetIntPair = [ VectorGraphVertBitSet, number ];

export interface VectorGraphEdgeBitSet extends ClassHandle {
  push_back(_0: GraphEdgeBitSet): void;
  resize(_0: number, _1: GraphEdgeBitSet): void;
  size(): number;
  get(_0: number): GraphEdgeBitSet | undefined;
  set(_0: number, _1: GraphEdgeBitSet): boolean;
}

export type VectorGraphEdgeBitSetIntPair = [ VectorGraphEdgeBitSet, number ];

export interface VectorArray2EdgeId extends ClassHandle {
  size(): number;
  get(_0: number): Array2EdgeId | undefined;
  push_back(_0: Array2EdgeId): void;
  resize(_0: number, _1: Array2EdgeId): void;
  set(_0: number, _1: Array2EdgeId): boolean;
}

export interface VectorArray2UndirectedEdgeId extends ClassHandle {
  size(): number;
  get(_0: number): Array2UndirectedEdgeId | undefined;
  push_back(_0: Array2UndirectedEdgeId): void;
  resize(_0: number, _1: Array2UndirectedEdgeId): void;
  set(_0: number, _1: Array2UndirectedEdgeId): boolean;
}

export interface VectorArray2FaceId extends ClassHandle {
  size(): number;
  get(_0: number): Array2FaceId | undefined;
  push_back(_0: Array2FaceId): void;
  resize(_0: number, _1: Array2FaceId): void;
  set(_0: number, _1: Array2FaceId): boolean;
}

export interface VectorArray2VertId extends ClassHandle {
  size(): number;
  get(_0: number): Array2VertId | undefined;
  push_back(_0: Array2VertId): void;
  resize(_0: number, _1: Array2VertId): void;
  set(_0: number, _1: Array2VertId): boolean;
}

export interface VectorArray2PixelId extends ClassHandle {
  size(): number;
  get(_0: number): Array2PixelId | undefined;
  push_back(_0: Array2PixelId): void;
  resize(_0: number, _1: Array2PixelId): void;
  set(_0: number, _1: Array2PixelId): boolean;
}

export interface VectorArray2VoxelId extends ClassHandle {
  size(): number;
  get(_0: number): Array2VoxelId | undefined;
  push_back(_0: Array2VoxelId): void;
  resize(_0: number, _1: Array2VoxelId): void;
  set(_0: number, _1: Array2VoxelId): boolean;
}

export interface VectorArray2RegionId extends ClassHandle {
  size(): number;
  get(_0: number): Array2RegionId | undefined;
  push_back(_0: Array2RegionId): void;
  resize(_0: number, _1: Array2RegionId): void;
  set(_0: number, _1: Array2RegionId): boolean;
}

export interface VectorArray2NodeId extends ClassHandle {
  size(): number;
  get(_0: number): Array2NodeId | undefined;
  push_back(_0: Array2NodeId): void;
  resize(_0: number, _1: Array2NodeId): void;
  set(_0: number, _1: Array2NodeId): boolean;
}

export interface VectorArray2ObjId extends ClassHandle {
  size(): number;
  get(_0: number): Array2ObjId | undefined;
  push_back(_0: Array2ObjId): void;
  resize(_0: number, _1: Array2ObjId): void;
  set(_0: number, _1: Array2ObjId): boolean;
}

export interface VectorArray2TextureId extends ClassHandle {
  size(): number;
  get(_0: number): Array2TextureId | undefined;
  push_back(_0: Array2TextureId): void;
  resize(_0: number, _1: Array2TextureId): void;
  set(_0: number, _1: Array2TextureId): boolean;
}

export interface VectorArray2GraphVertId extends ClassHandle {
  size(): number;
  get(_0: number): Array2GraphVertId | undefined;
  push_back(_0: Array2GraphVertId): void;
  resize(_0: number, _1: Array2GraphVertId): void;
  set(_0: number, _1: Array2GraphVertId): boolean;
}

export interface VectorArray2GraphEdgeId extends ClassHandle {
  size(): number;
  get(_0: number): Array2GraphEdgeId | undefined;
  push_back(_0: Array2GraphEdgeId): void;
  resize(_0: number, _1: Array2GraphEdgeId): void;
  set(_0: number, _1: Array2GraphEdgeId): boolean;
}

export interface VectorArray3EdgeId extends ClassHandle {
  size(): number;
  get(_0: number): Array3EdgeId | undefined;
  push_back(_0: Array3EdgeId): void;
  resize(_0: number, _1: Array3EdgeId): void;
  set(_0: number, _1: Array3EdgeId): boolean;
}

export interface VectorArray3UndirectedEdgeId extends ClassHandle {
  size(): number;
  get(_0: number): Array3UndirectedEdgeId | undefined;
  push_back(_0: Array3UndirectedEdgeId): void;
  resize(_0: number, _1: Array3UndirectedEdgeId): void;
  set(_0: number, _1: Array3UndirectedEdgeId): boolean;
}

export interface VectorArray3FaceId extends ClassHandle {
  size(): number;
  get(_0: number): Array3FaceId | undefined;
  push_back(_0: Array3FaceId): void;
  resize(_0: number, _1: Array3FaceId): void;
  set(_0: number, _1: Array3FaceId): boolean;
}

export interface VectorArray3VertId extends ClassHandle {
  size(): number;
  get(_0: number): Array3VertId | undefined;
  push_back(_0: Array3VertId): void;
  resize(_0: number, _1: Array3VertId): void;
  set(_0: number, _1: Array3VertId): boolean;
}

export interface VectorArray3PixelId extends ClassHandle {
  size(): number;
  get(_0: number): Array3PixelId | undefined;
  push_back(_0: Array3PixelId): void;
  resize(_0: number, _1: Array3PixelId): void;
  set(_0: number, _1: Array3PixelId): boolean;
}

export interface VectorArray3VoxelId extends ClassHandle {
  size(): number;
  get(_0: number): Array3VoxelId | undefined;
  push_back(_0: Array3VoxelId): void;
  resize(_0: number, _1: Array3VoxelId): void;
  set(_0: number, _1: Array3VoxelId): boolean;
}

export interface VectorArray3RegionId extends ClassHandle {
  size(): number;
  get(_0: number): Array3RegionId | undefined;
  push_back(_0: Array3RegionId): void;
  resize(_0: number, _1: Array3RegionId): void;
  set(_0: number, _1: Array3RegionId): boolean;
}

export interface VectorArray3NodeId extends ClassHandle {
  size(): number;
  get(_0: number): Array3NodeId | undefined;
  push_back(_0: Array3NodeId): void;
  resize(_0: number, _1: Array3NodeId): void;
  set(_0: number, _1: Array3NodeId): boolean;
}

export interface VectorArray3ObjId extends ClassHandle {
  size(): number;
  get(_0: number): Array3ObjId | undefined;
  push_back(_0: Array3ObjId): void;
  resize(_0: number, _1: Array3ObjId): void;
  set(_0: number, _1: Array3ObjId): boolean;
}

export interface VectorArray3TextureId extends ClassHandle {
  size(): number;
  get(_0: number): Array3TextureId | undefined;
  push_back(_0: Array3TextureId): void;
  resize(_0: number, _1: Array3TextureId): void;
  set(_0: number, _1: Array3TextureId): boolean;
}

export interface VectorArray3GraphVertId extends ClassHandle {
  size(): number;
  get(_0: number): Array3GraphVertId | undefined;
  push_back(_0: Array3GraphVertId): void;
  resize(_0: number, _1: Array3GraphVertId): void;
  set(_0: number, _1: Array3GraphVertId): boolean;
}

export interface VectorArray3GraphEdgeId extends ClassHandle {
  size(): number;
  get(_0: number): Array3GraphEdgeId | undefined;
  push_back(_0: Array3GraphEdgeId): void;
  resize(_0: number, _1: Array3GraphEdgeId): void;
  set(_0: number, _1: Array3GraphEdgeId): boolean;
}

export interface VectorArray4EdgeId extends ClassHandle {
  size(): number;
  get(_0: number): Array4EdgeId | undefined;
  push_back(_0: Array4EdgeId): void;
  resize(_0: number, _1: Array4EdgeId): void;
  set(_0: number, _1: Array4EdgeId): boolean;
}

export interface VectorArray4UndirectedEdgeId extends ClassHandle {
  size(): number;
  get(_0: number): Array4UndirectedEdgeId | undefined;
  push_back(_0: Array4UndirectedEdgeId): void;
  resize(_0: number, _1: Array4UndirectedEdgeId): void;
  set(_0: number, _1: Array4UndirectedEdgeId): boolean;
}

export interface VectorArray4FaceId extends ClassHandle {
  size(): number;
  get(_0: number): Array4FaceId | undefined;
  push_back(_0: Array4FaceId): void;
  resize(_0: number, _1: Array4FaceId): void;
  set(_0: number, _1: Array4FaceId): boolean;
}

export interface VectorArray4VertId extends ClassHandle {
  size(): number;
  get(_0: number): Array4VertId | undefined;
  push_back(_0: Array4VertId): void;
  resize(_0: number, _1: Array4VertId): void;
  set(_0: number, _1: Array4VertId): boolean;
}

export interface VectorArray4PixelId extends ClassHandle {
  size(): number;
  get(_0: number): Array4PixelId | undefined;
  push_back(_0: Array4PixelId): void;
  resize(_0: number, _1: Array4PixelId): void;
  set(_0: number, _1: Array4PixelId): boolean;
}

export interface VectorArray4VoxelId extends ClassHandle {
  size(): number;
  get(_0: number): Array4VoxelId | undefined;
  push_back(_0: Array4VoxelId): void;
  resize(_0: number, _1: Array4VoxelId): void;
  set(_0: number, _1: Array4VoxelId): boolean;
}

export interface VectorArray4RegionId extends ClassHandle {
  size(): number;
  get(_0: number): Array4RegionId | undefined;
  push_back(_0: Array4RegionId): void;
  resize(_0: number, _1: Array4RegionId): void;
  set(_0: number, _1: Array4RegionId): boolean;
}

export interface VectorArray4NodeId extends ClassHandle {
  size(): number;
  get(_0: number): Array4NodeId | undefined;
  push_back(_0: Array4NodeId): void;
  resize(_0: number, _1: Array4NodeId): void;
  set(_0: number, _1: Array4NodeId): boolean;
}

export interface VectorArray4ObjId extends ClassHandle {
  size(): number;
  get(_0: number): Array4ObjId | undefined;
  push_back(_0: Array4ObjId): void;
  resize(_0: number, _1: Array4ObjId): void;
  set(_0: number, _1: Array4ObjId): boolean;
}

export interface VectorArray4TextureId extends ClassHandle {
  size(): number;
  get(_0: number): Array4TextureId | undefined;
  push_back(_0: Array4TextureId): void;
  resize(_0: number, _1: Array4TextureId): void;
  set(_0: number, _1: Array4TextureId): boolean;
}

export interface VectorArray4GraphVertId extends ClassHandle {
  size(): number;
  get(_0: number): Array4GraphVertId | undefined;
  push_back(_0: Array4GraphVertId): void;
  resize(_0: number, _1: Array4GraphVertId): void;
  set(_0: number, _1: Array4GraphVertId): boolean;
}

export interface VectorArray4GraphEdgeId extends ClassHandle {
  size(): number;
  get(_0: number): Array4GraphEdgeId | undefined;
  push_back(_0: Array4GraphEdgeId): void;
  resize(_0: number, _1: Array4GraphEdgeId): void;
  set(_0: number, _1: Array4GraphEdgeId): boolean;
}

export interface EdgeHashMapEntries extends ClassHandle {
  push_back(_0: EdgeIdPair): void;
  resize(_0: number, _1: EdgeIdPair): void;
  size(): number;
  get(_0: number): EdgeIdPair | undefined;
  set(_0: number, _1: EdgeIdPair): boolean;
}

export interface UndirectedEdgeHashMapEntries extends ClassHandle {
  push_back(_0: UndirectedEdgeIdPair): void;
  resize(_0: number, _1: UndirectedEdgeIdPair): void;
  size(): number;
  get(_0: number): UndirectedEdgeIdPair | undefined;
  set(_0: number, _1: UndirectedEdgeIdPair): boolean;
}

export interface WholeEdgeHashMapEntries extends ClassHandle {
  push_back(_0: UndirectedE2EIdPair): void;
  resize(_0: number, _1: UndirectedE2EIdPair): void;
  size(): number;
  get(_0: number): UndirectedE2EIdPair | undefined;
  set(_0: number, _1: UndirectedE2EIdPair): boolean;
}

export interface FaceHashMapEntries extends ClassHandle {
  push_back(_0: FaceIdPair): void;
  resize(_0: number, _1: FaceIdPair): void;
  size(): number;
  get(_0: number): FaceIdPair | undefined;
  set(_0: number, _1: FaceIdPair): boolean;
}

export interface VertHashMapEntries extends ClassHandle {
  push_back(_0: VertIdPair): void;
  resize(_0: number, _1: VertIdPair): void;
  size(): number;
  get(_0: number): VertIdPair | undefined;
  set(_0: number, _1: VertIdPair): boolean;
}

export interface VectorVertSpanFaceIdMap extends ClassHandle {
  push_back(_0: VertSpanFaceIdMap): void;
  resize(_0: number, _1: VertSpanFaceIdMap): void;
  size(): number;
  get(_0: number): VertSpanFaceIdMap | undefined;
  set(_0: number, _1: VertSpanFaceIdMap): boolean;
}

export interface VectorVertIdEdgeIdMap extends ClassHandle {
  push_back(_0: VertIdEdgeIdMap): void;
  resize(_0: number, _1: VertIdEdgeIdMap): void;
  size(): number;
  get(_0: number): VertIdEdgeIdMap | undefined;
  set(_0: number, _1: VertIdEdgeIdMap): boolean;
}

export interface VectorEdgeIdVertIdMap extends ClassHandle {
  push_back(_0: EdgeIdVertIdMap): void;
  resize(_0: number, _1: EdgeIdVertIdMap): void;
  size(): number;
  get(_0: number): EdgeIdVertIdMap | undefined;
  set(_0: number, _1: EdgeIdVertIdMap): boolean;
}

export interface VectorEdgeIdFaceIdMap extends ClassHandle {
  push_back(_0: EdgeIdFaceIdMap): void;
  resize(_0: number, _1: EdgeIdFaceIdMap): void;
  size(): number;
  get(_0: number): EdgeIdFaceIdMap | undefined;
  set(_0: number, _1: EdgeIdFaceIdMap): boolean;
}

export interface VectorFaceIdEdgeIdMap extends ClassHandle {
  push_back(_0: FaceIdEdgeIdMap): void;
  resize(_0: number, _1: FaceIdEdgeIdMap): void;
  size(): number;
  get(_0: number): FaceIdEdgeIdMap | undefined;
  set(_0: number, _1: FaceIdEdgeIdMap): boolean;
}

export interface VectorModelPointsDataObjIdMap extends ClassHandle {
  push_back(_0: ModelPointsDataObjIdMap): void;
  resize(_0: number, _1: ModelPointsDataObjIdMap): void;
  size(): number;
  get(_0: number): ModelPointsDataObjIdMap | undefined;
  set(_0: number, _1: ModelPointsDataObjIdMap): boolean;
}

export interface VectorWholeEdgeMap extends ClassHandle {
  push_back(_0: WholeEdgeMap): void;
  resize(_0: number, _1: WholeEdgeMap): void;
  size(): number;
  get(_0: number): WholeEdgeMap | undefined;
  set(_0: number, _1: WholeEdgeMap): boolean;
}

export interface VectorUndirectedEdge2RegionMap extends ClassHandle {
  push_back(_0: UndirectedEdge2RegionMap): void;
  resize(_0: number, _1: UndirectedEdge2RegionMap): void;
  size(): number;
  get(_0: number): UndirectedEdge2RegionMap | undefined;
  set(_0: number, _1: UndirectedEdge2RegionMap): boolean;
}

export interface VectorFace2RegionMap extends ClassHandle {
  push_back(_0: Face2RegionMap): void;
  resize(_0: number, _1: Face2RegionMap): void;
  size(): number;
  get(_0: number): Face2RegionMap | undefined;
  set(_0: number, _1: Face2RegionMap): boolean;
}

export type VectorFace2RegionMapIntPair = [ VectorFace2RegionMap, number ];

export interface VectorVert2RegionMap extends ClassHandle {
  push_back(_0: Vert2RegionMap): void;
  resize(_0: number, _1: Vert2RegionMap): void;
  size(): number;
  get(_0: number): Vert2RegionMap | undefined;
  set(_0: number, _1: Vert2RegionMap): boolean;
}

export interface VectorVoxelIdFaceId extends ClassHandle {
  push_back(_0: VoxelIdFaceIdMap): void;
  resize(_0: number, _1: VoxelIdFaceIdMap): void;
  size(): number;
  get(_0: number): VoxelIdFaceIdMap | undefined;
  set(_0: number, _1: VoxelIdFaceIdMap): boolean;
}

export interface VectorVector2f extends ClassHandle {
  size(): number;
  get(_0: number): Vector2f | undefined;
  push_back(_0: Vector2f): void;
  resize(_0: number, _1: Vector2f): void;
  set(_0: number, _1: Vector2f): boolean;
}

export interface VectorVectorVector2f extends ClassHandle {
  push_back(_0: VectorVector2f): void;
  resize(_0: number, _1: VectorVector2f): void;
  size(): number;
  get(_0: number): VectorVector2f | undefined;
  set(_0: number, _1: VectorVector2f): boolean;
}

export interface VectorVector2i64 extends ClassHandle {
  size(): number;
  get(_0: number): Vector2i64 | undefined;
  push_back(_0: Vector2i64): void;
  resize(_0: number, _1: Vector2i64): void;
  set(_0: number, _1: Vector2i64): boolean;
}

export interface VectorVectorVector2i64 extends ClassHandle {
  push_back(_0: VectorVector2i64): void;
  resize(_0: number, _1: VectorVector2i64): void;
  size(): number;
  get(_0: number): VectorVector2i64 | undefined;
  set(_0: number, _1: VectorVector2i64): boolean;
}

export interface VectorVector2b extends ClassHandle {
  size(): number;
  get(_0: number): Vector2b | undefined;
  push_back(_0: Vector2b): void;
  resize(_0: number, _1: Vector2b): void;
  set(_0: number, _1: Vector2b): boolean;
}

export interface VectorVectorVector2b extends ClassHandle {
  push_back(_0: VectorVector2b): void;
  resize(_0: number, _1: VectorVector2b): void;
  size(): number;
  get(_0: number): VectorVector2b | undefined;
  set(_0: number, _1: VectorVector2b): boolean;
}

export interface VectorVector2i extends ClassHandle {
  size(): number;
  get(_0: number): Vector2i | undefined;
  push_back(_0: Vector2i): void;
  resize(_0: number, _1: Vector2i): void;
  set(_0: number, _1: Vector2i): boolean;
}

export interface VectorVectorVector2i extends ClassHandle {
  push_back(_0: VectorVector2i): void;
  resize(_0: number, _1: VectorVector2i): void;
  size(): number;
  get(_0: number): VectorVector2i | undefined;
  set(_0: number, _1: VectorVector2i): boolean;
}

export interface VectorVector2d extends ClassHandle {
  size(): number;
  get(_0: number): Vector2d | undefined;
  push_back(_0: Vector2d): void;
  resize(_0: number, _1: Vector2d): void;
  set(_0: number, _1: Vector2d): boolean;
}

export interface VectorVectorVector2d extends ClassHandle {
  push_back(_0: VectorVector2d): void;
  resize(_0: number, _1: VectorVector2d): void;
  size(): number;
  get(_0: number): VectorVector2d | undefined;
  set(_0: number, _1: VectorVector2d): boolean;
}

export interface VectorVector3f extends ClassHandle {
  size(): number;
  get(_0: number): Vector3f | undefined;
  push_back(_0: Vector3f): void;
  resize(_0: number, _1: Vector3f): void;
  set(_0: number, _1: Vector3f): boolean;
}

export interface VectorVectorVector3f extends ClassHandle {
  push_back(_0: VectorVector3f): void;
  resize(_0: number, _1: VectorVector3f): void;
  size(): number;
  get(_0: number): VectorVector3f | undefined;
  set(_0: number, _1: VectorVector3f): boolean;
}

export interface VectorVector3b extends ClassHandle {
  size(): number;
  get(_0: number): Vector3b | undefined;
  push_back(_0: Vector3b): void;
  resize(_0: number, _1: Vector3b): void;
  set(_0: number, _1: Vector3b): boolean;
}

export interface VectorVectorVector3b extends ClassHandle {
  push_back(_0: VectorVector3b): void;
  resize(_0: number, _1: VectorVector3b): void;
  size(): number;
  get(_0: number): VectorVector3b | undefined;
  set(_0: number, _1: VectorVector3b): boolean;
}

export interface VectorVector3i extends ClassHandle {
  size(): number;
  get(_0: number): Vector3i | undefined;
  push_back(_0: Vector3i): void;
  resize(_0: number, _1: Vector3i): void;
  set(_0: number, _1: Vector3i): boolean;
}

export interface VectorVectorVector3i extends ClassHandle {
  push_back(_0: VectorVector3i): void;
  resize(_0: number, _1: VectorVector3i): void;
  size(): number;
  get(_0: number): VectorVector3i | undefined;
  set(_0: number, _1: VectorVector3i): boolean;
}

export interface VectorVector3i64 extends ClassHandle {
  size(): number;
  get(_0: number): Vector3i64 | undefined;
  push_back(_0: Vector3i64): void;
  resize(_0: number, _1: Vector3i64): void;
  set(_0: number, _1: Vector3i64): boolean;
}

export interface VectorVectorVector3i64 extends ClassHandle {
  push_back(_0: VectorVector3i64): void;
  resize(_0: number, _1: VectorVector3i64): void;
  size(): number;
  get(_0: number): VectorVector3i64 | undefined;
  set(_0: number, _1: VectorVector3i64): boolean;
}

export interface VectorVector3d extends ClassHandle {
  size(): number;
  get(_0: number): Vector3d | undefined;
  push_back(_0: Vector3d): void;
  resize(_0: number, _1: Vector3d): void;
  set(_0: number, _1: Vector3d): boolean;
}

export interface VectorVectorVector3d extends ClassHandle {
  push_back(_0: VectorVector3d): void;
  resize(_0: number, _1: VectorVector3d): void;
  size(): number;
  get(_0: number): VectorVector3d | undefined;
  set(_0: number, _1: VectorVector3d): boolean;
}

export interface VectorVector4f extends ClassHandle {
  size(): number;
  get(_0: number): Vector4f | undefined;
  push_back(_0: Vector4f): void;
  resize(_0: number, _1: Vector4f): void;
  set(_0: number, _1: Vector4f): boolean;
}

export interface VectorVectorVector4f extends ClassHandle {
  push_back(_0: VectorVector4f): void;
  resize(_0: number, _1: VectorVector4f): void;
  size(): number;
  get(_0: number): VectorVector4f | undefined;
  set(_0: number, _1: VectorVector4f): boolean;
}

export interface VectorVector4b extends ClassHandle {
  size(): number;
  get(_0: number): Vector4b | undefined;
  push_back(_0: Vector4b): void;
  resize(_0: number, _1: Vector4b): void;
  set(_0: number, _1: Vector4b): boolean;
}

export interface VectorVectorVector4b extends ClassHandle {
  push_back(_0: VectorVector4b): void;
  resize(_0: number, _1: VectorVector4b): void;
  size(): number;
  get(_0: number): VectorVector4b | undefined;
  set(_0: number, _1: VectorVector4b): boolean;
}

export interface VectorVector4i extends ClassHandle {
  size(): number;
  get(_0: number): Vector4i | undefined;
  push_back(_0: Vector4i): void;
  resize(_0: number, _1: Vector4i): void;
  set(_0: number, _1: Vector4i): boolean;
}

export interface VectorVectorVector4i extends ClassHandle {
  push_back(_0: VectorVector4i): void;
  resize(_0: number, _1: VectorVector4i): void;
  size(): number;
  get(_0: number): VectorVector4i | undefined;
  set(_0: number, _1: VectorVector4i): boolean;
}

export interface VectorVector4i64 extends ClassHandle {
  size(): number;
  get(_0: number): Vector4i64 | undefined;
  push_back(_0: Vector4i64): void;
  resize(_0: number, _1: Vector4i64): void;
  set(_0: number, _1: Vector4i64): boolean;
}

export interface VectorVectorVector4i64 extends ClassHandle {
  push_back(_0: VectorVector4i64): void;
  resize(_0: number, _1: VectorVector4i64): void;
  size(): number;
  get(_0: number): VectorVector4i64 | undefined;
  set(_0: number, _1: VectorVector4i64): boolean;
}

export interface VectorVector4d extends ClassHandle {
  size(): number;
  get(_0: number): Vector4d | undefined;
  push_back(_0: Vector4d): void;
  resize(_0: number, _1: Vector4d): void;
  set(_0: number, _1: Vector4d): boolean;
}

export interface VectorVectorVector4d extends ClassHandle {
  push_back(_0: VectorVector4d): void;
  resize(_0: number, _1: VectorVector4d): void;
  size(): number;
  get(_0: number): VectorVector4d | undefined;
  set(_0: number, _1: VectorVector4d): boolean;
}

export type Array2Stdi = [ number, number ];

export type Array2Stdf = [ number, number ];

export type Array2Stdll = [ bigint, bigint ];

export type Array2Stdd = [ number, number ];

export type Array3Stdi = [ number, number, number ];

export type Array3Stdf = [ number, number, number ];

export type Array3Stdll = [ bigint, bigint, bigint ];

export type Array3Stdd = [ number, number, number ];

export type Array4Stdi = [ number, number, number, number ];

export type Array4Stdf = [ number, number, number, number ];

export type Array4Stdll = [ bigint, bigint, bigint, bigint ];

export type Array4Stdd = [ number, number, number, number ];

export type Array2WeightedVertex = [ WeightedVertex, WeightedVertex ];

export type Array3WeightedVertex = [ WeightedVertex, WeightedVertex, WeightedVertex ];

export type Array4WeightedVertex = [ WeightedVertex, WeightedVertex, WeightedVertex, WeightedVertex ];

export type Array2EdgeId = [ EdgeId, EdgeId ];

export type Array3EdgeId = [ EdgeId, EdgeId, EdgeId ];

export type Array4EdgeId = [ EdgeId, EdgeId, EdgeId, EdgeId ];

export type Array2UndirectedEdgeId = [ UndirectedEdgeId, UndirectedEdgeId ];

export type Array3UndirectedEdgeId = [ UndirectedEdgeId, UndirectedEdgeId, UndirectedEdgeId ];

export type Array4UndirectedEdgeId = [ UndirectedEdgeId, UndirectedEdgeId, UndirectedEdgeId, UndirectedEdgeId ];

export type Array2FaceId = [ FaceId, FaceId ];

export type Array3FaceId = [ FaceId, FaceId, FaceId ];

export type Array4FaceId = [ FaceId, FaceId, FaceId, FaceId ];

export type Array2VertId = [ VertId, VertId ];

export type Array3VertId = [ VertId, VertId, VertId ];

export type Array4VertId = [ VertId, VertId, VertId, VertId ];

export type Array2ThreeVertIds = [ Array3VertId, Array3VertId ];

export type Array3ThreeVertIds = [ Array3VertId, Array3VertId, Array3VertId ];

export type Array4ThreeVertIds = [ Array3VertId, Array3VertId, Array3VertId, Array3VertId ];

export type Array2PixelId = [ PixelId, PixelId ];

export type Array3PixelId = [ PixelId, PixelId, PixelId ];

export type Array4PixelId = [ PixelId, PixelId, PixelId, PixelId ];

export type Array2VoxelId = [ VoxelId, VoxelId ];

export type Array3VoxelId = [ VoxelId, VoxelId, VoxelId ];

export type Array4VoxelId = [ VoxelId, VoxelId, VoxelId, VoxelId ];

export type Array2RegionId = [ RegionId, RegionId ];

export type Array3RegionId = [ RegionId, RegionId, RegionId ];

export type Array4RegionId = [ RegionId, RegionId, RegionId, RegionId ];

export type Array2NodeId = [ NodeId, NodeId ];

export type Array3NodeId = [ NodeId, NodeId, NodeId ];

export type Array4NodeId = [ NodeId, NodeId, NodeId, NodeId ];

export type Array2ObjId = [ ObjId, ObjId ];

export type Array3ObjId = [ ObjId, ObjId, ObjId ];

export type Array4ObjId = [ ObjId, ObjId, ObjId, ObjId ];

export type Array2TextureId = [ TextureId, TextureId ];

export type Array3TextureId = [ TextureId, TextureId, TextureId ];

export type Array4TextureId = [ TextureId, TextureId, TextureId, TextureId ];

export type Array2GraphVertId = [ GraphVertId, GraphVertId ];

export type Array3GraphVertId = [ GraphVertId, GraphVertId, GraphVertId ];

export type Array4GraphVertId = [ GraphVertId, GraphVertId, GraphVertId, GraphVertId ];

export type Array2GraphEdgeId = [ GraphEdgeId, GraphEdgeId ];

export type Array3GraphEdgeId = [ GraphEdgeId, GraphEdgeId, GraphEdgeId ];

export type Array4GraphEdgeId = [ GraphEdgeId, GraphEdgeId, GraphEdgeId, GraphEdgeId ];

export interface StringFunctorString extends ClassHandle {
  opcall(_0: EmbindString): string;
}

export interface FloatFunctorInt extends ClassHandle {
  opcall(_0: number): number;
}

export interface ProgressCallback extends ClassHandle {
  opcall(_0: number): boolean;
}

export type MultiwayICPSamplingParameters = {
  samplingVoxelSize: number,
  maxGroupSize: number,
  cascadeMode: MultiwayICPSamplingParametersCascadeMode,
  cb: ProgressCallback
};

export interface VoidFunctorInt extends ClassHandle {
  opcall(_0: number): void;
}

export interface VoidFunctorEdgeIdEdgeId extends ClassHandle {
  opcall(_0: EdgeId, _1: EdgeId): void;
}

export interface VoidFunctorVector3fProjectionResultObjId extends ClassHandle {
  opcall(_0: Vector3f, _1: ProjectionResult, _2: ObjId): void;
}

export interface VoidFunctorSignDetectionMode extends ClassHandle {
  opcall(_0: SignDetectionMode): void;
}

export interface VertPredicate extends ClassHandle {
  opcall(_0: VertId): boolean;
}

export interface FacePredicate extends ClassHandle {
  opcall(_0: FaceId): boolean;
}

export interface EdgePredicate extends ClassHandle {
  opcall(_0: EdgeId): boolean;
}

export interface UndirectedEdgePredicate extends ClassHandle {
  opcall(_0: UndirectedEdgeId): boolean;
}

export interface VertMetric extends ClassHandle {
  opcall(_0: VertId): number;
}

export interface FaceMetric extends ClassHandle {
  opcall(_0: FaceId): number;
}

export interface EdgeMetric extends ClassHandle {
  opcall(_0: EdgeId): number;
}

export interface UndirectedEdgeMetric extends ClassHandle {
  opcall(_0: UndirectedEdgeId): number;
}

export interface FloatFunctorTriangulation extends ClassHandle {
  opcall(_0: Triangulation): number;
}

export interface FloatFunctorDipoles extends ClassHandle {
  opcall(_0: Dipoles): number;
}

export interface FloatFunctorFaceMap extends ClassHandle {
  opcall(_0: FaceMap): number;
}

export interface FloatFunctorVertMap extends ClassHandle {
  opcall(_0: VertMap): number;
}

export interface FloatFunctorEdgeMap extends ClassHandle {
  opcall(_0: EdgeMap): number;
}

export interface FloatFunctorUndirectedEdgeMap extends ClassHandle {
  opcall(_0: UndirectedEdgeMap): number;
}

export interface FloatFunctorObjMap extends ClassHandle {
  opcall(_0: ObjMap): number;
}

export interface FloatFunctorFaceBitSet extends ClassHandle {
  opcall(_0: FaceBitSet): number;
}

export interface FloatFunctorVertBitSet extends ClassHandle {
  opcall(_0: VertBitSet): number;
}

export interface FloatFunctorEdgeBitSet extends ClassHandle {
  opcall(_0: EdgeBitSet): number;
}

export interface FloatFunctorUndirectedEdgeBitSet extends ClassHandle {
  opcall(_0: UndirectedEdgeBitSet): number;
}

export interface FloatFunctorPixelBitSet extends ClassHandle {
  opcall(_0: PixelBitSet): number;
}

export interface FloatFunctorVoxelBitSet extends ClassHandle {
  opcall(_0: VoxelBitSet): number;
}

export interface FloatFunctorRegionBitSet extends ClassHandle {
  opcall(_0: RegionBitSet): number;
}

export interface FloatFunctorNodeBitSet extends ClassHandle {
  opcall(_0: NodeBitSet): number;
}

export interface FloatFunctorObjBitSet extends ClassHandle {
  opcall(_0: ObjBitSet): number;
}

export interface FloatFunctorTextureBitSet extends ClassHandle {
  opcall(_0: TextureBitSet): number;
}

export interface FloatFunctorGraphVertBitSet extends ClassHandle {
  opcall(_0: GraphVertBitSet): number;
}

export interface FloatFunctorGraphEdgeBitSet extends ClassHandle {
  opcall(_0: GraphEdgeBitSet): number;
}

export interface ExpectedSurfacePathFunctorMeshTriPoint extends ClassHandle {
  opcall(_0: MeshTriPoint, _1: MeshTriPoint, _2: number, _3: number): ExpectedSurfacePath;
}

export interface Vector3fFunctorVector3f extends ClassHandle {
  opcall(_0: Vector3f): Vector3f;
}

export interface VectorDoubleEdgeId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: EdgeId): number;
  set(_0: EdgeId): number;
  getByIndex(_0: EdgeId): number;
  getByIndexMutable(_0: EdgeId): number;
  getAt(_0: EdgeId): number;
  setAt(_0: EdgeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): EdgeId;
  backId(): EdgeId;
  endId(): EdgeId;
  autoResizeSetWithRange(_0: EdgeId, _1: number, _2: number): void;
  autoResizeSet(_0: EdgeId, _1: number): void;
  swap(_0: VectorDoubleEdgeId): void;
  heapBytes(): number;
  equals(_0: VectorDoubleEdgeId): boolean;
  notEquals(_0: VectorDoubleEdgeId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: EdgeId): number;
}

export interface VectorDoubleUndirectedEdgeId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: UndirectedEdgeId): number;
  set(_0: UndirectedEdgeId): number;
  getByIndex(_0: UndirectedEdgeId): number;
  getByIndexMutable(_0: UndirectedEdgeId): number;
  getAt(_0: UndirectedEdgeId): number;
  setAt(_0: UndirectedEdgeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): UndirectedEdgeId;
  backId(): UndirectedEdgeId;
  endId(): UndirectedEdgeId;
  autoResizeSetWithRange(_0: UndirectedEdgeId, _1: number, _2: number): void;
  autoResizeSet(_0: UndirectedEdgeId, _1: number): void;
  swap(_0: VectorDoubleUndirectedEdgeId): void;
  heapBytes(): number;
  equals(_0: VectorDoubleUndirectedEdgeId): boolean;
  notEquals(_0: VectorDoubleUndirectedEdgeId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: UndirectedEdgeId): number;
}

export interface VectorDoubleFaceId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: FaceId): number;
  set(_0: FaceId): number;
  getByIndex(_0: FaceId): number;
  getByIndexMutable(_0: FaceId): number;
  getAt(_0: FaceId): number;
  setAt(_0: FaceId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  autoResizeSetWithRange(_0: FaceId, _1: number, _2: number): void;
  autoResizeSet(_0: FaceId, _1: number): void;
  swap(_0: VectorDoubleFaceId): void;
  heapBytes(): number;
  equals(_0: VectorDoubleFaceId): boolean;
  notEquals(_0: VectorDoubleFaceId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: FaceId): number;
}

export interface VectorDoubleVertId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: VertId): number;
  set(_0: VertId): number;
  getByIndex(_0: VertId): number;
  getByIndexMutable(_0: VertId): number;
  getAt(_0: VertId): number;
  setAt(_0: VertId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): VertId;
  backId(): VertId;
  endId(): VertId;
  autoResizeSetWithRange(_0: VertId, _1: number, _2: number): void;
  autoResizeSet(_0: VertId, _1: number): void;
  swap(_0: VectorDoubleVertId): void;
  heapBytes(): number;
  equals(_0: VectorDoubleVertId): boolean;
  notEquals(_0: VectorDoubleVertId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: VertId): number;
}

export interface VectorDoublePixelId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: PixelId): number;
  set(_0: PixelId): number;
  getByIndex(_0: PixelId): number;
  getByIndexMutable(_0: PixelId): number;
  getAt(_0: PixelId): number;
  setAt(_0: PixelId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): PixelId;
  backId(): PixelId;
  endId(): PixelId;
  autoResizeSetWithRange(_0: PixelId, _1: number, _2: number): void;
  autoResizeSet(_0: PixelId, _1: number): void;
  swap(_0: VectorDoublePixelId): void;
  heapBytes(): number;
  equals(_0: VectorDoublePixelId): boolean;
  notEquals(_0: VectorDoublePixelId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: PixelId): number;
}

export interface VectorDoubleVoxelId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: VoxelId): number;
  set(_0: VoxelId): number;
  getByIndex(_0: VoxelId): number;
  getByIndexMutable(_0: VoxelId): number;
  getAt(_0: VoxelId): number;
  setAt(_0: VoxelId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): VoxelId;
  backId(): VoxelId;
  endId(): VoxelId;
  autoResizeSetWithRange(_0: VoxelId, _1: number, _2: number): void;
  autoResizeSet(_0: VoxelId, _1: number): void;
  swap(_0: VectorDoubleVoxelId): void;
  heapBytes(): number;
  equals(_0: VectorDoubleVoxelId): boolean;
  notEquals(_0: VectorDoubleVoxelId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: VoxelId): number;
}

export interface VectorDoubleRegionId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: RegionId): number;
  set(_0: RegionId): number;
  getByIndex(_0: RegionId): number;
  getByIndexMutable(_0: RegionId): number;
  getAt(_0: RegionId): number;
  setAt(_0: RegionId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): RegionId;
  backId(): RegionId;
  endId(): RegionId;
  autoResizeSetWithRange(_0: RegionId, _1: number, _2: number): void;
  autoResizeSet(_0: RegionId, _1: number): void;
  swap(_0: VectorDoubleRegionId): void;
  heapBytes(): number;
  equals(_0: VectorDoubleRegionId): boolean;
  notEquals(_0: VectorDoubleRegionId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: RegionId): number;
}

export interface VectorDoubleNodeId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: NodeId): number;
  set(_0: NodeId): number;
  getByIndex(_0: NodeId): number;
  getByIndexMutable(_0: NodeId): number;
  getAt(_0: NodeId): number;
  setAt(_0: NodeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): NodeId;
  backId(): NodeId;
  endId(): NodeId;
  autoResizeSetWithRange(_0: NodeId, _1: number, _2: number): void;
  autoResizeSet(_0: NodeId, _1: number): void;
  swap(_0: VectorDoubleNodeId): void;
  heapBytes(): number;
  equals(_0: VectorDoubleNodeId): boolean;
  notEquals(_0: VectorDoubleNodeId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: NodeId): number;
}

export interface VectorDoubleObjId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: ObjId): number;
  set(_0: ObjId): number;
  getByIndex(_0: ObjId): number;
  getByIndexMutable(_0: ObjId): number;
  getAt(_0: ObjId): number;
  setAt(_0: ObjId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): ObjId;
  backId(): ObjId;
  endId(): ObjId;
  autoResizeSetWithRange(_0: ObjId, _1: number, _2: number): void;
  autoResizeSet(_0: ObjId, _1: number): void;
  swap(_0: VectorDoubleObjId): void;
  heapBytes(): number;
  equals(_0: VectorDoubleObjId): boolean;
  notEquals(_0: VectorDoubleObjId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: ObjId): number;
}

export interface VectorDoubleTextureId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: TextureId): number;
  set(_0: TextureId): number;
  getByIndex(_0: TextureId): number;
  getByIndexMutable(_0: TextureId): number;
  getAt(_0: TextureId): number;
  setAt(_0: TextureId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): TextureId;
  backId(): TextureId;
  endId(): TextureId;
  autoResizeSetWithRange(_0: TextureId, _1: number, _2: number): void;
  autoResizeSet(_0: TextureId, _1: number): void;
  swap(_0: VectorDoubleTextureId): void;
  heapBytes(): number;
  equals(_0: VectorDoubleTextureId): boolean;
  notEquals(_0: VectorDoubleTextureId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: TextureId): number;
}

export interface VectorDoubleGraphVertId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: GraphVertId): number;
  set(_0: GraphVertId): number;
  getByIndex(_0: GraphVertId): number;
  getByIndexMutable(_0: GraphVertId): number;
  getAt(_0: GraphVertId): number;
  setAt(_0: GraphVertId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): GraphVertId;
  backId(): GraphVertId;
  endId(): GraphVertId;
  autoResizeSetWithRange(_0: GraphVertId, _1: number, _2: number): void;
  autoResizeSet(_0: GraphVertId, _1: number): void;
  swap(_0: VectorDoubleGraphVertId): void;
  heapBytes(): number;
  equals(_0: VectorDoubleGraphVertId): boolean;
  notEquals(_0: VectorDoubleGraphVertId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: GraphVertId): number;
}

export interface VectorDoubleGraphEdgeId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: GraphEdgeId): number;
  set(_0: GraphEdgeId): number;
  getByIndex(_0: GraphEdgeId): number;
  getByIndexMutable(_0: GraphEdgeId): number;
  getAt(_0: GraphEdgeId): number;
  setAt(_0: GraphEdgeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): GraphEdgeId;
  backId(): GraphEdgeId;
  endId(): GraphEdgeId;
  autoResizeSetWithRange(_0: GraphEdgeId, _1: number, _2: number): void;
  autoResizeSet(_0: GraphEdgeId, _1: number): void;
  swap(_0: VectorDoubleGraphEdgeId): void;
  heapBytes(): number;
  equals(_0: VectorDoubleGraphEdgeId): boolean;
  notEquals(_0: VectorDoubleGraphEdgeId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: GraphEdgeId): number;
}

export interface VectorSizeTEdgeId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: EdgeId): number;
  set(_0: EdgeId): number;
  getByIndex(_0: EdgeId): number;
  getByIndexMutable(_0: EdgeId): number;
  getAt(_0: EdgeId): number;
  setAt(_0: EdgeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): EdgeId;
  backId(): EdgeId;
  endId(): EdgeId;
  autoResizeSetWithRange(_0: EdgeId, _1: number, _2: number): void;
  autoResizeSet(_0: EdgeId, _1: number): void;
  swap(_0: VectorSizeTEdgeId): void;
  heapBytes(): number;
  equals(_0: VectorSizeTEdgeId): boolean;
  notEquals(_0: VectorSizeTEdgeId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: EdgeId): number;
}

export interface VectorSizeTUndirectedEdgeId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: UndirectedEdgeId): number;
  set(_0: UndirectedEdgeId): number;
  getByIndex(_0: UndirectedEdgeId): number;
  getByIndexMutable(_0: UndirectedEdgeId): number;
  getAt(_0: UndirectedEdgeId): number;
  setAt(_0: UndirectedEdgeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): UndirectedEdgeId;
  backId(): UndirectedEdgeId;
  endId(): UndirectedEdgeId;
  autoResizeSetWithRange(_0: UndirectedEdgeId, _1: number, _2: number): void;
  autoResizeSet(_0: UndirectedEdgeId, _1: number): void;
  swap(_0: VectorSizeTUndirectedEdgeId): void;
  heapBytes(): number;
  equals(_0: VectorSizeTUndirectedEdgeId): boolean;
  notEquals(_0: VectorSizeTUndirectedEdgeId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: UndirectedEdgeId): number;
}

export interface VectorSizeTFaceId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: FaceId): number;
  set(_0: FaceId): number;
  getByIndex(_0: FaceId): number;
  getByIndexMutable(_0: FaceId): number;
  getAt(_0: FaceId): number;
  setAt(_0: FaceId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  autoResizeSetWithRange(_0: FaceId, _1: number, _2: number): void;
  autoResizeSet(_0: FaceId, _1: number): void;
  swap(_0: VectorSizeTFaceId): void;
  heapBytes(): number;
  equals(_0: VectorSizeTFaceId): boolean;
  notEquals(_0: VectorSizeTFaceId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: FaceId): number;
}

export interface VectorSizeTVertId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: VertId): number;
  set(_0: VertId): number;
  getByIndex(_0: VertId): number;
  getByIndexMutable(_0: VertId): number;
  getAt(_0: VertId): number;
  setAt(_0: VertId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): VertId;
  backId(): VertId;
  endId(): VertId;
  autoResizeSetWithRange(_0: VertId, _1: number, _2: number): void;
  autoResizeSet(_0: VertId, _1: number): void;
  swap(_0: VectorSizeTVertId): void;
  heapBytes(): number;
  equals(_0: VectorSizeTVertId): boolean;
  notEquals(_0: VectorSizeTVertId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: VertId): number;
}

export interface VectorSizeTPixelId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: PixelId): number;
  set(_0: PixelId): number;
  getByIndex(_0: PixelId): number;
  getByIndexMutable(_0: PixelId): number;
  getAt(_0: PixelId): number;
  setAt(_0: PixelId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): PixelId;
  backId(): PixelId;
  endId(): PixelId;
  autoResizeSetWithRange(_0: PixelId, _1: number, _2: number): void;
  autoResizeSet(_0: PixelId, _1: number): void;
  swap(_0: VectorSizeTPixelId): void;
  heapBytes(): number;
  equals(_0: VectorSizeTPixelId): boolean;
  notEquals(_0: VectorSizeTPixelId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: PixelId): number;
}

export interface VectorSizeTVoxelId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: VoxelId): number;
  set(_0: VoxelId): number;
  getByIndex(_0: VoxelId): number;
  getByIndexMutable(_0: VoxelId): number;
  getAt(_0: VoxelId): number;
  setAt(_0: VoxelId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): VoxelId;
  backId(): VoxelId;
  endId(): VoxelId;
  autoResizeSetWithRange(_0: VoxelId, _1: number, _2: number): void;
  autoResizeSet(_0: VoxelId, _1: number): void;
  swap(_0: VectorSizeTVoxelId): void;
  heapBytes(): number;
  equals(_0: VectorSizeTVoxelId): boolean;
  notEquals(_0: VectorSizeTVoxelId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: VoxelId): number;
}

export interface VectorSizeTRegionId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: RegionId): number;
  set(_0: RegionId): number;
  getByIndex(_0: RegionId): number;
  getByIndexMutable(_0: RegionId): number;
  getAt(_0: RegionId): number;
  setAt(_0: RegionId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): RegionId;
  backId(): RegionId;
  endId(): RegionId;
  autoResizeSetWithRange(_0: RegionId, _1: number, _2: number): void;
  autoResizeSet(_0: RegionId, _1: number): void;
  swap(_0: VectorSizeTRegionId): void;
  heapBytes(): number;
  equals(_0: VectorSizeTRegionId): boolean;
  notEquals(_0: VectorSizeTRegionId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: RegionId): number;
}

export interface VectorSizeTNodeId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: NodeId): number;
  set(_0: NodeId): number;
  getByIndex(_0: NodeId): number;
  getByIndexMutable(_0: NodeId): number;
  getAt(_0: NodeId): number;
  setAt(_0: NodeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): NodeId;
  backId(): NodeId;
  endId(): NodeId;
  autoResizeSetWithRange(_0: NodeId, _1: number, _2: number): void;
  autoResizeSet(_0: NodeId, _1: number): void;
  swap(_0: VectorSizeTNodeId): void;
  heapBytes(): number;
  equals(_0: VectorSizeTNodeId): boolean;
  notEquals(_0: VectorSizeTNodeId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: NodeId): number;
}

export interface VectorSizeTObjId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: ObjId): number;
  set(_0: ObjId): number;
  getByIndex(_0: ObjId): number;
  getByIndexMutable(_0: ObjId): number;
  getAt(_0: ObjId): number;
  setAt(_0: ObjId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): ObjId;
  backId(): ObjId;
  endId(): ObjId;
  autoResizeSetWithRange(_0: ObjId, _1: number, _2: number): void;
  autoResizeSet(_0: ObjId, _1: number): void;
  swap(_0: VectorSizeTObjId): void;
  heapBytes(): number;
  equals(_0: VectorSizeTObjId): boolean;
  notEquals(_0: VectorSizeTObjId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: ObjId): number;
}

export interface VectorSizeTTextureId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: TextureId): number;
  set(_0: TextureId): number;
  getByIndex(_0: TextureId): number;
  getByIndexMutable(_0: TextureId): number;
  getAt(_0: TextureId): number;
  setAt(_0: TextureId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): TextureId;
  backId(): TextureId;
  endId(): TextureId;
  autoResizeSetWithRange(_0: TextureId, _1: number, _2: number): void;
  autoResizeSet(_0: TextureId, _1: number): void;
  swap(_0: VectorSizeTTextureId): void;
  heapBytes(): number;
  equals(_0: VectorSizeTTextureId): boolean;
  notEquals(_0: VectorSizeTTextureId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: TextureId): number;
}

export interface VectorSizeTGraphVertId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: GraphVertId): number;
  set(_0: GraphVertId): number;
  getByIndex(_0: GraphVertId): number;
  getByIndexMutable(_0: GraphVertId): number;
  getAt(_0: GraphVertId): number;
  setAt(_0: GraphVertId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): GraphVertId;
  backId(): GraphVertId;
  endId(): GraphVertId;
  autoResizeSetWithRange(_0: GraphVertId, _1: number, _2: number): void;
  autoResizeSet(_0: GraphVertId, _1: number): void;
  swap(_0: VectorSizeTGraphVertId): void;
  heapBytes(): number;
  equals(_0: VectorSizeTGraphVertId): boolean;
  notEquals(_0: VectorSizeTGraphVertId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: GraphVertId): number;
}

export interface VectorSizeTGraphEdgeId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: GraphEdgeId): number;
  set(_0: GraphEdgeId): number;
  getByIndex(_0: GraphEdgeId): number;
  getByIndexMutable(_0: GraphEdgeId): number;
  getAt(_0: GraphEdgeId): number;
  setAt(_0: GraphEdgeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): GraphEdgeId;
  backId(): GraphEdgeId;
  endId(): GraphEdgeId;
  autoResizeSetWithRange(_0: GraphEdgeId, _1: number, _2: number): void;
  autoResizeSet(_0: GraphEdgeId, _1: number): void;
  swap(_0: VectorSizeTGraphEdgeId): void;
  heapBytes(): number;
  equals(_0: VectorSizeTGraphEdgeId): boolean;
  notEquals(_0: VectorSizeTGraphEdgeId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: GraphEdgeId): number;
}

export interface VectorIntEdgeId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: EdgeId): number;
  set(_0: EdgeId): number;
  getByIndex(_0: EdgeId): number;
  getByIndexMutable(_0: EdgeId): number;
  getAt(_0: EdgeId): number;
  setAt(_0: EdgeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): EdgeId;
  backId(): EdgeId;
  endId(): EdgeId;
  autoResizeSetWithRange(_0: EdgeId, _1: number, _2: number): void;
  autoResizeSet(_0: EdgeId, _1: number): void;
  swap(_0: VectorIntEdgeId): void;
  heapBytes(): number;
  equals(_0: VectorIntEdgeId): boolean;
  notEquals(_0: VectorIntEdgeId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: EdgeId): number;
}

export interface VectorIntUndirectedEdgeId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: UndirectedEdgeId): number;
  set(_0: UndirectedEdgeId): number;
  getByIndex(_0: UndirectedEdgeId): number;
  getByIndexMutable(_0: UndirectedEdgeId): number;
  getAt(_0: UndirectedEdgeId): number;
  setAt(_0: UndirectedEdgeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): UndirectedEdgeId;
  backId(): UndirectedEdgeId;
  endId(): UndirectedEdgeId;
  autoResizeSetWithRange(_0: UndirectedEdgeId, _1: number, _2: number): void;
  autoResizeSet(_0: UndirectedEdgeId, _1: number): void;
  swap(_0: VectorIntUndirectedEdgeId): void;
  heapBytes(): number;
  equals(_0: VectorIntUndirectedEdgeId): boolean;
  notEquals(_0: VectorIntUndirectedEdgeId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: UndirectedEdgeId): number;
}

export interface VectorIntFaceId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: FaceId): number;
  set(_0: FaceId): number;
  getByIndex(_0: FaceId): number;
  getByIndexMutable(_0: FaceId): number;
  getAt(_0: FaceId): number;
  setAt(_0: FaceId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): FaceId;
  backId(): FaceId;
  endId(): FaceId;
  autoResizeSetWithRange(_0: FaceId, _1: number, _2: number): void;
  autoResizeSet(_0: FaceId, _1: number): void;
  swap(_0: VectorIntFaceId): void;
  heapBytes(): number;
  equals(_0: VectorIntFaceId): boolean;
  notEquals(_0: VectorIntFaceId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: FaceId): number;
}

export interface VectorIntVertId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: VertId): number;
  set(_0: VertId): number;
  getByIndex(_0: VertId): number;
  getByIndexMutable(_0: VertId): number;
  getAt(_0: VertId): number;
  setAt(_0: VertId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): VertId;
  backId(): VertId;
  endId(): VertId;
  autoResizeSetWithRange(_0: VertId, _1: number, _2: number): void;
  autoResizeSet(_0: VertId, _1: number): void;
  swap(_0: VectorIntVertId): void;
  heapBytes(): number;
  equals(_0: VectorIntVertId): boolean;
  notEquals(_0: VectorIntVertId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: VertId): number;
}

export interface VectorIntPixelId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: PixelId): number;
  set(_0: PixelId): number;
  getByIndex(_0: PixelId): number;
  getByIndexMutable(_0: PixelId): number;
  getAt(_0: PixelId): number;
  setAt(_0: PixelId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): PixelId;
  backId(): PixelId;
  endId(): PixelId;
  autoResizeSetWithRange(_0: PixelId, _1: number, _2: number): void;
  autoResizeSet(_0: PixelId, _1: number): void;
  swap(_0: VectorIntPixelId): void;
  heapBytes(): number;
  equals(_0: VectorIntPixelId): boolean;
  notEquals(_0: VectorIntPixelId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: PixelId): number;
}

export interface VectorIntVoxelId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: VoxelId): number;
  set(_0: VoxelId): number;
  getByIndex(_0: VoxelId): number;
  getByIndexMutable(_0: VoxelId): number;
  getAt(_0: VoxelId): number;
  setAt(_0: VoxelId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): VoxelId;
  backId(): VoxelId;
  endId(): VoxelId;
  autoResizeSetWithRange(_0: VoxelId, _1: number, _2: number): void;
  autoResizeSet(_0: VoxelId, _1: number): void;
  swap(_0: VectorIntVoxelId): void;
  heapBytes(): number;
  equals(_0: VectorIntVoxelId): boolean;
  notEquals(_0: VectorIntVoxelId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: VoxelId): number;
}

export interface VectorIntRegionId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: RegionId): number;
  set(_0: RegionId): number;
  getByIndex(_0: RegionId): number;
  getByIndexMutable(_0: RegionId): number;
  getAt(_0: RegionId): number;
  setAt(_0: RegionId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): RegionId;
  backId(): RegionId;
  endId(): RegionId;
  autoResizeSetWithRange(_0: RegionId, _1: number, _2: number): void;
  autoResizeSet(_0: RegionId, _1: number): void;
  swap(_0: VectorIntRegionId): void;
  heapBytes(): number;
  equals(_0: VectorIntRegionId): boolean;
  notEquals(_0: VectorIntRegionId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: RegionId): number;
}

export interface VectorIntNodeId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: NodeId): number;
  set(_0: NodeId): number;
  getByIndex(_0: NodeId): number;
  getByIndexMutable(_0: NodeId): number;
  getAt(_0: NodeId): number;
  setAt(_0: NodeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): NodeId;
  backId(): NodeId;
  endId(): NodeId;
  autoResizeSetWithRange(_0: NodeId, _1: number, _2: number): void;
  autoResizeSet(_0: NodeId, _1: number): void;
  swap(_0: VectorIntNodeId): void;
  heapBytes(): number;
  equals(_0: VectorIntNodeId): boolean;
  notEquals(_0: VectorIntNodeId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: NodeId): number;
}

export interface VectorIntObjId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: ObjId): number;
  set(_0: ObjId): number;
  getByIndex(_0: ObjId): number;
  getByIndexMutable(_0: ObjId): number;
  getAt(_0: ObjId): number;
  setAt(_0: ObjId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): ObjId;
  backId(): ObjId;
  endId(): ObjId;
  autoResizeSetWithRange(_0: ObjId, _1: number, _2: number): void;
  autoResizeSet(_0: ObjId, _1: number): void;
  swap(_0: VectorIntObjId): void;
  heapBytes(): number;
  equals(_0: VectorIntObjId): boolean;
  notEquals(_0: VectorIntObjId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: ObjId): number;
}

export interface VectorIntTextureId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: TextureId): number;
  set(_0: TextureId): number;
  getByIndex(_0: TextureId): number;
  getByIndexMutable(_0: TextureId): number;
  getAt(_0: TextureId): number;
  setAt(_0: TextureId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): TextureId;
  backId(): TextureId;
  endId(): TextureId;
  autoResizeSetWithRange(_0: TextureId, _1: number, _2: number): void;
  autoResizeSet(_0: TextureId, _1: number): void;
  swap(_0: VectorIntTextureId): void;
  heapBytes(): number;
  equals(_0: VectorIntTextureId): boolean;
  notEquals(_0: VectorIntTextureId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: TextureId): number;
}

export interface VectorIntGraphVertId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: GraphVertId): number;
  set(_0: GraphVertId): number;
  getByIndex(_0: GraphVertId): number;
  getByIndexMutable(_0: GraphVertId): number;
  getAt(_0: GraphVertId): number;
  setAt(_0: GraphVertId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): GraphVertId;
  backId(): GraphVertId;
  endId(): GraphVertId;
  autoResizeSetWithRange(_0: GraphVertId, _1: number, _2: number): void;
  autoResizeSet(_0: GraphVertId, _1: number): void;
  swap(_0: VectorIntGraphVertId): void;
  heapBytes(): number;
  equals(_0: VectorIntGraphVertId): boolean;
  notEquals(_0: VectorIntGraphVertId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: GraphVertId): number;
}

export interface VectorIntGraphEdgeId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: GraphEdgeId): number;
  set(_0: GraphEdgeId): number;
  getByIndex(_0: GraphEdgeId): number;
  getByIndexMutable(_0: GraphEdgeId): number;
  getAt(_0: GraphEdgeId): number;
  setAt(_0: GraphEdgeId, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): GraphEdgeId;
  backId(): GraphEdgeId;
  endId(): GraphEdgeId;
  autoResizeSetWithRange(_0: GraphEdgeId, _1: number, _2: number): void;
  autoResizeSet(_0: GraphEdgeId, _1: number): void;
  swap(_0: VectorIntGraphEdgeId): void;
  heapBytes(): number;
  equals(_0: VectorIntGraphEdgeId): boolean;
  notEquals(_0: VectorIntGraphEdgeId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: GraphEdgeId): number;
}

export interface VectorMeshOrPointsXfObjId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: MeshOrPointsXf): void;
  resizeWithReserveAndValue(_0: number, _1: MeshOrPointsXf): void;
  get(_0: ObjId): MeshOrPointsXf;
  set(_0: ObjId): MeshOrPointsXf;
  getByIndex(_0: ObjId): MeshOrPointsXf;
  getByIndexMutable(_0: ObjId): MeshOrPointsXf;
  getAt(_0: ObjId): MeshOrPointsXf;
  setAt(_0: ObjId, _1: MeshOrPointsXf): boolean;
  frontConst(): MeshOrPointsXf;
  front(): MeshOrPointsXf;
  backConst(): MeshOrPointsXf;
  back(): MeshOrPointsXf;
  pushBack(_0: MeshOrPointsXf): void;
  popBack(): void;
  emplaceBack(_0: MeshOrPointsXf): MeshOrPointsXf;
  beginId(): ObjId;
  backId(): ObjId;
  endId(): ObjId;
  autoResizeSetWithRange(_0: ObjId, _1: number, _2: MeshOrPointsXf): void;
  autoResizeSet(_0: ObjId, _1: MeshOrPointsXf): void;
  swap(_0: VectorMeshOrPointsXfObjId): void;
  heapBytes(): number;
}

export interface VectorICPGroupPairsICPElementId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: ICPGroupPairs): void;
  resizeWithReserveAndValue(_0: number, _1: ICPGroupPairs): void;
  get(_0: ICPElementId): ICPGroupPairs;
  set(_0: ICPElementId): ICPGroupPairs;
  getByIndex(_0: ICPElementId): ICPGroupPairs;
  getByIndexMutable(_0: ICPElementId): ICPGroupPairs;
  getAt(_0: ICPElementId): ICPGroupPairs;
  setAt(_0: ICPElementId, _1: ICPGroupPairs): boolean;
  frontConst(): ICPGroupPairs;
  front(): ICPGroupPairs;
  backConst(): ICPGroupPairs;
  back(): ICPGroupPairs;
  pushBack(_0: ICPGroupPairs): void;
  popBack(): void;
  emplaceBack(_0: ICPGroupPairs): ICPGroupPairs;
  beginId(): ICPElementId;
  backId(): ICPElementId;
  endId(): ICPElementId;
  autoResizeSetWithRange(_0: ICPElementId, _1: number, _2: ICPGroupPairs): void;
  autoResizeSet(_0: ICPElementId, _1: ICPGroupPairs): void;
  swap(_0: VectorICPGroupPairsICPElementId): void;
  heapBytes(): number;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: ICPElementId): ICPGroupPairs;
}

export interface VectorVectorICPGroupPairsICPElementId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: VectorICPGroupPairsICPElementId): void;
  resizeWithReserveAndValue(_0: number, _1: VectorICPGroupPairsICPElementId): void;
  get(_0: ICPElementId): VectorICPGroupPairsICPElementId;
  set(_0: ICPElementId): VectorICPGroupPairsICPElementId;
  getByIndex(_0: ICPElementId): VectorICPGroupPairsICPElementId;
  getByIndexMutable(_0: ICPElementId): VectorICPGroupPairsICPElementId;
  getAt(_0: ICPElementId): VectorICPGroupPairsICPElementId;
  setAt(_0: ICPElementId, _1: VectorICPGroupPairsICPElementId): boolean;
  frontConst(): VectorICPGroupPairsICPElementId;
  front(): VectorICPGroupPairsICPElementId;
  backConst(): VectorICPGroupPairsICPElementId;
  back(): VectorICPGroupPairsICPElementId;
  pushBack(_0: VectorICPGroupPairsICPElementId): void;
  popBack(): void;
  emplaceBack(_0: VectorICPGroupPairsICPElementId): VectorICPGroupPairsICPElementId;
  beginId(): ICPElementId;
  backId(): ICPElementId;
  endId(): ICPElementId;
  autoResizeSetWithRange(_0: ICPElementId, _1: number, _2: VectorICPGroupPairsICPElementId): void;
  autoResizeSet(_0: ICPElementId, _1: VectorICPGroupPairsICPElementId): void;
  swap(_0: VectorVectorICPGroupPairsICPElementId): void;
  heapBytes(): number;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: ICPElementId): VectorICPGroupPairsICPElementId;
}

export interface VectorICPPairsGridICPLayer extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: VectorVectorICPGroupPairsICPElementId): void;
  resizeWithReserveAndValue(_0: number, _1: VectorVectorICPGroupPairsICPElementId): void;
  get(_0: number): VectorVectorICPGroupPairsICPElementId;
  set(_0: number): VectorVectorICPGroupPairsICPElementId;
  getByIndex(_0: number): VectorVectorICPGroupPairsICPElementId;
  getByIndexMutable(_0: number): VectorVectorICPGroupPairsICPElementId;
  getAt(_0: number): VectorVectorICPGroupPairsICPElementId;
  setAt(_0: number, _1: VectorVectorICPGroupPairsICPElementId): boolean;
  frontConst(): VectorVectorICPGroupPairsICPElementId;
  front(): VectorVectorICPGroupPairsICPElementId;
  backConst(): VectorVectorICPGroupPairsICPElementId;
  back(): VectorVectorICPGroupPairsICPElementId;
  pushBack(_0: VectorVectorICPGroupPairsICPElementId): void;
  popBack(): void;
  emplaceBack(_0: VectorVectorICPGroupPairsICPElementId): VectorVectorICPGroupPairsICPElementId;
  beginId(): number;
  backId(): number;
  endId(): number;
  autoResizeSetWithRange(_0: number, _1: number, _2: VectorVectorICPGroupPairsICPElementId): void;
  autoResizeSet(_0: number, _1: VectorVectorICPGroupPairsICPElementId): void;
  swap(_0: VectorICPPairsGridICPLayer): void;
  heapBytes(): number;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: number): VectorVectorICPGroupPairsICPElementId;
}

export interface VectorVertBitSetObjId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: VertBitSet): void;
  resizeWithReserveAndValue(_0: number, _1: VertBitSet): void;
  get(_0: ObjId): VertBitSet;
  set(_0: ObjId): VertBitSet;
  getByIndex(_0: ObjId): VertBitSet;
  getByIndexMutable(_0: ObjId): VertBitSet;
  getAt(_0: ObjId): VertBitSet;
  setAt(_0: ObjId, _1: VertBitSet): boolean;
  frontConst(): VertBitSet;
  front(): VertBitSet;
  backConst(): VertBitSet;
  back(): VertBitSet;
  pushBack(_0: VertBitSet): void;
  popBack(): void;
  emplaceBack(_0: VertBitSet): VertBitSet;
  beginId(): ObjId;
  backId(): ObjId;
  endId(): ObjId;
  autoResizeSetWithRange(_0: ObjId, _1: number, _2: VertBitSet): void;
  autoResizeSet(_0: ObjId, _1: VertBitSet): void;
  swap(_0: VectorVertBitSetObjId): void;
  heapBytes(): number;
  equals(_0: VectorVertBitSetObjId): boolean;
  notEquals(_0: VectorVertBitSetObjId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: ObjId): VertBitSet;
}

export interface VectorAffineXf3fObjId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: AffineXf3f): void;
  resizeWithReserveAndValue(_0: number, _1: AffineXf3f): void;
  get(_0: ObjId): AffineXf3f;
  set(_0: ObjId): AffineXf3f;
  getByIndex(_0: ObjId): AffineXf3f;
  getByIndexMutable(_0: ObjId): AffineXf3f;
  getAt(_0: ObjId): AffineXf3f;
  setAt(_0: ObjId, _1: AffineXf3f): boolean;
  frontConst(): AffineXf3f;
  front(): AffineXf3f;
  backConst(): AffineXf3f;
  back(): AffineXf3f;
  pushBack(_0: AffineXf3f): void;
  popBack(): void;
  emplaceBack(_0: AffineXf3f): AffineXf3f;
  beginId(): ObjId;
  backId(): ObjId;
  endId(): ObjId;
  autoResizeSetWithRange(_0: ObjId, _1: number, _2: AffineXf3f): void;
  autoResizeSet(_0: ObjId, _1: AffineXf3f): void;
  swap(_0: VectorAffineXf3fObjId): void;
  heapBytes(): number;
  equals(_0: VectorAffineXf3fObjId): boolean;
  notEquals(_0: VectorAffineXf3fObjId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: ObjId): AffineXf3f;
}

export interface VectorMultiObjsSamplesICPElementId extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: VectorObjVertId): void;
  resizeWithReserveAndValue(_0: number, _1: VectorObjVertId): void;
  get(_0: ICPElementId): VectorObjVertId;
  set(_0: ICPElementId): VectorObjVertId;
  getByIndex(_0: ICPElementId): VectorObjVertId;
  getByIndexMutable(_0: ICPElementId): VectorObjVertId;
  getAt(_0: ICPElementId): VectorObjVertId;
  setAt(_0: ICPElementId, _1: VectorObjVertId): boolean;
  frontConst(): VectorObjVertId;
  front(): VectorObjVertId;
  backConst(): VectorObjVertId;
  back(): VectorObjVertId;
  pushBack(_0: VectorObjVertId): void;
  popBack(): void;
  emplaceBack(_0: VectorObjVertId): VectorObjVertId;
  beginId(): ICPElementId;
  backId(): ICPElementId;
  endId(): ICPElementId;
  autoResizeSetWithRange(_0: ICPElementId, _1: number, _2: VectorObjVertId): void;
  autoResizeSet(_0: ICPElementId, _1: VectorObjVertId): void;
  swap(_0: VectorMultiObjsSamplesICPElementId): void;
  heapBytes(): number;
  equals(_0: VectorMultiObjsSamplesICPElementId): boolean;
  notEquals(_0: VectorMultiObjsSamplesICPElementId): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: ICPElementId): VectorObjVertId;
}

export interface VectorVectorMultiObjsSamplesICPLayer extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: VectorMultiObjsSamplesICPElementId): void;
  resizeWithReserveAndValue(_0: number, _1: VectorMultiObjsSamplesICPElementId): void;
  get(_0: number): VectorMultiObjsSamplesICPElementId;
  set(_0: number): VectorMultiObjsSamplesICPElementId;
  getByIndex(_0: number): VectorMultiObjsSamplesICPElementId;
  getByIndexMutable(_0: number): VectorMultiObjsSamplesICPElementId;
  getAt(_0: number): VectorMultiObjsSamplesICPElementId;
  setAt(_0: number, _1: VectorMultiObjsSamplesICPElementId): boolean;
  frontConst(): VectorMultiObjsSamplesICPElementId;
  front(): VectorMultiObjsSamplesICPElementId;
  backConst(): VectorMultiObjsSamplesICPElementId;
  back(): VectorMultiObjsSamplesICPElementId;
  pushBack(_0: VectorMultiObjsSamplesICPElementId): void;
  popBack(): void;
  emplaceBack(_0: VectorMultiObjsSamplesICPElementId): VectorMultiObjsSamplesICPElementId;
  beginId(): number;
  backId(): number;
  endId(): number;
  autoResizeSetWithRange(_0: number, _1: number, _2: VectorMultiObjsSamplesICPElementId): void;
  autoResizeSet(_0: number, _1: VectorMultiObjsSamplesICPElementId): void;
  swap(_0: VectorVectorMultiObjsSamplesICPLayer): void;
  heapBytes(): number;
  equals(_0: VectorVectorMultiObjsSamplesICPLayer): boolean;
  notEquals(_0: VectorVectorMultiObjsSamplesICPLayer): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: number): VectorMultiObjsSamplesICPElementId;
}

export interface VectorIntSizeT extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: number): number;
  set(_0: number): number;
  getByIndex(_0: number): number;
  getByIndexMutable(_0: number): number;
  getAt(_0: number): number;
  setAt(_0: number, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): number;
  backId(): number;
  endId(): number;
  autoResizeSetWithRange(_0: number, _1: number, _2: number): void;
  autoResizeSet(_0: number, _1: number): void;
  swap(_0: VectorIntSizeT): void;
  heapBytes(): number;
  equals(_0: VectorIntSizeT): boolean;
  notEquals(_0: VectorIntSizeT): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: number): number;
}

export interface VectorFloatSizeT extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: number): number;
  set(_0: number): number;
  getByIndex(_0: number): number;
  getByIndexMutable(_0: number): number;
  getAt(_0: number): number;
  setAt(_0: number, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): number;
  backId(): number;
  endId(): number;
  autoResizeSetWithRange(_0: number, _1: number, _2: number): void;
  autoResizeSet(_0: number, _1: number): void;
  swap(_0: VectorFloatSizeT): void;
  heapBytes(): number;
  equals(_0: VectorFloatSizeT): boolean;
  notEquals(_0: VectorFloatSizeT): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: number): number;
}

export interface VectorLongLongSizeT extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: bigint): void;
  resizeWithReserveAndValue(_0: number, _1: bigint): void;
  get(_0: number): bigint;
  set(_0: number): bigint;
  getByIndex(_0: number): bigint;
  getByIndexMutable(_0: number): bigint;
  getAt(_0: number): bigint;
  setAt(_0: number, _1: bigint): boolean;
  frontConst(): bigint;
  front(): bigint;
  backConst(): bigint;
  back(): bigint;
  pushBack(_0: bigint): void;
  popBack(): void;
  emplaceBack(_0: bigint): bigint;
  beginId(): number;
  backId(): number;
  endId(): number;
  autoResizeSetWithRange(_0: number, _1: number, _2: bigint): void;
  autoResizeSet(_0: number, _1: bigint): void;
  swap(_0: VectorLongLongSizeT): void;
  heapBytes(): number;
  equals(_0: VectorLongLongSizeT): boolean;
  notEquals(_0: VectorLongLongSizeT): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: number): bigint;
}

export interface VectorDoubleSizeT extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: number): number;
  set(_0: number): number;
  getByIndex(_0: number): number;
  getByIndexMutable(_0: number): number;
  getAt(_0: number): number;
  setAt(_0: number, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): number;
  backId(): number;
  endId(): number;
  autoResizeSetWithRange(_0: number, _1: number, _2: number): void;
  autoResizeSet(_0: number, _1: number): void;
  swap(_0: VectorDoubleSizeT): void;
  heapBytes(): number;
  equals(_0: VectorDoubleSizeT): boolean;
  notEquals(_0: VectorDoubleSizeT): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: number): number;
}

export interface VectorSizeTSizeT extends ClassHandle {
  size(): number;
  empty(): boolean;
  clear(): void;
  capacity(): number;
  reserve(_0: number): void;
  resizeWithValue(_0: number, _1: number): void;
  resizeWithReserveAndValue(_0: number, _1: number): void;
  get(_0: number): number;
  set(_0: number): number;
  getByIndex(_0: number): number;
  getByIndexMutable(_0: number): number;
  getAt(_0: number): number;
  setAt(_0: number, _1: number): boolean;
  frontConst(): number;
  front(): number;
  backConst(): number;
  back(): number;
  pushBack(_0: number): void;
  popBack(): void;
  emplaceBack(_0: number): number;
  beginId(): number;
  backId(): number;
  endId(): number;
  autoResizeSetWithRange(_0: number, _1: number, _2: number): void;
  autoResizeSet(_0: number, _1: number): void;
  swap(_0: VectorSizeTSizeT): void;
  heapBytes(): number;
  equals(_0: VectorSizeTSizeT): boolean;
  notEquals(_0: VectorSizeTSizeT): boolean;
  resize(_0: number): void;
  resizeWithReserve(_0: number): void;
  autoResizeAt(_0: number): number;
}

export interface Vector2i extends ClassHandle {
  x: number;
  y: number;
  length(): number;
  lengthSq(): number;
  get(_0: number): number;
  set(_0: number): number;
  perpendicular(): Vector2i;
  furthestBasisVector(): Vector2i;
}

export type Vector2iPair = [ Vector2i, Vector2i ];

export type Array2Vector2i = [ Vector2i, Vector2i ];

export type Array3Vector2i = [ Vector2i, Vector2i, Vector2i ];

export interface Vector2f extends ClassHandle {
  x: number;
  y: number;
  length(): number;
  lengthSq(): number;
  get(_0: number): number;
  set(_0: number): number;
  perpendicular(): Vector2f;
  furthestBasisVector(): Vector2f;
  normalized(): Vector2f;
  isFinite(): boolean;
}

export type Vector2fPair = [ Vector2f, Vector2f ];

export type Array2Vector2f = [ Vector2f, Vector2f ];

export type Array3Vector2f = [ Vector2f, Vector2f, Vector2f ];

export interface Vector2i64 extends ClassHandle {
  x: bigint;
  y: bigint;
  length(): number;
  lengthSq(): bigint;
  get(_0: number): bigint;
  set(_0: number): bigint;
  perpendicular(): Vector2i64;
  furthestBasisVector(): Vector2i64;
}

export type Vector2i64Pair = [ Vector2i64, Vector2i64 ];

export type Array2Vector2i64 = [ Vector2i64, Vector2i64 ];

export type Array3Vector2i64 = [ Vector2i64, Vector2i64, Vector2i64 ];

export interface Vector2b extends ClassHandle {
  x: boolean;
  y: boolean;
  length(): number;
  lengthSq(): boolean;
  get(_0: number): boolean;
  set(_0: number): boolean;
}

export type Vector2bPair = [ Vector2b, Vector2b ];

export type Array2Vector2b = [ Vector2b, Vector2b ];

export type Array3Vector2b = [ Vector2b, Vector2b, Vector2b ];

export interface Vector2d extends ClassHandle {
  x: number;
  y: number;
  length(): number;
  lengthSq(): number;
  get(_0: number): number;
  set(_0: number): number;
  perpendicular(): Vector2d;
  furthestBasisVector(): Vector2d;
  normalized(): Vector2d;
  isFinite(): boolean;
}

export type Vector2dPair = [ Vector2d, Vector2d ];

export type Array2Vector2d = [ Vector2d, Vector2d ];

export type Array3Vector2d = [ Vector2d, Vector2d, Vector2d ];

export interface Vector3f extends ClassHandle {
  x: number;
  y: number;
  z: number;
  lengthSq(): number;
  length(): number;
  get(_0: number): number;
  set(_0: number): number;
  normalized(): Vector3f;
  perpendicular(): Vector3fPair;
  unsignZeroValues(): void;
  isFinite(): boolean;
  furthestBasisVector(): Vector3f;
}

export type AABBTreePointsPoint = {
  coord: Vector3f,
  id: VertId
};

export type FindParams = {
  upDirection: Vector3f,
  wallAngle: number
};

export type ICPProperties = {
  method: ICPMethod,
  p2plAngleLimit: number,
  p2plScaleLimit: number,
  cosThreshold: number,
  distThresholdSq: number,
  farDistFactor: number,
  icpMode: ICPMode,
  fixedRotationAxis: Vector3f,
  iterLimit: number,
  badIterStopCount: number,
  exitVal: number,
  mutualClosest: boolean
};

export type ProjectionResult = {
  point: Vector3f,
  isBd: boolean,
  distSq: number,
  closestVert: VertId
};

export type Vector3fPair = [ Vector3f, Vector3f ];

export type Array2Triangle3f = [ Vector3f, Vector3f ];

export type Array3Triangle3f = [ Vector3f, Vector3f, Vector3f ];

export interface Vector3b extends ClassHandle {
  x: boolean;
  y: boolean;
  z: boolean;
  lengthSq(): boolean;
  length(): number;
  get(_0: number): boolean;
  set(_0: number): boolean;
  normalized(): Vector3f;
  perpendicular(): Vector3fPair;
  unsignZeroValues(): Vector3f;
  isFinite(): boolean;
}

export type Vector3bPair = [ Vector3b, Vector3b ];

export type Array2Triangle3b = [ Vector3b, Vector3b ];

export type Array3Triangle3b = [ Vector3b, Vector3b, Vector3b ];

export interface Vector3i extends ClassHandle {
  x: number;
  y: number;
  z: number;
  lengthSq(): number;
  length(): number;
  get(_0: number): number;
  set(_0: number): number;
  normalized(): Vector3f;
  perpendicular(): Vector3fPair;
  unsignZeroValues(): Vector3f;
  isFinite(): boolean;
  furthestBasisVector(): Vector3i;
}

export type Vector3iPair = [ Vector3i, Vector3i ];

export type Array2Triangle3i = [ Vector3i, Vector3i ];

export type Array3Triangle3i = [ Vector3i, Vector3i, Vector3i ];

export interface Vector3i64 extends ClassHandle {
  x: bigint;
  y: bigint;
  z: bigint;
  lengthSq(): bigint;
  length(): number;
  get(_0: number): bigint;
  set(_0: number): bigint;
  normalized(): Vector3f;
  perpendicular(): Vector3fPair;
  unsignZeroValues(): Vector3f;
  isFinite(): boolean;
  furthestBasisVector(): Vector3i64;
}

export type Vector3i64Pair = [ Vector3i64, Vector3i64 ];

export type Array2Triangle3i64 = [ Vector3i64, Vector3i64 ];

export type Array3Triangle3i64 = [ Vector3i64, Vector3i64, Vector3i64 ];

export interface Vector3d extends ClassHandle {
  x: number;
  y: number;
  z: number;
  lengthSq(): number;
  length(): number;
  get(_0: number): number;
  set(_0: number): number;
  normalized(): Vector3d;
  perpendicular(): Vector3dPair;
  unsignZeroValues(): void;
  isFinite(): boolean;
  furthestBasisVector(): Vector3d;
}

export type Vector3dPair = [ Vector3d, Vector3d ];

export type Array2Triangle3d = [ Vector3d, Vector3d ];

export type Array3Triangle3d = [ Vector3d, Vector3d, Vector3d ];

export interface Vector4b extends ClassHandle {
  x: boolean;
  y: boolean;
  z: boolean;
  w: boolean;
  get(_0: number): boolean;
  set(_0: number): boolean;
  lengthSq(): boolean;
  length(): number;
}

export type Vector4bPair = [ Vector4b, Vector4b ];

export interface Vector4f extends ClassHandle {
  x: number;
  y: number;
  z: number;
  w: number;
  get(_0: number): number;
  set(_0: number): number;
  lengthSq(): number;
  length(): number;
  isFinite(): boolean;
  proj3d(): Vector3f;
  normalized(): Vector4f;
}

export type Vector4fPair = [ Vector4f, Vector4f ];

export interface Vector4i extends ClassHandle {
  x: number;
  y: number;
  z: number;
  w: number;
  get(_0: number): number;
  set(_0: number): number;
  lengthSq(): number;
  length(): number;
}

export type Vector4iPair = [ Vector4i, Vector4i ];

export interface Vector4i64 extends ClassHandle {
  x: bigint;
  y: bigint;
  z: bigint;
  w: bigint;
  get(_0: number): bigint;
  set(_0: number): bigint;
  lengthSq(): bigint;
  length(): number;
}

export type Vector4i64Pair = [ Vector4i64, Vector4i64 ];

export interface Vector4d extends ClassHandle {
  x: number;
  y: number;
  z: number;
  w: number;
  get(_0: number): number;
  set(_0: number): number;
  lengthSq(): number;
  length(): number;
  isFinite(): boolean;
  proj3d(): Vector3d;
  normalized(): Vector4d;
}

export type Vector4dPair = [ Vector4d, Vector4d ];

export interface VisualObject extends ClassHandle {
}

interface EmbindModule {
  AABBTree: {
    new(): AABBTree;
  };
  AABBTreeObjects: {
    new(): AABBTreeObjects;
  };
  AABBTreePointsNode: {
    new(): AABBTreePointsNode;
  };
  AABBTreePoints: {
    new(_0: Mesh): AABBTreePoints;
    new(_0: VertCoords, _1: VertBitSet | null): AABBTreePoints;
    createFromPointsUniquePtr(_0: VertCoords, _1: VertBitSet): AABBTreePoints;
    createFromPointsSharedPtr(_0: VertCoords, _1: VertBitSet): AABBTreePoints | null;
    createFromPointCloudUniquePtr(_0: PointCloud): AABBTreePoints;
    createFromPointCloudSharedPtr(_0: PointCloud): AABBTreePoints | null;
    MaxNumPointsInLeaf: number;
  };
  AffineXf2f: {
    new(): AffineXf2f;
    new(_0: Matrix2f, _1: Vector2f): AffineXf2f;
    linear(_0: Matrix2f): AffineXf2f;
    translation(_0: Vector2f): AffineXf2f;
    xfAround(_0: Matrix2f, _1: Vector2f): AffineXf2f;
  };
  AffineXf2d: {
    new(): AffineXf2d;
    new(_0: Matrix2d, _1: Vector2d): AffineXf2d;
    linear(_0: Matrix2d): AffineXf2d;
    translation(_0: Vector2d): AffineXf2d;
    xfAround(_0: Matrix2d, _1: Vector2d): AffineXf2d;
  };
  AffineXf3f: {
    new(): AffineXf3f;
    new(_0: Matrix3f, _1: Vector3f): AffineXf3f;
    linear(_0: Matrix3f): AffineXf3f;
    translation(_0: Vector3f): AffineXf3f;
    xfAround(_0: Matrix3f, _1: Vector3f): AffineXf3f;
  };
  to3dimXff(_0: AffineXf2f): AffineXf3f;
  to2dimXff(_0: AffineXf3f): AffineXf2f;
  AffineXf3d: {
    new(): AffineXf3d;
    new(_0: Matrix3d, _1: Vector3d): AffineXf3d;
    linear(_0: Matrix3d): AffineXf3d;
    translation(_0: Vector3d): AffineXf3d;
    xfAround(_0: Matrix3d, _1: Vector3d): AffineXf3d;
  };
  to3dimXfd(_0: AffineXf2d): AffineXf3d;
  to2dimXfd(_0: AffineXf3d): AffineXf2d;
  Axis: {X: AxisValue<0>, Y: AxisValue<1>, Z: AxisValue<2>, Count: AxisValue<3>};
  CubicBezierCurve2f: {
    new(): CubicBezierCurve2f;
    getWeights(_0: number): Array4Stdf;
  };
  CubicBezierCurve2d: {
    new(): CubicBezierCurve2d;
    getWeights(_0: number): Array4Stdd;
  };
  CubicBezierCurve3f: {
    new(): CubicBezierCurve3f;
    getWeights(_0: number): Array4Stdf;
  };
  CubicBezierCurve3d: {
    new(): CubicBezierCurve3d;
    getWeights(_0: number): Array4Stdd;
  };
  CubicBezierCurve4f: {
    new(): CubicBezierCurve4f;
    getWeights(_0: number): Array4Stdf;
  };
  CubicBezierCurve4d: {
    new(): CubicBezierCurve4d;
    getWeights(_0: number): Array4Stdd;
  };
  __InternalDynamicBitset: {
    new(): __InternalDynamicBitset;
    new(_0: number): __InternalDynamicBitset;
    new(_0: number, _1: boolean): __InternalDynamicBitset;
  };
  BitSet: {
    new(): BitSet;
    new(_0: number): BitSet;
    new(_0: number, _1: boolean): BitSet;
    createFromValue_(_0: number, _1: boolean): BitSet;
    beginId_(): number;
  };
  FaceBitSet: {
    new(): FaceBitSet;
    new(_0: number): FaceBitSet;
    new(_0: number, _1: boolean): FaceBitSet;
    createFromSize(_0: number): FaceBitSet;
    createFromValue(_0: number, _1: boolean): FaceBitSet;
    createFromBitSet(_0: FaceBitSet): FaceBitSet;
    beginId(): FaceId;
  };
  VertBitSet: {
    new(): VertBitSet;
    new(_0: number): VertBitSet;
    new(_0: number, _1: boolean): VertBitSet;
    createFromSize(_0: number): VertBitSet;
    createFromValue(_0: number, _1: boolean): VertBitSet;
    createFromBitSet(_0: VertBitSet): VertBitSet;
    beginId(): VertId;
  };
  EdgeBitSet: {
    new(): EdgeBitSet;
    new(_0: number): EdgeBitSet;
    new(_0: number, _1: boolean): EdgeBitSet;
    createFromSize(_0: number): EdgeBitSet;
    createFromValue(_0: number, _1: boolean): EdgeBitSet;
    createFromBitSet(_0: EdgeBitSet): EdgeBitSet;
    beginId(): EdgeId;
  };
  UndirectedEdgeBitSet: {
    new(): UndirectedEdgeBitSet;
    new(_0: number): UndirectedEdgeBitSet;
    new(_0: number, _1: boolean): UndirectedEdgeBitSet;
    createFromSize(_0: number): UndirectedEdgeBitSet;
    createFromValue(_0: number, _1: boolean): UndirectedEdgeBitSet;
    createFromBitSet(_0: UndirectedEdgeBitSet): UndirectedEdgeBitSet;
    beginId(): UndirectedEdgeId;
  };
  PixelBitSet: {
    new(): PixelBitSet;
    new(_0: number): PixelBitSet;
    new(_0: number, _1: boolean): PixelBitSet;
    createFromSize(_0: number): PixelBitSet;
    createFromValue(_0: number, _1: boolean): PixelBitSet;
    createFromBitSet(_0: PixelBitSet): PixelBitSet;
    beginId(): PixelId;
  };
  VoxelBitSet: {
    new(): VoxelBitSet;
    new(_0: number): VoxelBitSet;
    new(_0: number, _1: boolean): VoxelBitSet;
    createFromSize(_0: number): VoxelBitSet;
    createFromValue(_0: number, _1: boolean): VoxelBitSet;
    createFromBitSet(_0: VoxelBitSet): VoxelBitSet;
    beginId(): VoxelId;
  };
  RegionBitSet: {
    new(): RegionBitSet;
    new(_0: number): RegionBitSet;
    new(_0: number, _1: boolean): RegionBitSet;
    createFromSize(_0: number): RegionBitSet;
    createFromValue(_0: number, _1: boolean): RegionBitSet;
    createFromBitSet(_0: RegionBitSet): RegionBitSet;
    beginId(): RegionId;
  };
  NodeBitSet: {
    new(): NodeBitSet;
    new(_0: number): NodeBitSet;
    new(_0: number, _1: boolean): NodeBitSet;
    createFromSize(_0: number): NodeBitSet;
    createFromValue(_0: number, _1: boolean): NodeBitSet;
    createFromBitSet(_0: NodeBitSet): NodeBitSet;
    beginId(): NodeId;
  };
  ObjBitSet: {
    new(): ObjBitSet;
    new(_0: number): ObjBitSet;
    new(_0: number, _1: boolean): ObjBitSet;
    createFromSize(_0: number): ObjBitSet;
    createFromValue(_0: number, _1: boolean): ObjBitSet;
    createFromBitSet(_0: ObjBitSet): ObjBitSet;
    beginId(): ObjId;
  };
  TextureBitSet: {
    new(): TextureBitSet;
    new(_0: number): TextureBitSet;
    new(_0: number, _1: boolean): TextureBitSet;
    createFromSize(_0: number): TextureBitSet;
    createFromValue(_0: number, _1: boolean): TextureBitSet;
    createFromBitSet(_0: TextureBitSet): TextureBitSet;
    beginId(): TextureId;
  };
  GraphVertBitSet: {
    new(): GraphVertBitSet;
    new(_0: number): GraphVertBitSet;
    new(_0: number, _1: boolean): GraphVertBitSet;
    createFromSize(_0: number): GraphVertBitSet;
    createFromValue(_0: number, _1: boolean): GraphVertBitSet;
    createFromBitSet(_0: GraphVertBitSet): GraphVertBitSet;
    beginId(): GraphVertId;
  };
  GraphEdgeBitSet: {
    new(): GraphEdgeBitSet;
    new(_0: number): GraphEdgeBitSet;
    new(_0: number, _1: boolean): GraphEdgeBitSet;
    createFromSize(_0: number): GraphEdgeBitSet;
    createFromValue(_0: number, _1: boolean): GraphEdgeBitSet;
    createFromBitSet(_0: GraphEdgeBitSet): GraphEdgeBitSet;
    beginId(): GraphEdgeId;
  };
  ICPElementBitSet: {
    new(): ICPElementBitSet;
    new(_0: number): ICPElementBitSet;
    new(_0: number, _1: boolean): ICPElementBitSet;
    createFromSize(_0: number): ICPElementBitSet;
    createFromValue(_0: number, _1: boolean): ICPElementBitSet;
    createFromBitSet(_0: ICPElementBitSet): ICPElementBitSet;
    beginId(): ICPElementId;
  };
  faceBitSetAnd(_0: FaceBitSet, _1: FaceBitSet): FaceBitSet;
  faceBitSetOr(_0: FaceBitSet, _1: FaceBitSet): FaceBitSet;
  faceBitSetXor(_0: FaceBitSet, _1: FaceBitSet): FaceBitSet;
  faceBitSetSub(_0: FaceBitSet, _1: FaceBitSet): FaceBitSet;
  BooleanOperation: {InsideA: BooleanOperationValue<0>, InsideB: BooleanOperationValue<1>, OutsideA: BooleanOperationValue<2>, OutsideB: BooleanOperationValue<3>, Union: BooleanOperationValue<4>, Intersection: BooleanOperationValue<5>, DifferenceBA: BooleanOperationValue<6>, DifferenceAB: BooleanOperationValue<7>, Count: BooleanOperationValue<8>};
  BooleanResultMapObject: {A: BooleanResultMapObjectValue<0>, B: BooleanResultMapObjectValue<1>, Count: BooleanResultMapObjectValue<2>};
  BooleanResultMaps: {
    new(): BooleanResultMaps;
  };
  BooleanInternalParameters: {
    new(): BooleanInternalParameters;
  };
  BooleanResultMapper: {
    new(): BooleanResultMapper;
  };
  Box1f: {
    new(): Box1f;
    new(_0: number, _1: number): Box1f;
    fromMinAndSize(_0: number, _1: number): Box1f;
    getMinBoxCorner(_0: number): boolean;
    getMaxBoxCorner(_0: number): boolean;
  };
  Box1i: {
    new(): Box1i;
    new(_0: number, _1: number): Box1i;
    fromMinAndSize(_0: number, _1: number): Box1i;
    getMinBoxCorner(_0: number): boolean;
    getMaxBoxCorner(_0: number): boolean;
  };
  Box1i64: {
    new(): Box1i64;
    new(_0: bigint, _1: bigint): Box1i64;
    fromMinAndSize(_0: bigint, _1: bigint): Box1i64;
    getMinBoxCorner(_0: bigint): boolean;
    getMaxBoxCorner(_0: bigint): boolean;
  };
  Box1d: {
    new(): Box1d;
    new(_0: number, _1: number): Box1d;
    fromMinAndSize(_0: number, _1: number): Box1d;
    getMinBoxCorner(_0: number): boolean;
    getMaxBoxCorner(_0: number): boolean;
  };
  Box2f: {
    new(): Box2f;
    new(_0: Vector2f, _1: Vector2f): Box2f;
    fromMinAndSize(_0: Vector2f, _1: Vector2f): Box2f;
    getMinBoxCorner(_0: Vector2f): Vector2b;
    getMaxBoxCorner(_0: Vector2f): Vector2b;
  };
  Box2i: {
    new(): Box2i;
    new(_0: Vector2i, _1: Vector2i): Box2i;
    fromMinAndSize(_0: Vector2i, _1: Vector2i): Box2i;
    getMinBoxCorner(_0: Vector2i): Vector2b;
    getMaxBoxCorner(_0: Vector2i): Vector2b;
  };
  Box2i64: {
    new(): Box2i64;
    new(_0: Vector2i64, _1: Vector2i64): Box2i64;
    fromMinAndSize(_0: Vector2i64, _1: Vector2i64): Box2i64;
    getMinBoxCorner(_0: Vector2i64): Vector2b;
    getMaxBoxCorner(_0: Vector2i64): Vector2b;
  };
  Box2d: {
    new(): Box2d;
    new(_0: Vector2d, _1: Vector2d): Box2d;
    fromMinAndSize(_0: Vector2d, _1: Vector2d): Box2d;
    getMinBoxCorner(_0: Vector2d): Vector2b;
    getMaxBoxCorner(_0: Vector2d): Vector2b;
  };
  Box3f: {
    new(): Box3f;
    new(_0: Vector3f, _1: Vector3f): Box3f;
    fromMinAndSize(_0: Vector3f, _1: Vector3f): Box3f;
    getMinBoxCorner(_0: Vector3f): Vector3b;
    getMaxBoxCorner(_0: Vector3f): Vector3b;
  };
  Box3i: {
    new(): Box3i;
    new(_0: Vector3i, _1: Vector3i): Box3i;
    fromMinAndSize(_0: Vector3i, _1: Vector3i): Box3i;
    getMinBoxCorner(_0: Vector3i): Vector3b;
    getMaxBoxCorner(_0: Vector3i): Vector3b;
  };
  Box3i64: {
    new(): Box3i64;
    new(_0: Vector3i64, _1: Vector3i64): Box3i64;
    fromMinAndSize(_0: Vector3i64, _1: Vector3i64): Box3i64;
    getMinBoxCorner(_0: Vector3i64): Vector3b;
    getMaxBoxCorner(_0: Vector3i64): Vector3b;
  };
  Box3d: {
    new(): Box3d;
    new(_0: Vector3d, _1: Vector3d): Box3d;
    fromMinAndSize(_0: Vector3d, _1: Vector3d): Box3d;
    getMinBoxCorner(_0: Vector3d): Vector3b;
    getMaxBoxCorner(_0: Vector3d): Vector3b;
  };
  FaceBMapBuffer: {
    new(): FaceBMapBuffer;
    new(_0: number): FaceBMapBuffer;
  };
  VertBMapBuffer: {
    new(): VertBMapBuffer;
    new(_0: number): VertBMapBuffer;
  };
  EdgeBMapBuffer: {
    new(): EdgeBMapBuffer;
    new(_0: number): EdgeBMapBuffer;
  };
  UndirectedEdgeBMapBuffer: {
    new(): UndirectedEdgeBMapBuffer;
    new(_0: number): UndirectedEdgeBMapBuffer;
  };
  WholeEdgeBMapBuffer: {
    new(): WholeEdgeBMapBuffer;
    new(_0: number): WholeEdgeBMapBuffer;
  };
  FaceIdEdgeIdSizeTBMapBuffer: {
    new(): FaceIdEdgeIdSizeTBMapBuffer;
    new(_0: number): FaceIdEdgeIdSizeTBMapBuffer;
  };
  VertIdSizeTBMapBuffer: {
    new(): VertIdSizeTBMapBuffer;
    new(_0: number): VertIdSizeTBMapBuffer;
  };
  EdgeIdSizeTBMapBuffer: {
    new(): EdgeIdSizeTBMapBuffer;
    new(_0: number): EdgeIdSizeTBMapBuffer;
  };
  UndirectedEdgeIdSizeTBMapBuffer: {
    new(): UndirectedEdgeIdSizeTBMapBuffer;
    new(_0: number): UndirectedEdgeIdSizeTBMapBuffer;
  };
  PackMapping: {
    new(): PackMapping;
  };
  CloudPartMapping: {
    new(): CloudPartMapping;
  };
  Color: {
    new(): Color;
    new(_0: number, _1: number, _2: number): Color;
    new(_0: number, _1: number, _2: number, _3: number): Color;
    new(_0: Vector4i): Color;
    white(): Color;
    black(): Color;
    gray(): Color;
    red(): Color;
    green(): Color;
    blue(): Color;
    yellow(): Color;
    brown(): Color;
    purple(): Color;
    transparent(): Color;
    fromVector3i(_0: Vector3i): Color;
    fromVector4i(_0: Vector4i): Color;
  };
  ColorAdd(_0: Color, _1: Color): Color;
  ColorSub(_0: Color, _1: Color): Color;
  ColorMul(_0: number, _1: Color): Color;
  ColorMulRev(_0: Color, _1: number): Color;
  ColorDiv(_0: Color, _1: number): Color;
  ColorBlend(_0: Color, _1: Color): Color;
  PI: number;
  PI2: number;
  PI_F: number;
  PI2_F: number;
  NewEdgesMap: {
    new(): NewEdgesMap;
  };
  ForceFill: {None: ForceFillValue<0>, Good: ForceFillValue<1>, All: ForceFillValue<2>};
  CutMeshParameters: {
    new(): CutMeshParameters;
  };
  Dipole: {
    new(): Dipole;
  };
  EdgeLengthMesh: {
    new(): EdgeLengthMesh;
    fromMesh(_0: Mesh): EdgeLengthMesh;
  };
  EdgePoint: {
    new(): EdgePoint;
    new(_0: EdgeId, _1: number): EdgePoint;
    createFromMeshTopology(_0: MeshTopology, _1: VertId): EdgePoint;
    createFromPolylineTopology(_0: PolylineTopology, _1: VertId): EdgePoint;
  };
  EdgePointPair: {
    new(): EdgePointPair;
    new(_0: EdgePoint, _1: EdgePoint): EdgePointPair;
  };
  EdgeSegment: {
    new(): EdgeSegment;
    new(_0: EdgeId, _1: number, _2: number): EdgeSegment;
  };
  VertexMass: {Unit: VertexMassValue<0>, NeiArea: VertexMassValue<1>};
  EdgeWeights: {Unit: EdgeWeightsValue<0>, Cotan: EdgeWeightsValue<1>};
  Processing: {Continue: ProcessingValue<0>, Stop: ProcessingValue<1>};
  OrientNormals: {TowardOrigin: OrientNormalsValue<0>, AwayFromOrigin: OrientNormalsValue<1>, Smart: OrientNormalsValue<2>};
  OffsetMode: {Smooth: OffsetModeValue<0>, Standard: OffsetModeValue<1>, Sharpening: OffsetModeValue<2>};
  ColoringType: {SolidColor: ColoringTypeValue<0>, PrimitivesColorMap: ColoringTypeValue<1>, FacesColorMap: ColoringTypeValue<1>, LinesColorMap: ColoringTypeValue<1>, VertsColorMap: ColoringTypeValue<2>};
  asString(_0: ColoringType): string;
  UseAABBTree: {No: UseAABBTreeValue<0>, Yes: UseAABBTreeValue<1>, YesIfAlreadyConstructed: UseAABBTreeValue<2>};
  GeodesicPathApprox: {DijkstraBiDir: GeodesicPathApproxValue<0>, DijkstraAStar: GeodesicPathApproxValue<1>, FastMarching: GeodesicPathApproxValue<2>};
  ExpectedVoid: {};
  ExpectedStdString: {};
  ExpectedBool: {};
  ExpectedMeshTopology: {};
  ExpectedMesh: {};
  ExpectedEdgeLengthMesh: {};
  ExpectedMeshOrPoints: {};
  ExpectedPointCloud: {};
  ExpectedAABBTree: {};
  ExpectedAABBTreePoints: {};
  ExpectedAABBTreeObjects: {};
  ExpectedCloudPartMapping: {};
  ExpectedPartMapping: {};
  ExpectedMeshOrPointsXf: {};
  ExpectedMeshTexture: {};
  ExpectedGridSettings: {};
  ExpectedTriMesh: {};
  ExpectedFaceFace: {};
  ExpectedBooleanResultPoints: {};
  ExpectedVectorFaceFace: {};
  ExpectedVertIdPair: {};
  ExpectedFaceIdPair: {};
  ExpectedEdgeIdPair: {};
  ExpectedUndirectedIdPair: {};
  ExpectedUndirectedE2EIdPair: {};
  ExpectedVertHashMapEntries: {};
  ExpectedFaceHashMapEntries: {};
  ExpectedEdgeHashMapEntries: {};
  ExpectedUndirectedEdgeHashMapEntries: {};
  ExpectedWholeEdgeHashMapEntries: {};
  ExpectedFaceBitSet: {};
  ExpectedVertBitSet: {};
  ExpectedEdgeBitSet: {};
  ExpectedUndirectedEdgeBitSet: {};
  ExpectedPixelBitSet: {};
  ExpectedVoxelBitSet: {};
  ExpectedRegionBitSet: {};
  ExpectedNodeBitSet: {};
  ExpectedObjBitSet: {};
  ExpectedTextureBitSet: {};
  ExpectedGraphVertBitSet: {};
  ExpectedGraphEdgeBitSet: {};
  ExpectedPackMapping: {};
  ExpectedEdgePath: {};
  ExpectedEdgeLoops: {};
  ExpectedOneMeshContour: {};
  ExpectedOneMeshContours: {};
  ExpectedSurfacePath: {};
  FaceFace: {
    new(): FaceFace;
    new(_0: FaceId, _1: FaceId): FaceFace;
  };
  UndirectedEdgeUndirectedEdge: {
    new(): UndirectedEdgeUndirectedEdge;
    new(_0: UndirectedEdgeId, _1: UndirectedEdgeId): UndirectedEdgeUndirectedEdge;
  };
  FillHoleNicelySettings: {
    new(): FillHoleNicelySettings;
  };
  FixParams: {
    new(): FixParams;
  };
  FreeFormDeformer: {
    new(_0: VertCoords, _1: VertBitSet): FreeFormDeformer;
    createFreeFormDeformerFromMesh(_0: Mesh, _1: VertBitSet | null): FreeFormDeformer | null;
    createFreeFormDeformerFromCoords(_0: VertCoords, _1: VertBitSet): FreeFormDeformer | null;
  };
  FreeFormBestFit: {
    new(_0: Box3d, _1: Vector3i): FreeFormBestFit;
  };
  ModelPointsData: {
    new(): ModelPointsData;
  };
  ObjVertId: {
    new(): ObjVertId;
  };
  EdgeType: {Horizontal: EdgeTypeValue<0>, Vertical: EdgeTypeValue<1>, DiagonalA: EdgeTypeValue<2>, DiagonalB: EdgeTypeValue<3>};
  TriType: {Lower: TriTypeValue<0>, Upper: TriTypeValue<1>};
  GridSettings: {
    new(): GridSettings;
  };
  __phmap_internal_FlatHashMapPolicy_EdgeId: {};
  __phmap_internal_raw_hash_set_EdgeId: {};
  __phmap_internal_raw_hash_map_EdgeId: {};
  __phmap_internal_FlatHashMapPolicy_UndirectedEdgeId: {};
  __phmap_internal_raw_hash_set_UndirectedEdgeId: {};
  __phmap_internal_raw_hash_map_UndirectedEdgeId: {};
  __phmap_internal_FlatHashMapPolicy_FaceId: {};
  __phmap_internal_raw_hash_set_FaceId: {};
  __phmap_internal_raw_hash_map_FaceId: {};
  __phmap_internal_FlatHashMapPolicy_VertId: {};
  __phmap_internal_raw_hash_set_VertId: {};
  __phmap_internal_raw_hash_map_VertId: {};
  __phmap_internal_FlatHashMapPolicy_PixelId: {};
  __phmap_internal_raw_hash_set_PixelId: {};
  __phmap_internal_raw_hash_map_PixelId: {};
  __phmap_internal_FlatHashMapPolicy_VoxelId: {};
  __phmap_internal_raw_hash_set_VoxelId: {};
  __phmap_internal_raw_hash_map_VoxelId: {};
  __phmap_internal_FlatHashMapPolicy_RegionId: {};
  __phmap_internal_raw_hash_set_RegionId: {};
  __phmap_internal_raw_hash_map_RegionId: {};
  __phmap_internal_FlatHashMapPolicy_NodeId: {};
  __phmap_internal_raw_hash_set_NodeId: {};
  __phmap_internal_raw_hash_map_NodeId: {};
  __phmap_internal_FlatHashMapPolicy_ObjId: {};
  __phmap_internal_raw_hash_set_ObjId: {};
  __phmap_internal_raw_hash_map_ObjId: {};
  __phmap_internal_FlatHashMapPolicy_TextureId: {};
  __phmap_internal_raw_hash_set_TextureId: {};
  __phmap_internal_raw_hash_map_TextureId: {};
  __phmap_internal_FlatHashMapPolicy_GraphVertId: {};
  __phmap_internal_raw_hash_set_GraphVertId: {};
  __phmap_internal_raw_hash_map_GraphVertId: {};
  __phmap_internal_FlatHashMapPolicy_GraphEdgeId: {};
  __phmap_internal_raw_hash_set_GraphEdgeId: {};
  __phmap_internal_raw_hash_map_GraphEdgeId: {};
  __phmap_internal_FlatHashMapPolicy_UndirectedEdgeIdEdgeId: {};
  __phmap_internal_raw_hash_set_UndirectedEdgeIdEdgeId: {};
  __phmap_internal_raw_hash_map_UndirectedEdgeIdEdgeId: {};
  __phmap_internal_FlatHashMapPolicy_UndirectedEdgeIdInt: {};
  __phmap_internal_raw_hash_set_UndirectedEdgeIdInt: {};
  __phmap_internal_raw_hash_map_UndirectedEdgeIdInt: {};
  __phmap_internal_FlatHashMapPolicy_IntBox3i: {};
  __phmap_internal_raw_hash_set_IntBox3i: {};
  __phmap_internal_raw_hash_map_IntBox3i: {};
  VertHashMap: {
    new(): VertHashMap;
  };
  FaceHashMap: {
    new(): FaceHashMap;
  };
  EdgeHashMap: {
    new(): EdgeHashMap;
  };
  UndirectedEdgeHashMap: {
    new(): UndirectedEdgeHashMap;
  };
  WholeEdgeHashMap: {
    new(): WholeEdgeHashMap;
  };
  UndirectedEdgeIdIntHashMap: {
    new(): UndirectedEdgeIdIntHashMap;
  };
  IntBox3iHashMap: {
    new(): IntBox3iHashMap;
  };
  ICPPairData: {
    new(): ICPPairData;
  };
  PointPair: {
    new(): PointPair;
  };
  IPointPairs: {};
  PointPairs: {
    new(): PointPairs;
    new(_0: PointPairs): PointPairs;
  };
  NumSum: {
    new(): NumSum;
  };
  ICP: {
    new(_0: MeshOrPoints, _1: MeshOrPoints, _2: AffineXf3f, _3: AffineXf3f, _4: VertBitSet, _5: VertBitSet): ICP;
    new(_0: MeshOrPoints, _1: MeshOrPoints, _2: AffineXf3f, _3: AffineXf3f, _4: number): ICP;
    new(_0: MeshOrPointsXf, _1: MeshOrPointsXf, _2: VertBitSet, _3: VertBitSet): ICP;
    new(_0: MeshOrPointsXf, _1: MeshOrPointsXf, _2: number): ICP;
  };
  getNumSamples(_0: IPointPairs): number;
  getNumActivePairs(_0: IPointPairs): number;
  getMeanSqDistToPoint(_0: IPointPairs): number;
  getMeanSqDistToPlane(_0: IPointPairs): number;
  deactivateFarPairs(_0: IPointPairs, _1: number): number;
  ICPMethod: {Combined: ICPMethodValue<0>, PointToPoint: ICPMethodValue<1>, PointToPlane: ICPMethodValue<2>};
  ICPMode: {RigidScale: ICPModeValue<0>, AnyRigidXf: ICPModeValue<1>, OrthogonalAxis: ICPModeValue<2>, FixedAxis: ICPModeValue<3>, TranslationOnly: ICPModeValue<4>};
  getICPStatusInfo(_0: number, _1: ICPExitType): string;
  ICPExitType: {NotStarted: ICPExitTypeValue<0>, NotFoundSolution: ICPExitTypeValue<1>, MaxIterations: ICPExitTypeValue<2>, MaxBadIterations: ICPExitTypeValue<3>, StopMsdReached: ICPExitTypeValue<4>};
  VertexIdentifier: {
    new(): VertexIdentifier;
  };
  EqualVector3f: {
    new(): EqualVector3f;
  };
  lerp(_0: number, _1: number, _2: number): number;
  MyClass: {
    new(_0: number, _1: EmbindString): MyClass;
    getStringFromInstance(_0: MyClass): string;
  };
  RememberShape: {Yes: RememberShapeValue<0>, No: RememberShapeValue<1>};
  Laplacian: {
    new(_0: Mesh): Laplacian;
    new(_0: MeshTopology, _1: VertCoords): Laplacian;
  };
  Line2f: {
    new(): Line2f;
    new(_0: Vector2f, _1: Vector2f): Line2f;
  };
  Line2d: {
    new(): Line2d;
    new(_0: Vector2d, _1: Vector2d): Line2d;
  };
  Line3f: {
    new(): Line3f;
    new(_0: Vector3f, _1: Vector3f): Line3f;
  };
  Line3d: {
    new(): Line3d;
    new(_0: Vector3d, _1: Vector3d): Line3d;
  };
  LineSegm2f: {
    new(): LineSegm2f;
    new(_0: Vector2f, _1: Vector2f): LineSegm2f;
  };
  LineSegm2d: {
    new(): LineSegm2d;
    new(_0: Vector2d, _1: Vector2d): LineSegm2d;
  };
  LineSegm3f: {
    new(): LineSegm3f;
    new(_0: Vector3f, _1: Vector3f): LineSegm3f;
  };
  LineSegm3d: {
    new(): LineSegm3d;
    new(_0: Vector3d, _1: Vector3d): LineSegm3d;
  };
  doSegmentsIntersect2f(_0: LineSegm2f, _1: LineSegm2f, _2: number, _3: number): boolean;
  doSegmentsIntersect2d(_0: LineSegm2d, _1: LineSegm2d, _2: number, _3: number): boolean;
  doSegmentLineIntersect2f(_0: LineSegm2f, _1: Line2f, _2: number, _3: number): boolean;
  doSegmentLineIntersect2d(_0: LineSegm2d, _1: Line2d, _2: number, _3: number): boolean;
  Matrix2b: {
    new(): Matrix2b;
  };
  Matrix2i: {
    new(): Matrix2i;
  };
  Matrix2i64: {
    new(): Matrix2i64;
  };
  Matrix2f: {
    new(): Matrix2f;
  };
  Matrix2d: {
    new(): Matrix2d;
  };
  Matrix3b: {
    new(): Matrix3b;
  };
  Matrix3i: {
    new(): Matrix3i;
  };
  Matrix3i64: {
    new(): Matrix3i64;
  };
  Matrix3f: {
    new(): Matrix3f;
  };
  to3dimMatf(_0: Matrix2f): Matrix3f;
  to2dimMatf(_0: Matrix3f): Matrix2f;
  Matrix3d: {
    new(): Matrix3d;
  };
  to3dimMatd(_0: Matrix2d): Matrix3d;
  to2dimMatd(_0: Matrix3d): Matrix2d;
  isRigidf(_0: Matrix3f): boolean;
  isRigidd(_0: Matrix3d): boolean;
  decomposeMatrix3f(_0: Matrix3f, _1: Matrix3f, _2: Matrix3f): void;
  decomposeMatrix3d(_0: Matrix3d, _1: Matrix3d, _2: Matrix3d): void;
  Matrix4b: {
    new(): Matrix4b;
  };
  Matrix4i: {
    new(): Matrix4i;
  };
  Matrix4i64: {
    new(): Matrix4i64;
  };
  Matrix4f: {
    new(): Matrix4f;
  };
  Matrix4d: {
    new(): Matrix4d;
  };
  Mesh: {
    new(): Mesh;
    fromTrianglesMemoryView(_0: any, _1: any, _2: boolean): Mesh;
    fromTrianglesArray(_0: any, _1: any, _2: boolean): Mesh;
    fromTrianglesArrayTest(_0: any, _1: any, _2: boolean): any;
    fromTrianglesArrayTestVertexIdentifier(_0: any, _1: any, _2: boolean): any;
    getGeometry(_0: Mesh): any;
  };
  makeBasisAxes(_0: number, _1: number, _2: number, _3: number, _4: number): Mesh;
  findTwinEdges(_0: Mesh, _1: number): EdgeBitSet;
  findTwinUndirectedEdges(_0: Mesh, _1: number): UndirectedEdgeBitSet;
  findTwinUndirectedEdgeHashMap(_0: Mesh, _1: number): UndirectedEdgeHashMap;
  smoothExtractedRegionBoundary(_0: Mesh, _1: number): any;
  calculateRecommendedVoxelSizeImpl(_0: Mesh, _1: number): number;
  BooleanResult: {
    new(): BooleanResult;
  };
  BooleanPreCutResult: {
    new(): BooleanPreCutResult;
  };
  BooleanParameters: {
    new(): BooleanParameters;
  };
  BooleanResultPoints: {
    new(): BooleanResultPoints;
  };
  booleanWithParams(_0: Mesh, _1: Mesh, _2: BooleanOperation, _3: BooleanParameters): BooleanResult;
  booleanByMoveWithParams(_0: Mesh, _1: Mesh, _2: BooleanOperation, _3: BooleanParameters): BooleanResult;
  selfBoolean(_0: Mesh): ExpectedMesh;
  getBooleanPoints(_0: Mesh, _1: Mesh, _2: BooleanOperation, _3: AffineXf3f | null): ExpectedBooleanResultPoints;
  booleanWithCallbackImpl(_0: Mesh, _1: Mesh, _2: BooleanOperation, _3: AffineXf3f | null, _4: BooleanResultMapper | null, _5: any): BooleanResult;
  UniteCloseParams: {
    new(): UniteCloseParams;
  };
  uniteCloseVertices(_0: Mesh, _1: UniteCloseParams): number;
  Triangle: {
    new(): Triangle;
    new(_0: VertId, _1: VertId, _2: VertId, _3: FaceId): Triangle;
  };
  BuildSettings: {
    new(): BuildSettings;
  };
  EdgeTri: {
    new(): EdgeTri;
    new(_0: EdgeId, _1: FaceId): EdgeTri;
  };
  FlaggedTri: {
    new(): FlaggedTri;
  };
  VarEdgeTri: {
    new(): VarEdgeTri;
    new(_0: boolean, _1: EdgeTri): VarEdgeTri;
    new(_0: boolean, _1: EdgeId, _2: FaceId): VarEdgeTri;
  };
  FaceIncidence: {PerEdge: FaceIncidenceValue<0>, PerVertex: FaceIncidenceValue<1>};
  ExpandToComponentsParams: {
    new(): ExpandToComponentsParams;
  };
  LargeByAreaComponentsSettings: {
    new(): LargeByAreaComponentsSettings;
  };
  getLargestComponentVerts(_0: Mesh, _1: VertBitSet | null): VertBitSet;
  getLargeComponentVerts(_0: Mesh, _1: number, _2: VertBitSet | null): VertBitSet;
  getComponentsVerts(_0: Mesh, _1: VertBitSet, _2: VertBitSet | null): VertBitSet;
  hasFullySelectedComponent(_0: Mesh, _1: VertBitSet): boolean;
  excludeFullySelectedComponents(_0: Mesh, _1: VertBitSet): void;
  getComponentsUndirectedEdges(_0: Mesh, _1: UndirectedEdgeBitSet): UndirectedEdgeBitSet;
  MakeDegenerateBandAroundRegionParams: {
    new(): MakeDegenerateBandAroundRegionParams;
  };
  makeDegenerateBandAroundRegion(_0: Mesh, _1: FaceBitSet, _2: MakeDegenerateBandAroundRegionParams): void;
  MultipleEdgesResolveMode: {None: MultipleEdgesResolveModeValue<0>, Simple: MultipleEdgesResolveModeValue<1>, Strong: MultipleEdgesResolveModeValue<2>};
  FillHoleParams: {
    new(): FillHoleParams;
  };
  StitchHolesParams: {
    new(): StitchHolesParams;
  };
  MakeBridgeResult: {
    new(): MakeBridgeResult;
  };
  buildCylinderBetweenTwoHoles(_0: Mesh, _1: StitchHolesParams): boolean;
  fillHoleWithSizeLimitImpl(_0: Mesh, _1: number): Mesh;
  fillAllHolesImpl(_0: Mesh): any;
  duplicateMultiHoleVertices(_0: Mesh): number;
  fixMultipleEdges(_0: Mesh): void;
  FixMeshDegeneraciesParams: {
    new(): FixMeshDegeneraciesParams;
  };
  FixMeshDegeneraciesMode: {Decimate: FixMeshDegeneraciesModeValue<0>, Remesh: FixMeshDegeneraciesModeValue<1>, RemeshPatch: FixMeshDegeneraciesModeValue<2>};
  fixMeshDegeneracies(_0: Mesh, _1: FixMeshDegeneraciesParams): ExpectedVoid;
  findHoleComplicatingFaces(_0: Mesh): FaceBitSet;
  FixCreasesParams: {
    new(): FixCreasesParams;
  };
  fixMeshCreases(_0: Mesh, _1: FixCreasesParams): void;
  FindDisorientationParams: {
    new(): FindDisorientationParams;
  };
  RayMode: {Positive: RayModeValue<0>, Shallowest: RayModeValue<1>, Both: RayModeValue<2>};
  findDisorientedFaces(_0: Mesh, _1: FindDisorientationParams): ExpectedFaceBitSet;
  FilterType: {Linear: FilterTypeValue<0>, Discrete: FilterTypeValue<1>};
  WrapType: {Repeat: WrapTypeValue<0>, Mirror: WrapTypeValue<1>, Clamp: WrapTypeValue<2>};
  Reorder: {None: ReorderValue<0>, Lexicographically: ReorderValue<1>, AABBTree: ReorderValue<2>};
  noInit: NoInit;
  EdgeId: {
    new(): EdgeId;
    new(_0: number): EdgeId;
    fromUndirected(_0: UndirectedEdgeId): EdgeId;
  };
  fillHoleNicely(_0: Mesh, _1: EdgeId, _2: FillHoleNicelySettings): FaceBitSet;
  makeEdgeId(_0: number): EdgeId;
  addEdgeId(_0: EdgeId, _1: number): EdgeId;
  addEdgeIdUInt(_0: EdgeId, _1: number): EdgeId;
  addEdgeIdSize(_0: EdgeId, _1: number): EdgeId;
  subEdgeId(_0: EdgeId, _1: number): EdgeId;
  subEdgeIdUInt(_0: EdgeId, _1: number): EdgeId;
  subEdgeIdSize(_0: EdgeId, _1: number): EdgeId;
  buildCylinderBetweenTwoHolesWithEdges(_0: Mesh, _1: EdgeId, _2: EdgeId, _3: StitchHolesParams): void;
  fillHole(_0: Mesh, _1: EdgeId, _2: FillHoleParams): void;
  makeDegenerateBandAroundHole(_0: Mesh, _1: EdgeId, _2: FaceBitSet | null): EdgeId;
  makeSmoothBridge(_0: Mesh, _1: EdgeId, _2: EdgeId, _3: number, _4: FaceBitSet | null): MakeBridgeResult;
  extendHoleWithFuncBasicImpl(_0: Mesh, _1: EdgeId, _2: any): EdgeId;
  extendHoleWithFuncAndOutputImpl(_0: Mesh, _1: EdgeId, _2: any): any;
  VoxelId: {
    new(): VoxelId;
    new(_0: number): VoxelId;
  };
  makeVoxelId(_0: number): VoxelId;
  addVoxelId(_0: VoxelId, _1: number): VoxelId;
  addVoxelIdUInt(_0: VoxelId, _1: number): VoxelId;
  addVoxelIdSize(_0: VoxelId, _1: number): VoxelId;
  subVoxelId(_0: VoxelId, _1: number): VoxelId;
  subVoxelIdUInt(_0: VoxelId, _1: number): VoxelId;
  subVoxelIdSize(_0: VoxelId, _1: number): VoxelId;
  ICPElementId: {
    new(): ICPElementId;
    new(_0: number): ICPElementId;
  };
  UndirectedEdgeId: {
    new(): UndirectedEdgeId;
    new(_0: number): UndirectedEdgeId;
  };
  makeUndirectedEdgeId(_0: number): UndirectedEdgeId;
  addUndirectedEdgeId(_0: UndirectedEdgeId, _1: number): UndirectedEdgeId;
  addUndirectedEdgeIdUInt(_0: UndirectedEdgeId, _1: number): UndirectedEdgeId;
  addUndirectedEdgeIdSize(_0: UndirectedEdgeId, _1: number): UndirectedEdgeId;
  subUndirectedEdgeId(_0: UndirectedEdgeId, _1: number): UndirectedEdgeId;
  subUndirectedEdgeIdUInt(_0: UndirectedEdgeId, _1: number): UndirectedEdgeId;
  subUndirectedEdgeIdSize(_0: UndirectedEdgeId, _1: number): UndirectedEdgeId;
  FaceId: {
    new(): FaceId;
    new(_0: number): FaceId;
  };
  makeFaceId(_0: number): FaceId;
  addFaceId(_0: FaceId, _1: number): FaceId;
  addFaceIdUInt(_0: FaceId, _1: number): FaceId;
  addFaceIdSize(_0: FaceId, _1: number): FaceId;
  subFaceId(_0: FaceId, _1: number): FaceId;
  subFaceIdUInt(_0: FaceId, _1: number): FaceId;
  subFaceIdSize(_0: FaceId, _1: number): FaceId;
  VertId: {
    new(): VertId;
    new(_0: number): VertId;
  };
  makeVertId(_0: number): VertId;
  addVertId(_0: VertId, _1: number): VertId;
  addVertIdUInt(_0: VertId, _1: number): VertId;
  addVertIdSize(_0: VertId, _1: number): VertId;
  subVertId(_0: VertId, _1: number): VertId;
  subVertIdUInt(_0: VertId, _1: number): VertId;
  subVertIdSize(_0: VertId, _1: number): VertId;
  getComponentVerts(_0: Mesh, _1: VertId, _2: VertBitSet | null): VertBitSet;
  fillHoleTrivially(_0: Mesh, _1: EdgeId, _2: FaceBitSet | null): VertId;
  PixelId: {
    new(): PixelId;
    new(_0: number): PixelId;
  };
  addPixelId(_0: PixelId, _1: number): PixelId;
  addPixelIdUInt(_0: PixelId, _1: number): PixelId;
  addPixelIdSize(_0: PixelId, _1: number): PixelId;
  subPixelId(_0: PixelId, _1: number): PixelId;
  subPixelIdUInt(_0: PixelId, _1: number): PixelId;
  subPixelIdSize(_0: PixelId, _1: number): PixelId;
  RegionId: {
    new(): RegionId;
    new(_0: number): RegionId;
  };
  addRegionId(_0: RegionId, _1: number): RegionId;
  addRegionIdUInt(_0: RegionId, _1: number): RegionId;
  addRegionIdSize(_0: RegionId, _1: number): RegionId;
  subRegionId(_0: RegionId, _1: number): RegionId;
  subRegionIdUInt(_0: RegionId, _1: number): RegionId;
  subRegionIdSize(_0: RegionId, _1: number): RegionId;
  NodeId: {
    new(): NodeId;
    new(_0: number): NodeId;
  };
  addNodeId(_0: NodeId, _1: number): NodeId;
  addNodeIdUInt(_0: NodeId, _1: number): NodeId;
  addNodeIdSize(_0: NodeId, _1: number): NodeId;
  subNodeId(_0: NodeId, _1: number): NodeId;
  subNodeIdUInt(_0: NodeId, _1: number): NodeId;
  subNodeIdSize(_0: NodeId, _1: number): NodeId;
  ObjId: {
    new(): ObjId;
    new(_0: number): ObjId;
  };
  addObjId(_0: ObjId, _1: number): ObjId;
  addObjIdUInt(_0: ObjId, _1: number): ObjId;
  addObjIdSize(_0: ObjId, _1: number): ObjId;
  subObjId(_0: ObjId, _1: number): ObjId;
  subObjIdUInt(_0: ObjId, _1: number): ObjId;
  subObjIdSize(_0: ObjId, _1: number): ObjId;
  TextureId: {
    new(): TextureId;
    new(_0: number): TextureId;
  };
  addTextureId(_0: TextureId, _1: number): TextureId;
  addTextureIdUInt(_0: TextureId, _1: number): TextureId;
  addTextureIdSize(_0: TextureId, _1: number): TextureId;
  subTextureId(_0: TextureId, _1: number): TextureId;
  subTextureIdUInt(_0: TextureId, _1: number): TextureId;
  subTextureIdSize(_0: TextureId, _1: number): TextureId;
  GraphVertId: {
    new(): GraphVertId;
    new(_0: number): GraphVertId;
  };
  addGraphVertId(_0: GraphVertId, _1: number): GraphVertId;
  addGraphVertIdUInt(_0: GraphVertId, _1: number): GraphVertId;
  addGraphVertIdSize(_0: GraphVertId, _1: number): GraphVertId;
  subGraphVertId(_0: GraphVertId, _1: number): GraphVertId;
  subGraphVertIdUInt(_0: GraphVertId, _1: number): GraphVertId;
  subGraphVertIdSize(_0: GraphVertId, _1: number): GraphVertId;
  GraphEdgeId: {
    new(): GraphEdgeId;
    new(_0: number): GraphEdgeId;
  };
  addGraphEdgeId(_0: GraphEdgeId, _1: number): GraphEdgeId;
  addGraphEdgeIdUInt(_0: GraphEdgeId, _1: number): GraphEdgeId;
  addGraphEdgeIdSize(_0: GraphEdgeId, _1: number): GraphEdgeId;
  subGraphEdgeId(_0: GraphEdgeId, _1: number): GraphEdgeId;
  subGraphEdgeIdUInt(_0: GraphEdgeId, _1: number): GraphEdgeId;
  subGraphEdgeIdSize(_0: GraphEdgeId, _1: number): GraphEdgeId;
  FaceBMap: {
    new(): FaceBMap;
  };
  VertBMap: {
    new(): VertBMap;
  };
  EdgeBMap: {
    new(): EdgeBMap;
  };
  UndirectedEdgeBMap: {
    new(): UndirectedEdgeBMap;
  };
  WholeEdgeBMap: {
    new(): WholeEdgeBMap;
  };
  VertIdSizeTBMap: {
    new(): VertIdSizeTBMap;
  };
  UndirectedEdgeIdSizeTBMap: {
    new(): UndirectedEdgeIdSizeTBMap;
  };
  FaceIdSizeTBMap: {
    new(): FaceIdSizeTBMap;
  };
  Triangulation: {
    new(): Triangulation;
    new(_0: number): Triangulation;
    new(_0: number, _1: Array3VertId): Triangulation;
  };
  Dipoles: {
    new(): Dipoles;
    new(_0: number, _1: Dipole): Dipoles;
    new(_0: number): Dipoles;
  };
  EdgeMap: {
    new(): EdgeMap;
    new(_0: number, _1: EdgeId): EdgeMap;
    new(_0: number): EdgeMap;
  };
  UndirectedEdgeMap: {
    new(): UndirectedEdgeMap;
    new(_0: number, _1: UndirectedEdgeId): UndirectedEdgeMap;
    new(_0: number): UndirectedEdgeMap;
  };
  FaceMap: {
    new(): FaceMap;
    new(_0: number, _1: FaceId): FaceMap;
    new(_0: number): FaceMap;
  };
  VertMap: {
    new(): VertMap;
    new(_0: number, _1: VertId): VertMap;
    new(_0: number): VertMap;
  };
  findCloseVerticesFromMap(_0: VertMap): VertBitSet;
  uniteCloseVerticesWithVertMap(_0: Mesh, _1: number, _2: boolean, _3: VertMap | null): number;
  ObjMap: {
    new(): ObjMap;
    new(_0: number, _1: ObjId): ObjMap;
    new(_0: number): ObjMap;
  };
  PixelIdPixelIdMap: {
    new(): PixelIdPixelIdMap;
    new(_0: number, _1: PixelId): PixelIdPixelIdMap;
    new(_0: number): PixelIdPixelIdMap;
  };
  VoxelIdVoxelIdMap: {
    new(): VoxelIdVoxelIdMap;
    new(_0: number, _1: VoxelId): VoxelIdVoxelIdMap;
    new(_0: number): VoxelIdVoxelIdMap;
  };
  RegionIdRegionIdMap: {
    new(): RegionIdRegionIdMap;
    new(_0: number, _1: RegionId): RegionIdRegionIdMap;
    new(_0: number): RegionIdRegionIdMap;
  };
  NodeIdNodeIdMap: {
    new(): NodeIdNodeIdMap;
    new(_0: number, _1: NodeId): NodeIdNodeIdMap;
    new(_0: number): NodeIdNodeIdMap;
  };
  TextureIdTextureIdMap: {
    new(): TextureIdTextureIdMap;
    new(_0: number, _1: TextureId): TextureIdTextureIdMap;
    new(_0: number): TextureIdTextureIdMap;
  };
  GraphVertIdGraphVertIdMap: {
    new(): GraphVertIdGraphVertIdMap;
    new(_0: number, _1: GraphVertId): GraphVertIdGraphVertIdMap;
    new(_0: number): GraphVertIdGraphVertIdMap;
  };
  GraphEdgeIdGraphEdgeIdMap: {
    new(): GraphEdgeIdGraphEdgeIdMap;
    new(_0: number, _1: GraphEdgeId): GraphEdgeIdGraphEdgeIdMap;
    new(_0: number): GraphEdgeIdGraphEdgeIdMap;
  };
  VertIdEdgeIdMap: {
    new(): VertIdEdgeIdMap;
    new(_0: number, _1: VertId): VertIdEdgeIdMap;
    new(_0: number): VertIdEdgeIdMap;
  };
  EdgeIdVertIdMap: {
    new(): EdgeIdVertIdMap;
    new(_0: number, _1: EdgeId): EdgeIdVertIdMap;
    new(_0: number): EdgeIdVertIdMap;
  };
  EdgeIdFaceIdMap: {
    new(): EdgeIdFaceIdMap;
    new(_0: number, _1: EdgeId): EdgeIdFaceIdMap;
    new(_0: number): EdgeIdFaceIdMap;
  };
  FaceIdEdgeIdMap: {
    new(): FaceIdEdgeIdMap;
    new(_0: number, _1: FaceId): FaceIdEdgeIdMap;
    new(_0: number): FaceIdEdgeIdMap;
  };
  VoxelIdFaceIdMap: {
    new(): VoxelIdFaceIdMap;
    new(_0: number, _1: VoxelId): VoxelIdFaceIdMap;
    new(_0: number): VoxelIdFaceIdMap;
  };
  ModelPointsDataObjIdMap: {
    new(): ModelPointsDataObjIdMap;
    new(_0: number, _1: ModelPointsData): ModelPointsDataObjIdMap;
    new(_0: number): ModelPointsDataObjIdMap;
  };
  VertSpanFaceIdMap: {
    new(): VertSpanFaceIdMap;
    new(_0: number, _1: VertSpan): VertSpanFaceIdMap;
    new(_0: number): VertSpanFaceIdMap;
  };
  WholeEdgeMap: {
    new(): WholeEdgeMap;
    new(_0: number, _1: EdgeId): WholeEdgeMap;
    new(_0: number): WholeEdgeMap;
  };
  UndirectedEdge2RegionMap: {
    new(): UndirectedEdge2RegionMap;
    new(_0: number, _1: RegionId): UndirectedEdge2RegionMap;
    new(_0: number): UndirectedEdge2RegionMap;
  };
  Face2RegionMap: {
    new(): Face2RegionMap;
    new(_0: number, _1: RegionId): Face2RegionMap;
    new(_0: number): Face2RegionMap;
  };
  Vert2RegionMap: {
    new(): Vert2RegionMap;
    new(_0: number, _1: RegionId): Vert2RegionMap;
    new(_0: number): Vert2RegionMap;
  };
  VertCoords: {
    new(): VertCoords;
    new(_0: number): VertCoords;
    new(_0: number, _1: Vector3f): VertCoords;
  };
  VertCoords2: {
    new(): VertCoords2;
    new(_0: number): VertCoords2;
    new(_0: number, _1: Vector2f): VertCoords2;
  };
  FaceNormals: {
    new(): FaceNormals;
    new(_0: number): FaceNormals;
    new(_0: number, _1: Vector3f): FaceNormals;
  };
  TexturePerFace: {
    new(): TexturePerFace;
    new(_0: number, _1: TextureId): TexturePerFace;
    new(_0: number): TexturePerFace;
  };
  VertColors: {
    new(): VertColors;
    new(_0: number, _1: Color): VertColors;
    new(_0: number): VertColors;
  };
  FaceColors: {
    new(): FaceColors;
    new(_0: number, _1: Color): FaceColors;
    new(_0: number): FaceColors;
  };
  EdgeColors: {
    new(): EdgeColors;
    new(_0: number, _1: Color): EdgeColors;
    new(_0: number): EdgeColors;
  };
  UndirectedEdgeColors: {
    new(): UndirectedEdgeColors;
    new(_0: number, _1: Color): UndirectedEdgeColors;
    new(_0: number): UndirectedEdgeColors;
  };
  VertScalars: {
    new(): VertScalars;
    new(_0: number, _1: number): VertScalars;
    new(_0: number): VertScalars;
  };
  FaceScalars: {
    new(): FaceScalars;
    new(_0: number, _1: number): FaceScalars;
    new(_0: number): FaceScalars;
  };
  EdgeScalars: {
    new(): EdgeScalars;
    new(_0: number, _1: number): EdgeScalars;
    new(_0: number): EdgeScalars;
  };
  UndirectedEdgeScalars: {
    new(): UndirectedEdgeScalars;
    new(_0: number, _1: number): UndirectedEdgeScalars;
    new(_0: number): UndirectedEdgeScalars;
  };
  NodeVec: {
    new(): NodeVec;
    new(_0: number, _1: AABBTreePointsNode): NodeVec;
    new(_0: number): NodeVec;
  };
  MeshLoadWrapper: {
    fromFile(_0: EmbindString): any;
    fromBinaryData(_0: number, _1: number, _2: EmbindString): any;
  };
  FillHoleMetric: {
    new(): FillHoleMetric;
  };
  FillTriangleMetric: {
    new(): FillTriangleMetric;
  };
  FillEdgeMetric: {
    new(): FillEdgeMetric;
  };
  FillCombineMetric: {
    new(): FillCombineMetric;
  };
  FillHoleMetricWrapper: {
    new(_0: FillHoleMetricWrapper): FillHoleMetricWrapper;
    createFillHoleMetricWrapperFromOther(_0: FillHoleMetricWrapper): FillHoleMetricWrapper;
  };
  createCircumscribedMetric(_0: Mesh): FillHoleMetricWrapper;
  createPlaneFillMetric(_0: Mesh, _1: EdgeId): FillHoleMetricWrapper;
  createPlaneNormalizedFillMetric(_0: Mesh, _1: EdgeId): FillHoleMetricWrapper;
  createComplexStitchMetric(_0: Mesh): FillHoleMetricWrapper;
  createEdgeLengthFillMetric(_0: Mesh): FillHoleMetricWrapper;
  createEdgeLengthStitchMetric(_0: Mesh): FillHoleMetricWrapper;
  createComplexFillMetricWithEdgeId(_0: Mesh, _1: EdgeId): FillHoleMetricWrapper;
  createComplexFillMetric(_0: Mesh): FillHoleMetricWrapper;
  createUniversalMetric(_0: Mesh): FillHoleMetricWrapper;
  createMinTriAngleMetric(_0: Mesh): FillHoleMetricWrapper;
  createMinAreaMetric(_0: Mesh): FillHoleMetricWrapper;
  MeshOrPoints: {
    new(_0: Mesh): MeshOrPoints;
  };
  MeshOrPointsXf: {
    new(_0: MeshOrPoints, _1: AffineXf3f): MeshOrPointsXf;
  };
  updatePointPairs(_0: PointPairs, _1: MeshOrPointsXf, _2: MeshOrPointsXf, _3: number, _4: number, _5: boolean): void;
  MeshPart: {
    new(_0: Mesh): MeshPart;
    new(_0: Mesh, _1: FaceBitSet | null): MeshPart;
  };
  isInside(_0: MeshPart, _1: MeshPart, _2: AffineXf3f | null): boolean;
  isNonIntersectingInside(_0: MeshPart, _1: MeshPart, _2: AffineXf3f | null): boolean;
  isNonIntersectingInsideWithFaceId(_0: Mesh, _1: FaceId, _2: MeshPart, _3: AffineXf3f | null): boolean;
  getComponent(_0: MeshPart, _1: FaceId, _2: FaceIncidence, _3: UndirectedEdgeBitSet | null): FaceBitSet;
  getComponents(_0: MeshPart, _1: FaceBitSet, _2: FaceIncidence, _3: UndirectedEdgeBitSet | null): FaceBitSet;
  getLargeByAreaComponents(_0: MeshPart, _1: number, _2: UndirectedEdgeBitSet | null): FaceBitSet;
  expandToComponents(_0: MeshPart, _1: FaceBitSet, _2: ExpandToComponentsParams): ExpectedFaceBitSet;
  getLargeByAreaSmoothComponents(_0: MeshPart, _1: number, _2: number, _3: UndirectedEdgeBitSet | null): FaceBitSet;
  getNumComponents(_0: MeshPart, _1: FaceIncidence, _2: UndirectedEdgeBitSet | null): number;
  findMaxDistanceSqOneWay(_0: MeshPart, _1: MeshPart, _2: AffineXf3f | null, _3: number): number;
  findMaxDistanceSq(_0: MeshPart, _1: MeshPart, _2: AffineXf3f | null, _3: number): number;
  MeshVertPart: {
    new(_0: Mesh): MeshVertPart;
    new(_0: Mesh, _1: VertBitSet | null): MeshVertPart;
  };
  MeshProjectionResult: {
    new(): MeshProjectionResult;
  };
  removeSpikes(_0: Mesh, _1: number, _2: number, _3: VertBitSet | null): void;
  smoothRegionBoundary(_0: Mesh, _1: FaceBitSet, _2: number): void;
  hardSmoothTetrahedrons(_0: Mesh, _1: VertBitSet | null): void;
  SubdivideSettings: {
    new(): SubdivideSettings;
  };
  MeshTexture: {
    new(): MeshTexture;
  };
  MeshTopology: {
    new(): MeshTopology;
  };
  fromSameTriangle(_0: MeshTopology, _1: EdgePoint, _2: EdgePoint): boolean;
  addTriangles(_0: MeshTopology, _1: Triangulation, _2: BuildSettings): void;
  hasFullySelectedComponentFromTopology(_0: MeshTopology, _1: VertBitSet): boolean;
  makeQuadBridge(_0: MeshTopology, _1: EdgeId, _2: EdgeId, _3: FaceBitSet | null): MakeBridgeResult;
  makeBridge(_0: MeshTopology, _1: EdgeId, _2: EdgeId, _3: FaceBitSet | null): MakeBridgeResult;
  makeBridgeEdge(_0: MeshTopology, _1: EdgeId, _2: EdgeId): EdgeId;
  splitQuad(_0: MeshTopology, _1: EdgeId, _2: FaceBitSet | null): void;
  hasMultipleEdges(_0: MeshTopology): boolean;
  findNRingVerts(_0: MeshTopology, _1: number, _2: VertBitSet | null): VertBitSet;
  isEdgeBetweenDoubleTris(_0: MeshTopology, _1: EdgeId): boolean;
  eliminateDoubleTris(_0: MeshTopology, _1: EdgeId, _2: FaceBitSet | null): EdgeId;
  eliminateDoubleTrisAround(_0: MeshTopology, _1: VertId, _2: FaceBitSet | null): void;
  isDegree3Dest(_0: MeshTopology, _1: EdgeId): boolean;
  eliminateDegree3Dest(_0: MeshTopology, _1: EdgeId, _2: FaceBitSet | null): EdgeId;
  eliminateDegree3Vertices(_0: MeshTopology, _1: VertBitSet, _2: FaceBitSet | null): number;
  isVertexRepeatedOnHoleBd(_0: MeshTopology, _1: VertId): EdgeId;
  findRepeatedVertsOnHoleBd(_0: MeshTopology): VertBitSet;
  removeSpikesWithTopology(_0: MeshTopology, _1: VertCoords, _2: number, _3: number, _4: VertBitSet | null): void;
  hardSmoothTetrahedrons_topology(_0: MeshTopology, _1: VertCoords, _2: VertBitSet | null): void;
  loadMeshDll(): void;
  MeshTriPoint: {
    new(): MeshTriPoint;
    new(_0: EdgeId, _1: TriPointf): MeshTriPoint;
  };
  MovementBuildBodyParams: {
    new(): MovementBuildBodyParams;
  };
  MultiwayAligningTransform: {
    new(): MultiwayAligningTransform;
    new(_0: number): MultiwayAligningTransform;
  };
  ICPGroupPair: {};
  ICPGroupPairs: {};
  IICPTreeIndexer: {
    implement(_0: any): IICPTreeIndexerWrapper;
    extend(_0: EmbindString, _1: any): any;
  };
  IICPTreeIndexerWrapper: {};
  MultiwayICPSamplingParametersCascadeMode: {Sequential: MultiwayICPSamplingParametersCascadeModeValue<0>, AABBTreeBased: MultiwayICPSamplingParametersCascadeModeValue<1>};
  MultiwayICP: {
    new(_0: VectorMeshOrPointsXfObjId, _1: MultiwayICPSamplingParameters): MultiwayICP;
  };
  NoDefInitFaceId: {
    new(): NoDefInitFaceId;
  };
  NoDefInitVertId: {
    new(): NoDefInitVertId;
  };
  NoDefInitEdgeId: {
    new(): NoDefInitEdgeId;
  };
  NoDefInitUndirectedEdgeId: {
    new(): NoDefInitUndirectedEdgeId;
  };
  BaseShellParameters: {
    new(): BaseShellParameters;
  };
  OffsetParameters: {
    new(): OffsetParameters;
  };
  SharpOffsetParameters: {
    new(): SharpOffsetParameters;
  };
  GeneralOffsetParameters: {
    new(): GeneralOffsetParameters;
  };
  suggestVoxelSize(_0: MeshPart, _1: number): number;
  offsetMesh(_0: MeshPart, _1: number, _2: OffsetParameters): ExpectedMesh;
  doubleOffsetMesh(_0: MeshPart, _1: number, _2: number, _3: OffsetParameters): ExpectedMesh;
  mcOffsetMesh(_0: MeshPart, _1: number, _2: OffsetParameters, _3: VoxelIdFaceIdMap | null): ExpectedMesh;
  mcShellMeshRegion(_0: Mesh, _1: FaceBitSet, _2: number, _3: BaseShellParameters, _4: VoxelIdFaceIdMap | null): ExpectedMesh;
  sharpOffsetMesh(_0: MeshPart, _1: number, _2: SharpOffsetParameters): ExpectedMesh;
  generalOffsetMesh(_0: MeshPart, _1: number, _2: GeneralOffsetParameters): ExpectedMesh;
  thickenMesh(_0: Mesh, _1: number, _2: GeneralOffsetParameters): ExpectedMesh;
  offsetOneDirection(_0: MeshPart, _1: number, _2: GeneralOffsetParameters): ExpectedMesh;
  thickenMeshImpl(_0: Mesh, _1: number, _2: GeneralOffsetParameters): any;
  thickenMeshImplFilled(_0: Mesh, _1: number, _2: GeneralOffsetParameters): any;
  SortIntersectionsData: {};
  OneMeshContour: {
    new(): OneMeshContour;
  };
  OneMeshIntersection: {
    new(): OneMeshIntersection;
  };
  PartMapping: {
    new(): PartMapping;
  };
  Plane3f: {
    new(): Plane3f;
    new(_0: Plane3d): Plane3f;
    new(_0: Vector3f, _1: number): Plane3f;
    fromDirAndPt(_0: Vector3f, _1: Vector3f): Plane3f;
  };
  extendHole(_0: Mesh, _1: EdgeId, _2: Plane3f, _3: FaceBitSet | null): EdgeId;
  createComplexFillMetricWithPlane3f(_0: Mesh, _1: EdgeId, _2: Plane3f | null): FillHoleMetricWrapper;
  Plane3d: {
    new(): Plane3d;
    new(_0: Plane3f): Plane3d;
    new(_0: Vector3d, _1: number): Plane3d;
    fromDirAndPt(_0: Vector3d, _1: Vector3d): Plane3d;
  };
  PointCloud: {
    new(): PointCloud;
  };
  PointCloudPart: {
    new(_0: PointCloud): PointCloudPart;
    new(_0: PointCloud, _1: VertBitSet | null): PointCloudPart;
  };
  PointOnFace: {};
  findDistance(_0: MeshPart, _1: MeshPart, _2: AffineXf3f | null, _3: number): MeshMeshDistanceResult;
  findSignedDistance(_0: MeshPart, _1: MeshPart, _2: AffineXf3f | null, _3: number): MeshMeshSignedDistanceResult;
  findSignedDistanceAB(_0: MeshPart, _1: MeshPart): MeshMeshSignedDistanceResult;
  findSignedDistanceWithTransform(_0: MeshPart, _1: MeshPart, _2: AffineXf3f | null): MeshMeshSignedDistanceResult;
  findSignedDistanceWithLimit(_0: MeshPart, _1: MeshPart, _2: AffineXf3f | null, _3: number): MeshMeshSignedDistanceResult;
  PointToPlaneAligningTransform: {
    new(): PointToPlaneAligningTransform;
  };
  IPointsToMeshProjector: {};
  PointsToMeshProjector: {
    new(): PointsToMeshProjector;
  };
  MeshProjectionParameters: {
    new(): MeshProjectionParameters;
  };
  findSignedDistancesByPoints(_0: Mesh, _1: VertCoords, _2: VertBitSet | null, _3: MeshProjectionParameters, _4: IPointsToMeshProjector | null): VertScalars;
  findSignedDistancesByMesh(_0: Mesh, _1: Mesh, _2: MeshProjectionParameters, _3: IPointsToMeshProjector | null): VertScalars;
  Polyline3: {
    new(): Polyline3;
    new(_0: VectorVector3f): Polyline3;
    fromContours(_0: VectorVectorVector3f): Polyline3;
  };
  offsetPolyline(_0: Polyline3, _1: number, _2: OffsetParameters): ExpectedMesh;
  Polyline2: {
    new(): Polyline2;
    new(_0: VectorVector2f): Polyline2;
    fromContours(_0: VectorVectorVector2f): Polyline2;
  };
  PolylineTopology: {
    new(): PolylineTopology;
  };
  PolylineMaker: {
    new(_0: PolylineTopology): PolylineMaker;
  };
  SpacingSettings: {
    new(): SpacingSettings;
  };
  positionVertsSmoothly(_0: Mesh, _1: VertBitSet, _2: EdgeWeights, _3: VertexMass, _4: VertBitSet | null): void;
  positionVertsSmoothlyWithTopology(_0: MeshTopology, _1: VertCoords, _2: VertBitSet, _3: EdgeWeights, _4: VertexMass, _5: VertBitSet | null): void;
  positionVertsSmoothlySharpBd(_0: Mesh, _1: VertBitSet, _2: VertCoords | null, _3: VertScalars | null): void;
  positionVertsSmoothlySharpBdWithTopology(_0: MeshTopology, _1: VertCoords, _2: VertBitSet, _3: VertCoords | null, _4: VertScalars | null): void;
  positionVertsWithSpacing(_0: Mesh, _1: SpacingSettings): void;
  positionVertsWithSpacingWithTopology(_0: MeshTopology, _1: VertCoords, _2: SpacingSettings): void;
  inflate(_0: Mesh, _1: VertBitSet, _2: InflateSettings): void;
  inflateWithTopology(_0: MeshTopology, _1: VertCoords, _2: VertBitSet, _3: InflateSettings): void;
  inflate1WithTopology(_0: MeshTopology, _1: VertCoords, _2: VertBitSet, _3: number): void;
  inflateToothRootImpl(_0: Mesh, _1: InflateSettings): any;
  ConvertToFloatVector: {};
  ConvertToIntVector: {};
  createConvertToIntVector(_0: any): ConvertToIntVector;
  createConvertToFloatVector(_0: any): ConvertToFloatVector;
  CoordinateConverters: {
    new(): CoordinateConverters;
  };
  getVectorConverters_Part(_0: MeshPart): CoordinateConverters;
  getVectorConverters_Parts(_0: MeshPart, _1: MeshPart, _2: AffineXf3f | null): CoordinateConverters;
  RebuildMeshSettings: {
    new(): RebuildMeshSettings;
  };
  rebuildMesh(_0: MeshPart, _1: RebuildMeshSettings): ExpectedMesh;
  findRegionBoundaryUndirectedEdgesInsideMesh(_0: MeshTopology, _1: FaceBitSet): UndirectedEdgeBitSet;
  findRegionOuterFaces(_0: MeshTopology, _1: FaceBitSet): FaceBitSet;
  getIncidentVerts(_0: MeshTopology, _1: FaceBitSet): VertBitSet;
  getIncidentVertsWithVertBitSet(_0: MeshTopology, _1: FaceBitSet | null, _2: VertBitSet): VertBitSet;
  getIncidentVertsWithUndirectedEdgeBitSet(_0: MeshTopology, _1: UndirectedEdgeBitSet): VertBitSet;
  getIncidentVertsWithUndirectedEdgeBitSetAndVertBitSet(_0: MeshTopology, _1: UndirectedEdgeBitSet | null, _2: VertBitSet): VertBitSet;
  getInnerVerts(_0: MeshTopology, _1: FaceBitSet): VertBitSet;
  getInnerVertsWithFaceBitSetPtr(_0: MeshTopology, _1: FaceBitSet | null): VertBitSet;
  getInnerVertsWithUndirectedEdgeBitSet(_0: MeshTopology, _1: UndirectedEdgeBitSet): VertBitSet;
  getBoundaryVerts(_0: MeshTopology, _1: FaceBitSet | null): VertBitSet;
  getRegionBoundaryVerts(_0: MeshTopology, _1: FaceBitSet): VertBitSet;
  getIncidentFaces(_0: MeshTopology, _1: VertBitSet): FaceBitSet;
  getIncidentFacesFromUndirectedEdgeBitSet(_0: MeshTopology, _1: UndirectedEdgeBitSet): FaceBitSet;
  getInnerFaces(_0: MeshTopology, _1: VertBitSet): FaceBitSet;
  getRegionEdges(_0: MeshTopology, _1: FaceBitSet): EdgeBitSet;
  getIncidentEdges(_0: MeshTopology, _1: FaceBitSet): UndirectedEdgeBitSet;
  getIncidentEdgesFromUndirectedEdgeBitSet(_0: MeshTopology, _1: UndirectedEdgeBitSet): UndirectedEdgeBitSet;
  getNeighborFaces(_0: MeshTopology, _1: UndirectedEdgeBitSet): FaceBitSet;
  getInnerEdges(_0: MeshTopology, _1: VertBitSet): UndirectedEdgeBitSet;
  getInnerEdgesFromFaceBitSet(_0: MeshTopology, _1: FaceBitSet): UndirectedEdgeBitSet;
  RelaxApproxType: {Planar: RelaxApproxTypeValue<0>, Quadric: RelaxApproxTypeValue<1>};
  RelaxParams: {
    new(): RelaxParams;
  };
  MeshRelaxParams: {
    new(): MeshRelaxParams;
  };
  MeshEqualizeTriAreasParams: {
    new(): MeshEqualizeTriAreasParams;
  };
  MeshApproxRelaxParams: {
    new(): MeshApproxRelaxParams;
  };
  RigidScaleXf3f: {
    new(): RigidScaleXf3f;
    new(_0: Vector3f, _1: Vector3f, _2: number): RigidScaleXf3f;
  };
  RigidScaleXf3d: {
    new(): RigidScaleXf3d;
    new(_0: Vector3d, _1: Vector3d, _2: number): RigidScaleXf3d;
  };
  RigidXf3f: {
    new(): RigidXf3f;
    new(_0: Vector3f, _1: Vector3f): RigidXf3f;
  };
  RigidXf3d: {
    new(): RigidXf3d;
    new(_0: Vector3d, _1: Vector3d): RigidXf3d;
  };
  SegmPointf: {
    new(): SegmPointf;
  };
  SegmPointd: {
    new(): SegmPointd;
  };
  SignDetectionMode: {Unsigned: SignDetectionModeValue<0>, OpenVDB: SignDetectionModeValue<1>, ProjectionNormal: SignDetectionModeValue<2>, WindingRule: SignDetectionModeValue<3>, HoleWindingRule: SignDetectionModeValue<4>};
  SignDetectionModeShort: {Auto: SignDetectionModeShortValue<0>, HoleWindingNumber: SignDetectionModeShortValue<1>, ProjectionNormal: SignDetectionModeShortValue<2>};
  SymMatrix2b: {
    new(): SymMatrix2b;
  };
  SymMatrix2i: {
    new(): SymMatrix2i;
  };
  SymMatrix2i64: {
    new(): SymMatrix2i64;
  };
  SymMatrix2f: {
    new(): SymMatrix2f;
  };
  SymMatrix2d: {
    new(): SymMatrix2d;
  };
  SymMatrix3b: {
    new(): SymMatrix3b;
  };
  SymMatrix3i: {
    new(): SymMatrix3i;
  };
  SymMatrix3i64: {
    new(): SymMatrix3i64;
  };
  SymMatrix3f: {
    new(): SymMatrix3f;
  };
  SymMatrix3d: {
    new(): SymMatrix3d;
  };
  SymMatrix4b: {
    new(): SymMatrix4b;
  };
  SymMatrix4i: {
    new(): SymMatrix4i;
  };
  SymMatrix4i64: {
    new(): SymMatrix4i64;
  };
  SymMatrix4f: {
    new(): SymMatrix4f;
  };
  SymMatrix4d: {
    new(): SymMatrix4d;
  };
  DentalId: {
    creatFromFDI(_0: number): DentalId | undefined;
  };
  TriMesh: {
    new(): TriMesh;
    copy(_0: TriMesh): TriMesh;
  };
  TriPointf: {
    new(): TriPointf;
  };
  TriPointd: {
    new(): TriPointd;
  };
  UnionFindVertId: {
    new(): UnionFindVertId;
    new(_0: number): UnionFindVertId;
  };
  getUnionFindStructureVerts(_0: Mesh, _1: VertBitSet | null): UnionFindVertId;
  getUnionFindStructureVertsFromTopology(_0: MeshTopology, _1: VertBitSet | null): UnionFindVertId;
  getUnionFindStructureVertsFromEdgeBitSet(_0: Mesh, _1: EdgeBitSet): UnionFindVertId;
  getUnionFindStructureVertsWithUndirectedEdgeBitSet(_0: Mesh, _1: UndirectedEdgeBitSet): UnionFindVertId;
  getUnionFindStructureVertsEx(_0: Mesh, _1: UndirectedEdgeBitSet): UnionFindVertId;
  UnionFindEdgeId: {
    new(): UnionFindEdgeId;
    new(_0: number): UnionFindEdgeId;
  };
  UnionFindUndirectedEdgeId: {
    new(): UnionFindUndirectedEdgeId;
    new(_0: number): UnionFindUndirectedEdgeId;
  };
  getUnionFindStructureUndirectedEdges(_0: Mesh, _1: boolean): UnionFindUndirectedEdgeId;
  UnionFindFaceId: {
    new(): UnionFindFaceId;
    new(_0: number): UnionFindFaceId;
  };
  getLargeByAreaComponentsWithUnionFind(_0: MeshPart, _1: UnionFindFaceId, _2: number, _3: UndirectedEdgeBitSet | null): FaceBitSet;
  getUnionFindStructureFaces(_0: MeshPart, _1: FaceIncidence, _2: UndirectedEdgeBitSet | null): UnionFindFaceId;
  getUnionFindStructureFacesPerEdge(_0: MeshPart, _1: UndirectedEdgeBitSet | null): UnionFindFaceId;
  UnionFindPixelId: {
    new(): UnionFindPixelId;
    new(_0: number): UnionFindPixelId;
  };
  UnionFindVoxelId: {
    new(): UnionFindVoxelId;
    new(_0: number): UnionFindVoxelId;
  };
  UnionFindRegionId: {
    new(): UnionFindRegionId;
    new(_0: number): UnionFindRegionId;
  };
  UnionFindNodeId: {
    new(): UnionFindNodeId;
    new(_0: number): UnionFindNodeId;
  };
  UnionFindObjId: {
    new(): UnionFindObjId;
    new(_0: number): UnionFindObjId;
  };
  UnionFindTextureId: {
    new(): UnionFindTextureId;
    new(_0: number): UnionFindTextureId;
  };
  UnionFindGraphVertId: {
    new(): UnionFindGraphVertId;
    new(_0: number): UnionFindGraphVertId;
  };
  UnionFindGraphEdgeId: {
    new(): UnionFindGraphEdgeId;
    new(_0: number): UnionFindGraphEdgeId;
  };
  NestedComponenetsMode: {Remove: NestedComponenetsModeValue<0>, Merge: NestedComponenetsModeValue<1>, Union: NestedComponenetsModeValue<2>};
  UniteManyMeshesParams: {
    new(): UniteManyMeshesParams;
  };
  GeometryBuffer: {
    new(_0: any, _1: any): GeometryBuffer;
  };
  exportGeometryBuffer(_0: Mesh): GeometryBuffer | null;
  exportMeshMemoryView(_0: Mesh): any;
  exportMeshMemoryViewTest(_0: Mesh): any;
  getAllComponentsMap(_0: MeshPart, _1: FaceIncidence, _2: UndirectedEdgeBitSet | null): Face2RegionMapIntPair;
  findCollidingTriangleBitsets(_0: MeshPart, _1: MeshPart, _2: AffineXf3f | null): FaceBitSetFaceBitSetPair;
  getLargeByAreaRegions(_0: MeshPart, _1: Face2RegionMap, _2: number, _3: number): FaceBitSetIntPair;
  StdVectori: {
    new(): StdVectori;
  };
  StdVectorf: {
    new(): StdVectorf;
  };
  cutMeshByContourImpl(_0: Mesh, _1: StdVectorf): any;
  cutMeshByContourImplTest(_0: Mesh, _1: StdVectorf): any;
  cutMeshWithPolylineImpl(_0: Mesh, _1: StdVectorf): any;
  cutMeshWithPolylineImplTest(_0: Mesh, _1: StdVectorf): any;
  cutAndExtrudeMeshWithPolylineImpl(_0: Mesh, _1: StdVectorf): any;
  getSumSqDistToPoint(_0: IPointPairs, _1?: number): NumSum;
  getSumSqDistToPlane(_0: IPointPairs, _1?: number): NumSum;
  StdVectord: {
    new(): StdVectord;
  };
  StdVectorll: {
    new(): StdVectorll;
  };
  VectorStdVectori: {
    new(): VectorStdVectori;
  };
  VectorStdVectorf: {
    new(): VectorStdVectorf;
  };
  VectorStdVectord: {
    new(): VectorStdVectord;
  };
  VectorStdVectorll: {
    new(): VectorStdVectorll;
  };
  VectorArray3StdVectori: {
    new(): VectorArray3StdVectori;
  };
  VectorArray3StdVectorf: {
    new(): VectorArray3StdVectorf;
  };
  VectorArray3StdVectord: {
    new(): VectorArray3StdVectord;
  };
  VectorArray3StdVectorll: {
    new(): VectorArray3StdVectorll;
  };
  VectorVectorStdi: {
    new(): VectorVectorStdi;
  };
  VectorVectorStdd: {
    new(): VectorVectorStdd;
  };
  VectorVectorStdf: {
    new(): VectorVectorStdf;
  };
  VectorVectorStdll: {
    new(): VectorVectorStdll;
  };
  VectorConstMeshPtr: {
    new(): VectorConstMeshPtr;
  };
  uniteManyMeshes(_0: VectorConstMeshPtr, _1: UniteManyMeshesParams): ExpectedMesh;
  VectorConstMeshTopologyPtr: {
    new(): VectorConstMeshTopologyPtr;
  };
  VectorMeshPiece: {
    new(): VectorMeshPiece;
  };
  fromDisjointMeshPieces(_0: Triangulation, _1: VertId, _2: VectorMeshPiece, _3: BuildSettings): MeshTopology;
  SurfacePath: {
    new(): SurfacePath;
  };
  getUnionFindStructureVertsSeparatedByPath(_0: Mesh, _1: SurfacePath, _2: VertBitSet | null): UnionFindVertId;
  convertSurfacePathWithEndsToMeshContour(_0: Mesh, _1: MeshTriPoint, _2: SurfacePath, _3: MeshTriPoint): OneMeshContour;
  VectorAABBTreePointsPoint: {
    new(): VectorAABBTreePointsPoint;
  };
  VectorAABBTreePointsNode: {
    new(): VectorAABBTreePointsNode;
  };
  VectorModelPointsData: {
    new(): VectorModelPointsData;
  };
  VectorObjVertId: {
    new(): VectorObjVertId;
  };
  VectorMeshProjectionResult: {
    new(): VectorMeshProjectionResult;
  };
  VectorVertDuplication: {
    new(): VectorVertDuplication;
  };
  duplicateNonManifoldVertices(_0: Triangulation, _1: FaceBitSet | null, _2: VectorVertDuplication | null, _3: VertId): number;
  fromTrianglesDuplicatingNonManifoldVertices(_0: Triangulation, _1: VectorVertDuplication | null, _2: BuildSettings): MeshTopology;
  VectorEdgeTri: {
    new(): VectorEdgeTri;
  };
  findSelfCollidingEdgeTrisPrecise(_0: MeshPart, _1: ConvertToIntVector, _2: boolean, _3: AffineXf3f | null, _4: number): VectorEdgeTri;
  ContinuousContour: {
    new(): ContinuousContour;
  };
  isClosed(_0: ContinuousContour): boolean;
  findCollidingEdgeTrisPrecise_PartPart(_0: MeshPart, _1: MeshPart, _2: ConvertToIntVector, _3: AffineXf3f | null, _4: boolean): ContinuousContour;
  ContinuousContours: {
    new(): ContinuousContours;
  };
  orderIntersectionContours(_0: MeshTopology, _1: MeshTopology, _2: ContinuousContour): ContinuousContours;
  orderSelfIntersectionContours(_0: MeshTopology, _1: VectorEdgeTri): ContinuousContours;
  detectLoneContours(_0: ContinuousContours, _1: boolean): StdVectori;
  removeLoneContours(_0: ContinuousContours, _1: boolean): void;
  createSortIntersectionsDataImpl(_0: Mesh, _1: ContinuousContours, _2: CoordinateConverters, _3: AffineXf3f | null, _4: number, _5: boolean): SortIntersectionsData;
  OneMeshContours: {
    new(): OneMeshContours;
  };
  removeLoneDegeneratedContours(_0: MeshTopology, _1: OneMeshContours, _2: OneMeshContours): void;
  subdivideLoneContours(_0: Mesh, _1: OneMeshContours, _2: FaceHashMap | null): void;
  getOneMeshSelfIntersectionContours(_0: Mesh, _1: ContinuousContours, _2: CoordinateConverters, _3: AffineXf3f | null): OneMeshContours;
  VectorOneMeshIntersection: {
    new(): VectorOneMeshIntersection;
  };
  VectorMeshTriPoint: {
    new(): VectorMeshTriPoint;
  };
  convertMeshTriPointsSurfaceOffsetToMeshContours(_0: Mesh, _1: VectorMeshTriPoint, _2: number, _3: SearchPathSettings): ExpectedOneMeshContours;
  convertMeshTriPointsToMeshContour(_0: Mesh, _1: VectorMeshTriPoint, _2: SearchPathSettings, _3: StdVectori | null): ExpectedOneMeshContour;
  convertMeshTriPointsToClosedContour(_0: Mesh, _1: VectorMeshTriPoint, _2: SearchPathSettings, _3: StdVectori | null): ExpectedOneMeshContour;
  VectorFillHoleItem: {
    new(): VectorFillHoleItem;
  };
  getHoleFillPlan(_0: Mesh, _1: EdgeId, _2: FillHoleParams): HoleFillPlan;
  getPlanarHoleFillPlan(_0: Mesh, _1: EdgeId): HoleFillPlan;
  executeHoleFillPlan(_0: Mesh, _1: EdgeId, _2: HoleFillPlan, _3: FaceBitSet | null): void;
  VectorHoleFillPlan: {
    new(): VectorHoleFillPlan;
  };
  VectorFaceFace: {
    new(): VectorFaceFace;
  };
  findCollidingTriangles(_0: MeshPart, _1: MeshPart, _2: AffineXf3f | null, _3: boolean): VectorFaceFace;
  VectorPointPair: {
    new(): VectorPointPair;
  };
  VectorRigidXf3d: {
    new(): VectorRigidXf3d;
  };
  VectorRigidXf3f: {
    new(): VectorRigidXf3f;
  };
  VectorVectorMeshPiece: {
    new(): VectorVectorMeshPiece;
  };
  SurfacePaths: {
    new(): SurfacePaths;
  };
  getUnionFindStructureVertsSeparatedByPaths(_0: Mesh, _1: SurfacePaths, _2: VertBitSet | null): UnionFindVertId;
  convertSurfacePathsToMeshContours(_0: Mesh, _1: SurfacePaths): OneMeshContours;
  VectorVectorAABBTreePointsPoint: {
    new(): VectorVectorAABBTreePointsPoint;
  };
  VectorVectorAABBTreePointsNode: {
    new(): VectorVectorAABBTreePointsNode;
  };
  VectorVectorModelPointsData: {
    new(): VectorVectorModelPointsData;
  };
  VectorVectorObjVertId: {
    new(): VectorVectorObjVertId;
  };
  VectorVectorMeshProjectionResult: {
    new(): VectorVectorMeshProjectionResult;
  };
  VectorVectorVertDuplication: {
    new(): VectorVectorVertDuplication;
  };
  VectorVectorEdgeTri: {
    new(): VectorVectorEdgeTri;
  };
  VectorContinuousContours: {
    new(): VectorContinuousContours;
  };
  VectorOneMeshContours: {
    new(): VectorOneMeshContours;
  };
  VectorVectorOneMeshIntersection: {
    new(): VectorVectorOneMeshIntersection;
  };
  VectorVectorMeshTriPoint: {
    new(): VectorVectorMeshTriPoint;
  };
  VectorVectorFaceFace: {
    new(): VectorVectorFaceFace;
  };
  VectorBox3f: {
    new(): VectorBox3f;
  };
  VectorBox3i: {
    new(): VectorBox3i;
  };
  VectorBox3i64: {
    new(): VectorBox3i64;
  };
  VectorBox3d: {
    new(): VectorBox3d;
  };
  VectorICPGroupPair: {
    new(): VectorICPGroupPair;
  };
  VectorArray2Vector2i: {
    new(): VectorArray2Vector2i;
  };
  VectorArray2Vector2f: {
    new(): VectorArray2Vector2f;
  };
  VectorArray2Vector2d: {
    new(): VectorArray2Vector2d;
  };
  VectorArray3Vector2i: {
    new(): VectorArray3Vector2i;
  };
  VectorArray3Vector2f: {
    new(): VectorArray3Vector2f;
  };
  VectorArray3Vector2d: {
    new(): VectorArray3Vector2d;
  };
  VectorArray2Triangle3i: {
    new(): VectorArray2Triangle3i;
  };
  VectorArray2Triangle3f: {
    new(): VectorArray2Triangle3f;
  };
  VectorArray2Triangle3d: {
    new(): VectorArray2Triangle3d;
  };
  VectorArray3Triangle3i: {
    new(): VectorArray3Triangle3i;
  };
  VectorArray3Triangle3f: {
    new(): VectorArray3Triangle3f;
  };
  fromPointTriples(_0: VectorArray3Triangle3f): Mesh;
  VectorArray3Triangle3d: {
    new(): VectorArray3Triangle3d;
  };
  VectorEdgeId: {
    new(): VectorEdgeId;
  };
  fillContourLeft(_0: MeshTopology, _1: VectorEdgeId): FaceBitSet;
  fillHoles(_0: Mesh, _1: VectorEdgeId, _2: FillHoleParams): void;
  isHoleBd(_0: MeshTopology, _1: VectorEdgeId): boolean;
  getHoleFillPlans(_0: Mesh, _1: VectorEdgeId, _2: FillHoleParams): VectorHoleFillPlan;
  getPlanarHoleFillPlans(_0: Mesh, _1: VectorEdgeId): VectorHoleFillPlan;
  extendAllHoles(_0: Mesh, _1: Plane3f, _2: FaceBitSet | null): VectorEdgeId;
  trackLeftBoundaryLoop(_0: MeshTopology, _1: EdgeId, _2: FaceBitSet | null): VectorEdgeId;
  trackRightBoundaryLoop(_0: MeshTopology, _1: EdgeId, _2: FaceBitSet | null): VectorEdgeId;
  VectorUndirectedEdgeId: {
    new(): VectorUndirectedEdgeId;
  };
  VectorFaceId: {
    new(): VectorFaceId;
  };
  findCollidingEdgeTrisPrecise_MeshEdges(_0: Mesh, _1: VectorEdgeId, _2: Mesh, _3: VectorFaceId, _4: ConvertToIntVector, _5: AffineXf3f | null): VectorEdgeTri;
  findCollidingEdgeTrisPrecise_MeshFaces(_0: Mesh, _1: VectorFaceId, _2: Mesh, _3: VectorEdgeId, _4: ConvertToIntVector, _5: AffineXf3f | null): VectorEdgeTri;
  VectorVertId: {
    new(): VectorVertId;
  };
  addTrianglesWithVertTriples(_0: MeshTopology, _1: VectorVertId, _2: FaceBitSet | null): void;
  VectorPixelId: {
    new(): VectorPixelId;
  };
  VectorVoxelId: {
    new(): VectorVoxelId;
  };
  VectorRegionId: {
    new(): VectorRegionId;
  };
  VectorNodeId: {
    new(): VectorNodeId;
  };
  VectorObjId: {
    new(): VectorObjId;
  };
  VectorTextureId: {
    new(): VectorTextureId;
  };
  VectorGraphVertId: {
    new(): VectorGraphVertId;
  };
  VectorGraphEdgeId: {
    new(): VectorGraphEdgeId;
  };
  VectorEdgePath: {
    new(): VectorEdgePath;
  };
  doBooleanOperation(_0: Mesh, _1: Mesh, _2: VectorEdgePath, _3: VectorEdgePath, _4: BooleanOperation, _5: AffineXf3f | null, _6: BooleanResultMapper | null, _7: boolean, _8: BooleanInternalParameters): ExpectedMesh;
  cutMesh(_0: Mesh, _1: OneMeshContours, _2: CutMeshParameters): CutMeshResult;
  fillContourLeftMultiple(_0: MeshTopology, _1: VectorEdgePath): FaceBitSet;
  findLeftBoundary(_0: MeshTopology, _1: FaceBitSet | null): VectorEdgePath;
  findRightBoundary(_0: MeshTopology, _1: FaceBitSet | null): VectorEdgePath;
  delRegionKeepBd(_0: Mesh, _1: FaceBitSet | null, _2: boolean): VectorEdgePath;
  findLeftBoundaryInsideMesh(_0: MeshTopology, _1: FaceBitSet): VectorEdgePath;
  VectorVectorEdgePath: {
    new(): VectorVectorEdgePath;
  };
  VectorSurfacePaths: {
    new(): VectorSurfacePaths;
  };
  VectorVectorUndirectedEdgeId: {
    new(): VectorVectorUndirectedEdgeId;
  };
  VectorVectorFaceId: {
    new(): VectorVectorFaceId;
  };
  VectorVectorVertId: {
    new(): VectorVectorVertId;
  };
  VectorVectorPixelId: {
    new(): VectorVectorPixelId;
  };
  VectorVectorVoxelId: {
    new(): VectorVectorVoxelId;
  };
  VectorVectorRegionId: {
    new(): VectorVectorRegionId;
  };
  VectorVectorNodeId: {
    new(): VectorVectorNodeId;
  };
  VectorVectorObjId: {
    new(): VectorVectorObjId;
  };
  VectorVectorTextureId: {
    new(): VectorVectorTextureId;
  };
  VectorVectorGraphVertId: {
    new(): VectorVectorGraphVertId;
  };
  VectorVectorGraphEdgeId: {
    new(): VectorVectorGraphEdgeId;
  };
  VectorFaceBitSet: {
    new(): VectorFaceBitSet;
  };
  getNLargeByAreaComponents(_0: MeshPart, _1: LargeByAreaComponentsSettings): VectorFaceBitSet;
  getAllComponents(_0: MeshPart, _1: FaceIncidence, _2: UndirectedEdgeBitSet | null): VectorFaceBitSet;
  getAllComponentsFromMap(_0: Face2RegionMap, _1: number, _2: FaceBitSet, _3: number): VectorFaceBitSet;
  getAllComponentsWithMaxCount(_0: MeshPart, _1: number, _2: FaceIncidence, _3: UndirectedEdgeBitSet | null): VectorFaceBitSetIntPair;
  VectorVertBitSet: {
    new(): VectorVertBitSet;
  };
  getAllComponentsVerts(_0: Mesh, _1: VertBitSet | null): VectorVertBitSet;
  getAllComponentsVertsSeparatedByPath(_0: Mesh, _1: SurfacePath): VectorVertBitSet;
  getAllComponentsVertsSeparatedByPaths(_0: Mesh, _1: SurfacePaths): VectorVertBitSet;
  VectorEdgeBitSet: {
    new(): VectorEdgeBitSet;
  };
  getAllComponentsEdges(_0: Mesh, _1: EdgeBitSet): VectorEdgeBitSet;
  VectorUndirectedEdgeBitSet: {
    new(): VectorUndirectedEdgeBitSet;
  };
  getAllComponentsUndirectedEdges(_0: Mesh, _1: UndirectedEdgeBitSet): VectorUndirectedEdgeBitSet;
  VectorPixelBitSet: {
    new(): VectorPixelBitSet;
  };
  VectorVoxelBitSet: {
    new(): VectorVoxelBitSet;
  };
  VectorRegionBitSet: {
    new(): VectorRegionBitSet;
  };
  VectorNodeBitSet: {
    new(): VectorNodeBitSet;
  };
  VectorObjBitSet: {
    new(): VectorObjBitSet;
  };
  VectorTextureBitSet: {
    new(): VectorTextureBitSet;
  };
  VectorGraphVertBitSet: {
    new(): VectorGraphVertBitSet;
  };
  VectorGraphEdgeBitSet: {
    new(): VectorGraphEdgeBitSet;
  };
  VectorArray2EdgeId: {
    new(): VectorArray2EdgeId;
  };
  VectorArray2UndirectedEdgeId: {
    new(): VectorArray2UndirectedEdgeId;
  };
  VectorArray2FaceId: {
    new(): VectorArray2FaceId;
  };
  VectorArray2VertId: {
    new(): VectorArray2VertId;
  };
  VectorArray2PixelId: {
    new(): VectorArray2PixelId;
  };
  VectorArray2VoxelId: {
    new(): VectorArray2VoxelId;
  };
  VectorArray2RegionId: {
    new(): VectorArray2RegionId;
  };
  VectorArray2NodeId: {
    new(): VectorArray2NodeId;
  };
  VectorArray2ObjId: {
    new(): VectorArray2ObjId;
  };
  VectorArray2TextureId: {
    new(): VectorArray2TextureId;
  };
  VectorArray2GraphVertId: {
    new(): VectorArray2GraphVertId;
  };
  VectorArray2GraphEdgeId: {
    new(): VectorArray2GraphEdgeId;
  };
  VectorArray3EdgeId: {
    new(): VectorArray3EdgeId;
  };
  VectorArray3UndirectedEdgeId: {
    new(): VectorArray3UndirectedEdgeId;
  };
  VectorArray3FaceId: {
    new(): VectorArray3FaceId;
  };
  VectorArray3VertId: {
    new(): VectorArray3VertId;
  };
  VectorArray3PixelId: {
    new(): VectorArray3PixelId;
  };
  VectorArray3VoxelId: {
    new(): VectorArray3VoxelId;
  };
  VectorArray3RegionId: {
    new(): VectorArray3RegionId;
  };
  VectorArray3NodeId: {
    new(): VectorArray3NodeId;
  };
  VectorArray3ObjId: {
    new(): VectorArray3ObjId;
  };
  VectorArray3TextureId: {
    new(): VectorArray3TextureId;
  };
  VectorArray3GraphVertId: {
    new(): VectorArray3GraphVertId;
  };
  VectorArray3GraphEdgeId: {
    new(): VectorArray3GraphEdgeId;
  };
  VectorArray4EdgeId: {
    new(): VectorArray4EdgeId;
  };
  VectorArray4UndirectedEdgeId: {
    new(): VectorArray4UndirectedEdgeId;
  };
  VectorArray4FaceId: {
    new(): VectorArray4FaceId;
  };
  VectorArray4VertId: {
    new(): VectorArray4VertId;
  };
  VectorArray4PixelId: {
    new(): VectorArray4PixelId;
  };
  VectorArray4VoxelId: {
    new(): VectorArray4VoxelId;
  };
  VectorArray4RegionId: {
    new(): VectorArray4RegionId;
  };
  VectorArray4NodeId: {
    new(): VectorArray4NodeId;
  };
  VectorArray4ObjId: {
    new(): VectorArray4ObjId;
  };
  VectorArray4TextureId: {
    new(): VectorArray4TextureId;
  };
  VectorArray4GraphVertId: {
    new(): VectorArray4GraphVertId;
  };
  VectorArray4GraphEdgeId: {
    new(): VectorArray4GraphEdgeId;
  };
  EdgeHashMapEntries: {
    new(): EdgeHashMapEntries;
  };
  findTwinEdgePairs(_0: Mesh, _1: number): EdgeHashMapEntries;
  findTwinEdgesFromEdgePairs(_0: EdgeHashMapEntries): EdgeBitSet;
  findTwinUndirectedEdgesFromEdgePairs(_0: EdgeHashMapEntries): UndirectedEdgeBitSet;
  findTwinUndirectedEdgeHashMapFromEdgePairs(_0: EdgeHashMapEntries): UndirectedEdgeHashMap;
  UndirectedEdgeHashMapEntries: {
    new(): UndirectedEdgeHashMapEntries;
  };
  WholeEdgeHashMapEntries: {
    new(): WholeEdgeHashMapEntries;
  };
  FaceHashMapEntries: {
    new(): FaceHashMapEntries;
  };
  VertHashMapEntries: {
    new(): VertHashMapEntries;
  };
  fixMultipleEdgesByGroup(_0: Mesh, _1: VertHashMapEntries): void;
  VectorVertSpanFaceIdMap: {
    new(): VectorVertSpanFaceIdMap;
  };
  VectorVertIdEdgeIdMap: {
    new(): VectorVertIdEdgeIdMap;
  };
  VectorEdgeIdVertIdMap: {
    new(): VectorEdgeIdVertIdMap;
  };
  VectorEdgeIdFaceIdMap: {
    new(): VectorEdgeIdFaceIdMap;
  };
  VectorFaceIdEdgeIdMap: {
    new(): VectorFaceIdEdgeIdMap;
  };
  VectorModelPointsDataObjIdMap: {
    new(): VectorModelPointsDataObjIdMap;
  };
  VectorWholeEdgeMap: {
    new(): VectorWholeEdgeMap;
  };
  VectorUndirectedEdge2RegionMap: {
    new(): VectorUndirectedEdge2RegionMap;
  };
  VectorFace2RegionMap: {
    new(): VectorFace2RegionMap;
  };
  VectorVert2RegionMap: {
    new(): VectorVert2RegionMap;
  };
  VectorVoxelIdFaceId: {
    new(): VectorVoxelIdFaceId;
  };
  VectorVector2f: {
    new(): VectorVector2f;
  };
  VectorVectorVector2f: {
    new(): VectorVectorVector2f;
  };
  VectorVector2i64: {
    new(): VectorVector2i64;
  };
  VectorVectorVector2i64: {
    new(): VectorVectorVector2i64;
  };
  VectorVector2b: {
    new(): VectorVector2b;
  };
  VectorVectorVector2b: {
    new(): VectorVectorVector2b;
  };
  VectorVector2i: {
    new(): VectorVector2i;
  };
  VectorVectorVector2i: {
    new(): VectorVectorVector2i;
  };
  VectorVector2d: {
    new(): VectorVector2d;
  };
  VectorVectorVector2d: {
    new(): VectorVectorVector2d;
  };
  VectorVector3f: {
    new(): VectorVector3f;
  };
  cutMeshByContour(_0: Mesh, _1: VectorVector3f, _2: AffineXf3f): ExpectedFaceBitSet;
  VectorVectorVector3f: {
    new(): VectorVectorVector3f;
  };
  findIntersectionContours(_0: Mesh, _1: Mesh, _2: AffineXf3f | null): VectorVectorVector3f;
  makeMovementBuildBody(_0: VectorVectorVector3f, _1: VectorVectorVector3f, _2: MovementBuildBodyParams): Mesh;
  extractMeshContours(_0: OneMeshContours): VectorVectorVector3f;
  getOneMeshIntersectionContours(_0: Mesh, _1: Mesh, _2: ContinuousContours, _3: OneMeshContours | null, _4: OneMeshContours | null, _5: CoordinateConverters, _6: AffineXf3f | null, _7: VectorVectorVector3f | null, _8: boolean): void;
  VectorVector3b: {
    new(): VectorVector3b;
  };
  VectorVectorVector3b: {
    new(): VectorVectorVector3b;
  };
  VectorVector3i: {
    new(): VectorVector3i;
  };
  VectorVectorVector3i: {
    new(): VectorVectorVector3i;
  };
  VectorVector3i64: {
    new(): VectorVector3i64;
  };
  VectorVectorVector3i64: {
    new(): VectorVectorVector3i64;
  };
  VectorVector3d: {
    new(): VectorVector3d;
  };
  VectorVectorVector3d: {
    new(): VectorVectorVector3d;
  };
  VectorVector4f: {
    new(): VectorVector4f;
  };
  VectorVectorVector4f: {
    new(): VectorVectorVector4f;
  };
  VectorVector4b: {
    new(): VectorVector4b;
  };
  VectorVectorVector4b: {
    new(): VectorVectorVector4b;
  };
  VectorVector4i: {
    new(): VectorVector4i;
  };
  VectorVectorVector4i: {
    new(): VectorVectorVector4i;
  };
  VectorVector4i64: {
    new(): VectorVector4i64;
  };
  VectorVectorVector4i64: {
    new(): VectorVectorVector4i64;
  };
  VectorVector4d: {
    new(): VectorVector4d;
  };
  VectorVectorVector4d: {
    new(): VectorVectorVector4d;
  };
  StringFunctorString: {
    new(): StringFunctorString;
  };
  FloatFunctorInt: {
    new(): FloatFunctorInt;
  };
  convertMeshTriPointsSurfaceOffsetToMeshContoursWithFunctor(_0: Mesh, _1: VectorMeshTriPoint, _2: FloatFunctorInt, _3: SearchPathSettings): ExpectedOneMeshContours;
  ProgressCallback: {
    new(): ProgressCallback;
  };
  findSmallestCloseVertices(_0: Mesh, _1: number, _2: ProgressCallback): VertMap | undefined;
  findSmallestCloseVerticesFromCloud(_0: PointCloud, _1: number, _2: ProgressCallback): VertMap | undefined;
  findSmallestCloseVerticesFromCoords(_0: VertCoords, _1: number, _2: VertBitSet | null, _3: ProgressCallback): VertMap | undefined;
  findSmallestCloseVerticesUsingTree(_0: VertCoords, _1: number, _2: AABBTreePoints, _3: VertBitSet | null, _4: ProgressCallback): VertMap | undefined;
  findCloseVertices(_0: Mesh, _1: number, _2: ProgressCallback): VertBitSet | undefined;
  findCloseVerticesFromCloud(_0: PointCloud, _1: number, _2: ProgressCallback): VertBitSet | undefined;
  findCloseVerticesFromCoords(_0: VertCoords, _1: number, _2: VertBitSet | null, _3: ProgressCallback): VertBitSet | undefined;
  verticesGridSampling(_0: MeshPart, _1: number, _2: ProgressCallback): VertBitSet | undefined;
  pointGridSampling(_0: PointCloudPart, _1: number, _2: ProgressCallback): VertBitSet | undefined;
  multiModelGridSampling(_0: ModelPointsDataObjIdMap, _1: number, _2: ProgressCallback): VectorObjVertId | undefined;
  boolean(_0: Mesh, _1: Mesh, _2: BooleanOperation, _3: AffineXf3f | null, _4: BooleanResultMapper | null, _5: ProgressCallback): BooleanResult;
  booleanByMove(_0: Mesh, _1: Mesh, _2: BooleanOperation, _3: AffineXf3f | null, _4: BooleanResultMapper | null, _5: ProgressCallback): BooleanResult;
  fromTriangles(_0: Triangulation, _1: BuildSettings, _2: ProgressCallback): MeshTopology;
  fromFaceSoup(_0: VectorVertId, _1: VertSpanFaceIdMap, _2: BuildSettings, _3: ProgressCallback): MeshTopology;
  findSelfCollidingTriangles(_0: MeshPart, _1: ProgressCallback, _2: Face2RegionMap | null, _3: boolean): ExpectedVectorFaceFace;
  findSelfCollidingTrianglesWithFaceFace(_0: MeshPart, _1: VectorFaceFace | null, _2: ProgressCallback, _3: Face2RegionMap | null, _4: boolean): ExpectedBool;
  findSelfCollidingTrianglesBS(_0: MeshPart, _1: ProgressCallback, _2: Face2RegionMap | null, _3: boolean): ExpectedFaceBitSet;
  findMultipleEdges(_0: MeshTopology, _1: ProgressCallback): ExpectedVertHashMapEntries;
  findDegenerateFaces(_0: MeshPart, _1: number, _2: ProgressCallback): ExpectedFaceBitSet;
  findShortEdges(_0: MeshPart, _1: number, _2: ProgressCallback): ExpectedUndirectedEdgeBitSet;
  relax(_0: Mesh, _1: MeshRelaxParams, _2: ProgressCallback): boolean;
  relaxWithTopology(_0: MeshTopology, _1: VertCoords, _2: MeshRelaxParams, _3: ProgressCallback): boolean;
  equalizeTriAreas(_0: Mesh, _1: MeshEqualizeTriAreasParams, _2: ProgressCallback): boolean;
  equalizeTriAreasWithTopology(_0: MeshTopology, _1: VertCoords, _2: MeshEqualizeTriAreasParams, _3: ProgressCallback): boolean;
  relaxKeepVolume(_0: Mesh, _1: MeshRelaxParams, _2: ProgressCallback): boolean;
  relaxKeepVolumeWithTopology(_0: MeshTopology, _1: VertCoords, _2: MeshRelaxParams, _3: ProgressCallback): boolean;
  relaxApprox(_0: Mesh, _1: MeshApproxRelaxParams, _2: ProgressCallback): boolean;
  relaxApproxWithTopology(_0: MeshTopology, _1: VertCoords, _2: MeshApproxRelaxParams, _3: ProgressCallback): boolean;
  VoidFunctorInt: {
    new(): VoidFunctorInt;
  };
  VoidFunctorEdgeIdEdgeId: {
    new(): VoidFunctorEdgeIdEdgeId;
  };
  VoidFunctorVector3fProjectionResultObjId: {
    new(): VoidFunctorVector3fProjectionResultObjId;
  };
  VoidFunctorSignDetectionMode: {
    new(): VoidFunctorSignDetectionMode;
  };
  VertPredicate: {
    new(): VertPredicate;
  };
  FacePredicate: {
    new(): FacePredicate;
  };
  EdgePredicate: {
    new(): EdgePredicate;
  };
  UndirectedEdgePredicate: {
    new(): UndirectedEdgePredicate;
  };
  VertMetric: {
    new(): VertMetric;
  };
  FaceMetric: {
    new(): FaceMetric;
  };
  EdgeMetric: {
    new(): EdgeMetric;
  };
  identityMetric(): EdgeMetric;
  edgeLengthMetric(_0: Mesh): EdgeMetric;
  edgeLengthMetricFromTopology(_0: MeshTopology, _1: VertCoords): EdgeMetric;
  discreteAbsMeanCurvatureMetric(_0: Mesh): EdgeMetric;
  discreteAbsMeanCurvatureMetricFromTopology(_0: MeshTopology, _1: VertCoords): EdgeMetric;
  discreteMinusAbsMeanCurvatureMetric(_0: Mesh): EdgeMetric;
  discreteMinusAbsMeanCurvatureMetricFromTopology(_0: MeshTopology, _1: VertCoords): EdgeMetric;
  edgeCurvMetric(_0: Mesh, _1: number, _2: number): EdgeMetric;
  edgeCurvMetricFromTopology(_0: MeshTopology, _1: VertCoords, _2: number, _3: number): EdgeMetric;
  edgeTableSymMetric(_0: MeshTopology, _1: EdgeMetric): EdgeMetric;
  fillContourLeftByGraphCut(_0: MeshTopology, _1: VectorEdgeId, _2: EdgeMetric, _3: ProgressCallback): FaceBitSet;
  fillContourLeftByGraphCutByContours(_0: MeshTopology, _1: VectorEdgePath, _2: EdgeMetric, _3: ProgressCallback): FaceBitSet;
  segmentByGraphCut(_0: MeshTopology, _1: FaceBitSet, _2: FaceBitSet, _3: EdgeMetric, _4: ProgressCallback): FaceBitSet;
  segmentByPointsImpl(_0: Mesh, _1: EdgeMetric, _2: StdVectorf, _3: StdVectorf): any;
  UndirectedEdgeMetric: {
    new(): UndirectedEdgeMetric;
  };
  FloatFunctorTriangulation: {
    new(): FloatFunctorTriangulation;
  };
  FloatFunctorDipoles: {
    new(): FloatFunctorDipoles;
  };
  FloatFunctorFaceMap: {
    new(): FloatFunctorFaceMap;
  };
  FloatFunctorVertMap: {
    new(): FloatFunctorVertMap;
  };
  FloatFunctorEdgeMap: {
    new(): FloatFunctorEdgeMap;
  };
  FloatFunctorUndirectedEdgeMap: {
    new(): FloatFunctorUndirectedEdgeMap;
  };
  FloatFunctorObjMap: {
    new(): FloatFunctorObjMap;
  };
  FloatFunctorFaceBitSet: {
    new(): FloatFunctorFaceBitSet;
  };
  FloatFunctorVertBitSet: {
    new(): FloatFunctorVertBitSet;
  };
  FloatFunctorEdgeBitSet: {
    new(): FloatFunctorEdgeBitSet;
  };
  FloatFunctorUndirectedEdgeBitSet: {
    new(): FloatFunctorUndirectedEdgeBitSet;
  };
  FloatFunctorPixelBitSet: {
    new(): FloatFunctorPixelBitSet;
  };
  FloatFunctorVoxelBitSet: {
    new(): FloatFunctorVoxelBitSet;
  };
  FloatFunctorRegionBitSet: {
    new(): FloatFunctorRegionBitSet;
  };
  FloatFunctorNodeBitSet: {
    new(): FloatFunctorNodeBitSet;
  };
  FloatFunctorObjBitSet: {
    new(): FloatFunctorObjBitSet;
  };
  FloatFunctorTextureBitSet: {
    new(): FloatFunctorTextureBitSet;
  };
  FloatFunctorGraphVertBitSet: {
    new(): FloatFunctorGraphVertBitSet;
  };
  FloatFunctorGraphEdgeBitSet: {
    new(): FloatFunctorGraphEdgeBitSet;
  };
  ExpectedSurfacePathFunctorMeshTriPoint: {
    new(): ExpectedSurfacePathFunctorMeshTriPoint;
  };
  convertMeshTriPointsToMeshContourWithConnector(_0: Mesh, _1: VectorMeshTriPoint, _2: ExpectedSurfacePathFunctorMeshTriPoint, _3: StdVectori | null): ExpectedOneMeshContour;
  Vector3fFunctorVector3f: {
    new(): Vector3fFunctorVector3f;
  };
  extendHoleWithFunctor(_0: Mesh, _1: EdgeId, _2: Vector3fFunctorVector3f, _3: FaceBitSet | null): EdgeId;
  VectorDoubleEdgeId: {
    new(): VectorDoubleEdgeId;
    new(_0: number, _1: number): VectorDoubleEdgeId;
    new(_0: number): VectorDoubleEdgeId;
  };
  VectorDoubleUndirectedEdgeId: {
    new(): VectorDoubleUndirectedEdgeId;
    new(_0: number, _1: number): VectorDoubleUndirectedEdgeId;
    new(_0: number): VectorDoubleUndirectedEdgeId;
  };
  VectorDoubleFaceId: {
    new(): VectorDoubleFaceId;
    new(_0: number, _1: number): VectorDoubleFaceId;
    new(_0: number): VectorDoubleFaceId;
  };
  VectorDoubleVertId: {
    new(): VectorDoubleVertId;
    new(_0: number, _1: number): VectorDoubleVertId;
    new(_0: number): VectorDoubleVertId;
  };
  VectorDoublePixelId: {
    new(): VectorDoublePixelId;
    new(_0: number, _1: number): VectorDoublePixelId;
    new(_0: number): VectorDoublePixelId;
  };
  VectorDoubleVoxelId: {
    new(): VectorDoubleVoxelId;
    new(_0: number, _1: number): VectorDoubleVoxelId;
    new(_0: number): VectorDoubleVoxelId;
  };
  VectorDoubleRegionId: {
    new(): VectorDoubleRegionId;
    new(_0: number, _1: number): VectorDoubleRegionId;
    new(_0: number): VectorDoubleRegionId;
  };
  getRegionAreas(_0: MeshPart, _1: Face2RegionMap, _2: number): VectorDoubleRegionId;
  VectorDoubleNodeId: {
    new(): VectorDoubleNodeId;
    new(_0: number, _1: number): VectorDoubleNodeId;
    new(_0: number): VectorDoubleNodeId;
  };
  VectorDoubleObjId: {
    new(): VectorDoubleObjId;
    new(_0: number, _1: number): VectorDoubleObjId;
    new(_0: number): VectorDoubleObjId;
  };
  VectorDoubleTextureId: {
    new(): VectorDoubleTextureId;
    new(_0: number, _1: number): VectorDoubleTextureId;
    new(_0: number): VectorDoubleTextureId;
  };
  VectorDoubleGraphVertId: {
    new(): VectorDoubleGraphVertId;
    new(_0: number, _1: number): VectorDoubleGraphVertId;
    new(_0: number): VectorDoubleGraphVertId;
  };
  VectorDoubleGraphEdgeId: {
    new(): VectorDoubleGraphEdgeId;
    new(_0: number, _1: number): VectorDoubleGraphEdgeId;
    new(_0: number): VectorDoubleGraphEdgeId;
  };
  VectorSizeTEdgeId: {
    new(): VectorSizeTEdgeId;
    new(_0: number, _1: number): VectorSizeTEdgeId;
    new(_0: number): VectorSizeTEdgeId;
  };
  VectorSizeTUndirectedEdgeId: {
    new(): VectorSizeTUndirectedEdgeId;
    new(_0: number, _1: number): VectorSizeTUndirectedEdgeId;
    new(_0: number): VectorSizeTUndirectedEdgeId;
  };
  VectorSizeTFaceId: {
    new(): VectorSizeTFaceId;
    new(_0: number, _1: number): VectorSizeTFaceId;
    new(_0: number): VectorSizeTFaceId;
  };
  VectorSizeTVertId: {
    new(): VectorSizeTVertId;
    new(_0: number, _1: number): VectorSizeTVertId;
    new(_0: number): VectorSizeTVertId;
  };
  VectorSizeTPixelId: {
    new(): VectorSizeTPixelId;
    new(_0: number, _1: number): VectorSizeTPixelId;
    new(_0: number): VectorSizeTPixelId;
  };
  VectorSizeTVoxelId: {
    new(): VectorSizeTVoxelId;
    new(_0: number, _1: number): VectorSizeTVoxelId;
    new(_0: number): VectorSizeTVoxelId;
  };
  VectorSizeTRegionId: {
    new(): VectorSizeTRegionId;
    new(_0: number, _1: number): VectorSizeTRegionId;
    new(_0: number): VectorSizeTRegionId;
  };
  VectorSizeTNodeId: {
    new(): VectorSizeTNodeId;
    new(_0: number, _1: number): VectorSizeTNodeId;
    new(_0: number): VectorSizeTNodeId;
  };
  VectorSizeTObjId: {
    new(): VectorSizeTObjId;
    new(_0: number, _1: number): VectorSizeTObjId;
    new(_0: number): VectorSizeTObjId;
  };
  VectorSizeTTextureId: {
    new(): VectorSizeTTextureId;
    new(_0: number, _1: number): VectorSizeTTextureId;
    new(_0: number): VectorSizeTTextureId;
  };
  VectorSizeTGraphVertId: {
    new(): VectorSizeTGraphVertId;
    new(_0: number, _1: number): VectorSizeTGraphVertId;
    new(_0: number): VectorSizeTGraphVertId;
  };
  VectorSizeTGraphEdgeId: {
    new(): VectorSizeTGraphEdgeId;
    new(_0: number, _1: number): VectorSizeTGraphEdgeId;
    new(_0: number): VectorSizeTGraphEdgeId;
  };
  VectorIntEdgeId: {
    new(): VectorIntEdgeId;
    new(_0: number, _1: number): VectorIntEdgeId;
    new(_0: number): VectorIntEdgeId;
  };
  VectorIntUndirectedEdgeId: {
    new(): VectorIntUndirectedEdgeId;
    new(_0: number, _1: number): VectorIntUndirectedEdgeId;
    new(_0: number): VectorIntUndirectedEdgeId;
  };
  VectorIntFaceId: {
    new(): VectorIntFaceId;
    new(_0: number, _1: number): VectorIntFaceId;
    new(_0: number): VectorIntFaceId;
  };
  VectorIntVertId: {
    new(): VectorIntVertId;
    new(_0: number, _1: number): VectorIntVertId;
    new(_0: number): VectorIntVertId;
  };
  VectorIntPixelId: {
    new(): VectorIntPixelId;
    new(_0: number, _1: number): VectorIntPixelId;
    new(_0: number): VectorIntPixelId;
  };
  VectorIntVoxelId: {
    new(): VectorIntVoxelId;
    new(_0: number, _1: number): VectorIntVoxelId;
    new(_0: number): VectorIntVoxelId;
  };
  VectorIntRegionId: {
    new(): VectorIntRegionId;
    new(_0: number, _1: number): VectorIntRegionId;
    new(_0: number): VectorIntRegionId;
  };
  VectorIntNodeId: {
    new(): VectorIntNodeId;
    new(_0: number, _1: number): VectorIntNodeId;
    new(_0: number): VectorIntNodeId;
  };
  VectorIntObjId: {
    new(): VectorIntObjId;
    new(_0: number, _1: number): VectorIntObjId;
    new(_0: number): VectorIntObjId;
  };
  VectorIntTextureId: {
    new(): VectorIntTextureId;
    new(_0: number, _1: number): VectorIntTextureId;
    new(_0: number): VectorIntTextureId;
  };
  VectorIntGraphVertId: {
    new(): VectorIntGraphVertId;
    new(_0: number, _1: number): VectorIntGraphVertId;
    new(_0: number): VectorIntGraphVertId;
  };
  VectorIntGraphEdgeId: {
    new(): VectorIntGraphEdgeId;
    new(_0: number, _1: number): VectorIntGraphEdgeId;
    new(_0: number): VectorIntGraphEdgeId;
  };
  VectorMeshOrPointsXfObjId: {
    new(): VectorMeshOrPointsXfObjId;
    new(_0: number, _1: MeshOrPointsXf): VectorMeshOrPointsXfObjId;
  };
  updateGroupPairs(_0: ICPGroupPairs, _1: VectorMeshOrPointsXfObjId, _2: VoidFunctorVector3fProjectionResultObjId, _3: VoidFunctorVector3fProjectionResultObjId, _4: number, _5: number, _6: boolean): void;
  VectorICPGroupPairsICPElementId: {
    new(): VectorICPGroupPairsICPElementId;
    new(_0: number, _1: ICPGroupPairs): VectorICPGroupPairsICPElementId;
    new(_0: number): VectorICPGroupPairsICPElementId;
  };
  VectorVectorICPGroupPairsICPElementId: {
    new(): VectorVectorICPGroupPairsICPElementId;
    new(_0: number, _1: VectorICPGroupPairsICPElementId): VectorVectorICPGroupPairsICPElementId;
    new(_0: number): VectorVectorICPGroupPairsICPElementId;
  };
  VectorICPPairsGridICPLayer: {
    new(): VectorICPPairsGridICPLayer;
    new(_0: number, _1: VectorVectorICPGroupPairsICPElementId): VectorICPPairsGridICPLayer;
    new(_0: number): VectorICPPairsGridICPLayer;
  };
  VectorVertBitSetObjId: {
    new(): VectorVertBitSetObjId;
    new(_0: number, _1: VertBitSet): VectorVertBitSetObjId;
    new(_0: number): VectorVertBitSetObjId;
  };
  VectorAffineXf3fObjId: {
    new(): VectorAffineXf3fObjId;
    new(_0: number, _1: AffineXf3f): VectorAffineXf3fObjId;
    new(_0: number): VectorAffineXf3fObjId;
  };
  VectorMultiObjsSamplesICPElementId: {
    new(): VectorMultiObjsSamplesICPElementId;
    new(_0: number, _1: VectorObjVertId): VectorMultiObjsSamplesICPElementId;
    new(_0: number): VectorMultiObjsSamplesICPElementId;
  };
  VectorVectorMultiObjsSamplesICPLayer: {
    new(): VectorVectorMultiObjsSamplesICPLayer;
    new(_0: number, _1: VectorMultiObjsSamplesICPElementId): VectorVectorMultiObjsSamplesICPLayer;
    new(_0: number): VectorVectorMultiObjsSamplesICPLayer;
  };
  VectorIntSizeT: {
    new(): VectorIntSizeT;
    new(_0: number, _1: number): VectorIntSizeT;
    new(_0: number): VectorIntSizeT;
  };
  VectorFloatSizeT: {
    new(): VectorFloatSizeT;
    new(_0: number, _1: number): VectorFloatSizeT;
    new(_0: number): VectorFloatSizeT;
  };
  VectorLongLongSizeT: {
    new(): VectorLongLongSizeT;
    new(_0: number, _1: bigint): VectorLongLongSizeT;
    new(_0: number): VectorLongLongSizeT;
  };
  VectorDoubleSizeT: {
    new(): VectorDoubleSizeT;
    new(_0: number, _1: number): VectorDoubleSizeT;
    new(_0: number): VectorDoubleSizeT;
  };
  VectorSizeTSizeT: {
    new(): VectorSizeTSizeT;
    new(_0: number, _1: number): VectorSizeTSizeT;
    new(_0: number): VectorSizeTSizeT;
  };
  getAti(_0: VectorIntSizeT, _1: number, _2: number): number;
  getAtf(_0: VectorFloatSizeT, _1: number, _2: number): number;
  getAtd(_0: VectorDoubleSizeT, _1: number, _2: number): number;
  getAtll(_0: VectorLongLongSizeT, _1: number, _2: bigint): bigint;
  Vector2i: {
    new(): Vector2i;
    new(_0: number, _1: number): Vector2i;
    new(_0: Vector2i): Vector2i;
    diagonal(_0: number): Vector2i;
    plusX(): Vector2i;
    plusY(): Vector2i;
    minusX(): Vector2i;
    minusY(): Vector2i;
  };
  Vector2f: {
    new(): Vector2f;
    new(_0: number, _1: number): Vector2f;
    new(_0: Vector2f): Vector2f;
    diagonal(_0: number): Vector2f;
    plusX(): Vector2f;
    plusY(): Vector2f;
    minusX(): Vector2f;
    minusY(): Vector2f;
  };
  closestPointOnLineSegm2f(_0: Vector2f, _1: LineSegm2f): Vector2f;
  Vector2i64: {
    new(): Vector2i64;
    new(_0: bigint, _1: bigint): Vector2i64;
    new(_0: Vector2i64): Vector2i64;
    diagonal(_0: bigint): Vector2i64;
    plusX(): Vector2i64;
    plusY(): Vector2i64;
    minusX(): Vector2i64;
    minusY(): Vector2i64;
  };
  Vector2b: {
    new(): Vector2b;
    new(_0: boolean, _1: boolean): Vector2b;
    new(_0: Vector2b): Vector2b;
    diagonal(_0: boolean): Vector2b;
    plusX(): Vector2b;
    plusY(): Vector2b;
    minusX(): Vector2b;
    minusY(): Vector2b;
  };
  Vector2d: {
    new(): Vector2d;
    new(_0: number, _1: number): Vector2d;
    new(_0: Vector2d): Vector2d;
    diagonal(_0: number): Vector2d;
    plusX(): Vector2d;
    plusY(): Vector2d;
    minusX(): Vector2d;
    minusY(): Vector2d;
  };
  closestPointOnLineSegm2d(_0: Vector2d, _1: LineSegm2d): Vector2d;
  Vector3f: {
    new(): Vector3f;
    new(_0: number, _1: number, _2: number): Vector3f;
    createFromVector2(_0: Vector2f): Vector3f;
    diagonal(_0: number): Vector3f;
    plusX(): Vector3f;
    plusY(): Vector3f;
    plusZ(): Vector3f;
    minusX(): Vector3f;
    minusY(): Vector3f;
    minusZ(): Vector3f;
  };
  to3dimVecf(_0: Vector2f): Vector3f;
  to2dimVecf(_0: Vector3f): Vector2f;
  makeArrow(_0: Vector3f, _1: Vector3f, _2: number, _3: number, _4: number, _5: number): Mesh;
  createFindParamsImpl(_0: number, _1: number, _2: number, _3: number): FindParams;
  createFixParamsImpl(_0: FindParams, _1: number, _2: number, _3: boolean): FixParams;
  fixUndercutsImpl(_0: Mesh, _1: Vector3f, _2: number, _3: number): any;
  fixUndercutsImplTest(_0: Mesh, _1: Vector3f, _2: number, _3: number): any;
  fixUndercutsImplThrows(_0: Mesh, _1: Vector3f, _2: number, _3: number): void;
  getAligningXf(_0: PointToPlaneAligningTransform, _1: ICPMode, _2: number, _3: number, _4: Vector3f): AffineXf3f;
  closestPointOnLineSegm3f(_0: Vector3f, _1: LineSegm3f): Vector3f;
  createMaxillaGypsumBaseImpl(_0: Mesh, _1: EdgeId, _2: VertId, _3: Vector3f, _4: number, _5: number): any;
  createMaxillaGypsumBaseImplTest(_0: Mesh, _1: EdgeId, _2: VertId, _3: Vector3f, _4: number, _5: number): any;
  createMandibleGypsumBaseImpl(_0: Mesh, _1: EdgeId, _2: Vector3f, _3: number): any;
  buildBottom(_0: Mesh, _1: EdgeId, _2: Vector3f, _3: number, _4: FaceBitSet | null): EdgeId;
  createVerticalStitchMetric(_0: Mesh, _1: Vector3f): FillHoleMetricWrapper;
  projectOnAllWithProgress(_0: Vector3f, _1: AABBTreeObjects, _2: number, _3: any, _4: ObjId): void;
  vertexPosEqualNeiAreas(_0: Mesh, _1: VertId, _2: boolean): Vector3f;
  vertexPosEqualNeiAreasWithTopology(_0: MeshTopology, _1: VertCoords, _2: VertId, _3: boolean): Vector3f;
  surroundingContourEdges(_0: Mesh, _1: VectorEdgeId, _2: EdgeMetric, _3: Vector3f): ExpectedEdgePath;
  surroundingContourVertices(_0: Mesh, _1: VectorVertId, _2: EdgeMetric, _3: Vector3f): ExpectedEdgePath;
  findLookingFaces(_0: Mesh, _1: AffineXf3f, _2: Vector3f, _3: boolean): FaceBitSet;
  findLookingSilhouetteConvexHull(_0: Mesh, _1: Vector3f): Mesh;
  findBottomPosition(_0: Mesh, _1: Vector3f): any;
  unitVector3f(_0: number, _1: number): Vector3f;
  distanceSq3f(_0: Vector3f, _1: Vector3f): number;
  distance3f(_0: Vector3f, _1: Vector3f): number;
  cross3f(_0: Vector3f, _1: Vector3f): Vector3f;
  dot3f(_0: Vector3f, _1: Vector3f): number;
  sqr3f(_0: Vector3f): number;
  mixed3f(_0: Vector3f, _1: Vector3f, _2: Vector3f): number;
  mult3f(_0: Vector3f, _1: Vector3f): Vector3f;
  div3f(_0: Vector3f, _1: Vector3f): Vector3f;
  angle3f(_0: Vector3f, _1: Vector3f): number;
  Vector3b: {
    new(): Vector3b;
    new(_0: boolean, _1: boolean, _2: boolean): Vector3b;
    createFromVector2(_0: Vector2b): Vector3b;
    diagonal(_0: boolean): Vector3b;
    plusX(): Vector3b;
    plusY(): Vector3b;
    plusZ(): Vector3b;
    minusX(): Vector3b;
    minusY(): Vector3b;
    minusZ(): Vector3b;
  };
  unitVector3b(_0: boolean, _1: boolean): Vector3f;
  Vector3i: {
    new(): Vector3i;
    new(_0: number, _1: number, _2: number): Vector3i;
    createFromVector2(_0: Vector2i): Vector3i;
    diagonal(_0: number): Vector3i;
    plusX(): Vector3i;
    plusY(): Vector3i;
    plusZ(): Vector3i;
    minusX(): Vector3i;
    minusY(): Vector3i;
    minusZ(): Vector3i;
  };
  makeFreeFormOriginGrid(_0: Box3f, _1: Vector3i): VectorVector3f;
  findBestFreeformDeformation(_0: Box3f, _1: VectorVector3f, _2: VectorVector3f, _3: Vector3i, _4: AffineXf3f | null): VectorVector3f;
  unitVector3i(_0: number, _1: number): Vector3f;
  distanceSq3i(_0: Vector3i, _1: Vector3i): number;
  distance3i(_0: Vector3i, _1: Vector3i): number;
  cross3i(_0: Vector3i, _1: Vector3i): Vector3i;
  dot3i(_0: Vector3i, _1: Vector3i): number;
  sqr3i(_0: Vector3i): number;
  mixed3i(_0: Vector3i, _1: Vector3i, _2: Vector3i): number;
  mult3i(_0: Vector3i, _1: Vector3i): Vector3i;
  div3i(_0: Vector3i, _1: Vector3i): Vector3i;
  angle3i(_0: Vector3i, _1: Vector3i): number;
  Vector3i64: {
    new(): Vector3i64;
    new(_0: bigint, _1: bigint, _2: bigint): Vector3i64;
    createFromVector2(_0: Vector2i64): Vector3i64;
    diagonal(_0: bigint): Vector3i64;
    plusX(): Vector3i64;
    plusY(): Vector3i64;
    plusZ(): Vector3i64;
    minusX(): Vector3i64;
    minusY(): Vector3i64;
    minusZ(): Vector3i64;
  };
  unitVector3i64(_0: bigint, _1: bigint): Vector3f;
  distanceSq3i64(_0: Vector3i64, _1: Vector3i64): bigint;
  distance3i64(_0: Vector3i64, _1: Vector3i64): bigint;
  cross3i64(_0: Vector3i64, _1: Vector3i64): Vector3i64;
  dot3i64(_0: Vector3i64, _1: Vector3i64): bigint;
  sqr3i64(_0: Vector3i64): bigint;
  mixed3i64(_0: Vector3i64, _1: Vector3i64, _2: Vector3i64): bigint;
  mult3i64(_0: Vector3i64, _1: Vector3i64): Vector3i64;
  div3i64(_0: Vector3i64, _1: Vector3i64): Vector3i64;
  angle3i64(_0: Vector3i64, _1: Vector3i64): bigint;
  Vector3d: {
    new(): Vector3d;
    new(_0: number, _1: number, _2: number): Vector3d;
    createFromVector2(_0: Vector2d): Vector3d;
    diagonal(_0: number): Vector3d;
    plusX(): Vector3d;
    plusY(): Vector3d;
    plusZ(): Vector3d;
    minusX(): Vector3d;
    minusY(): Vector3d;
    minusZ(): Vector3d;
  };
  to3dimVecd(_0: Vector2d): Vector3d;
  to2dimVecd(_0: Vector3d): Vector2d;
  closestPointOnLineSegm3d(_0: Vector3d, _1: LineSegm3d): Vector3d;
  unitVector3d(_0: number, _1: number): Vector3d;
  distanceSq3d(_0: Vector3d, _1: Vector3d): number;
  distance3d(_0: Vector3d, _1: Vector3d): number;
  cross3d(_0: Vector3d, _1: Vector3d): Vector3d;
  dot3d(_0: Vector3d, _1: Vector3d): number;
  sqr3d(_0: Vector3d): number;
  mixed3d(_0: Vector3d, _1: Vector3d, _2: Vector3d): number;
  mult3d(_0: Vector3d, _1: Vector3d): Vector3d;
  div3d(_0: Vector3d, _1: Vector3d): Vector3d;
  angle3d(_0: Vector3d, _1: Vector3d): number;
  Vector4b: {
    new(): Vector4b;
    new(_0: boolean, _1: boolean, _2: boolean, _3: boolean): Vector4b;
    diagonal(_0: boolean): Vector4b;
  };
  distanceSq4b(_0: Vector4b, _1: Vector4b): boolean;
  distance4b(_0: Vector4b, _1: Vector4b): boolean;
  sqr4b(_0: Vector4b): boolean;
  Vector4f: {
    new(): Vector4f;
    new(_0: number, _1: number, _2: number, _3: number): Vector4f;
    diagonal(_0: number): Vector4f;
  };
  dot4f(_0: Vector4f, _1: Vector4f): number;
  mult4f(_0: Vector4f, _1: Vector4f): Vector4f;
  div4f(_0: Vector4f, _1: Vector4f): Vector4f;
  distanceSq4f(_0: Vector4f, _1: Vector4f): number;
  distance4f(_0: Vector4f, _1: Vector4f): number;
  sqr4f(_0: Vector4f): number;
  Vector4i: {
    new(): Vector4i;
    new(_0: number, _1: number, _2: number, _3: number): Vector4i;
    diagonal(_0: number): Vector4i;
  };
  dot4i(_0: Vector4i, _1: Vector4i): number;
  mult4i(_0: Vector4i, _1: Vector4i): Vector4i;
  div4i(_0: Vector4i, _1: Vector4i): Vector4i;
  distanceSq4i(_0: Vector4i, _1: Vector4i): number;
  distance4i(_0: Vector4i, _1: Vector4i): number;
  sqr4i(_0: Vector4i): number;
  Vector4i64: {
    new(): Vector4i64;
    new(_0: bigint, _1: bigint, _2: bigint, _3: bigint): Vector4i64;
    diagonal(_0: bigint): Vector4i64;
  };
  dot4i64(_0: Vector4i64, _1: Vector4i64): bigint;
  mult4i64(_0: Vector4i64, _1: Vector4i64): Vector4i64;
  div4i64(_0: Vector4i64, _1: Vector4i64): Vector4i64;
  distanceSq4i64(_0: Vector4i64, _1: Vector4i64): bigint;
  distance4i64(_0: Vector4i64, _1: Vector4i64): bigint;
  sqr4i64(_0: Vector4i64): bigint;
  Vector4d: {
    new(): Vector4d;
    new(_0: number, _1: number, _2: number, _3: number): Vector4d;
    diagonal(_0: number): Vector4d;
  };
  dot4d(_0: Vector4d, _1: Vector4d): number;
  mult4d(_0: Vector4d, _1: Vector4d): Vector4d;
  div4d(_0: Vector4d, _1: Vector4d): Vector4d;
  distanceSq4d(_0: Vector4d, _1: Vector4d): number;
  distance4d(_0: Vector4d, _1: Vector4d): number;
  sqr4d(_0: Vector4d): number;
  VisualObject: {
    new(): VisualObject;
  };
}

export type MainModule = WasmModule & typeof RuntimeExports & EmbindModule;
export default function MainModuleFactory (options?: unknown): Promise<MainModule>;
