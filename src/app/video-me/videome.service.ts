import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideomeService {

  constructor(private http: HttpClient) { }


  postLoad(duration: any, video: any) {
    console.log('vvv', video);
    return this.http.post<any>('http://103.233.0.134/api/v1/private/videome', video)
        .pipe(map(val => {
          console.log('val', val);
        }));
  }

  postLoadVideoPRactise(duration: any, video: any) {
    console.log('vvv', video);
    return this.http.post<any>('http://103.233.0.134/api/v1/private/interview/video', video)
        .pipe(map(val => {
          console.log('val', val);
        }));
  }

  onloadPost(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('poster', fileToUpload, fileToUpload.name);
    return this.http
      .post('/api/v1/private/videome/poster', formData)
      .pipe(
        map(() => { return true; }),
      )
      
  }

  getVideo() {
    return this.http.get<any>('http://103.233.0.134/api/v1/private/videome')
        .pipe(map(val => {
          console.log('val', val);

          return val;
        }));
  }

  getQuestions() {
    console.log('ddd')
    return this.http.get<any>('http://103.233.0.134/api/v1/private/interview/video-questions?level=EASY&profession=Teacher')
        .pipe(map(val => {
          console.log('val', val);
          return val;
        }));
  }

}
