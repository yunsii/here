import Registry from './registry';

import type { ExtensionConfig } from './registry/ExtensionRegistry';

export type { ExtensionConfig };

export function defineExtension(config: ExtensionConfig) {
  Registry.extension.register(config);
}
