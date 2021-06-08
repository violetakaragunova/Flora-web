import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'anms-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  token: string;
  email: string;

  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute, private accountService: AccountService,
    private toastr: ToastrService, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      this.token=params['token'];
      this.email=params['email'];
    });
  }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group(
      {
        token: [this.token],
        email: [this.email],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: this.MustMatch('newPassword', 'confirmPassword')
      }
    );
  }

  get f() {
    return this.resetForm.controls;
  }

  resetPassword() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    this.accountService.resetPassword(this.resetForm.value).subscribe((result) => {
      console.log(result);
      this.toastr.success('Password was changed successfully!');
      delay(1000);
      this.router.navigateByUrl('');
    });
  }


  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
