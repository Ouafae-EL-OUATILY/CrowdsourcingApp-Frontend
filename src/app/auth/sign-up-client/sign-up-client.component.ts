import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/global-constants";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "./client.service";
import {Client} from "./client.model";

@Component({
  selector: 'app-sign-up-client',
  templateUrl: './sign-up-client.component.html',
  styleUrls: ['./sign-up-client.component.css']
})
export class SignUpClientComponent implements OnInit {
  logo = GlobalConstants.appLogo;
  lang!:string | null;
  signupFormClient!: FormGroup;
   translationForm!: FormGroup;
  // translations!: FormGroup;

  constructor(public clientService: ClientService) { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang')
    this.signupFormClient = new FormGroup({
      translations: new FormArray([
       this.translationForm = new FormGroup({
          language: new FormControl('en'),
          firstName: new FormControl(null,{validators: Validators.required}),
          lastName: new FormControl(null,{validators: Validators.required})
        }),
      ]),
      phoneNumber: new FormControl(null),
      email: new FormControl(null,{validators: Validators.required}),
      password: new FormControl(null,{validators: Validators.required}),
      passwordConfirm: new FormControl(null,{validators: Validators.required})
    })

  }



  onSignUp() {
    if (this.signupFormClient.invalid){
      return;
    }
 // this.clientService.signUp(this.signupFormClient.value.translations,this.signupFormClient.value.email,this.signupFormClient.value.phoneNumber,
 // this.signupFormClient.value.password,this.signupFormClient.value.passwordConfirm);
    this.clientService.signUp(this.signupFormClient.value)
 //    console.log(this.signupFormClient.value.translations);
  }
}
