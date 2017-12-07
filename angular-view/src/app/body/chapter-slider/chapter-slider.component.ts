import { Component, AfterViewInit } from '@angular/core';
import { AnimateService } from '../../animate.service';
import { ChapterMiniView } from './chapter-mini.model';
import { ImageViewService } from '../image-view.service';

@Component({
  selector: 'gm-chapter-slider',
  templateUrl: './chapter-slider.component.html',
  styleUrls: ['./chapter-slider.component.css']
})
export class ChapterSliderComponent implements AfterViewInit {

  chaptersViewable = true;
  hideShowButtonTitle = 'Click to hide chapters';
  selectedImageId = 0;

  chapters: ChapterMiniView[] = [];
  constructor(private animate: AnimateService, private imgViewService: ImageViewService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.toggleChapterView();
      this.imgViewService.obtainedChapters.subscribe((chapters) => {
        this.chapters = chapters;
        // Manually trigger Change detection as this event was raised outside of angular
        this.animate.ForceChangeDetection();
      });
      this.imgViewService.selectedImageChanged.subscribe((imageId) => {
        this.selectedImageId = imageId;
        const lister = document.getElementById('lister');
        const selectedItemTop = 30 * this.getSelectedChapterIndex();
        if (lister.scrollTop > selectedItemTop) {
          lister.scrollTop = selectedItemTop;
        } else if (lister.scrollTop + lister.clientHeight - 37 < selectedItemTop) {
          lister.scrollTop = selectedItemTop - lister.clientHeight + 37;
        }
      });
    }, 500);
  }

  setImageId(imageId: number) {
    this.imgViewService.selectedImageChanged.next(imageId);
  }

  private getSelectedChapterIndex(): number {
    const selectedChapter = this.chapters.find(i => i.startId <= this.selectedImageId && i.endId >= this.selectedImageId);
    return this.chapters.indexOf(selectedChapter);
  }

  /**
   * Toggles the chapter view on/off
   */
  toggleChapterView() {
    if (!this.chaptersViewable) {
      this.animate.showChapters();
      this.hideShowButtonTitle = 'Click to hide Chapters';
    } else {
      this.animate.hideChapters();
      this.hideShowButtonTitle = 'Click to show Chapters';
    }
    this.chaptersViewable = !this.chaptersViewable;
  }

}
