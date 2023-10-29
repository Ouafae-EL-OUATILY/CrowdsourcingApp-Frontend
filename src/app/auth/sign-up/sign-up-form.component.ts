import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalConstants} from "../../common/global-constants";

interface UserRole {
  name: string,
  code: string
}

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})

export class SignUpFormComponent implements OnInit {
  isFreelancer: boolean = false;

  users!: UserRole[];
  selectedUser!: UserRole;
  logo = GlobalConstants.appLogo;


  constructor(private route: Router) {
    this.users = [
      {name: 'Client', code: 'client'},
      {name: 'Freelancer', code: 'freelancer'}
    ]
  }

  ngOnInit(): void {
  }

  next() {
    if (this.isFreelancer) this.route.navigate(['/sign-upFreelancer']);
    else this.route.navigate(['/sign-upClient']);
  }

  onChange($event: any) {
    this.isFreelancer = $event === 'freelancer';
  }
}
