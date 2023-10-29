import { Component, OnInit } from '@angular/core';
import {JobService} from "../job.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-myjobs',
  templateUrl: './myjobs.component.html',
  styleUrls: ['./myjobs.component.css']
})
export class MyjobsComponent implements OnInit {
   jobs: any;
   clientId!: string;
  constructor(public route: ActivatedRoute,public jobService: JobService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      this.clientId=paramMap.get('id')!;
      this.jobService.getClientJobs(this.clientId);
      this.jobService.getClientJobsUpdateListener().subscribe(jobData=>{
        this.jobs=jobData;
      })
    })
  }

}
