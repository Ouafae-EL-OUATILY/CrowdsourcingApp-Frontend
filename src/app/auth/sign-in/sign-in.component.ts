import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth.service";
import {AuthData} from "./sign-in.model";
import {NgForm} from "@angular/forms";
import {GlobalConstants} from "../../common/global-constants";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
users!: AuthData[];
  logo = GlobalConstants.appLogo;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  onSignIn(form: NgForm) {
    if(form.invalid) return;
    this.authService.logIn(form.value.email,form.value.password);
  }
}
