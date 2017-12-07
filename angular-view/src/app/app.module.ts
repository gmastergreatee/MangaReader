import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DirectoryService } from './directory.service';
import { ApiSenderService } from './api-sender.service';
import { ApiReceiverService } from './api-receiver.service';
import { BodyComponent } from './body/body.component';
import { ChapterSliderComponent } from './body/chapter-slider/chapter-slider.component';
import { PhotoViewComponent } from './body/photo-view/photo-view.component';
import { AnimateService } from './animate.service';
import { ImageViewService } from './body/image-view.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    ChapterSliderComponent,
    PhotoViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ApiReceiverService,
    ApiSenderService,
    DirectoryService,
    AnimateService,
    ImageViewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
