import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeMainComponent} from './home';
import { AuthGuard } from './_helpers';
import {ProfileComponent} from '@app/profile/profile.component';
import {VideoMeComponent} from '@app/video-me/video-me.component';
import {AboutMeComponent} from '@app/about-me/about-me.component';
import {ProfileSecondComponent} from '@app/profile2/profile.component';
import {PractiseInterviewComponent} from '@app/practise-interview/practise-interview';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeMainComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'about', component: AboutMeComponent },
    { path: 'practise', component: PractiseInterviewComponent },
    { path: 'profile', component: ProfileSecondComponent },
    { path: 'videoMe', component: VideoMeComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
