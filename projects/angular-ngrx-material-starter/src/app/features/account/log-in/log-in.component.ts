import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'anms-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkCurrentUser();
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    this.accountService.login(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigateByUrl('/plants');
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  checkCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.router.navigateByUrl('/plants');
    }
  }
}
