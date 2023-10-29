import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import { ActivatedRoute, ParamMap} from "@angular/router";
import {AuthService} from "../../auth/sign-in/auth.service";
import {FreelancerService} from "../../auth/sign-up-freelancer/freelancer.service";

@Component({
  selector: 'app-freelancer-account',
  templateUrl: './freelancer-account.component.html',
  styleUrls: ['./freelancer-account.component.css']
})
export class FreelancerAccountComponent implements OnInit {
  public updateFormFreelancer!: FormGroup;
  public translationFormFreelancer!: FormGroup;
  public userId!: string;
  freelancer: any;

  constructor(public route: ActivatedRoute, private freelancerService: FreelancerService) { }

  ngOnInit(): void {
    this.updateFormFreelancer= new FormGroup({
      translations: new FormArray([
        this.translationFormFreelancer = new FormGroup({
          language: new FormControl('en'),
          firstName: new FormControl(),
          lastName: new FormControl(),
          expertise: new FormControl(),
          bio: new FormControl(),
        }),
      ]),
      image: new FormControl(null,),
      hourlyRate: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl(),
      address: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl()
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.userId = paramMap.get('id');

      this.freelancerService.getFreelancer(this.userId).subscribe(freelancerData=>{
        this.freelancer=freelancerData;
        this.translationFormFreelancer.patchValue({
          firstName: this.freelancer.translations[0].firstName,
          lastName: this.freelancer.translations[0].lastName,
          expertise: this.freelancer.translations[0].expertise,
          bio: this.freelancer.translations[0].bio,
        })
        this.updateFormFreelancer.patchValue({
          email: this.freelancer.email,
          phoneNumber: this.freelancer.phoneNumber,
          hourlyRate: this.freelancer.hourlyRate,
          address: this.freelancer?.address,
          city: this.freelancer?.city,
          country: this.freelancer.country,
        })

      })
    })

    }
    updateFreelancer(){
    this.freelancerService.onUpdate(this.userId,this.updateFormFreelancer.value);
      this.ngOnInit();
    }
    delete(){
    this.freelancerService.onDelete(this.userId);

    }


  onUpload(event: { files: any[]; }) {
    const file = event.files[0];
    this.updateFormFreelancer.patchValue({image:file});
    this.updateFormFreelancer.get('image')?.updateValueAndValidity();
  }
}


