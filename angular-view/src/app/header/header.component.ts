import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DirectoryService } from '../directory.service';
import { ApiSenderService } from '../api-sender.service';
import { ImageViewService } from '../body/image-view.service';
import { ChapterMiniView } from '../body/chapter-slider/chapter-mini.model';
import { AnimateService } from '../animate.service';

@Component({
  selector: 'gm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  element: HTMLElement;
  tooltip = 'Click to select folder for the Manga you want to read';
  header = '';
  tempHeader = '';
  miniChaps: ChapterMiniView[];
  isHeightMode = true;

  constructor(private dirService: DirectoryService,
    private apiSendService: ApiSenderService,
    private imgViewService: ImageViewService,
    private animateService: AnimateService) {
    this.miniChaps = new Array<ChapterMiniView>();
    dirService.valueChanged.subscribe((e) => this.directoryChanged(e));
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.element = document.getElementById('sel-folder');
    this.element.addEventListener('change', (el: any) => {
      if (el.target.files[0] != null) {
        this.dirService.setDirectory(el.target.files[0].path);
      }
    });

    setTimeout(() => {
      this.imgViewService.obtainedChapters.subscribe((miniChaps) => {
        this.miniChaps = miniChaps;
      });
      this.imgViewService.selectedImageChanged.subscribe((imageId) => {
        const tempChap = this.miniChaps.find(i => i.startId <= imageId && i.endId >= imageId);
        if (tempChap) {
          this.header = this.tempHeader + ' -> ' + tempChap.getChapterName();
        }
      });
    }, 1500);
    this.animateService.setHeightMode();
  }

  directoryChanged(newDir: string) {

    // auto-trim functionality of the header(pipe may also be used instead)
    this.tempHeader = this.dirService.getName();
    if (this.tempHeader.length > 40) {
      this.header = this.tempHeader.substring(0, 44) + '...';
    } else {
      this.header = this.tempHeader;
    }
    this.apiSendService.sendDirectoryChanged(newDir);
  }

  selectFolder() {
    this.element.click();
  }

  toggleFullscreen() {
    this.apiSendService.sendToggleFullscreen();
  }

  toggleWidthHeight() {
    if (this.miniChaps.length > 0) {
      if (this.isHeightMode) {
        this.animateService.setWidthMode();
        this.isHeightMode = false;
      } else {
        this.animateService.setHeightMode();
        this.isHeightMode = true;
      }
      this.imgViewService.setImageViewMode(this.isHeightMode);
    }
  }
}
