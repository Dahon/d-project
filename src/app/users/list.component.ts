import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => {
              console.log('aaa', users);
              this.users = users.map((r: any) => {
                return {
                  ...r,
                  likes: r.likes ? r.likes : 0
                };
              });
            });
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }


    like(id) {
      const user = this.users.find(x => x.id === id);
      console.log('this.users', this.users);
      user.likes += 1;
      console.log('test', user);
      this.accountService.updateUser(user);
    }

    dislike(id) {
      const user = this.users.find(x => x.id === id);
      if (user.likes >= 1) {
        user.likes -= 1;
      }
      this.accountService.updateUser(user);
    }
}
