import { Injectable } from '@angular/core';
import { Chapter } from '../models/chapter.model';
import { ApiReceiverService } from '../api-receiver.service';
import { ChapterMiniView } from './chapter-slider/chapter-mini.model';
import { Subject } from 'rxjs/Subject';
import { ImageItem } from './image-item.model';

@Injectable()
export class ImageViewService {
    chapterList: Chapter[] = [];
    imageList: ImageItem[] = [];
    isHeightMode = true;

    /**
     * Event delegate to be triggered whenever the selected image is changed
     */
    selectedImageChanged: Subject<number>;
    /**
     * Event delegate to be triggered whenever the app sends a chapterList
     */
    obtainedChapters: Subject<ChapterMiniView[]>;

    constructor(private apiReceive: ApiReceiverService) {
        this.obtainedChapters = new Subject<ChapterMiniView[]>();
        this.selectedImageChanged = new Subject<number>();

        this.imageList = new Array<ImageItem>();
        this.chapterList = new Array<Chapter>();
    }

    InitializeImageViewService() {
        /**
         * Change chapterList on obtaining from the app
         */
        this.apiReceive.obtainedChapterList.subscribe((chapterList: Chapter[]) => {
            this.chapterList = chapterList;
            this.prepareImagesForDisplay();
            this.obtainedChapters.next(this.getMiniChapterList());
            this.selectedImageChanged.next(1);
        });
    }

    /**
     * Allots IDs to the image-List & prepares the view to display them
     */
    private prepareImagesForDisplay() {
        this.imageList = new Array<ImageItem>();
        let indexer = 1;

        this.chapterList.forEach(chapter => {

            chapter.firstImageId = indexer;
            chapter.imageList.forEach(location => {
                this.imageList.push(new ImageItem(location, indexer));
                indexer += 1;
            });
            chapter.lastImageId = indexer - 1;
        });
    }

    /**
     * Gets the chapter-mini array for displaying in the chapter slider
     */
    private getMiniChapterList(): ChapterMiniView[] {
        const chapMiniView = new Array<ChapterMiniView>();

        this.chapterList.forEach(chapter => {
            chapMiniView.push(new ChapterMiniView(chapter.Name, chapter.Id, chapter.firstImageId, chapter.lastImageId));
        });
        return chapMiniView;
    }

    setImageViewMode(isHeightMode: boolean) {
        this.isHeightMode = isHeightMode;
    }
}
