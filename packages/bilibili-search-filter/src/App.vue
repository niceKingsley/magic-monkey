<template>
  <Teleport v-if="teleportTarget && config.showFilterBar" :to="teleportTarget">
    <FilterBar
      :filtered-count="filteredCards.length"
      :is-showing-all="isShowingAll"
      :matched-count="matchedCards.length"
      @open-settings="openSettings"
      @toggle-restore="toggleRestore"
    />
  </Teleport>

  <SettingsModal
    :config="config"
    :visible="isSettingsOpen"
    @close="closeSettings"
    @saved="handleSaveSettings"
  />
</template>

<script setup>
import FilterBar from './components/FilterBar';
import SettingsModal from './components/SettingsModal';
import { useApp } from './useApp';

const {
  isSettingsOpen,
  config,
  teleportTarget,
  isShowingAll,
  filteredCards,
  matchedCards,
  openSettings,
  closeSettings,
  toggleRestore,
  handleSaveSettings,
} = useApp();
</script>

<style lang="scss" src="./App.scss"></style>
