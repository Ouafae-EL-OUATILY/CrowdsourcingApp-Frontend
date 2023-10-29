import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../common/global-constants";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "./contact.service";

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  logo = GlobalConstants.appLogo;
  public contactForm!: FormGroup;
  public translationForm!: FormGroup;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      translations: new FormArray([
        this.translationForm = new FormGroup({
          language: new FormControl('en'),
          firstName: new FormControl(null,{validators: Validators.required}),
          lastName: new FormControl(null,{validators: Validators.required}),
          subject: new FormControl(null,{validators: Validators.required}),
          details: new FormControl(null,{validators: Validators.required})
        }),
      ]),
      email: new FormControl(null,{validators: Validators.required})
    })
    if (sessionStorage.getItem('userEmail')){
      this.contactForm.patchValue({
        email : sessionStorage.getItem('userEmail')
      });
    }
  }
  onSubmit(){
    this.contactService.submit(this.contactForm.value)
  }

}
