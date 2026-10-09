<template>
  <Teleport to="body">
    <magic-modal
      :visible="visible"
      centered
      height="750px"
      width="680px"
      @cancel="handleCancel"
      @close="handleCancel"
      @confirm="handleConfirm"
    >
      <div slot="header" class="settings-modal-header">
        <span class="settings-modal-title">bilibili-danmaku-filter</span>
        <magic-version :version="SCRIPT_VERSION" />
      </div>

      <div class="settings-container">
        <div class="settings-nav">
          <magic-tabs
            :block="false"
            :items="TAB_ITEMS"
            :value="activeTab"
            inline
            @change="(e) => (activeTab = e.detail.value)"
          />
        </div>

        <div class="settings-content">
          <div class="settings-section">
            <div class="settings-section__title">
              <div class="title-left">
                <span>基础拦截</span>
              </div>
            </div>

            <div class="settings-card">
              <div class="settings-item">
                <div class="settings-item__info">
                  <div class="settings-item__title">
                    {{ activeTab === 'video' ? '启用视频弹幕过滤' : '启用直播弹幕过滤' }}
                  </div>
                  <div class="settings-item__desc">关闭后将直接放行原始分段弹幕数据</div>
                </div>
                <div class="settings-item__action">
                  <magic-switch
                    :checked="currentTabConfig.enabled"
                    size="small"
                    @change="(e) => (currentTabConfig.enabled = e.detail.value)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="settings-section">
            <div class="settings-section__title">
              <div class="title-left">
                <span>阈值</span>
              </div>
            </div>

            <div class="settings-card">
              <div v-if="activeTab === 'video'" class="settings-item settings-item--slider">
                <div class="settings-item__info">
                  <div class="settings-item__title">权重过滤阈值</div>
                  <div class="settings-item__desc">
                    弹幕质量评分，低于该值的低质弹幕将被过滤（1全放行，11最高）
                  </div>
                </div>
                <div class="slider-action">
                  <magic-slider
                    :max="11"
                    :min="1"
                    :step="1"
                    :value="formData.video.minWeight"
                    show-stops
                    show-value
                    size="small"
                    @change="(e) => (formData.video.minWeight = e.detail.value)"
                  />
                </div>
              </div>

              <div class="settings-item settings-item--slider">
                <div class="settings-item__info">
                  <div class="settings-item__title">防刷屏相似度</div>
                  <div class="settings-item__desc">
                    时段内相近弹幕合并的相似度门槛（值越高越严格，1.0 为拦截完全相同）
                  </div>
                </div>
                <div class="slider-action">
                  <magic-slider
                    :format-tooltip="(v) => Number(v).toFixed(2)"
                    :max="1"
                    :min="0.5"
                    :step="0.05"
                    :value="currentTabConfig.mergeThreshold"
                    show-value
                    size="small"
                    @change="(e) => (currentTabConfig.mergeThreshold = e.detail.value)"
                  />
                </div>
              </div>

              <div class="settings-item settings-item--slider">
                <div class="settings-item__info">
                  <div class="settings-item__title">合并时间窗口</div>
                  <div class="settings-item__desc">
                    指定秒数内出现的相似弹幕合并为 1 条，超过就算作下一批（建议数值不要过大）
                  </div>
                </div>
                <div class="slider-action">
                  <magic-slider
                    :format-tooltip="(v) => `${v}s`"
                    :max="15"
                    :min="1"
                    :step="1"
                    :value="currentTabConfig.mergeWindow"
                    show-stops
                    show-value
                    size="small"
                    @change="(e) => (currentTabConfig.mergeWindow = e.detail.value)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="settings-section">
            <div class="settings-section__title">
              <div class="title-left">
                <span>{{ activeTab === 'video' ? '视频黑名单' : '直播黑名单' }}</span>
                <span class="rule-count">共 {{ currentBlacklist.length }} 条</span>
              </div>
              <div class="title-right">
                <button
                  class="action-btn"
                  title="导出当前黑名单为 JSON 文件"
                  type="button"
                  @click="handleExportRules"
                >
                  <svg
                    class="action-btn__icon"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  <span>导出</span>
                </button>
                <button
                  class="action-btn"
                  title="从 JSON 文件导入黑名单"
                  type="button"
                  @click="triggerImportRules"
                >
                  <svg
                    class="action-btn__icon"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                  <span>导入</span>
                </button>
                <button
                  :title="`将当前列表规则合并到${activeTab === 'video' ? '直播' : '视频'}黑名单`"
                  class="action-btn"
                  type="button"
                  @click="handleSyncToOther"
                >
                  <svg
                    class="action-btn__icon"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 16h5v5" />
                  </svg>
                  <span>{{ activeTab === 'video' ? '合并到直播' : '合并到视频' }}</span>
                </button>
              </div>
            </div>

            <div class="settings-card blacklist-card">
              <div class="add-rule-form">
                <div class="rule-type-select">
                  <magic-select
                    :options="RULE_TYPE_OPTIONS"
                    :value="ruleType"
                    size="small"
                    @change="(e) => (ruleType = e.detail.value)"
                  />
                </div>
                <div class="rule-input-field">
                  <magic-input
                    :placeholder="
                      ruleType === RULE_TYPE.REGEX
                        ? '输入正则表达式，如: ^233+ 或 /关键词/i'
                        : '输入关键词，回车快速添加...'
                    "
                    :value="ruleKeyword"
                    block
                    clearable
                    size="small"
                    @input="(e) => (ruleKeyword = e.detail.value)"
                    @keydown.enter="handleAddRule"
                  />
                </div>
                <div class="add-btn">
                  <magic-button size="small" type="primary" @click="handleAddRule">
                    添加
                  </magic-button>
                </div>
              </div>

              <div class="rule-tags-container">
                <div v-if="currentBlacklist.length === 0" class="empty-rules">
                  暂无黑名单规则，可通过上方输入框添加
                </div>
                <div
                  v-for="(rule, index) in currentBlacklist"
                  :key="`${rule.type}-${rule.keyword || rule.pattern}-${index}`"
                  class="rule-tag"
                >
                  <span :class="`tag-${rule.type}`" class="tag-badge">
                    {{ RULE_TYPE_LABELS[rule.type] || '包含' }}
                  </span>
                  <span class="tag-text">{{
                    rule.type === RULE_TYPE.REGEX
                      ? rule.flags
                        ? `/${rule.pattern}/${rule.flags}`
                        : rule.pattern
                      : rule.keyword
                  }}</span>
                  <span class="tag-remove" title="删除规则" @click="handleRemoveRule(index)"
                    >✕</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div slot="footer" class="settings-modal-footer">
        <magic-button size="medium" type="text" @click="handleResetDefaults">
          恢复默认配置
        </magic-button>
        <div class="footer-buttons">
          <magic-button size="medium" type="default" @click="handleCancel"> 取消 </magic-button>
          <magic-button size="medium" type="primary" @click="handleConfirm"> 保存 </magic-button>
        </div>
      </div>
    </magic-modal>
  </Teleport>
</template>

<script setup>
import { useConfig } from '@/composables/useConfig';
import { modal } from '@shared/components/modal';
import '@shared/components/tabs';
import '@shared/components/switch';
import '@shared/components/slider';
import '@shared/components/input';
import '@shared/components/select';
import '@shared/components/button';
import '@shared/components/version';
import { toast } from '@shared/components/toast';
import { parseAndValidateRegex } from '@shared/utils';
import {
  DEFAULT_LIVE_CONFIG,
  DEFAULT_VIDEO_CONFIG,
  RULE_TYPE,
  RULE_TYPE_LABELS,
  RULE_TYPE_OPTIONS,
  SCRIPT_VERSION,
} from '../../constants';

const TAB_ITEMS = [
  { label: '视频弹幕', value: 'video' },
  { label: '直播弹幕', value: 'live' },
];

function getRuleContent(rule) {
  return rule.type === RULE_TYPE.REGEX ? rule.pattern : rule.keyword;
}

function hasDuplicateRule(list, type, content) {
  return list.some((r) => r.type === type && getRuleContent(r) === content);
}

function buildRuleItem(type, value) {
  if (type === RULE_TYPE.REGEX) {
    const res = parseAndValidateRegex(value, {
      disallowEmptyMatch: true,
      emptyMatchError: '该正则会匹配空字符，可能导致所有弹幕被屏蔽，请优化表达式',
    });
    if (!res.valid) {
      throw new Error(res.error);
    }
    return {
      type: RULE_TYPE.REGEX,
      pattern: res.pattern,
      ...(res.flags ? { flags: res.flags } : {}),
    };
  }
  return { type, keyword: value };
}

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close', 'update:visible']);

const { config, updateConfig } = useConfig();

const activeTab = ref('video');
const formData = ref(structuredClone(toRaw(config)));
const ruleType = ref(RULE_TYPE.CONTAINS);
const ruleKeyword = ref('');

const currentTabConfig = computed(() => formData.value?.[activeTab.value] || {});

const currentBlacklist = computed(() => {
  return activeTab.value === 'live'
    ? formData.value.live.blacklist
    : formData.value.video.blacklist;
});

watch(
  () => props.visible,
  (val) => {
    if (val) {
      formData.value = structuredClone(toRaw(config));
      ruleKeyword.value = '';
    }
  },
  { immediate: true },
);

const handleAddRule = () => {
  const val = ruleKeyword.value.trim();
  if (!val) {
    toast.warning('请输入规则关键词或正则表达式');
    return;
  }

  const list = currentBlacklist.value;
  const type = ruleType.value;

  if (hasDuplicateRule(list, type, val)) {
    toast.warning('该黑名单规则已存在，请勿重复添加');
    return;
  }

  try {
    const newRule = buildRuleItem(type, val);
    list.push(newRule);
    ruleKeyword.value = '';
    toast.success('已添加黑名单规则');
  } catch (err) {
    toast.error(err.message || '输入的正则表达式格式无效，请检查！');
  }
};

const handleRemoveRule = (index) => {
  currentBlacklist.value.splice(index, 1);
};

const handleExportRules = () => {
  const list = currentBlacklist.value;
  if (!list || list.length === 0) {
    toast.warning('当前黑名单列表为空，无需导出');
    return;
  }

  try {
    const jsonStr = JSON.stringify(list, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const label = activeTab.value === 'live' ? '直播' : '视频';
    a.href = url;
    a.download = `bili-danmaku-blacklist-${activeTab.value}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`已导出 ${list.length} 条${label}黑名单规则`);
  } catch (err) {
    toast.error('导出失败: ' + err.message);
  }
};

function pickJsonFile() {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.addEventListener('cancel', (e) => {
      e.stopPropagation();
      resolve(null);
    });

    input.addEventListener('change', async (event) => {
      const file = event.target?.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      try {
        const text = await file.text();
        resolve(text);
      } catch {
        resolve(null);
      }
    });

    input.click();
  });
}

function parseImportedRules(text, currentScope) {
  let raw;
  try {
    raw = JSON.parse(text);
  } catch {
    return { valid: false, error: '文件解析失败，请确保是合法的 JSON 格式' };
  }

  if (Array.isArray(raw)) {
    return { valid: true, rules: raw };
  }
  if (Array.isArray(raw?.rules)) {
    return { valid: true, rules: raw.rules };
  }
  if (Array.isArray(raw?.[currentScope])) {
    return { valid: true, rules: raw[currentScope] };
  }

  return { valid: false, error: '格式不符：导入内容应为规则数组' };
}

function parseImportRuleItem(item) {
  if (!item || typeof item !== 'object') return null;

  const type = item.type;
  const val = type === RULE_TYPE.REGEX ? item.pattern : item.keyword;
  if (!val || typeof val !== 'string' || !val.trim()) return null;

  try {
    if (type === RULE_TYPE.REGEX) {
      const patternInput = item.flags ? `/${item.pattern}/${item.flags}` : item.pattern;
      return buildRuleItem(RULE_TYPE.REGEX, patternInput);
    }
    if (type === RULE_TYPE.CONTAINS || type === RULE_TYPE.EXACT) {
      return buildRuleItem(type, val.trim());
    }
  } catch {
    return null;
  }

  return null;
}

function mergeImportedRules(rawRules, targetList) {
  let addedCount = 0;
  let skippedCount = 0;
  let invalidCount = 0;

  for (const item of rawRules) {
    const rule = parseImportRuleItem(item);
    if (!rule) {
      invalidCount++;
      continue;
    }

    const content = getRuleContent(rule);
    if (hasDuplicateRule(targetList, rule.type, content)) {
      skippedCount++;
      continue;
    }

    targetList.push(rule);
    addedCount++;
  }

  return { addedCount, skippedCount, invalidCount };
}

function notifyImportSummary({ addedCount, skippedCount, invalidCount }, scope) {
  const label = scope === 'live' ? '直播' : '视频';
  if (addedCount > 0) {
    let msg = `成功导入 ${addedCount} 条${label}黑名单规则`;
    if (skippedCount > 0) msg += `（跳过 ${skippedCount} 条重复）`;
    if (invalidCount > 0) msg += `（忽略 ${invalidCount} 条无效）`;
    toast.success(msg);
    return;
  }

  toast.warning(
    `未新增任何规则${skippedCount > 0 ? `（${skippedCount} 条已存在）` : ''}${
      invalidCount > 0 ? `（${invalidCount} 条无效）` : ''
    }`,
  );
}

const triggerImportRules = async () => {
  const text = await pickJsonFile();
  if (!text) return;

  const res = parseImportedRules(text, activeTab.value);
  if (!res.valid) {
    toast.error(res.error);
    return;
  }

  if (res.rules.length === 0) {
    toast.warning('文件中没有可导入的规则');
    return;
  }

  const summary = mergeImportedRules(res.rules, currentBlacklist.value);
  notifyImportSummary(summary, activeTab.value);
};

const handleSyncToOther = async () => {
  const sourceList = currentBlacklist.value;
  if (!sourceList || sourceList.length === 0) {
    toast.warning('当前黑名单列表为空，无法合并');
    return;
  }

  const isLive = activeTab.value === 'live';
  const targetKey = isLive ? 'video' : 'live';
  const targetList = formData.value[targetKey].blacklist;
  const targetLabel = isLive ? '视频黑名单' : '直播黑名单';
  const sourceLabel = isLive ? '直播黑名单' : '视频黑名单';

  const confirmed = await modal.confirm({
    title: `合并到${targetLabel}`,
    content: `确定要将当前【${sourceLabel}】的 ${sourceList.length} 条规则合并到【${targetLabel}】吗？`,
  });

  if (!confirmed) return;

  let addedCount = 0;
  let skippedCount = 0;

  for (const rule of sourceList) {
    const content = getRuleContent(rule);
    if (hasDuplicateRule(targetList, rule.type, content)) {
      skippedCount++;
    } else {
      targetList.push(structuredClone(toRaw(rule)));
      addedCount++;
    }
  }

  if (addedCount > 0) {
    toast.success(
      `成功合并 ${addedCount} 条规则到【${targetLabel}】${
        skippedCount > 0 ? `（跳过 ${skippedCount} 条重复）` : ''
      }`,
    );
  } else {
    toast.info(`【${targetLabel}】中已包含全部规则，无需重复合并`);
  }
};

const handleResetDefaults = async () => {
  const isLive = activeTab.value === 'live';
  const targetLabel = isLive ? '直播弹幕' : '视频弹幕';
  const confirmed = await modal.confirm({
    title: '恢复默认配置',
    content: `确定要将当前【${targetLabel}】配置恢复为默认初始状态吗？（黑名单规则将保留）`,
  });

  if (confirmed) {
    if (isLive) {
      const preservedBlacklist = formData.value.live.blacklist;
      formData.value.live = {
        ...structuredClone(DEFAULT_LIVE_CONFIG),
        blacklist: preservedBlacklist,
      };
    } else {
      const preservedBlacklist = formData.value.video.blacklist;
      formData.value.video = {
        ...structuredClone(DEFAULT_VIDEO_CONFIG),
        blacklist: preservedBlacklist,
      };
    }
    toast.info(`已恢复${targetLabel}配置为默认值`);
  }
};

const handleCancel = (e) => {
  if (e && e.target && e.target.tagName === 'INPUT') {
    return;
  }
  formData.value = structuredClone(toRaw(config));
  emit('update:visible', false);
  emit('close');
};

const handleConfirm = () => {
  updateConfig(formData.value);
  toast.success('配置已保存');
  emit('update:visible', false);
  emit('close');
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
