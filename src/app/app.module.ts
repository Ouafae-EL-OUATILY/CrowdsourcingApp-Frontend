import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import {AppRoutingModule} from "./app-routing.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { JobCreateComponent } from './jobs/job-create/job-create.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { FreelancerListComponent } from './freelancers/freelancer-list/freelancer-list.component';
import {NgxTranslateModule} from "./translate/translate.module";
import { HomeComponent } from './home/home.component';
import {SignUpFormComponent} from "./auth/sign-up/sign-up-form.component";
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import {BrowserModule} from "@angular/platform-browser";
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { FreelancerProfileComponent } from './freelancers/freelancer-profile/freelancer-profile.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { SignUpClientComponent } from './auth/sign-up-client/sign-up-client.component';
import { SignUpFreelancerComponent } from './auth/sign-up-freelancer/sign-up-freelancer.component';
import {PrimeNgModule} from "./prime-ng.module";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {FreelancerAccountComponent} from "./users/freelancer-account/freelancer-account.component";
import { MyjobsComponent } from './jobs/myjobs/myjobs.component';
import { TaskCreateComponent } from './jobs/task-create/task-create.component';
import { ReviewComponent } from './review/review.component';
import { ReviewListComponent } from './review/review-list/review-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignInComponent,
    SignUpFormComponent,
    JobCreateComponent,
    JobListComponent,
    FreelancerListComponent,
    HomeComponent,
    FooterComponent,
    ContactusComponent,
    PagenotfoundComponent,
    UserProfileComponent,
    FreelancerProfileComponent,
    JobDetailComponent,
    SignUpClientComponent,
    SignUpFreelancerComponent,
    FreelancerAccountComponent,
    MyjobsComponent,
    TaskCreateComponent,
    ReviewComponent,
    ReviewListComponent

  ],
  imports: [
    BrowserModule,
    NgxTranslateModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PrimeNgModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
