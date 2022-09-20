import type { DHTMessageHandler } from '../index.js';
import type { Validators } from '@libp2p/interface-dht';
import type { PeerId } from '@libp2p/interface-peer-id';
import type { Message } from '../../message/index.js';
import { Components, Initializable } from '@libp2p/components';
export interface PutValueHandlerInit {
    validators: Validators;
}
export declare class PutValueHandler implements DHTMessageHandler, Initializable {
    private readonly log;
    private components;
    private readonly validators;
    constructor(init: PutValueHandlerInit);
    init(components: Components): void;
    handle(peerId: PeerId, msg: Message): Promise<Message>;
}
//# sourceMappingURL=put-value.d.ts.map