import { Injectable } from '@angular/core';
import {Client} from "./client.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../sign-in/auth.service";

const BACKEND_URL=environment.apiUrl+"clients";

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor(private http: HttpClient,private router: Router,private authService: AuthService) { }


  signUp(clientForm: any){
    this.http.post(BACKEND_URL+"/signup",clientForm).subscribe(res=>{
      alert('New Client Account Created')
      this.router.navigate(['/login'])
    },error => {
      alert(error.error.errorMessage)
    });
  }
  getClient(id: string){
    return this.http.get<{client: any}>(BACKEND_URL+"/"+id)
    //    .subscribe(res=>{
    //    this.freelancer=res;
    // });
  }
  onUpdate(id: string,clientForm: any){
    console.log(clientForm)
    const clientData = new FormData();
    clientData.append('image',clientForm.image);
    clientData.append('translations',JSON.stringify(clientForm.translations));
    clientData.append('email',clientForm.email);
    clientData.append('phoneNumber',(clientForm.phoneNumber).toString());
    clientData.append('address',clientForm.address);
    clientData.append('city',clientForm.city);
    clientData.append('country',clientForm.country);
    this.http.patch(BACKEND_URL+"/"+id,clientData).subscribe(res=>{
      postMessage('Data Updated');
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
