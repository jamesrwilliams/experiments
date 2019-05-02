import { Component } from '@angular/core';
import { IpcService } from './ipc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hardflip';

  model = {
    channel: 'fromAngular',
    message: ''
  };

  response = 'The response will go here';

  constructor(private readonly _ipc: IpcService) {

    this._ipc.on('toAngular', (event: Electron.IpcMessageEvent, data) => {

      this.response = data;

    });

  }

  sendMessage() {

    this._ipc.send(this.model.channel, this.model.message);

  }

  get diagnostic() { return this.model; }

}
