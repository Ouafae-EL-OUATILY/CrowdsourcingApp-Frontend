import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/global-constants";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {FreelancerService} from "./freelancer.service";

@Component({
  selector: 'app-sign-up-freelancer',
  templateUrl: './sign-up-freelancer.component.html',
  styleUrls: ['./sign-up-freelancer.component.css']
})
export class SignUpFreelancerComponent implements OnInit {
  logo = GlobalConstants.appLogo;
  signupFormFreelancer!: FormGroup;
  translationForm!: FormGroup;

  constructor(public freelancerService: FreelancerService) { }

  ngOnInit(): void {
    this.signupFormFreelancer= new FormGroup({
      translations: new FormArray([
        this.translationForm = new FormGroup({
          language: new FormControl('en'),
          firstName: new FormControl(),
          lastName: new FormControl(),
          expertise: new FormControl(),
          bio: new FormControl(),
        }),
      ]),
      hourlyRate: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      passwordConfirm: new FormControl(),
      country: new FormControl()
    })
  }

  onSignUpFreelancer() {
  this.freelancerService.signUp(this.signupFormFreelancer.value);
  }
}
