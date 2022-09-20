import type { Socket } from 'net';
import type { Multiaddr } from '@multiformats/multiaddr';
import type { MultiaddrConnection } from '@libp2p/interface-connection';
interface ToConnectionOptions {
    listeningAddr?: Multiaddr;
    remoteAddr?: Multiaddr;
    localAddr?: Multiaddr;
    signal?: AbortSignal;
    socketInactivityTimeout?: number;
    socketCloseTimeout?: number;
}
/**
 * Convert a socket into a MultiaddrConnection
 * https://github.com/libp2p/interface-transport#multiaddrconnection
 */
export declare const toMultiaddrConnection: (socket: Socket, options?: ToConnectionOptions) => MultiaddrConnection;
export {};
//# sourceMappingURL=socket-to-conn.d.ts.map