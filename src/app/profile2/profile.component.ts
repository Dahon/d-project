import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import SwiperCore, { Pagination } from 'swiper';
import {HomeService} from "@app/_services/home.service";
import {AccountService} from "@app/_services";
import {ActivatedRoute} from "@angular/router";

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileSecondComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 20;
  subscription;
  constructor(private homeService: HomeService, private accountService: AccountService, private activeRoute: ActivatedRoute) { }
  user = null;
  url = null;
  ngOnInit(): void {
    this.subscription = this.activeRoute.params.subscribe(params => {
      console.log('params[\'id\']', params.id);
      if (params.id) {
        this.homeService.getProfile(params.id).subscribe(res => {
          console.log('res', res);
          this.url = 'http://localhost:3000/database-video-files/' + res?.user?.videoId;
          this.user = res;
        });
      } else {
        this.homeService.getProfile(this.accountService.userValue.id).subscribe(res => {
          console.log('res', res);
          this.url = 'http://localhost:3000/database-video-files/' + res?.user?.videoId;
          this.user = res;
        });
      }
    });
  }

}
