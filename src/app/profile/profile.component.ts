import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService, AlertService} from "@app/_services";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  isReg = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      bio: ['', Validators.required],
      link: ['', Validators.required],
      id: ['', Validators.required],
      typeOfJob: [null, Validators.required],
      time: [null, Validators.required],
    });

    this.accountService.user.subscribe((res: any) => {
      console.log('res', res);
      this.form.patchValue({
        id: res.id,
        firstName: res.firstName,
        lastName: res.lastName,
        bio: res?.bio,
        link: res?.link,
        typeOfJob: res?.typeOfJob,
        time: res?.time,
      });
      console.log('f', this.form);
      if (res.bio) {
        this.isReg = false;
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.saveProfile(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Profile successful', { keepAfterRouteChange: true });
          this.router.navigate(['/'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

}
