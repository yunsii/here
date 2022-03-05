export interface ExtensionConfig {
  /** 唯一标识，需要在 constants 定义枚举后才可注册该 extension */
  key: string;
  shortName: string;
  displayName: string;
  icon: string | JSX.Element;
  keywords?: string[];
  description?: string;
  fixedToTaskBar?: boolean;
  component: React.ComponentType;
}

export default class ExtensionRegistry {
  private extensions: ExtensionConfig[] = [];

  getAll() {
    return this.extensions;
  }

  getFixedToTaskBar() {
    return this.extensions.filter((item) => item.fixedToTaskBar);
  }

  register(extension: ExtensionConfig) {
    if (this.extensions.some((item) => item.key === extension.key)) {
      console.warn(`[ExtensionRegistry]: ${extension.key} registered.`);
      return;
    }
    this.extensions.push(extension);
  }

  get(key: string) {
    return this.extensions.find((item) => item.key === key);
  }
}
