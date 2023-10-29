import { Component, OnInit } from '@angular/core';

import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {JobService} from "../job.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {
   date: number | undefined;
   userId!: String | null;
   jobForm!: FormGroup;
   jobId!: string;
   job: any;
   mode = 'create';
  translationForm!: FormGroup;

  constructor(private jobService: JobService,public route: ActivatedRoute) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('userId')){
     this.userId = sessionStorage.getItem('userId');
    }
    //form
    this.jobForm= new FormGroup({
      translations: new FormArray([
     this.translationForm= new FormGroup({
       language: new FormControl('en',{validators: Validators.required}),
       title: new FormControl(null,{validators: Validators.required}),
       description: new FormControl(null,{validators: Validators.required}),
       category: new FormControl(null,{validators: Validators.required}),
       subCategory: new FormControl(null,{validators: Validators.required})
     })
      ]),
      deadline: new FormControl(null,{validators: Validators.required}),
      budget: new FormControl(null,{validators: Validators.required}),
      documentTitle: new FormControl(null),
      document: new FormControl(null),
      linkTitle: new FormControl(null),
      link: new FormControl(null),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('jobId')){
        this.mode='edit';
        // @ts-ignore
        this.jobId=paramMap.get('jobId')
        this.jobService.getJob(this.jobId).subscribe(jobData=>{
          this.job=jobData;
          this.translationForm.patchValue({
            title: this.job.translations[0].title,
            description: this.job.translations[0].description,
            category: this.job.translations[0].category,
            subCategory: this.job.translations[0].subCategory,
          })
          this.jobForm.patchValue({
            deadline: this.job.deadline,
            budget: this.job.budget,
            link: this.job.link,
            documentTitle: this.job.documentTitle,
            linkTitle: this.job.linkTitle,
            document: this.job.document,

          })
        })
      } else {
        this.mode='create';
        // @ts-ignore
        this.jobId=null;
      }
    })
  }
onPostJob(){
  if (this.jobForm.invalid) return;
  if(this.mode==='create') {
    this.jobService.jobPost(this.jobForm.value)
  } else {
    this.jobService.updateJob(this.jobId,this.jobForm.value);
  }

}

  onUpload(event: { files: any[]; }) {
    const file = event.files[0];
    this.jobForm.patchValue({document:file});
    this.jobForm.get('document')?.updateValueAndValidity();
  }
  resetForm() {
    this.jobForm.reset();
  }


  onDeleteJob() {
    this.jobService.deleteJob(this.jobId);
  }
}
