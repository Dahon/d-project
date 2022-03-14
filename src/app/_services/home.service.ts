import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getUserShortList(): Observable<any> {
    return this.http.get('http://103.233.134/api/v1/private/profile/info/list');
  }

  getUserShortListPublic(): Observable<any> {
    return this.http.get('http://103.233.134/api/v1/public/profile/info/list');
  }

  pollutedAboutMe(body) {
    return this.http.post('http://103.233.134/api/v1/private/profile/info', body);
  }

  getCurrentUserProfileInfo(): Observable<any> {
    return this.http.get('http://103.233.134/api/v1/private/profile/info');
  }

  getPortfolio(): Observable<any> {
    return this.http.get('http://103.233.134/api/v1/private/portfolio');
  }


  uploadPhoto(file: File) {
    const extension = file.name.slice(file.name.lastIndexOf('.') + 1);
        const headers: HttpHeaders = new HttpHeaders().append(
            'Content-type',
            'image/jpeg; charset=utf-8'
        );
        console.log(file, headers, extension);
        const formData: FormData = new FormData();
        formData.append('photo', file, file.name);

    return this.http.post('http://103.233.134/api/v1/private/profile/photo', formData)
      // .pipe(tap(() => this.photoUrl$.emit()));
  }

  uploadPortfolioPhoto(file: File) {
    const extension = file.name.slice(file.name.lastIndexOf('.') + 1);
        const headers: HttpHeaders = new HttpHeaders().append(
            'Content-type',
            'image/jpeg; charset=utf-8'
        );
        console.log(file, headers, extension);
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

    return this.http.post('http://103.233.134/api/v1/private/portfolio/file', formData)
      // .pipe(tap(() => this.photoUrl$.emit()));
  }

  uploadPortfolioLink(links) {
    console.log('links', links);
    return this.http.post('http://103.233.134/api/v1/private/portfolio', links)
      // .pipe(tap(() => this.photoUrl$.emit()));
  }

}