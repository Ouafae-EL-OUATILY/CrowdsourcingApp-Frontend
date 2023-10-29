import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {GlobalConstants} from "../common/global-constants";
import {AuthService} from "../auth/sign-in/auth.service";
import {Subscription} from "rxjs";



interface Language {
  name: string,
  code: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  logo = GlobalConstants.appLogo;
  private authListenerSubs!: Subscription;
  userRole: string='user';
  userId!: string
  lang!: string | null

  constructor(private translateService: TranslateService,private authService: AuthService) {

  }

  ngOnInit(): void {
    if (sessionStorage.getItem('userRole')&& sessionStorage.getItem('token')){
      // @ts-ignore
      this.userRole=sessionStorage.getItem('userRole');
    }
    if (sessionStorage.getItem('userId')){
      // @ts-ignore
      this.userId=sessionStorage.getItem('userId')
    }
    this.authListenerSubs=this.authService.getAuthStatusListener().subscribe(loggedInUser=>{
      this.userRole=loggedInUser.role;
      this.userId=loggedInUser._id;
    })
     this.lang = localStorage.getItem('lang');
    if (this.lang) this.translateService.use(this.lang)
  }

  public selectLanguage(event: any){
    this.translateService.use(event.target.value);
    localStorage.setItem('lang',event.target.value);
  }
  onLogOut() {
    this.authService.logOut()
    this.userRole='user';
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }


}
