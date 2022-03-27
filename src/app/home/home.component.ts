import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {startWith} from 'rxjs/operators';
import {HomeService} from '@app/_services/home.service';
import {SwiperComponent} from 'swiper/angular';
import {ChartConfiguration, ChartData, ChartType} from 'chart.js';
import {MatDialog} from '@angular/material/dialog';

interface DropdownOption {
    label: string;
    value: number | string;
    type?: string;
}

@Component({ templateUrl: 'home.component.html',
    styleUrls: ['./home-main.component.less'],
    animations: [
        trigger('toggleHeight', [
            state('false', style({
                height: '0px',
                opacity: '0',
                overflow: 'hidden',
            })),
            state('true', style({
                height: '*',
                opacity: '1',
            })),
            transition('1 => 0', animate('200ms ease-in')),
            transition('0 => 1', animate('200ms ease-out'))
        ])
    ],
    styles: [`animation { display: block; }`]
})
export class HomeMainComponent implements OnInit {
    isShow: boolean = false;
    currentUser;
    @ViewChildren('swiper') swiper?: QueryList<SwiperComponent>;

    public radarChartOptions: ChartConfiguration['options'] = {
        responsive: true,
    };

    timeOptions: DropdownOption[] = [
        {value: 'Full time', label: 'Full time'},
        {value: 'Part time', label: 'Part time'},
        {value: 'Flexible schedule', label: 'Flexible schedule'},
        {value: 'Remote Work', label: 'Remote Work'},
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

    public radarChartLabels: string[] = [
        'Commucation',
        'Creativity',
        'Business Acumen',
        'Critical Thinking',
        'Result Achievement ',
        'People Managment',
        'Customer Orientation',
        'Coalition Building',
        'Strategic Thinking'
    ];

    public radarChartData: ChartData<'radar'> = {
        labels: this.radarChartLabels,
        datasets: [
            { data: [ 65, 59, 90, 81, 56, 55, 40, 15, 90 ], label: '' },
        ]
    };
    public radarChartType: ChartType = 'radar';

    listItems: any[] = [];

    searchControl = new FormControl();
    searchGroup = new FormGroup({
        employmentType: new FormControl(),
        specializations: new FormControl(),
        expected_salary: new FormControl(),
    });

    currentPage = 0;

    clearSearch() {
        this.searchGroup.reset();
    }

    constructor(
        private homeService: HomeService) { }

    ngOnInit(): void {
        // this.searchControl.valueChanges.subscribe(value => {
        //   console.log('res', value);
        //   const filterValue = value.toLowerCase();
        //   if (value.length) {
        //     this.listItems = this.listItems.filter(item => item.toLowerCase().includes(filterValue))
        //   }
        // })

        this.homeService.getAll().subscribe(res => {
            this.listItems = res;
        });

        // this.testArray = [...this.listItems];
        this.searchControl.valueChanges.pipe(
            startWith('')).subscribe((value) => {
            this._filter(value);
        });

        this.searchGroup.valueChanges.subscribe(res => {
            const str = Object.entries(res).filter(([, value]) => value !== null).map(([key, val]) => `${key}_like=${val}`).join('&');
            this.homeService.getSearch(str, false).subscribe(val => {
                this.listItems = val;
            });
        });


        // this.authService.currentUser.subscribe(x => {
        //     this.currentUser = x; console.log('x', x);
        //     console.log('x', x)
        //     if (this.currentUser) {
        //         this.homeService.getUserShortList().subscribe((val: any[]) => {
        //             val.forEach(element => {
        //                 console.log('element,', element);
        //                 if(element.fullName) {
        //                     this.listItems.push({
        //                         name: element?.fullName,
        //                         avatar: element?.profileImage?.fileUrl,
        //                         poster: '/assets/images/video.jpg',
        //                         video: element?.videoCV?.fileUrl,
        //                         chartData: this.radarChartData,
        //                         userProfileId: element?.userProfileId,
        //                         resume: element?.resume?.fileUrl
        //                     })
        //                 }
        //             });
        //         })
        //     } else {
        //         this.homeService.getUserShortListPublic().subscribe((val: any[]) => {
        //             val.forEach(element => {
        //                 console.log('element,', element);
        //                 if(element.fullName) {
        //                     this.listItems.push({
        //                         name: element?.fullName,
        //                         avatar: element?.profileImage?.fileUrl,
        //                         poster: '/assets/images/video.jpg',
        //                         video: element?.videoCV?.fileUrl,
        //                         chartData: this.radarChartData,
        //                         userProfileId: element?.userProfileId,
        //                         resume: element?.resume?.fileUrl
        //                     })
        //                 }
        //             });
        //         })
        //     }
        // });
    }
    _filter(value): any {
        const filterValue = value.toString().toLowerCase();
        if (filterValue.length) {
            this.homeService.getSearch(value).subscribe(res => {
                this.listItems = res;
                console.log('test', res);
            });
        }
        // if (value.length) {
        //     this.listItems = this.listItems.filter(item => item.name.toLowerCase().includes(filterValue))
        // } else {
        //     this.listItems = this.testArray;
        // }
    }

    onClick(event) {
        if (!this.currentUser) {
            this.opendDialog();
        }
        event.preventDefault();
    }

    opendDialog() {
        // const dialogRef = this.dialog.open(AuthDialogOverViewComponent, {
        //     width: '250px',
        // });
    }
    advers = false;
    scrolling = false;

    scrollHandler(e) {
        console.log('e', e);
        // e !== 'someScroll' ? this.authService.onScroll(true) : this.authService.onScroll(false);
        // if (e === 'bottom') {
        //     this.currentPage++;
        //     if (this.currentPage < 7) {
        //         this.listItems.push(this.test);
        //     } else {
        //         this.advers = true;
        //     }
        // }
    }

    onNextSlide(index): any {
        this.swiper.toArray()[index].swiperRef.slideNext();
    }

}
