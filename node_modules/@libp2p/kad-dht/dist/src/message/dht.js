/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */
import { encodeMessage, decodeMessage, message, enumeration } from 'protons-runtime';
export var Record;
(function (Record) {
    let _codec;
    Record.codec = () => {
        if (_codec == null) {
            _codec = message((obj, writer, opts = {}) => {
                if (opts.lengthDelimited !== false) {
                    writer.fork();
                }
                if (obj.key != null) {
                    writer.uint32(10);
                    writer.bytes(obj.key);
                }
                if (obj.value != null) {
                    writer.uint32(18);
                    writer.bytes(obj.value);
                }
                if (obj.author != null) {
                    writer.uint32(26);
                    writer.bytes(obj.author);
                }
                if (obj.signature != null) {
                    writer.uint32(34);
                    writer.bytes(obj.signature);
                }
                if (obj.timeReceived != null) {
                    writer.uint32(42);
                    writer.string(obj.timeReceived);
                }
                if (opts.lengthDelimited !== false) {
                    writer.ldelim();
                }
            }, (reader, length) => {
                const obj = {};
                const end = length == null ? reader.len : reader.pos + length;
                while (reader.pos < end) {
                    const tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            obj.key = reader.bytes();
                            break;
                        case 2:
                            obj.value = reader.bytes();
                            break;
                        case 3:
                            obj.author = reader.bytes();
                            break;
                        case 4:
                            obj.signature = reader.bytes();
                            break;
                        case 5:
                            obj.timeReceived = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return obj;
            });
        }
        return _codec;
    };
    Record.encode = (obj) => {
        return encodeMessage(obj, Record.codec());
    };
    Record.decode = (buf) => {
        return decodeMessage(buf, Record.codec());
    };
})(Record || (Record = {}));
export var Message;
(function (Message) {
    let MessageType;
    (function (MessageType) {
        MessageType["PUT_VALUE"] = "PUT_VALUE";
        MessageType["GET_VALUE"] = "GET_VALUE";
        MessageType["ADD_PROVIDER"] = "ADD_PROVIDER";
        MessageType["GET_PROVIDERS"] = "GET_PROVIDERS";
        MessageType["FIND_NODE"] = "FIND_NODE";
        MessageType["PING"] = "PING";
    })(MessageType = Message.MessageType || (Message.MessageType = {}));
    let __MessageTypeValues;
    (function (__MessageTypeValues) {
        __MessageTypeValues[__MessageTypeValues["PUT_VALUE"] = 0] = "PUT_VALUE";
        __MessageTypeValues[__MessageTypeValues["GET_VALUE"] = 1] = "GET_VALUE";
        __MessageTypeValues[__MessageTypeValues["ADD_PROVIDER"] = 2] = "ADD_PROVIDER";
        __MessageTypeValues[__MessageTypeValues["GET_PROVIDERS"] = 3] = "GET_PROVIDERS";
        __MessageTypeValues[__MessageTypeValues["FIND_NODE"] = 4] = "FIND_NODE";
        __MessageTypeValues[__MessageTypeValues["PING"] = 5] = "PING";
    })(__MessageTypeValues || (__MessageTypeValues = {}));
    (function (MessageType) {
        MessageType.codec = () => {
            return enumeration(__MessageTypeValues);
        };
    })(MessageType = Message.MessageType || (Message.MessageType = {}));
    let ConnectionType;
    (function (ConnectionType) {
        ConnectionType["NOT_CONNECTED"] = "NOT_CONNECTED";
        ConnectionType["CONNECTED"] = "CONNECTED";
        ConnectionType["CAN_CONNECT"] = "CAN_CONNECT";
        ConnectionType["CANNOT_CONNECT"] = "CANNOT_CONNECT";
    })(ConnectionType = Message.ConnectionType || (Message.ConnectionType = {}));
    let __ConnectionTypeValues;
    (function (__ConnectionTypeValues) {
        __ConnectionTypeValues[__ConnectionTypeValues["NOT_CONNECTED"] = 0] = "NOT_CONNECTED";
        __ConnectionTypeValues[__ConnectionTypeValues["CONNECTED"] = 1] = "CONNECTED";
        __ConnectionTypeValues[__ConnectionTypeValues["CAN_CONNECT"] = 2] = "CAN_CONNECT";
        __ConnectionTypeValues[__ConnectionTypeValues["CANNOT_CONNECT"] = 3] = "CANNOT_CONNECT";
    })(__ConnectionTypeValues || (__ConnectionTypeValues = {}));
    (function (ConnectionType) {
        ConnectionType.codec = () => {
            return enumeration(__ConnectionTypeValues);
        };
    })(ConnectionType = Message.ConnectionType || (Message.ConnectionType = {}));
    let Peer;
    (function (Peer) {
        let _codec;
        Peer.codec = () => {
            if (_codec == null) {
                _codec = message((obj, writer, opts = {}) => {
                    if (opts.lengthDelimited !== false) {
                        writer.fork();
                    }
                    if (obj.id != null) {
                        writer.uint32(10);
                        writer.bytes(obj.id);
                    }
                    if (obj.addrs != null) {
                        for (const value of obj.addrs) {
                            writer.uint32(18);
                            writer.bytes(value);
                        }
                    }
                    else {
                        throw new Error('Protocol error: required field "addrs" was not found in object');
                    }
                    if (obj.connection != null) {
                        writer.uint32(24);
                        Message.ConnectionType.codec().encode(obj.connection, writer);
                    }
                    if (opts.lengthDelimited !== false) {
                        writer.ldelim();
                    }
                }, (reader, length) => {
                    const obj = {
                        addrs: []
                    };
                    const end = length == null ? reader.len : reader.pos + length;
                    while (reader.pos < end) {
                        const tag = reader.uint32();
                        switch (tag >>> 3) {
                            case 1:
                                obj.id = reader.bytes();
                                break;
                            case 2:
                                obj.addrs.push(reader.bytes());
                                break;
                            case 3:
                                obj.connection = Message.ConnectionType.codec().decode(reader);
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return obj;
                });
            }
            return _codec;
        };
        Peer.encode = (obj) => {
            return encodeMessage(obj, Peer.codec());
        };
        Peer.decode = (buf) => {
            return decodeMessage(buf, Peer.codec());
        };
    })(Peer = Message.Peer || (Message.Peer = {}));
    let _codec;
    Message.codec = () => {
        if (_codec == null) {
            _codec = message((obj, writer, opts = {}) => {
                if (opts.lengthDelimited !== false) {
                    writer.fork();
                }
                if (obj.type != null) {
                    writer.uint32(8);
                    Message.MessageType.codec().encode(obj.type, writer);
                }
                if (obj.clusterLevelRaw != null) {
                    writer.uint32(80);
                    writer.int32(obj.clusterLevelRaw);
                }
                if (obj.key != null) {
                    writer.uint32(18);
                    writer.bytes(obj.key);
                }
                if (obj.record != null) {
                    writer.uint32(26);
                    writer.bytes(obj.record);
                }
                if (obj.closerPeers != null) {
                    for (const value of obj.closerPeers) {
                        writer.uint32(66);
                        Message.Peer.codec().encode(value, writer);
                    }
                }
                else {
                    throw new Error('Protocol error: required field "closerPeers" was not found in object');
                }
                if (obj.providerPeers != null) {
                    for (const value of obj.providerPeers) {
                        writer.uint32(74);
                        Message.Peer.codec().encode(value, writer);
                    }
                }
                else {
                    throw new Error('Protocol error: required field "providerPeers" was not found in object');
                }
                if (opts.lengthDelimited !== false) {
                    writer.ldelim();
                }
            }, (reader, length) => {
                const obj = {
                    closerPeers: [],
                    providerPeers: []
                };
                const end = length == null ? reader.len : reader.pos + length;
                while (reader.pos < end) {
                    const tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            obj.type = Message.MessageType.codec().decode(reader);
                            break;
                        case 10:
                            obj.clusterLevelRaw = reader.int32();
                            break;
                        case 2:
                            obj.key = reader.bytes();
                            break;
                        case 3:
                            obj.record = reader.bytes();
                            break;
                        case 8:
                            obj.closerPeers.push(Message.Peer.codec().decode(reader, reader.uint32()));
                            break;
                        case 9:
                            obj.providerPeers.push(Message.Peer.codec().decode(reader, reader.uint32()));
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return obj;
            });
        }
        return _codec;
    };
    Message.encode = (obj) => {
        return encodeMessage(obj, Message.codec());
    };
    Message.decode = (buf) => {
        return decodeMessage(buf, Message.codec());
    };
})(Message || (Message = {}));
//# sourceMappingURL=dht.js.map