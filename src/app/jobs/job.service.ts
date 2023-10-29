import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";

const BACKEND_URL=environment.apiUrl+"jobs/"
const BACKEND_URL_TASK = environment.apiUrl+"tasks/"

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobs!: any;
  private jobsUpdated = new Subject();
  private clientJobs!: any;
  private clientJobsUpdated = new Subject();


  constructor(private http: HttpClient,private router: Router) { }


  getJobs(){
    this.http.get(BACKEND_URL).subscribe(jobsData=>{
      this.jobs=jobsData;
      this.jobsUpdated.next([...this.jobs]);
    })
  }
  getJobsUpdateListener(){
    return this.jobsUpdated.asObservable();
  }
  getClientJobs(clientId: string){
    this.http.get(BACKEND_URL+'myjobs/'+clientId).subscribe(clientJobs=>{
      this.clientJobs=clientJobs;
      this.clientJobsUpdated.next([...this.clientJobs])
    })
  }
  getClientJobsUpdateListener(){
    return this.clientJobsUpdated.asObservable();
  }
  getJob(id:string) {
    return this.http.get<{job: any}>(BACKEND_URL + id);

  }

  jobPost(jobForm: any){
    const clientId = sessionStorage.getItem('userId');
    const jobData = new FormData();
    jobData.append('translations',JSON.stringify(jobForm.translations));
    jobData.append('deadline',(jobForm.deadline).toString());
    jobData.append('budget',JSON.stringify(jobForm.budget));
    jobData.append('link',jobForm.link);
    jobData.append('linkTitle',jobForm.linkTitle);
    jobData.append('document',jobForm.document);
    jobData.append('documentTitle',jobForm.documentTitle);
    // @ts-ignore
    jobData.append('client',clientId);
      this.http.post<{job: any}>(BACKEND_URL,jobData).subscribe(response=>{
         // @ts-ignore
        this.router.navigate(['/jobs/'+response._id])
      },error => {
        alert(error.error.message);
      })
  }
  updateJob(id: string,jobForm: any){
    delete jobForm['document']
    this.http.patch(BACKEND_URL+id,jobForm).subscribe(res=> {
      // alert('Job Updated')
      window.location.reload();
      // @ts-ignore
      // this.router.navigate(['/jobs'])
    },error=>{
      console.log(error)
      alert('please try again')
    })
  }
  deleteJob(id: string){
    this.http.delete(BACKEND_URL+id).subscribe(res=>{
     alert('Job Deleted')
      this.router.navigate(['/']);
    },error => {
      console.log(error)
      alert('please try again')
    })
  }
  addTask(taskForm: any){
     this.http.post(BACKEND_URL_TASK,taskForm).subscribe(res=>{
       alert('Task Added')
     },error => {
       alert(error.error.message)
     })
  }
}
