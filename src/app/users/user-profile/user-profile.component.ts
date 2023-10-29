import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap} from "@angular/router";
import {AuthService} from "../../auth/sign-in/auth.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ClientService} from "../../auth/sign-up-client/client.service";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit,OnDestroy {
  private userId!: string;
  public updateFormClient!: FormGroup;
  public translationFormClient!: FormGroup;
  clientImage: any;
  client: any;
  hasImage: boolean = false;


  constructor(public route: ActivatedRoute, private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.updateFormClient = new FormGroup({
      translations: new FormArray([
        this.translationFormClient = new FormGroup({
          language: new FormControl('en'),
          firstName: new FormControl(),
          lastName: new FormControl()
        }),
      ]),
      image: new FormControl(null),
      phoneNumber: new FormControl(),
      email: new FormControl(),
      address: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null)
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.userId = paramMap.get('id');

      this.clientService.getClient(this.userId).subscribe(clientData=>{
        this.client=clientData;
        this.translationFormClient.patchValue({
          firstName: this.client.translations[0].firstName,
          lastName: this.client.translations[0].lastName
        })
        this.updateFormClient.patchValue({
          email: this.client.email,
          phoneNumber: this.client.phoneNumber,
          address: this.client?.address,
          city: this.client?.city,
          country: this.client?.country,
        })
        if (this.client.image) {
          this.clientImage='http://localhost:3003'+this.client.image
         this.hasImage=true;
        }  else this.hasImage=false;

      })
    })

  }

   updateClient() {
    this.clientService.onUpdate(this.userId,this.updateFormClient.value);
  }
  onUpload(event: { files: any[]; }) {
    const file = event.files[0];
    this.updateFormClient.patchValue({image:file});
    this.updateFormClient.get('image')?.updateValueAndValidity();
  }
  delete() {
    this.clientService.onDelete(this.userId)
  }
  ngOnDestroy(): void {
  }
}
