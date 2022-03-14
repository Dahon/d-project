import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMeComponent } from './video-me.component';

describe('VideoMeComponent', () => {
  let component: VideoMeComponent;
  let fixture: ComponentFixture<VideoMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
