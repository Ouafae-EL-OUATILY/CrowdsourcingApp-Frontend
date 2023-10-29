import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";





const BACKEND_URL = environment.apiUrl+"reviews/"

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
   private reviews!: any;
   private reviewsUpdated = new Subject();
  constructor(private http: HttpClient,private router: Router) { }

  getReviewsByFreelancer(freelancerId: string){
    this.http.get(BACKEND_URL+'freelancer/'+freelancerId).subscribe((reviewsData: any)=>{
      this.reviews=reviewsData.reviews;
      this.reviewsUpdated.next([...this.reviews]);
    })
  }
  getReviewsUpdateListener(){
    return this.reviewsUpdated.asObservable();
  }

  postReview(reviewForm: any,id: any){
    this.http.post(BACKEND_URL,reviewForm).subscribe(res=>{
      this.router.navigate(['/reviews/'+id]);
    },error => {
      console.log(error)
      alert('Please Try Again');
    })
  }
}
