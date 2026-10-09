import protobuf from 'protobufjs';
import protoDefinition from './danmaku.proto?raw';

const root = protobuf.parse(protoDefinition).root;
export const DmSegMobileReply = root.lookupType('DmSegMobileReply');
