<template>
  <SettingsModal :visible="isSettingsOpen" @close="isSettingsOpen = false" />
</template>

<script setup>
import { isFunction } from '@shared/utils';
import SettingsModal from './components/SettingsModal';

const isSettingsOpen = ref(false);

const toggleSettings = () => {
  isSettingsOpen.value = !isSettingsOpen.value;
};

onMounted(() => {
  if (isFunction(globalThis.GM_registerMenuCommand)) {
    globalThis.GM_registerMenuCommand('⚙️ 弹幕过滤设置', toggleSettings);
  }
});
</script>

<style lang="scss" scoped src="./App.scss"></style>
