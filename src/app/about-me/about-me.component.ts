import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from "@app/_services/home.service";
import {AccountService} from "@app/_services";
interface DropdownOption {
  label: string;
  value: number | string;
  type?: string;
}
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  aboutForm: FormGroup = new FormGroup({
    email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastname: new FormControl(''),
    linkedin_link: new FormControl(''),
    description: new FormControl(''),
    id: new FormControl(this.accountService.userValue.id),
    start_date: new FormControl(''),
    employment_type: new FormControl(''),
    // travelRequirements: new FormControl(''),
    education_level: new FormControl(''),
    work_location: new FormControl(''),
    specializations: new FormControl(''),
    expected_salary: new FormControl(''),
    name: new FormControl(''),
    avatar_src: new FormControl('/assets/images/avatar.png'),
    poster_src: new FormControl('/assets/images/video.jpg'),
    video_url: new FormControl('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'),
  });
  timeOptions: DropdownOption[] = [
    {value: 'Full time', label: 'Full time'},
    {value: 'Part time', label: 'Part time'},
    {value: 'Flexible schedule', label: 'Flexible schedule'},
    {value: 'Remote Work', label: 'Remote Work'},
  ];

  travelOptions: DropdownOption[] = [
    {value: '50% Travel', label: '50% Travel'},
    {value: '25% Travel', label: '25% Travel'},
  ];

  educationOptions: DropdownOption[] = [
    {value: 'A1', label: 'A1'},
    {value: 'A2', label: 'A2'},
    {value: 'B1', label: 'B1'},
    {value: 'B2', label: 'B2'},
    {value: 'C1', label: 'C1'},
  ];

  workLocationOptions: DropdownOption[] = [
    {value: 'Almaty', label: 'Almaty'},
    {value: 'Astana', label: 'Astana'},
    {value: 'Taraz', label: 'Taraz'},
    {value: 'Shymkent', label: 'Shymkent'},
    {value: 'Aktobe', label: 'Aktobe'},
    {value: 'Aktau', label: 'Aktau'},
  ];
  specializationOptions: DropdownOption[] = [
    {value: 'java', label: 'Java', type: 'backEnd'},
    {value: '.net', label: 'C#.Net', type: 'backEnd'},
    {value: 'php', label: 'Php', type: 'backEnd'},
    {value: 'js', label: 'Javascript', type: 'frontend'},
    {value: 'html', label: 'Html', type: 'frontend'},
    {value: 'css', label: 'Css', type: 'frontend'},
    {value: 'python', label: 'Python', type: 'backEnd'},
    {value: 'mysql', label: 'mysql', type: 'backEnd'},
    {value: 'node', label: 'nodejs', type: 'backEnd'},
  ];
  subscription;
  UploadFileService: any;
  url: any = '/assets/images/avatar-test.jpg';
  constructor(private http: HttpClient, private router: Router, private homeService: HomeService, private accountService: AccountService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.activeRoute.params.subscribe(params => {
      console.log('params[\'id\']', params.id);
      if (params.id) {
        this.url = `http://localhost:3000/database-files/${this.accountService.userValue.avatarId}`
        this.homeService.getProfile(params.id).subscribe(res => {
          this.aboutForm.patchValue(res);
          this.aboutForm.disable();
        });
      } else {
        this.aboutForm.patchValue({
          id: this.accountService.userValue.id,
          email: this.accountService.userValue.email,
        });
        this.url = `http://localhost:3000/database-files/${this.accountService.userValue.avatarId}`
        this.homeService.getProfile(this.accountService.userValue.id).subscribe(res => {
          this.aboutForm.patchValue(res);
          this.aboutForm.patchValue({id: this.accountService.userValue.id});
        });
      }
    });
    // this.home.getCurrentUserProfileInfo().subscribe((val) => {
    //   for (const key in val) {
    //     if (val[key]) {
    //       this.aboutForm.get(key)?.patchValue(val[key])
    //     }
    //   }
    // })
  }

  uploadPhoto(list: FileList) {
    console.log('list', list);
    if (list.length === 0) {
        return;
    }
    // 2 megabytes
    if (list[0].size > 1024 * 1024 * 2) {
        // this.growlService.logWarn('???????? ???? ?????????? ???????? ???????????? 2 ????');
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(list[0]);

    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.url = reader.result;
    };

    this.homeService.uploadPhoto(list[0], this.accountService.userValue.id).subscribe((da: any) => {
      this.accountService.getById(this.accountService.userValue.id).subscribe(res => {
        const users: any = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify({...users, user: res}));
        this.accountService.userSubject.next({...users, user: res});
      });
    });

  }

  onSubmit(): void {
    console.log('aaa', this.aboutForm.value);
    this.homeService.pollutedAboutMe(this.aboutForm.value).subscribe(res => {
      console.log('res', res);
    });
    // this.home.pollutedAboutMe(this.aboutForm.value).subscribe((val) => {
    //   this.router.navigate(['profile']);
    // })
  }

}
