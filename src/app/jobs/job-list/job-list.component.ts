import { Component, OnInit } from '@angular/core';
import {JobService} from "../job.service";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: any;
  constructor(public jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobs();
    this.jobService.getJobsUpdateListener().subscribe((jobsData:any)=>{
      this.jobs=jobsData;
    });

  }

}
