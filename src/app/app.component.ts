import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html', styles: ['.nav-link {padding: 0}'] })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe((x: any) => {
            if (x) {
                this.user = {...x, isCompany: x.is_company};
            }
        });
        // this.accountService.userSubject.subscribe(x => this.accountService.user)
    }

    logout() {
        this.accountService.logout();
    }
}