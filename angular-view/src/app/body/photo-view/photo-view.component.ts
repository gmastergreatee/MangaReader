import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnimateService } from '../../animate.service';
import { ImageViewService } from '../image-view.service';
import { ImageItem } from '../image-item.model';

@Component({
  selector: 'gm-photo-view',
  templateUrl: './photo-view.component.html',
  styleUrls: ['./photo-view.component.css']
})
export class PhotoViewComponent implements AfterViewInit {
  imageList: ImageItem[];
  selectedImage = '';
  currentImageIndex = 0;
  enabledKeyboardNavigation = false;

  expanded = false;
  constructor(private animate: AnimateService, public imgViewService: ImageViewService) {
    this.imageList = new Array<ImageItem>();
  }

  ngAfterViewInit(): void {
    this.imgViewService.obtainedChapters.subscribe((chMiniView) => {
      this.imageList = this.imgViewService.imageList;

      if (!this.enabledKeyboardNavigation) {
        this.enabledKeyboardNavigation = true;
        document.addEventListener('keyup', (event) => {
          if (event.which === 37) {
            if (this.currentImageIndex > 1) {
              this.imgViewService.selectedImageChanged.next(this.currentImageIndex - 1);
              document.getElementById('img-view').scrollTop = 99999999;
            }
          } else if (event.which === 39) {
            if (this.currentImageIndex < this.imageList.length) {
              this.imgViewService.selectedImageChanged.next(this.currentImageIndex + 1);
              document.getElementById('img-view').scrollTop = 0;
            }
          }
          this.animate.ForceChangeDetection();
        });
      }
    });

    this.imgViewService.selectedImageChanged.subscribe((imageId) => {
      const tempImageItm = this.imageList.find(i => i.Id === imageId);
      if (tempImageItm) {
        this.selectedImage = tempImageItm.location;
        this.currentImageIndex = imageId;
      } else {
        this.selectedImage = this.imageList[this.imageList.length - 1].location;
        this.currentImageIndex = this.imageList.length - 1;
      }
    });
  }

  doNothing() { }
}
