import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'flora-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit {
  model: any = {};

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  forgotPassword() {
    this.accountService.forgotPassword(this.model).subscribe((result) => {
      this.toastr.success('Link was sent successfully!');
    });
  }
}
