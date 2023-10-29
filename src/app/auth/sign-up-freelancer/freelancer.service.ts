import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Subject} from "rxjs";
import {AuthService} from "../sign-in/auth.service";

const BACKEND_URL=environment.apiUrl+"freelancers";


@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  newUser: any;
  private freelancer!: any;
  private freelancers!: any;
  private freelancersUpdated = new Subject();
  constructor(private http: HttpClient,private router: Router,private authService: AuthService) { }


  signUp(freelancerForm: any){
    this.http.post<{status:any,newUser: any}>(BACKEND_URL+"/signup",freelancerForm).subscribe(res=>{
      res.newUser=this.newUser;
      this.router.navigate(['/login'])
    });
  }
  getFreelancers(){
    this.http.get(BACKEND_URL).subscribe(freelancersData=>{
      this.freelancers=freelancersData;
      this.freelancersUpdated.next([...this.freelancers]);
    })

  }
  getFreelancersUpdateListener(){
    return this.freelancersUpdated.asObservable();
  }
  getFreelancer(id: string){
     return this.http.get<{freelancer: any}>(BACKEND_URL+"/"+id)
    //    .subscribe(res=>{
    //    this.freelancer=res;
    // });
  }
  onUpdate(id: string,freelancerForm: any){
    const freelancerData = new FormData();
    freelancerData.append('image',freelancerForm.image);
    freelancerData.append('translations',JSON.stringify(freelancerForm.translations));
    freelancerData.append('email',freelancerForm.email);
    freelancerData.append('hourlyRate',(freelancerForm.hourlyRate).toString());
    freelancerData.append('phoneNumber',(freelancerForm.phoneNumber).toString());
    freelancerData.append('address',freelancerForm.address);
    freelancerData.append('city',freelancerForm.city);
    freelancerData.append('country',freelancerForm.country);
    this.http.patch(BACKEND_URL+"/"+id,freelancerData).subscribe(res=>{
      window.location.reload();
    },error => {
      console.log(error)
      alert('Please Try Again')
    })
  }
  onDelete(id: string){
    this.http.delete(BACKEND_URL+"/"+id).subscribe(res=>{
      alert('Account Deleted')
      this.authService.logOut();
    },error=>{
      console.log(error)
    })
  }

}
