import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  private _ipc: IpcRenderer | undefined;

  private nonElectronMessage = 'Electron\'s IPC was not loaded';

  constructor() {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn(this.nonElectronMessage);
    }
  }

  public on(channel: string, listener: Function): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.on(channel, listener);
  }

  public send(channel: string, ...args): void {
    if (!this._ipc) {
      console.warn('Cannot send message. ' + this.nonElectronMessage);
      return;
    }
    this._ipc.send(channel, ...args);
  }
}
