import base64Png from '@/assets/icons/base64.png';

import { defineExtension } from '../core';

import component from './component';

defineExtension({
  key: 'base64',
  shortName: 'Base64',
  displayName: 'Base64 Encode and Decode',
  icon: base64Png,
  fixedToTaskBar: true,
  component,
});
