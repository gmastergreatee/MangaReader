import { Injectable } from '@angular/core';
import { DirectoryService } from './directory.service';
declare var ipcRenderer: any;

@Injectable()
export class ApiSenderService {
    constructor(private dirService: DirectoryService) { }

    sendToggleFullscreen() {
        ipcRenderer.send('app:fullscreen:toggle');
    }

    sendDirectoryChanged(newDirectory: string) {
        ipcRenderer.send('app:directory:changed', newDirectory);
    }
}
