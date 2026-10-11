<template>
  <div :class="['bili-search-filter-bar', { 'no-filtered': filteredCount === 0 }]">
    <div class="filter-bar-left">
      <div class="filter-bar-stats">
        <span class="stats-item filtered">
          已过滤
          <strong class="stats-num filtered-num">{{ filteredCount }}</strong>
          条无关卡片
        </span>
        <span class="stats-divider">/</span>
        <span class="stats-item matched">
          保留
          <strong class="stats-num matched-num">{{ matchedCount }}</strong>
          条
        </span>
      </div>
    </div>

    <div class="filter-bar-right">
      <button
        :class="['btn-toggle-restore', { 'is-restored': isShowingAll }]"
        title="点击切换过滤卡片的显示与隐藏状态"
        type="button"
        @click="$emit('toggle-restore')"
      >
        <svg class="icon-toggle" fill="currentColor" height="13" viewBox="0 0 24 24" width="13">
          <path
            v-if="isShowingAll"
            d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
          />
          <path
            v-else
            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
          />
        </svg>
        <span class="toggle-text">{{ isShowingAll ? '恢复过滤状态' : '查看已过滤卡片' }}</span>
      </button>

      <button
        class="btn-open-settings"
        title="打开卡片过滤设置"
        type="button"
        @click="$emit('open-settings')"
      >
        <svg fill="currentColor" height="13" viewBox="0 0 24 24" width="13">
          <path
            d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
          />
        </svg>
        <span>设置</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  filteredCount: {
    type: Number,
    default: 0,
  },
  matchedCount: {
    type: Number,
    default: 0,
  },
  isShowingAll: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['toggle-restore', 'open-settings']);
</script>

<style lang="scss" scoped src="./style.scss"></style>
