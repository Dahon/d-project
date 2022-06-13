import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import {VideoRecordingService} from '@app/video-me/video-recording.service';
import {VideomeService} from '@app/video-me/videome.service';
import {AudioRecordingService} from '@app/video-me/audio-recording.service';
import {AccountService} from "@app/_services";

@Component({
  selector: 'app-video-me',
  templateUrl: './video-me.component.html',
  styleUrls: ['./video-me.component.less']
})
export class VideoMeComponent implements OnInit {

  @ViewChild('videoElement') videoElement: any;
  timeClass = 'default';
  video: any;
  isPlaying = false;
  displayControls = true;
  isAudioRecording = false;
  isVideoRecording = false;
  audioRecordedTime;
  videoRecordedTime = '00';
  audioBlobUrl;
  videoBlobUrl;
  audioBlob;
  videoBlob;
  audioName;
  videoName;
  audioStream;
  videoStream: MediaStream;
  audioConf = { audio: true, echoCancellation:true}
  videoConf = { video: { facingMode:"user", width: 320 }, audio: true}
  questionControl: FormControl = new FormControl({ value: '', disabled: true });

  question: any[] = [
    {
      value: 'lorem ipsum 1',
      isFinish: false
    },
    {
      value: 'Lorem ipsum 2',
      isFinish: false
    },
    {
      value: 'lorem ipsum 3',
      isFinish: false
    },
    {
      value: 'lorem ipsum 4',
      isFinish: true
    }
  ];

  number = 0;
  selectedQuestion;

  constructor(
    private ref: ChangeDetectorRef,
    private audioRecordingService: AudioRecordingService,
    private videoRecordingService: VideoRecordingService,
    private sanitizer: DomSanitizer,
    private videomeService: VideomeService,
    private accountService: AccountService,
  ) {

    this.videoRecordingService.recordingFailed().subscribe(() => {
      this.isVideoRecording = false;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedTime().subscribe((time) => {
      if (Math.floor(parseInt(time)) >= 60 && Math.floor(parseInt(time)) <= 90) {
        this.timeClass = 'validTime';
      } else {
        this.timeClass = '';
      }
      this.videoRecordedTime = time;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getStream().subscribe((stream) => {
      this.videoStream = stream;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedBlob().subscribe((data) => {
      this.videoBlob = data.blob;
      this.videoName = data.title;
      const formData = new FormData();
      formData.append('video/webm', data.blob, data.title);
      this.videomeService.postLoad(this.accountService.userValue.id, formData).subscribe(res => {
        console.log('res', res);
      });
      this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);
      this.ref.detectChanges();
    });

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isAudioRecording = false;
      this.ref.detectChanges();
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.audioRecordedTime = time;
      this.ref.detectChanges();
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.audioBlob = data.blob;
      this.audioName = data.title;
      this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.ref.detectChanges();
    });
  }

  ngOnInit() {
    // this.questionControl.setValue(this.question[0].value);
    // this.selectedQuestion = this.question[this.number];


  }

  ngAfterViewInit() {
    console.log('123123', this.videoBlobUrl);
    this.video = this.videoElement.nativeElement;
    // this.videomeService.getVideo().subscribe((res: any) => {
    //   // WSthis.video.srcObject = res.video.fileUrl;
    //   this.video = this.videoElement.nativeElement;
    //
    //   this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(res.video.fileUrl);
    //   this.video.src = this.videoBlobUrl;
    //   console.log('res', res);
    // })
  }

  startVideoRecording() {
    // this.video = this.videoElement.nativeElement;
    console.log('test', this.isVideoRecording);
    if (!this.isVideoRecording) {
      this.video.controls = false;
      this.isVideoRecording = true;
      this.video.muted = true;
      this.onNextQuestion();
      this.videoRecordingService.startRecording(this.videoConf)
        .then(stream => {
          // this.video.src = window.URL.createObjectURL(stream);
          this.video.srcObject = stream;
          this.video.play();
        })
        .catch(function (err) {
          console.log(err.name + ": " + err.message);
        });
    }
  }

  abortVideoRecording() {
    if (this.isVideoRecording) {
      this.isVideoRecording = false;
      this.videoRecordingService.abortRecording();
      this.ref.detectChanges();
    }
  }

  stopVideoRecording() {
    if (this.isVideoRecording) {
      this.videoRecordingService.stopRecording();
      console.log('this.videoBlobUrl', this.videoBlobUrl);
      this.video.srcObject = this.videoBlobUrl;
      this.isVideoRecording = false;
      this.video.controls = true;
      this.video.muted = false;
      console.log('111', this.video);
      // this.downloadVideoRecordedData();
    }
  }

  TestBed() {
    // this.stopVideoRecording();
    this.abortVideoRecording();
    this.clearVideoRecordedData();
  }

  onNextQuestion() {
    if (this.selectedQuestion && this.selectedQuestion.isFinish) {
      this.number = 0;
      this.questionControl.reset();
      this.stopVideoRecording();
      this.selectedQuestion = this.question[this.number];
      const blob = new Blob([this.videoBlob], { type: 'video/webm' });
      const url = window.URL.createObjectURL(blob);
      console.log('url', url);
      // const formData = new FormData();
      // formData.append('video/webm', url, this.videoName);
      // // formData.append('duration', '25');
      // // formData.append('video/webm', [blob], filename+ '.' + blob.type.split('/')[1]);
      // // formData.append(type, filename);
      // // formData.append(type + '-blob', blob, filename);
      //
      // this.videomeService.postLoad(this.accountService.userValue.id, formData).subscribe(res => {
      //   console.log('res', res);
      // });
      // this.downloadVideoRecordedData();
      return;
    }
    this.selectedQuestion = this.question[this.number];
    this.questionControl.setValue(this.selectedQuestion.value);
    this.number += 1;
  }

  clearVideoRecordedData() {
    console.log('clearVideoRecordedData', this.isVideoRecording);
    if (this.isVideoRecording) {
      this.stopVideoRecording();
      this.isVideoRecording = false;
    }
    this.videoRecordedTime = '00';
    this.number = 0;
    this.videoBlobUrl = null;
    this.video.srcObject = null;
    this.video.controls = false;
    this.ref.detectChanges();
  }

  downloadVideoRecordedData() {
    this._downloadFile(this.videoBlob, 'video/webm', this.videoName);
  }

  startAudioRecording() {
    if (!this.isAudioRecording) {
      this.isAudioRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortAudioRecording() {
    if (this.isAudioRecording) {
      this.isAudioRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopAudioRecording() {
    if (this.isAudioRecording) {
      this.audioRecordingService.stopRecording();
      this.isAudioRecording = false;
    }
  }

  clearAudioRecordedData() {
    this.audioBlobUrl = null;
  }

  downloadAudioRecordedData() {
    this._downloadFile(this.audioBlob, 'audio/mp3', this.audioName);
  }

  ngOnDestroy(): void {
    this.abortAudioRecording();
  }

  _downloadFile(data: any, type: string, filename: string): any {
    console.log('data', data);

    const blob = new Blob([data], { type: type });
    console.log('blob', blob);
    const url = window.URL.createObjectURL(blob);

    const formData = new FormData();
    formData.append('video.webm', data, filename);
    // formData.append('duration', '25');
    // formData.append('video/webm', blob, filename + '.' + blob.type.split('/')[1]);
    // formData.append(type, filename);
    // formData.append(type + '-blob', blob, filename);

    console.log('formData', formData);


    // this.videomeService.postLoad(25, formData).subscribe(res => {
    //   console.log('res', res);
    // });
    //this.video.srcObject = stream;
    //const url = data;
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
  fileToUpload: File | null = null;

  onloadPoster(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log('adsad', this.fileToUpload);
    this.videomeService.onloadPost(this.fileToUpload).subscribe(res => {
      console.log('res', res);
    })
  }

}
