import { makeAutoObservable } from 'mobx';

export interface InitOptions {
  key: string;
  handle: string;
  order: number;
}

export default class Window {
  key = '';

  handle = '';

  minimized = false;

  order = 0;

  constructor(options: InitOptions) {
    makeAutoObservable(this);

    this.key = options.key;
    this.handle = options.handle;
    this.order = options.order;
  }

  active(order: number) {
    this.minimized = false;
    this.order = order;
  }

  minimize() {
    this.minimized = true;
  }
}
