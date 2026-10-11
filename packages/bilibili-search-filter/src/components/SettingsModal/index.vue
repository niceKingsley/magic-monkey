<template>
  <Teleport to="body">
    <magic-modal
      :visible="visible"
      centered
      width="560px"
      @cancel="handleCancel"
      @close="handleCancel"
      @confirm="handleSave"
    >
      <div slot="header" class="settings-modal-header">
        <span class="settings-modal-title">B站搜索结果过滤设置</span>
        <magic-version :version="SCRIPT_VERSION" />
      </div>

      <div class="settings-container">
        <div class="settings-section">
          <div class="settings-section__title">
            <span>基础过滤设置</span>
          </div>

          <div class="settings-card">
            <div class="settings-item">
              <div class="settings-item__info">
                <div class="settings-item__title">启用搜索卡片过滤</div>
                <div class="settings-item__desc">过滤搜索结果中不匹配关键词的内容</div>
              </div>
              <magic-switch
                :checked="formData.enableListFilter"
                size="small"
                @change="(e) => (formData.enableListFilter = e.detail.value)"
              />
            </div>

            <div class="field-switches">
              <span class="field-label">匹配范围：</span>
              <label class="field-switch-item" :class="{ 'is-disabled': isFieldDisabled('title') }">
                <magic-switch
                  :checked="isFieldActive('title')"
                  :disabled="isFieldDisabled('title')"
                  size="small"
                  @change="(e) => toggleField('title', e.detail.value)"
                />
                <span @click="handleLabelClick('title')">标题</span>
              </label>
              <label
                class="field-switch-item"
                :class="{ 'is-disabled': isFieldDisabled('author') }"
              >
                <magic-switch
                  :checked="isFieldActive('author')"
                  :disabled="isFieldDisabled('author')"
                  size="small"
                  @change="(e) => toggleField('author', e.detail.value)"
                />
                <span @click="handleLabelClick('author')">UP主</span>
              </label>
            </div>
          </div>

          <div class="settings-card">
            <div class="settings-item">
              <div class="settings-item__info">
                <div class="settings-item__title">已过滤卡片半透明</div>
                <div class="settings-item__desc">
                  展开查看已过滤卡片时，将其以半透明效果展示以作区分
                </div>
              </div>
              <magic-switch
                :checked="formData.enableRestoredCardOpacity"
                size="small"
                @change="(e) => (formData.enableRestoredCardOpacity = e.detail.value)"
              />
            </div>
          </div>

          <div class="settings-card">
            <div class="settings-item">
              <div class="settings-item__info">
                <div class="settings-item__title">显示过滤状态栏</div>
                <div class="settings-item__desc">在搜索结果列表上方展示过滤卡片统计设置</div>
              </div>
              <magic-switch
                :checked="formData.showFilterBar"
                size="small"
                @change="(e) => (formData.showFilterBar = e.detail.value)"
              />
            </div>
          </div>

          <div class="settings-card">
            <div class="settings-item">
              <div class="settings-item__info">
                <div class="settings-item__title">自动展开更多筛选</div>
                <div class="settings-item__desc">页面进来自动打开筛选面板</div>
              </div>
              <magic-switch
                :checked="formData.autoExpandMoreFilter"
                size="small"
                @change="(e) => (formData.autoExpandMoreFilter = e.detail.value)"
              />
            </div>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section__title">
            <span>关键词白名单</span>
          </div>

          <div class="settings-card">
            <div class="whitelist-header">
              <div class="whitelist-title-wrap">
                <span>放行白名单</span>
                <span class="whitelist-count">{{ formData.whitelistKeywords.length }}</span>
              </div>
              <button class="btn-link" type="button" @click="toggleBulkMode">
                {{ isBulkMode ? '返回标签' : '批量编辑' }}
              </button>
            </div>

            <div v-if="!isBulkMode" class="whitelist-tags-wrap">
              <div v-if="formData.whitelistKeywords.length === 0" class="empty-tip">
                暂无白名单关键词，当搜索词命中白名单时将直接放行全部卡片
              </div>
              <div
                v-for="(kw, idx) in formData.whitelistKeywords"
                :key="`${kw}-${idx}`"
                class="whitelist-tag"
              >
                <span>{{ kw }}</span>
                <span class="tag-remove" title="删除" @click="removeKeyword(idx)">✕</span>
              </div>
            </div>

            <div v-if="!isBulkMode" class="whitelist-input-row">
              <magic-input
                :value="newKeyword"
                block
                clearable
                placeholder="输入白名单关键词，按回车添加..."
                size="small"
                @input="(e) => (newKeyword = e.detail.value)"
                @keydown.enter="addKeyword"
              />
              <magic-button size="small" type="primary" @click="addKeyword"> 添加 </magic-button>
            </div>

            <div v-else class="whitelist-bulk-wrap">
              <magic-textarea
                :value="bulkText"
                block
                placeholder="输入关键词，使用分号(;)分隔..."
                rows="4"
                size="small"
                @input="(e) => (bulkText = e.detail.value)"
              />
              <div class="whitelist-bulk-actions">
                <span class="whitelist-bulk-tip">使用分号 (;) 分隔关键词</span>
                <magic-button size="small" type="primary" @click="confirmBulkMode">
                  确认转换
                </magic-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div slot="footer" class="settings-modal-footer">
        <magic-button size="medium" type="text" @click="handleReset"> 恢复默认 </magic-button>
        <div class="footer-right">
          <magic-button size="medium" type="default" @click="handleCancel"> 取消 </magic-button>
          <magic-button size="medium" type="primary" @click="handleSave"> 保存 </magic-button>
        </div>
      </div>
    </magic-modal>
  </Teleport>
</template>

<script setup>
import '@shared/components/button';
import '@shared/components/input';
import { modal } from '@shared/components/modal';
import '@shared/components/switch';
import '@shared/components/textarea';
import { toast } from '@shared/components/toast';
import '@shared/components/version';
import { DEFAULT_CONFIG, SCRIPT_VERSION } from '../../constants';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  config: {
    type: Object,
    default: () => ({ ...DEFAULT_CONFIG }),
  },
});

const emit = defineEmits(['close', 'update:visible', 'saved']);

const formData = ref(structuredClone(toRaw(props.config)));
const isBulkMode = ref(false);
const bulkText = ref('');
const newKeyword = ref('');

function isFieldActive(field) {
  return formData.value.filterFields.includes(field);
}

function isFieldDisabled(field) {
  return isFieldActive(field) && formData.value.filterFields.length <= 1;
}

function handleLabelClick(field) {
  if (isFieldDisabled(field)) return;
  toggleField(field, !isFieldActive(field));
}

function toggleField(field, enabled) {
  if (!enabled && isFieldDisabled(field)) {
    return;
  }
  const set = new Set(formData.value.filterFields);
  if (enabled) {
    set.add(field);
  } else {
    set.delete(field);
  }
  if (set.size > 0) {
    formData.value.filterFields = Array.from(set);
  }
}

function parseBulkKeywords(text) {
  return Array.from(
    new Set(
      text
        .split(/[;；\n]+/)
        .map((k) => k.trim())
        .filter(Boolean),
    ),
  );
}

function addKeyword() {
  const keywords = parseBulkKeywords(newKeyword.value);
  if (keywords.length === 0) return;

  const existing = new Set(formData.value.whitelistKeywords);
  let addedCount = 0;
  for (const kw of keywords) {
    if (!existing.has(kw)) {
      formData.value.whitelistKeywords.push(kw);
      existing.add(kw);
      addedCount += 1;
    }
  }

  if (addedCount === 0) {
    toast.warning('关键词已存在于白名单中');
    return;
  }
  newKeyword.value = '';
}

function removeKeyword(index) {
  formData.value.whitelistKeywords.splice(index, 1);
}

function toggleBulkMode() {
  if (isBulkMode.value) {
    isBulkMode.value = false;
  } else {
    bulkText.value = formData.value.whitelistKeywords.join('; ');
    isBulkMode.value = true;
  }
}

function confirmBulkMode() {
  const parsed = parseBulkKeywords(bulkText.value);
  formData.value.whitelistKeywords = parsed;
  isBulkMode.value = false;
  toast.success(`已更新白名单，共 ${parsed.length} 个关键词`);
}

async function handleReset() {
  const confirmed = await modal.confirm({
    title: '恢复默认设置',
    content: '确定要将表单恢复为默认设置吗？',
  });
  if (!confirmed) return;

  formData.value = structuredClone(DEFAULT_CONFIG);
  isBulkMode.value = false;
  newKeyword.value = '';
  toast.success('已恢复为默认配置，点击保存后生效');
}

function handleCancel() {
  formData.value = structuredClone(toRaw(props.config));
  isBulkMode.value = false;
  newKeyword.value = '';
  emit('update:visible', false);
  emit('close');
}

function handleSave() {
  if (!formData.value.filterFields || formData.value.filterFields.length === 0) {
    toast.warning('至少需要选择一个匹配范围');
    return;
  }

  if (isBulkMode.value) {
    formData.value.whitelistKeywords = parseBulkKeywords(bulkText.value);
    isBulkMode.value = false;
  }

  emit('saved', formData.value);
  toast.success('配置已保存');
  emit('update:visible', false);
  emit('close');
}

watch(
  () => props.visible,
  (val) => {
    if (val) {
      formData.value = structuredClone(toRaw(props.config));
      isBulkMode.value = false;
      newKeyword.value = '';
    }
  },
);
</script>

<style lang="scss" scoped src="./style.scss"></style>
