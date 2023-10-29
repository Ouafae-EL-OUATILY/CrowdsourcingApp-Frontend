import {Component, OnDestroy, OnInit} from '@angular/core';
import {Freelancer} from "../freelancer.model";
import {FreelancerService} from "../../auth/sign-up-freelancer/freelancer.service";

@Component({
  selector: 'app-freelancer-list',
  templateUrl: './freelancer-list.component.html',
  styleUrls: ['./freelancer-list.component.css'],

})
export class FreelancerListComponent implements OnInit {
   freelancers: Freelancer[]=[];
  constructor(public freelancersService: FreelancerService) { }

  ngOnInit(): void {
    this.freelancersService.getFreelancers()
    this.freelancersService.getFreelancersUpdateListener().subscribe((freelancersData:any)=>{
      this.freelancers=freelancersData;
    })

  }


}
