import { Injectable } from '@angular/core';
import { Chapter } from './models/chapter.model';
import { Subject } from 'rxjs/Subject';
declare var ipcRenderer: any;

@Injectable()
export class ApiReceiverService {
    obtainedChapterList: Subject<Chapter[]>;
    constructor() {
        this.obtainedChapterList = new Subject<Chapter[]>();
    }

    InitializeElectronReceiver() {
        /**
         * Obtained chapter list from the app
         */
        ipcRenderer.on('app:directory:chapterList', (event: any, chapterList: any[]) => {

            let chapList = new Array<Chapter>();

            chapList = chapterList.map((value: any, index: number, array: any[]) => {
                return new Chapter(value.Name, value.Id, value.imageList);
            });

            chapList = chapList.sort((a, b): number => {
                if (a.Name.length > 4 && b.Name.length > 4) {
                    if (a.Name > b.Name) {
                        return 1;
                    }
                    return -1;
                }

                if (a.Name.length > b.Name.length) {
                    return 1;
                } else if (a.Name.length < b.Name.length) {
                    return -1;
                }

                if (a.Name > b.Name) {
                    return 1;
                }
                return -1;
            });

            chapList.forEach(chapter => {
                chapter.imageList.sort((a, b) => {

                    const str1 = a.substr(a.lastIndexOf('\\') + 1, a.lastIndexOf('.'));
                    const str2 = b.substr(b.lastIndexOf('\\') + 1, b.lastIndexOf('.'));
                    if (str1.length > 3 && str2.length > 3) {
                        if (str1 > str2) {
                            return 1;
                        }
                        return -1;
                    }

                    if (str1.length > str2.length) {
                        return 1;
                    } else if (str1.length < str2.length) {
                        return -1;
                    }

                    if (str1 > str2) {
                        return 1;
                    }
                    return -1;
                });
            });

            this.obtainedChapterList.next(chapList);
        });

        /**
         * Receives any error event occurred in the app
         */
        ipcRenderer.on('app:error', (event: any, error: any) => {
            console.log(error);
        });
    }
}
