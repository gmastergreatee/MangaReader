import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ApiReceiverService } from './api-receiver.service';
import { ImageViewService } from './body/image-view.service';

@Component({
  selector: 'gm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'MangaReader by gmastergreatee';

  constructor(private apiReceiver: ApiReceiverService, private imgViewService: ImageViewService) { }

  ngAfterViewInit(): void {
    this.apiReceiver.InitializeElectronReceiver();
    this.imgViewService.InitializeImageViewService();
  }
}
