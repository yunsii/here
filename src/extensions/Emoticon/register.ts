import emoticonPng from '@/assets/icons/smiling.png';

import { defineExtension } from '../core';

import component from './component';

defineExtension({
  key: 'emoticon',
  shortName: '表情符号',
  displayName: '表情符号 - emoji 颜文字面板',
  icon: emoticonPng,
  fixedToTaskBar: true,
  component,
});
