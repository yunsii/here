import { makeAutoObservable } from 'mobx';

export default class Window {
  key = '';

  handle = '';

  activated = false;

  minimized = false;

  constructor(key: string, handle: string) {
    makeAutoObservable(this);

    this.key = key;
    this.handle = handle;

    this.active();
  }

  active() {
    this.activated = true;
    this.minimized = false;
  }

  minimize() {
    this.minimized = true;
  }
}
