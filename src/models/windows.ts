import { makeAutoObservable } from 'mobx';

import Window from './window';

class Windows {
  private state: Window[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  /** 当前一个工具只开一个窗口 */
  open(key: string) {
    const index = this.state.findIndex((item) => item.key === key);
    if (index >= 0) {
      this.state[index].active();
    } else {
      this.state = [new Window(key, key), ...this.state];
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

  clear() {
    this.state = [];
  }
}

const windows = new Windows();

export default windows;
