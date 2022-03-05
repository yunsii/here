import { makeAutoObservable } from 'mobx';

export default class Window {
  key = '';

  handle = '';

  active = false;

  minimized = false;

  constructor(key: string, handle: string) {
    makeAutoObservable(this);

    this.key = key;
    this.handle = handle;

    this.open();
  }

  open() {
    this.active = true;
    this.minimized = false;
  }

  close() {
    this.active = false;
  }

  minimize() {
    this.minimized = true;
  }
}
