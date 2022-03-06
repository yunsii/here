import base64Png from '@/assets/icons/base64.png';

import { defineExtension } from '../core';

import component from './component';

defineExtension({
  key: 'base64',
  shortName: 'Base64',
  displayName: 'Base64 编解码',
  icon: base64Png,
  fixedToTaskBar: true,
  component,
});
