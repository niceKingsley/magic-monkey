import { isArray } from '@shared/utils';
import { DmSegMobileReply } from './schema';

export function parseProtobuf(buffer) {
  try {
    const uint8Array = new Uint8Array(buffer);
    const decoded = DmSegMobileReply.decode(uint8Array);
    const elems = decoded.elems;

    if (!elems) {
      return [];
    }

    return isArray(elems) ? elems : [elems];
  } catch (error) {
    console.error('Protobuf 解析失败:', error);
    return [];
  }
}

export function encodeProtobuf(list) {
  try {
    const message = { elems: list };
    const buffer = DmSegMobileReply.encode(message).finish();
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  } catch (error) {
    console.error('Protobuf 编码失败:', error);
    return new ArrayBuffer(0);
  }
}
