import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {NgModule} from "@angular/core";
import {JobListComponent} from "./jobs/job-list/job-list.component";
import {FreelancerListComponent} from "./freelancers/freelancer-list/freelancer-list.component";
import {HomeComponent} from "./home/home.component";
import {SignUpFormComponent} from "./auth/sign-up/sign-up-form.component";
import {JobCreateComponent} from "./jobs/job-create/job-create.component";
import {ContactusComponent} from "./contactus/contactus.component";
import {PagenotfoundComponent} from "./pagenotfound/pagenotfound.component";
import {UserProfileComponent} from "./users/user-profile/user-profile.component";
import {JobDetailComponent} from "./jobs/job-detail/job-detail.component";
import {SignUpFreelancerComponent} from "./auth/sign-up-freelancer/sign-up-freelancer.component";
import {SignUpClientComponent} from "./auth/sign-up-client/sign-up-client.component";
import {FreelancerProfileComponent} from "./freelancers/freelancer-profile/freelancer-profile.component";
import {AuthGuard} from "./auth/auth.guard";
import {FreelancerAccountComponent} from "./users/freelancer-account/freelancer-account.component";
import {MyjobsComponent} from "./jobs/myjobs/myjobs.component";
import {TaskCreateComponent} from "./jobs/task-create/task-create.component";
import { ReviewComponent } from "./review/review.component";
import {ReviewListComponent} from "./review/review-list/review-list.component";

const appRoutes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'login',component: SignInComponent},
  {path: 'sign-up',component: SignUpFormComponent},
  {path:'sign-upFreelancer',component: SignUpFreelancerComponent},
  {path:'sign-upClient',component: SignUpClientComponent},
  {path: 'jobs',component: JobListComponent},
  {path: 'jobs/:id',component: JobDetailComponent},
  {path: 'myjobs/:id',component: MyjobsComponent, canActivate: [AuthGuard],
    data: {
      role: ['client']
    }},
  {path: 'createJob',component: JobCreateComponent, canActivate: [AuthGuard],
    data: {
      role: ['client']
    }},
  {path: 'editJob/:jobId',component: JobCreateComponent, canActivate: [AuthGuard],
    data: {
      role: ['client']
    }},
  {path: 'addTask/:jobId',component: TaskCreateComponent, canActivate: [AuthGuard],
    data: {
      role: ['client']
    }},
  {path: 'review/:freelancerId',component: ReviewComponent, canActivate: [AuthGuard],
    data: {
      role: ['client']
    }},
  {path: 'reviews/:freelancerId',component: ReviewListComponent},
  {path: 'freelancers',component: FreelancerListComponent},
  {path: 'freelancers/:id',component: FreelancerProfileComponent},
  {path: 'contactUs',component: ContactusComponent},
  {path: 'client/account/:id',component: UserProfileComponent,canActivate: [AuthGuard],
    data: {
      role: ['client']
    }},
  {path: 'freelancer/account/:id',component: FreelancerAccountComponent,canActivate: [AuthGuard],
    data: {
      role: ['freelancer']
    }},

  { path: '**', pathMatch: 'full',
    component: PagenotfoundComponent },
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {

}
