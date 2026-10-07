import { getSharedBus } from './bus';
import { patchFetchPrototype } from './fetch';
import { patchXhrPrototype } from './xhr';

/**
 * 初始化网络底层劫持补丁
 */
function applyPatches(bus) {
  patchXhrPrototype(bus);
  patchFetchPrototype(bus);
}

/**
 * 注册全局网络响应拦截
 */
export function installNetworkInterceptor({ url, onResponse, dataType }) {
  const bus = getSharedBus();
  bus.rules.push({ url, onResponse, dataType });

  if (!bus.patched) {
    bus.patched = true;
    applyPatches(bus);
  }

  console.info(`[NetworkInterceptor] 成功注册网络响应拦截规则: ${url}`);
}
