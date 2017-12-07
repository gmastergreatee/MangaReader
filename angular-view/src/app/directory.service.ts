import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DirectoryService {

    public valueChanged: Subject<string>;

    private directory: string = null;

    constructor() {
        this.valueChanged = new Subject<string>();
    }

    setDirectory(newDirectory: string) {
        if (this.directory !== newDirectory) {
            this.directory = newDirectory;
            this.valueChanged.next(newDirectory);
        }
    }

    getName(): string {
        if (this.directory) {
            return this.directory.slice(this.directory.lastIndexOf('\\') + 1);
        } else {
            return '';
        }
    }
}
