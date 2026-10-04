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
        <div class="settings-btn" title="设置" @click.stop="handleOpenSettings">
          <SvgIcon name="settings" />
        </div>
      </div>
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
            :class="{ 'is-active': group.isActive }"
            :data-bvid="group.bvid"
            :data-page="group.page"
            class="header"
            @click="handleHeaderClick(group)"
          >
            <div class="mode-list">
              <div class="title">
                <div class="playing-gif" />
                <div :title="group.title" class="title-text">{{ group.title }}</div>
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
                  <div :title="group.title" class="title-text">{{ group.title }}</div>
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
              :class="{ 'is-active': ep.isActive }"
              class="episode"
              @click.stop="switchActiveVideo(podType, group, index)"
            >
              <div class="episode-title">
                <div class="playing-gif" />
                <div :title="ep.title" class="title-txt">{{ ep.title }}</div>
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
import { POD_MODE, POD_TYPE, SHUFFLE_SCOPE, SORT_OPTIONS } from './constants.js';
import { useVideoPod } from './composables/useVideoPod.js';
import { usePodSearch } from './composables/usePodSearch.js';
import { initSettings, useSettings } from './composables/useSettings.js';
import { toast } from '@shared/components/toast';
import '@shared/components/spinner';
import '@shared/components/switch';
import '@shared/components/select';
import '@shared/components/input';
import SvgIcon from './components/SvgIcon';
import SettingsModal from './components/SettingsModal';

const {
  isAnimating,
  isLoading,
  podType,
  rootRef,
  scrollContainerRef,
  podMode,
  groups,
  containerStyle,
  videoBodyStyle,
  isExpanded,
  toggleAccordion,
  handleHeaderClick,
  switchActiveVideo,
  toggleShuffle,
  loadPod,
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
} = usePodSearch(groups);

const { settings } = useSettings();
const isSettingsOpen = ref(false);

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
