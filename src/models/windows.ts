import { makeAutoObservable } from 'mobx';

import Window from './window';

class Windows {
  private state: Window[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  private getMaxOrder() {
    const orders = this.state.map((item) => item.order);
    if (orders.length) {
      return Math.max(...this.state.map((item) => item.order));
    }
    return -1;
  }

  isFocus(window: Window) {
    return !!window && !window.minimized && window.order === this.getMaxOrder();
  }

  /** 当前一个工具只开一个窗口 */
  open(key: string) {
    const targetIndex = this.state.findIndex((item) => item.key === key);
    if (targetIndex >= 0) {
      this.state[targetIndex].active(this.getMaxOrder() + 1);
    } else {
      this.state = [
        new Window({
          key,
          handle: key,
          order: this.getMaxOrder() + 1,
        }),
        ...this.state,
      ];
    }
  }

  close(handle: string) {
    this.state = this.state.filter((item) => item.handle !== handle);
  }

  minimize(handle: string) {
    this.state.find((item) => item.handle === handle)?.minimize();
  }

  map<T>(callback: (item: Window, index: number) => T) {
    return this.state.map(callback);
  }

  filter<T>(callback: (item: Window, index: number) => T) {
    return this.state.filter(callback);
  }

  find<T>(callback: (item: Window, index: number) => T) {
    return this.state.find(callback);
  }

  sort(compareFn?: (a: Window, b: Window) => number) {
    return this.state.slice().sort(compareFn);
  }

  clear() {
    this.state = [];
  }
}

const windows = new Windows();

export default windows;
