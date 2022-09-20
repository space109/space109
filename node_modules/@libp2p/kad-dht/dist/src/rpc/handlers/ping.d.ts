import type { Message } from '../../message/index.js';
import type { DHTMessageHandler } from '../index.js';
import type { PeerId } from '@libp2p/interface-peer-id';
import type { Initializable } from '@libp2p/components';
export declare class PingHandler implements DHTMessageHandler, Initializable {
    handle(peerId: PeerId, msg: Message): Promise<Message>;
    init(): void;
}
//# sourceMappingURL=ping.d.ts.map