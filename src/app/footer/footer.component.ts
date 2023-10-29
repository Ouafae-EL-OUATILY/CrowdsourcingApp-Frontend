import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../common/global-constants";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  logo = GlobalConstants.appLogo;

  constructor() { }

  ngOnInit(): void {
  }

}
