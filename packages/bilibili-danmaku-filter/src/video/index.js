import { filterDanmaku } from '@/video/danmaku-filter';
import { mergeSimilar } from '@/video/danmaku-merger';
import { installNetworkInterceptor } from '@shared/utils';
import { encodeProtobuf, parseProtobuf } from './protobuf';

function processDanmaku(list, config = {}) {
  if (!list || list.length === 0) return [];

  const filtered = filterDanmaku(list, config);
  const { list: result } = mergeSimilar(filtered, config.mergeThreshold, config.mergeWindow);
  console.info(
    `弹幕过滤流水线完成: ${list.length} -> ${result.length} 条 (拦截 ${list.length - result.length} 条)`,
  );

  return result;
}

/**
 * 清洗点播视频的分段弹幕 Protobuf 二进制数据
 */
export function cleanVideoDanmaku(rawBuffer, config) {
  const rawList = parseProtobuf(rawBuffer);
  const processedList = processDanmaku(rawList, config);
  return encodeProtobuf(processedList);
}

/**
 * 开始过滤视频弹幕
 */
export function startVideoFilter(configGetter) {
  installNetworkInterceptor({
    url: '/wbi/web/seg.so',
    onResponse: (rawBuffer) => {
      const config = configGetter();
      if (!config?.enabled || !(rawBuffer instanceof ArrayBuffer)) {
        return rawBuffer;
      }

      return cleanVideoDanmaku(rawBuffer, config);
    },
  });
}
