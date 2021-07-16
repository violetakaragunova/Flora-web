import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'flora-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit {
  emailPattern: "[a-zA-Z0-9.+!#$%&'*-/=?^_`{|}~]+@[a-z0-9.-]+.[a-z]{2,3}$"; // todo: move these kinds of global settings in one place
  form: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required], Validators.pattern(this.emailPattern)],
      reCaptcha: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.accountService.forgotPassword(this.form.value.email).subscribe(
        (_) => {
          this.toastr.success('Link was sent successfully!');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
  }
}
