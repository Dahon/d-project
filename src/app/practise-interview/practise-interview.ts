import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import {AudioRecordingService} from '@app/video-me/audio-recording.service';
import {VideoRecordingService} from '@app/video-me/video-recording.service';
import {VideomeService} from '@app/video-me/videome.service';
interface DropdownOption {
  label: string;
  value: number | string;
}
@Component({
  selector: 'app-practise-interview',
  templateUrl: './practise-interview.html',
  styleUrls: ['./practise-interview.scss']
})
export class PractiseInterviewComponent implements OnInit, AfterViewInit {

  @ViewChild('videoElement') videoElement: any;
  @ViewChild('videoQuestion') videoQuestion: any;


  miniVideoQuestion;

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
  employmentType: FormControl = new FormControl();
  start = true;

  items: any[] = [
    {
      name: 'EASY',
      active: false,
      items: [
        {
          value: 'Question number one 1',
          isFinish: false,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
        },
        {
          value: 'Question number one 2',
          isFinish: false,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
        },
        {
          value: 'Question number one 3',
          isFinish: false,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
        },
        {
          value: 'Question number one 4',
          isFinish: false,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
        },
        {
          value: 'Question number one 5',
          isFinish: true,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
        }
      ]
    },
    {
      name: 'MEDUIM',
      active: false,
      items: [
        {
          value: 'Question number one 1',
          isFinish: false,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
        },
        {
          value: 'Question number one 2',
          isFinish: false,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4'
        },
        {
          value: 'Question number one 3',
          isFinish: false,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
        },
        {
          value: 'Question number one 4',
          isFinish: false,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4'
        },
        {
          value: 'Question number one 5',
          isFinish: true,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'
        }
      ]
    },
    {
      name: 'HARD',
      active: true,
      items: [
        {
          value: 'Question number one 1',
          isFinish: false,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
        },
        {
          value: 'Question number one 2',
          isFinish: false,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
        },
        {
          value: 'Question number one 3',
          isFinish: false,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
        },
        {
          value: 'Question number one 4',
          isFinish: false,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
        },
        {
          value: 'Question number one 5',
          isFinish: true,
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
        }
      ]
    },
  ]

  financeExecutive: DropdownOption[] = [
    {value: 'Finance Executive', label: 'Finance Executivee'},
    {value: 'Finance Executive 2', label: 'Finance Executive 2'},
  ];

  question: any[] = [];

  questionVideoUrl = '';

  number = 0;
  selectedQuestion;

  constructor(
    private ref: ChangeDetectorRef,
    private audioRecordingService: AudioRecordingService,
    private videoRecordingService: VideoRecordingService,
    private sanitizer: DomSanitizer,
    private videomeService: VideomeService
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
      console.log('asdasd', data);
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

    this.videomeService.getQuestions().subscribe((data) => {
      console.log('data', data);
    });
  }

  ngOnInit() {
    // this.questionControl.setValue(this.question[0].value);
    // this.selectedQuestion = this.question[this.number];
    this.question = this.items[2].items;
    this.questionVideoUrl = this.items[2].items[0].videoUrl;
    this.videomeService.getQuestions().subscribe((data) => {
      console.log('data', data);
      // this.questionVideoUrl= data.map(item => item.videoQuestion.fileUrl);
      console.log('asdsad', this.questionVideoUrl);
    });
  }

  ngAfterViewInit() {
    this.video = this.videoElement.nativeElement;
    this.miniVideoQuestion = this.videoQuestion.nativeElement;
    console.log('123123', this.videoBlobUrl);
    console.log('video', this.video);
    console.log('miniVideoQuestion', this.miniVideoQuestion);

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
        console.log('s', stream);
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
    this.miniVideoQuestion.src = null;
  }

  onNextQuestion() {
    if (this.selectedQuestion && this.selectedQuestion.isFinish) {
      this.number = 0;
      this.questionControl.reset();
      this.stopVideoRecording();
      this.selectedQuestion = this.question[this.number];
      this.miniVideoQuestion.src = null;
      // this.downloadVideoRecordedData();
      return;
    }
    this.selectedQuestion = this.question[this.number];
    this.questionControl.setValue(this.selectedQuestion.value);
    // this.questionVideoUrl = this.question[this.number].videoUrl;
    this.miniVideoQuestion.src = this.question[this.number].videoUrl;
    this.miniVideoQuestion.play();
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

    var formData = new FormData();
    formData.append('video', blob, filename);
    formData.append('duration', '25');
    // formData.append('video/webm', [blob], filename+ '.' + blob.type.split('/')[1]);
    // formData.append(type, filename);
    // formData.append(type + '-blob', blob, filename);

    console.log('formData', formData);


    this.videomeService.postLoadVideoPRactise(25, formData).subscribe(res => {
      console.log('res', res);
    })
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

  addClass(index) {
    const item = this.items[index];
    this.items.forEach(i => i.active = false);
    item?.active ? item.active = false : item.active = true;
    this.question = item.items;
    this.questionVideoUrl = item.items[0].videoUrl;
  }


}
