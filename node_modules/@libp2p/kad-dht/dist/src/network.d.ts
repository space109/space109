import { Message } from './message/index.js';
import { EventEmitter } from '@libp2p/interfaces/events';
import type { PeerId } from '@libp2p/interface-peer-id';
import type { AbortOptions } from '@libp2p/interfaces';
import type { Startable } from '@libp2p/interfaces/startable';
import type { Duplex } from 'it-stream-types';
import type { PeerInfo } from '@libp2p/interface-peer-info';
import { Components, Initializable } from '@libp2p/components';
import type { Uint8ArrayList } from 'uint8arraylist';
export interface NetworkInit {
    protocol: string;
    lan: boolean;
}
interface NetworkEvents {
    'peer': CustomEvent<PeerInfo>;
}
/**
 * Handle network operations for the dht
 */
export declare class Network extends EventEmitter<NetworkEvents> implements Startable, Initializable {
    private readonly log;
    private readonly protocol;
    private running;
    private components;
    /**
     * Create a new network
     */
    constructor(init: NetworkInit);
    init(components: Components): void;
    /**
     * Start the network
     */
    start(): Promise<void>;
    /**
     * Stop all network activity
     */
    stop(): Promise<void>;
    /**
     * Is the network online?
     */
    isStarted(): boolean;
    /**
     * Send a request and record RTT for latency measurements
     */
    sendRequest(to: PeerId, msg: Message, options?: AbortOptions): AsyncGenerator<import("@libp2p/interface-dht").SendingQueryEvent | import("@libp2p/interface-dht").PeerResponseEvent | import("@libp2p/interface-dht").QueryErrorEvent | import("@libp2p/interface-dht").DialingPeerEvent, void, unknown>;
    /**
     * Sends a message without expecting an answer
     */
    sendMessage(to: PeerId, msg: Message, options?: AbortOptions): AsyncGenerator<import("@libp2p/interface-dht").SendingQueryEvent | import("@libp2p/interface-dht").PeerResponseEvent | import("@libp2p/interface-dht").QueryErrorEvent | import("@libp2p/interface-dht").DialingPeerEvent, void, unknown>;
    /**
     * Write a message to the given stream
     */
    _writeMessage(stream: Duplex<Uint8ArrayList, Uint8ArrayList | Uint8Array>, msg: Uint8Array | Uint8ArrayList, options: AbortOptions): Promise<void>;
    /**
     * Write a message and read its response.
     * If no response is received after the specified timeout
     * this will error out.
     */
    _writeReadMessage(stream: Duplex<Uint8ArrayList, Uint8ArrayList | Uint8Array>, msg: Uint8Array | Uint8ArrayList, options: AbortOptions): Promise<Message>;
}
export {};
//# sourceMappingURL=network.d.ts.map