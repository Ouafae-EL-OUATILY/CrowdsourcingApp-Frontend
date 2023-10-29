import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {JobService} from "../job.service";

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  taskForm!: FormGroup;
  private jobId!: string;
  constructor(public route: ActivatedRoute,private jobService: JobService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      // @ts-ignore
      this.jobId=paramMap.get('jobId');
    });
    this.taskForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      budget: new FormControl(),
      order: new FormControl(),
      job: new FormControl(this.jobId)
    })
  }

  onPostTask() {
  if (this.taskForm.invalid) return;
    this.jobService.addTask(this.taskForm.value)
  }
  resetForm() {
    this.taskForm.reset();
  }
}
