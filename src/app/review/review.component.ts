import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ReviewService} from "./review.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  val!: number;
  reviewForm!: FormGroup;
  freelancerId!: string | null;
  clientId!: string | null;
  constructor(public route: ActivatedRoute,private reviewService: ReviewService) { }

  ngOnInit(): void {
   this.clientId = sessionStorage.getItem('userId')
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
     this.freelancerId=paramMap.get('freelancerId')
    })
    this.reviewForm = new FormGroup({
      score: new FormControl(),
      title: new FormControl(),
      commentary: new FormControl(),
      client: new FormControl(this.clientId),
      freelancer: new FormControl(this.freelancerId)
    })
  }


  addReview() {
    this.reviewService.postReview(this.reviewForm.value,this.freelancerId);
  }
}
