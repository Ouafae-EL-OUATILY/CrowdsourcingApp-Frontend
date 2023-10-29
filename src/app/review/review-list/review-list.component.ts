import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  private freelancerId!: string;
  reviews: any;

  constructor(public route: ActivatedRoute,private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      // @ts-ignore
      this.freelancerId=paramMap.get('freelancerId');

      this.reviewService.getReviewsByFreelancer(this.freelancerId)
      this.reviewService.getReviewsUpdateListener().subscribe((reviewsData: any)=> {
        this.reviews=reviewsData;
      })
    });
  }
  dateToString(){
    // convert date to string
  }
}

