import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";
import {AuthData} from "./sign-in.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

const BACKEND_URL=environment.apiUrl+"users/login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string | null;
  userRole:string='user';
  loggedIn: boolean =false
  private authStatusListener = new Subject<any>();
  loggedInUser!: any;
  constructor(private http: HttpClient,private router: Router) { }



  getToken(){
    if (sessionStorage.getItem('token')){
      return sessionStorage.getItem('token');
    }
    return this.token;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }


  logIn(email: string,password: string) {
    const authData: AuthData = {email: email,password: password}
   this.http.post<{token: string,user: any}>(BACKEND_URL,authData).subscribe(response => {
     // console.log(response);
     this.token=response.token;
     this.userRole=response.user.role;
     this.loggedInUser=response.user;
     this.loggedIn=true;
     sessionStorage.setItem('userId',response.user._id);
     sessionStorage.setItem('userRole',response.user.role);
     sessionStorage.setItem('userEmail',response.user.email);
      this.saveAuthData(this.token)
     this.authStatusListener.next(this.loggedInUser);
     this.router.navigate(['/'])
   },error => {
     alert(error.error.message);
   });
  }
  isLoggedIn(){
    if (sessionStorage.getItem('userRole')&& sessionStorage.getItem('token')){
      this.loggedIn=true;
    }
    return this.loggedIn;
  }


logOut(){
    this.token=null;
    this.userRole='user';
  this.loggedIn=false;
  sessionStorage.removeItem('userId');
  sessionStorage.setItem('userRole','user');
  sessionStorage.removeItem('userEmail');
  this.clearAuthData();
  this.authStatusListener.next(this.userRole);
    this.router.navigate(['/']);
}

getUserRole(){
  if (sessionStorage.getItem('userRole') && sessionStorage.getItem('token')){
    return sessionStorage.getItem('userRole');
  }
    return this.userRole;
}
private saveAuthData(token: any){
    sessionStorage.setItem('token',token)
}
private clearAuthData(){
    sessionStorage.removeItem('token')
}
// private getAuthData(){
//     const token = sessionStorage.getItem('token');
//     if (!token){
//       return
//     }
//     return {
//       token: token
//     }
// }

}
