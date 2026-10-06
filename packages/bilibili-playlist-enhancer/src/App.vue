<template>
  <div
    v-if="groups.length > 0"
    ref="rootRef"
    :class="{
      'is-card-mode': podMode === POD_MODE.CARD,
      'is-animating': isAnimating,
    }"
    :style="containerStyle"
    class="tk-reaction"
  >
    <div class="tk-reaction-header">
      <div class="header-left">
        <magic-select
          v-if="podType !== POD_TYPE.EPISODE"
          :options="SORT_OPTIONS"
          :value="settings.sortMode"
          class="sort-select"
          size="small"
          @change="handleSortChange"
        />
        <magic-switch
          :checked="settings.autoPlayNext"
          active-text="自动切集"
          size="small"
          @change="handleAutoPlayChange"
        />
      </div>
      <div class="header-right">
        <div
          :class="{ 'is-active': settings.shuffle }"
          :title="shuffleTooltip"
          class="shuffle-btn"
          @click.stop="handleShuffleClick"
        >
          <SvgIcon name="shuffle" />
        </div>
        <div
          :class="{ 'is-active': isSearchOpen }"
          class="search-btn"
          title="搜索视频"
          @click.stop="toggleSearch"
        >
          <SvgIcon name="search" />
        </div>
        <div class="settings-btn" :title="settingsTooltip" @click.stop="handleOpenSettings">
          <SvgIcon name="settings" />
        </div>
      </div>
    </div>
    <div v-if="hasMultipleSections" ref="slideRef" class="tk-reaction-pod-slide">
      <magic-tabs :items="seasonSections" :value="currentSectionId" @change="handleSectionChange">
        <div
          slot="suffix"
          :class="['more-sections-btn', { 'is-active': isSectionDropdownOpen }]"
          @click="toggleSectionDropdown"
          @mouseenter="openSectionDropdown"
          @mouseleave="handleBtnMouseLeave"
        >
          <SvgIcon name="expand" />
        </div>
      </magic-tabs>

      <transition name="dropdown-fade">
        <div
          v-if="isSectionDropdownOpen"
          class="sections-dropdown-menu"
          @mouseenter="keepSectionDropdown"
          @mouseleave="closeSectionDropdownImmediately"
          @wheel.stop.prevent="handleDropdownWheel"
        >
          <div
            v-for="item in seasonSections"
            :key="item.value"
            :class="[
              'dropdown-item',
              { 'is-active': String(item.value) === String(currentSectionId) },
            ]"
            @click="selectSection(item)"
          >
            <span class="item-label">{{ item.label }}</span>
          </div>
        </div>
      </transition>
    </div>

    <div v-show="isSearchOpen" class="tk-reaction-search" @keydown.stop @keyup.stop>
      <magic-input
        ref="searchInputRef"
        :maxlength="50"
        :value="keyword"
        block
        class="search-input"
        clearable
        placeholder="搜索视频的标题"
        size="small"
        @clear="clearKeyword"
        @input="handleKeywordInput"
        @keydown.esc.stop="closeSearch"
      >
        <SvgIcon slot="prefix" class="search-prefix-icon" name="search" />
        <span v-if="hasSearchQuery" slot="suffix" class="match-badge">
          {{ matchCount > 0 ? `${matchCount} 个结果` : '无结果' }}
        </span>
      </magic-input>
    </div>

    <div
      ref="scrollContainerRef"
      :class="{ 'is-loading': isLoading }"
      :style="videoBodyStyle"
      class="tk-reaction-video"
    >
      <div v-if="isLoading" class="loading-state">
        <magic-spinner size="28" text="加载中..." />
      </div>

      <div v-else-if="filteredGroups.length === 0" class="empty-state">
        <div class="empty-text">未找到与“{{ keyword }}”相关的视频</div>
      </div>

      <div v-else class="list">
        <div
          v-for="(group, gIdx) in filteredGroups"
          :key="group.cid || `${group.bvid}_${group.page ?? gIdx}`"
          :data-bvid="group.bvid"
          class="item"
        >
          <div
            :class="{
              'is-active': group.isActive,
              'is-played': settings.markPlayedVideos && !group.isActive && isGroupPlayed(group),
            }"
            :data-bvid="group.bvid"
            :data-page="group.page"
            class="header"
            @click="handleHeaderClick(group)"
          >
            <div class="mode-list">
              <div class="title">
                <div class="playing-gif" />
                <div :title="group.title" class="title-text">
                  <template v-if="hasSearchQuery">
                    <span
                      v-for="(seg, sIdx) in getHighlightSegments(group.title, keyword)"
                      :key="sIdx"
                      :class="{ 'tk-search-highlight': seg.isMatch }"
                      >{{ seg.text }}</span
                    >
                  </template>
                  <template v-else>{{ group.title }}</template>
                </div>
              </div>
              <div class="actions">
                <div
                  v-if="group.isMultiPage"
                  :class="{
                    'is-expanded':
                      isExpanded(group.bvid) || (hasSearchQuery && group.isAutoExpanded),
                  }"
                  class="expand"
                  @click.stop="toggleAccordion(group.bvid)"
                >
                  <SvgIcon name="expand" />
                </div>
                <div v-else-if="group.episodes?.[0]?.duration" class="expand-duration">
                  {{ group.episodes[0].duration }}
                </div>
              </div>
            </div>

            <div class="mode-card">
              <div class="cover">
                <img :alt="group.title" :src="group.cover" class="cover-img" loading="lazy" />
              </div>
              <div class="info">
                <div class="title">
                  <div class="playing-gif" />
                  <div :title="group.title" class="title-text">
                    <template v-if="hasSearchQuery">
                      <span
                        v-for="(seg, sIdx) in getHighlightSegments(group.title, keyword)"
                        :key="sIdx"
                        :class="{ 'tk-search-highlight': seg.isMatch }"
                        >{{ seg.text }}</span
                      >
                    </template>
                    <template v-else>{{ group.title }}</template>
                  </div>
                </div>
                <div class="stats">
                  <div class="stat-item views">
                    <SvgIcon name="views" />
                    <span class="count-text views-text">{{ group.views }}</span>
                  </div>
                  <div class="stat-item danmaku">
                    <SvgIcon name="danmaku" />
                    <span class="count-text danmaku-text">{{ group.danmakus }}</span>
                  </div>
                  <div class="stat-item pubdate">
                    <SvgIcon name="pubdate" />
                    <span :title="group.pubdate" class="count-text pubdate-text">{{
                      group.pubdate
                    }}</span>
                  </div>
                  <div
                    v-if="group.isMultiPage"
                    :class="{
                      'is-expanded':
                        isExpanded(group.bvid) || (hasSearchQuery && group.isAutoExpanded),
                    }"
                    class="stat-item expand-btn expand"
                    @click.stop="toggleAccordion(group.bvid)"
                  >
                    <SvgIcon name="expand" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="group.isMultiPage"
            v-show="isExpanded(group.bvid) || (hasSearchQuery && group.isAutoExpanded)"
            class="episodes"
          >
            <div
              v-for="(ep, index) in group.episodes"
              :key="ep.cid || `${group.bvid}_${ep.page || index}`"
              :class="{
                'is-active': ep.isActive,
                'is-played':
                  settings.markPlayedVideos && !ep.isActive && isEpisodePlayed(group.bvid, ep),
              }"
              class="episode"
              @click.stop="switchActiveVideo(podType, group, index)"
            >
              <div class="episode-title">
                <div class="playing-gif" />
                <div :title="ep.title" class="title-txt">
                  <template v-if="hasSearchQuery">
                    <span
                      v-for="(seg, sIdx) in getHighlightSegments(ep.title, keyword)"
                      :key="sIdx"
                      :class="{ 'tk-search-highlight': seg.isMatch }"
                      >{{ seg.text }}</span
                    >
                  </template>
                  <template v-else>{{ ep.title }}</template>
                </div>
              </div>
              <div class="episode-meta">
                <span class="episode-duration">{{ ep.duration }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SettingsModal :visible="isSettingsOpen" @close="isSettingsOpen = false" />
  </div>
</template>

<script setup>
import { on } from '@shared/utils';
import {
  POD_MODE,
  POD_TYPE,
  PROJECT_TITLE,
  SCRIPT_VERSION,
  SHUFFLE_SCOPE,
  SORT_OPTIONS,
} from './constants.js';
import { useVideoPod } from './composables/useVideoPod.js';
import { usePodSearch } from './composables/usePodSearch.js';
import { initSettings, useSettings } from './composables/useSettings.js';
import '@shared/components/tabs';
import '@shared/components/spinner';
import '@shared/components/switch';
import '@shared/components/select';
import '@shared/components/input';
import SvgIcon from './components/SvgIcon';
import SettingsModal from './components/SettingsModal';
import { toast } from '@shared/components/toast/index.js';

const settingsTooltip = `${PROJECT_TITLE} (v${SCRIPT_VERSION})`;

const {
  isAnimating,
  isLoading,
  podType,
  rootRef,
  scrollContainerRef,
  podMode,
  groups,
  seasonSections,
  hasMultipleSections,
  currentSectionId,
  containerStyle,
  videoBodyStyle,
  isExpanded,
  toggleAccordion,
  handleHeaderClick,
  switchActiveVideo,
  toggleShuffle,
  loadPod,
  switchSection,
  isGroupPlayed,
  isEpisodePlayed,
} = useVideoPod();

const {
  keyword,
  isSearchOpen,
  searchInputRef,
  filteredGroups,
  matchCount,
  hasSearchQuery,
  closeSearch,
  clearKeyword,
  toggleSearch,
  getHighlightSegments,
} = usePodSearch(groups);

const { settings } = useSettings();
const isSettingsOpen = ref(false);

const slideRef = ref(null);
const isSectionDropdownOpen = ref(false);
let dropdownTimer = null;

const openSectionDropdown = () => {
  if (dropdownTimer) {
    clearTimeout(dropdownTimer);
    dropdownTimer = null;
  }
  isSectionDropdownOpen.value = true;
};

const handleBtnMouseLeave = () => {
  if (dropdownTimer) {
    clearTimeout(dropdownTimer);
  }
  dropdownTimer = setTimeout(() => {
    isSectionDropdownOpen.value = false;
    dropdownTimer = null;
  }, 120);
};

const keepSectionDropdown = () => {
  if (dropdownTimer) {
    clearTimeout(dropdownTimer);
    dropdownTimer = null;
  }
};

const closeSectionDropdownImmediately = () => {
  if (dropdownTimer) {
    clearTimeout(dropdownTimer);
    dropdownTimer = null;
  }
  isSectionDropdownOpen.value = false;
};

const toggleSectionDropdown = () => {
  if (isSectionDropdownOpen.value) {
    closeSectionDropdownImmediately();
  } else {
    openSectionDropdown();
  }
};

const handleDropdownWheel = (event) => {
  const el = event.currentTarget;
  if (!el) return;
  el.scrollTop += event.deltaY;
};

const selectSection = (item) => {
  const nextId = String(item.value);
  switchSection(nextId);
  closeSectionDropdownImmediately();
};

let cleanupDocumentClick = null;

const handleDocumentClick = (event) => {
  if (isSectionDropdownOpen.value && slideRef.value && !slideRef.value.contains(event.target)) {
    closeSectionDropdownImmediately();
  }
};

watch(isSectionDropdownOpen, (open) => {
  cleanupDocumentClick?.();
  cleanupDocumentClick = null;
  if (open) {
    cleanupDocumentClick = on(window, 'click', handleDocumentClick);
  }
});

onUnmounted(() => {
  if (dropdownTimer) {
    clearTimeout(dropdownTimer);
  }
  cleanupDocumentClick?.();
  cleanupDocumentClick = null;
});

const handleSectionChange = (event) => {
  const nextId = event.detail?.value;
  if (toValue(currentSectionId) === nextId) return;
  switchSection(nextId);
};

const handleKeywordInput = (event) => {
  keyword.value = event.detail?.value ?? event.target?.value ?? '';
};

const shuffleTooltip = computed(() => {
  if (!settings.shuffle) return '随机播放 (已关闭)';
  return settings.shuffleScope === SHUFFLE_SCOPE.GROUP
    ? '随机播放 (仅当前分组)'
    : '随机播放 (全合集)';
});

const handleShuffleClick = () => {
  const nextVal = toggleShuffle();
  const scopeText = settings.shuffleScope === SHUFFLE_SCOPE.GROUP ? '仅当前分组' : '全合集';
  toast.success(nextVal ? `已开启随机播放 (${scopeText})` : '已关闭随机播放');
};

const handleAutoPlayChange = (event) => {
  const nextVal = event.detail.value;
  settings.autoPlayNext = nextVal;
  toast.success(nextVal ? '已开启自动切集' : '已关闭自动切集');
};

const handleSortChange = (event) => {
  settings.sortMode = event.detail.value;
};

const handleOpenSettings = () => {
  isSettingsOpen.value = true;
};

onMounted(() => {
  initSettings();
});

defineExpose({
  loadPod,
});
</script>

<style lang="scss" scoped src="./App.scss"></style>
