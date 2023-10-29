import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from "primeng/inputnumber";
import {SelectButtonModule} from "primeng/selectbutton";
import {FileUploadModule} from "primeng/fileupload";
import {BadgeModule} from 'primeng/badge';
import {StyleClassModule} from "primeng/styleclass";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DividerModule} from "primeng/divider";
import {MessageModule} from "primeng/message";
import {PanelModule} from 'primeng/panel';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RatingModule} from 'primeng/rating';


@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RippleModule,
    CardModule,
    DropdownModule,
    InputNumberModule,
    SelectButtonModule,
    FileUploadModule,
    BadgeModule,
    StyleClassModule,
    InputTextareaModule,
    DividerModule,
    MessageModule,
    PanelModule,
    BrowserAnimationsModule,
    RatingModule
  ]
})
export class PrimeNgModule { }
