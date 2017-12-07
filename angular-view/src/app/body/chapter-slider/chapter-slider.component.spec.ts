import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterSliderComponent } from './chapter-slider.component';

describe('ChapterSliderComponent', () => {
  let component: ChapterSliderComponent;
  let fixture: ComponentFixture<ChapterSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
