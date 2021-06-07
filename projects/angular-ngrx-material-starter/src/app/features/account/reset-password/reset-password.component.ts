import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'anms-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {
  model: any = {};

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.model.token = params['token'];
      this.model.email = params['email'];
    });
  }

  ngOnInit(): void {}

  resetPassword() {
    this.accountService.resetPassword(this.model).subscribe((result) => {
      console.log(result);
      this.toastr.success('Password was changed successfully!');
      delay(1000);
      this.router.navigateByUrl('');
    });
  }
}
