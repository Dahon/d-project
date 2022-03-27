import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import SwiperCore, { Pagination } from 'swiper';
import {HomeService} from "@app/_services/home.service";
import {AccountService} from "@app/_services";

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
  constructor(private homeService: HomeService, private accountService: AccountService) { }
  user = null;
  ngOnInit(): void {
    this.homeService.getProfile(this.accountService.userValue.id).subscribe(res => {
      console.log('res', res);
      this.user = res[0];
    });
  }

}
