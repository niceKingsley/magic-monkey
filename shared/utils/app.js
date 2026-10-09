import { isFunction } from './types';
import { waitElement } from './waitElement';

let currentAppInstance = null;

export async function bootstrapApp(options = {}) {
  const { createApp, rootComponent, waitBody = true, mountId, beforeMount, onMounted } = options;

  if (isFunction(beforeMount)) {
    const shouldContinue = await beforeMount();
    if (shouldContinue === false) return null;
  }

  const parent = waitBody ? await waitElement('body') : document.body;

  const container = document.createElement('div');
  if (mountId) container.id = mountId;
  if (parent) {
    parent.appendChild(container);
  }

  if (currentAppInstance) {
    currentAppInstance.unmount?.();
    currentAppInstance = null;
  }

  const app = createApp(rootComponent);
  const vm = app.mount(container);
  currentAppInstance = app;

  if (isFunction(onMounted)) {
    onMounted(vm, { app, container });
  }

  return { app, vm, container };
}
