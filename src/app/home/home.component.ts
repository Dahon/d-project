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

    times: DropdownOption[] = [
        {value: 'full-time', label: 'full-time'},
        {value: 'part-time', label: 'part-time'},
    ];

    specialize: DropdownOption[] = [
        {value: 'List', label: 'List'},
        {value: 'List 2', label: 'List2'},
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

    listItems: any[] = [
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://techslides.com/demos/sample-videos/small.webm',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Darkhan yertayev',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://www.example.com/waterfall-video.mp4',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://www.example.com/waterfall-video.mp4',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://www.example.com/waterfall-video.mp4',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://www.example.com/waterfall-video.mp4',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://www.example.com/waterfall-video.mp4',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://www.example.com/waterfall-video.mp4',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://www.example.com/waterfall-video.mp4',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://www.example.com/waterfall-video.mp4',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://www.example.com/waterfall-video.mp4',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://www.example.com/waterfall-video.mp4',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://www.example.com/waterfall-video.mp4',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://www.example.com/waterfall-video.mp4',
          chartData: this.radarChartData,
          resume: null,
        },
        {
          name: 'Ivan Ivanov',
          avatar: '/assets/images/avatar.png',
          poster: '/assets/images/video.jpg',
          video: 'http://www.example.com/waterfall-video.mp4',
          chartData: this.radarChartData,
          resume: null,
        }
    ];


    searchControl = new FormControl();
    searchGroup = new FormGroup({
        employmentType: new FormControl(),
        specializations: new FormControl(),
    });

    test = {
        name: 'Ivan Ivanov',
        avatar: '/assets/images/avatar.png',
        poster: '/assets/images/video.jpg',
        video: 'http://www.example.com/waterfall-video.mp4',
        chartData: this.radarChartData,
        resume: null,
    }

    currentPage = 0;

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
        this.testArray = [...this.listItems];
        this.searchControl.valueChanges.pipe(
            startWith('')).subscribe((value) => {
            this._filter(value)
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
    testArray = [];

    _filter(value): any {
        console.log('v', value);
        const filterValue = value.toString().toLowerCase();
        if (value.length) {
            this.listItems = this.listItems.filter(item => item.name.toLowerCase().includes(filterValue))
        } else {
            this.listItems = this.testArray;
        }
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
