import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, mergeMap, reduce, tap} from 'rxjs/operators';
import {User} from '@app/_models';
import {environment} from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient) {
    }

    getUserShortList(): Observable<any> {
        return this.http.get<User[]>(`${environment.apiUrl}/user/profiles`);
    }

    getUserShortListPublic(): Observable<any> {
        return this.http.get('http://103.233.134/api/v1/public/profile/info/list');
    }

    getCurrentUserProfileInfo(): Observable<any> {
        return this.http.get('http://103.233.134/api/v1/private/profile/info');
    }

    getPortfolio(): Observable<any> {
        return this.http.get('http://103.233.134/api/v1/private/portfolio');
    }

    getSearch(text, all = true): Observable<any> {
        if (all) {
            return this.http.get(`http://localhost:3000/profile/search?q=${text}`);
        } else {
            console.log('oim')
            return this.http.get(`${environment.apiUrl}/user/profile/search?${text}`);
        }
    }

    getAll(): Observable<any> {
        return this.http.get(`http://localhost:3000/profiles`);
    }

    getAllCompany(): Observable<any> {
        return this.http.get(`http://localhost:3000/user/companies`);
    }

    getProfile(id): Observable<any> {
        return this.http.get<User[]>(`${environment.apiUrl}/user/profile/${id}`);
    }

    getCompany(id): Observable<any> {
        return this.http.get<User[]>(`${environment.apiUrl}/user/company/${id}`);
    }

    pollutedAboutMe(body): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders().append(
            'Content-type',
            'application/json'
        );
        const formData: FormData = new FormData();
        return this.http.post(`${environment.apiUrl}/user/profile`, body, {headers});
    }

    pollutedAboutCompany(body): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders().append(
            'Content-type',
            'application/json'
        );
        return this.http.post(`${environment.apiUrl}/user/company`, body, {headers});
    }

    // getCountDevs(): Observable<any> {
    //     return this.http.get('http://localhost:3000/profiles').pipe(
    //         map(res => {
    //             return res.reduce((acc, value) => {
    //                 console.log('va', value);
    //                 value['specializations'].forEach((key) => {
    //                     acc[key] ? acc[key] += 1 : acc[key] = 1;
    //                 });
    //                 console.log('acc', acc);
    //                 return acc;
    //             }, {});
    //         }),
    //     );
    // }


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
