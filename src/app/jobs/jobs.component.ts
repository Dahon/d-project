import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HomeService} from "@app/_services/home.service";
import {AccountService} from "@app/_services";
import {filter, map} from "rxjs/operators";
import {animate, state, style, transition, trigger} from "@angular/animations";

interface DropdownOption {
    label: string;
    value: number | string;
    type?: string;
}

@Component({
    selector: 'app-about-company',
    templateUrl: './jobs.component.html',
    animations: [
        trigger('toggleHeight', [
            state('false', style({
                height: '0px',
                display: 'none',
                overflow: 'hidden',
            })),
            state('true', style({
                height: '*',
                display: 'block',
                opacity: '1',
            })),
            transition('1 => 0', animate('200ms ease-in')),
            transition('0 => 1', animate('200ms ease-out'))
        ])
    ],
    styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
    isShow: boolean = false;
    currentUser;
    aboutForm: FormGroup = new FormGroup({
        email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
        name: new FormControl('', Validators.required),
        description: new FormControl(''),
        id: new FormControl(this.accountService.userValue.id),
        employmentType: new FormControl(''),
        // travelRequirements: new FormControl(''),
        educationLevel: new FormControl(''),
        workLocation: new FormControl(''),
        specializations: new FormControl(''),
        expected_salary: new FormControl(''),
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

    UploadFileService: any;
    url: any = '/assets/images/avatar-test.jpg';

    constructor(private http: HttpClient, private router: Router, private homeService: HomeService, private accountService: AccountService) {

    }

    listItems: any[] = [];

    searchGroup = new FormGroup({
        employmentType: new FormControl(),
        specializations: new FormControl(),
        expected_salary: new FormControl(),
        work_location: new FormControl(),
    });

    countUser = 0;
    spec = null;
    city = null;
    searchControl = new FormControl();

    ngOnInit(): void {
        console.log('222')
        this.homeService.getAllCompany().subscribe(res => {
            this.listItems = res;
        });
    }

    clearSearch(): void {
        this.searchGroup.reset();
    }


    onSearch(): void {
        this.spec = this.searchGroup.value.specializations ? this.searchGroup.value.specializations : null;
        this.city = this.searchGroup.value.work_location ? this.searchGroup.value.work_location : null;
        const str = Object.entries(this.searchGroup.value).filter(([, value]) => value !== null).map(([key, val]) => `${key}=${val}`).join('&');
        this.homeService.getSearch(str, false)
            .pipe(
                map(item => item.filter(user => user.id === this.currentUser.id))
            ).subscribe(val => {
            this.listItems = val;
            this.countUser = val.length;
            this.isShow = false;
        });
    }

    onSubmit(): void {
        this.homeService.pollutedAboutCompany(this.aboutForm.value).subscribe(res => {
            console.log('res', res);
        });
        // this.home.pollutedAboutMe(this.aboutForm.value).subscribe((val) => {
        //   this.router.navigate(['profile']);
        // })
    }

}
