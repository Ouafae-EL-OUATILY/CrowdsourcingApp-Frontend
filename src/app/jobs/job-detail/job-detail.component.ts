import { Component, OnInit } from '@angular/core';
import {JobService} from "../job.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {SuggestionService} from "./suggestion.service";



@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
 private jobId!: string;
 job: any;
  userId!: String | null;
   suggestionForm!: FormGroup;
  translationForm!: FormGroup;


  constructor(public route: ActivatedRoute,public jobService: JobService,public suggestionService: SuggestionService) { }

  ngOnInit(): void {
 this.route.paramMap.subscribe((paramMap: ParamMap)=>{
   this.jobId=paramMap.get('id')!;
   this.jobService.getJob(this.jobId).subscribe(jobData=>{
     this.job=jobData;
     console.log(this.job)
   })
 })
    if (sessionStorage.getItem('userId')){
      this.userId = sessionStorage.getItem('userId');
    }
    this.suggestionForm = new FormGroup({
      translations: new FormArray([
        this.translationForm= new FormGroup({
          language: new FormControl('en'),
          textQuestion: new FormControl(null,{validators: Validators.required}),
        })
      ]),
      job: new FormControl(this.jobId,{validators: Validators.required}),
      author: new FormControl(this.userId,{validators: Validators.required})
    });
  }
  calculateDiff(data: Date){
    let date = new Date(data);
    let currentDate = new Date();

    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    if (days==0) {
      return 'Today'
    } else return days.toString()+' Days ago'
  }


  onAddSuggestion() {
    this.suggestionService.AddSuggestion(this.suggestionForm.value);
  }
  goToLink(doc: string){
    // http://localhost:3003/uploads/documents/
    window.open('http://localhost:3003'+doc, "_blank");
  }

}
