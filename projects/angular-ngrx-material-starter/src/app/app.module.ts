import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import { JwtInterceptor } from './interceptors/JwtInterceptor';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [JwtInterceptor]
})
export class AppModule {}
