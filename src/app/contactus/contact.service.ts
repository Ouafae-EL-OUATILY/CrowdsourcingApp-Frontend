import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

const BACKEND_URL=environment.apiUrl+"contact/";


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient,private router: Router) { }


  submit(contactForm: any){
 this.http.post(BACKEND_URL,contactForm).subscribe(res=>{
  alert('Message Sent')
   this.router.navigate(['/']);
 },error=>{
   alert('Message Failed')
 })
  }
}
