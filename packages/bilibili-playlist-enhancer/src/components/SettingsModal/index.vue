<template>
  <Teleport to="body">
    <magic-modal
      :visible="visible"
      centered
      width="640px"
      @cancel="handleCancel"
      @close="handleCancel"
      @confirm="handleConfirm"
    >
      <div slot="header" class="settings-modal-header">
        <span class="settings-modal-title">{{ modalTitle }}</span>
        <magic-version :version="SCRIPT_VERSION" />
      </div>
      <div class="settings-container">
        <!-- 自动切集规则 -->
        <div class="settings-section">
          <div class="settings-section__title">
            <SvgIcon class="section-icon" name="play" />
            <span>自动切集</span>
          </div>

          <div class="settings-card">
            <div class="settings-item">
              <div class="settings-item__info">
                <div class="settings-item__title">自动连播下一个视频</div>
                <div class="settings-item__desc">当前视频或分 P 播放完毕后，自动连播下一个视频</div>
              </div>
              <div class="settings-item__action">
                <magic-switch
                  :checked="formData.autoPlayNext"
                  size="small"
                  @change="(e) => handleChange('autoPlayNext', e)"
                />
              </div>
            </div>

            <div class="settings-item">
              <div class="settings-item__info">
                <div class="settings-item__title">随机播放模式</div>
                <div class="settings-item__desc">
                  切集与自动连播时随机抽取未播放视频播放（音乐爱好者）
                </div>
              </div>
              <div class="settings-item__action">
                <magic-switch
                  :checked="formData.shuffle"
                  size="small"
                  @change="(e) => handleChange('shuffle', e)"
                />
              </div>
            </div>

            <div class="settings-item">
              <div class="settings-item__info">
                <div class="settings-item__title">随机播放范围</div>
                <div class="settings-item__desc">选择随机抽取的视频范围</div>
              </div>
              <div class="settings-item__action">
                <magic-radio-group
                  :value="formData.shuffleScope"
                  size="small"
                  @change="(e) => handleChange('shuffleScope', e)"
                >
                  <magic-radio
                    v-for="opt in SHUFFLE_SCOPE_OPTIONS"
                    :key="opt.value"
                    :label="opt.label"
                    :value="opt.value"
                  />
                </magic-radio-group>
              </div>
            </div>

            <div class="settings-item">
              <div class="settings-item__info">
                <div class="settings-item__title">当前视频分 P 播完即停止</div>
                <div class="settings-item__desc">
                  多 P 视频播完最后一个分 P 后，停止连播至合集的下一个视频
                </div>
              </div>
              <div class="settings-item__action">
                <magic-switch
                  :checked="formData.stopOnGroupEnd"
                  size="small"
                  @change="(e) => handleChange('stopOnGroupEnd', e)"
                />
              </div>
            </div>

            <div class="settings-item">
              <div class="settings-item__info">
                <div class="settings-item__title">上一集快捷键</div>
                <div class="settings-item__desc">点击按键录制自定义键位</div>
              </div>
              <div class="settings-item__action">
                <button
                  :class="{ 'is-recording': recordingField === 'hotkeyPrev' }"
                  class="hotkey-badge"
                  type="button"
                  @click="startRecording('hotkeyPrev')"
                  @keydown.stop.prevent="(e) => handleRecordKey('hotkeyPrev', e)"
                >
                  {{
                    recordingField === 'hotkeyPrev'
                      ? '请按按键...'
                      : formData.hotkeyPrev || '未设置'
                  }}
                </button>
              </div>
            </div>

            <div class="settings-item">
              <div class="settings-item__info">
                <div class="settings-item__title">下一集快捷键</div>
                <div class="settings-item__desc">点击按键录制自定义键位</div>
              </div>
              <div class="settings-item__action">
                <button
                  :class="{ 'is-recording': recordingField === 'hotkeyNext' }"
                  class="hotkey-badge"
                  type="button"
                  @click="startRecording('hotkeyNext')"
                  @keydown.stop.prevent="(e) => handleRecordKey('hotkeyNext', e)"
                >
                  {{
                    recordingField === 'hotkeyNext'
                      ? '请按按键...'
                      : formData.hotkeyNext || '未设置'
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section__title">
            <SvgIcon class="section-icon" name="list" />
            <span>界面交互</span>
          </div>

          <div class="settings-card">
            <div class="settings-item">
              <div class="settings-item__info">
                <div class="settings-item__title">切集自动定位高亮位置</div>
                <div class="settings-item__desc">
                  手动点击切集时，自动平滑滚动列表并将当前播放项居中
                </div>
              </div>
              <div class="settings-item__action">
                <magic-switch
                  :checked="formData.scrollActiveOnClick"
                  size="small"
                  @change="(e) => handleChange('scrollActiveOnClick', e)"
                />
              </div>
            </div>

            <div class="settings-item">
              <div class="settings-item__info">
                <div class="settings-item__title">排序切换自动定位高亮位置</div>
                <div class="settings-item__desc">
                  切换排序方式时自动定位到当前播放项；关闭时自动回到顶部
                </div>
              </div>
              <div class="settings-item__action">
                <magic-switch
                  :checked="formData.scrollToActiveOnSort"
                  size="small"
                  @change="(e) => handleChange('scrollToActiveOnSort', e)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div slot="footer" class="settings-modal-footer">
        <magic-button size="medium" type="text" @click="handleResetDefaults">
          恢复默认设置
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
import { toast } from '@shared/components/toast';
import '@shared/components/modal';
import '@shared/components/switch';
import '@shared/components/radio';
import '@shared/components/button';
import '@shared/components/version';
import {
  DEFAULT_SETTINGS,
  PROJECT_NAME,
  SCRIPT_VERSION,
  SHUFFLE_SCOPE_OPTIONS,
} from '@/constants.js';
import { useSettings } from '@/composables/useSettings.js';
import { formatKeyboardKey } from '@/composables/usePodHotkeys.js';
import SvgIcon from '../SvgIcon';

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

const modalTitle = computed(() => props.title || PROJECT_NAME);

const emit = defineEmits(['close', 'update:visible']);

const { settings, updateSettings } = useSettings();
const formData = ref({ ...settings });
const recordingField = ref('');

watch(
  () => props.visible,
  (val) => {
    if (val) {
      formData.value = { ...settings };
      recordingField.value = '';
    }
  },
  { immediate: true },
);

const startRecording = (field) => {
  recordingField.value = field;
};

const handleRecordKey = (field, event) => {
  if (event.key === 'Escape') {
    recordingField.value = '';
    return;
  }

  const keyString = formatKeyboardKey(event);
  if (!keyString) return;

  formData.value[field] = keyString;
  recordingField.value = '';
  toast.success(`已设置快捷键为: ${keyString}`);
};

const handleChange = (key, event) => {
  formData.value[key] = event.detail.value;
};

const handleResetDefaults = () => {
  formData.value = { ...DEFAULT_SETTINGS };
  recordingField.value = '';
  toast.info('已恢复为默认设置');
};

const handleCancel = () => {
  formData.value = { ...settings };
  recordingField.value = '';
  emit('update:visible', false);
  emit('close');
};

const handleConfirm = () => {
  updateSettings(formData.value);
  toast.success('设置保存成功');
  emit('update:visible', false);
  emit('close');
};
</script>

<style lang="scss" scoped src="./style.scss"></style>
