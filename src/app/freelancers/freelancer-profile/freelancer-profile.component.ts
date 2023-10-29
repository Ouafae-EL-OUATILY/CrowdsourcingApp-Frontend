import { Component, OnInit } from '@angular/core';
import {FreelancerService} from "../../auth/sign-up-freelancer/freelancer.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Freelancer} from "../freelancer.model";

@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.css']
})
export class FreelancerProfileComponent implements OnInit {
  private userId!: string;
  freelancer: any;
  constructor(public route: ActivatedRoute,private freelancerService: FreelancerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      this.userId=paramMap.get('id')!;

      this.freelancerService.getFreelancer(this.userId).subscribe(freelancerData=>{
        this.freelancer=freelancerData;
      })
    });
  }
  calcAverageReview(){
   return (this.freelancer.reviews.reduce((a: any, {score}: any) => a + score, 0) / this.freelancer.reviews.length).toFixed(1);
  }

}
