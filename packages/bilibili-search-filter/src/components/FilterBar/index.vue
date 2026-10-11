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
        <magic-icon class="icon-toggle" :name="isShowingAll ? 'eye-off' : 'eye'" size="13" />
        <span class="toggle-text">{{ isShowingAll ? '恢复过滤状态' : '查看已过滤卡片' }}</span>
      </button>

      <button
        class="btn-open-settings"
        title="打开卡片过滤设置"
        type="button"
        @click="$emit('open-settings')"
      >
        <magic-icon name="settings" size="13" />
        <span>设置</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import '@shared/components/icon';

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
