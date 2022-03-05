import ExtensionRegistry from './ExtensionRegistry';

export default class Registry {
  static extension = new ExtensionRegistry();

  static reinitialize = () => {
    Registry.extension = new ExtensionRegistry();
  };
}
