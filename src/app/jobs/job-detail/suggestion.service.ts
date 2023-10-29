import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {Suggestion} from "./suggestion.model";

const BACKEND_URL=environment.apiUrl+"suggestions/"

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(private http: HttpClient,private router: Router) { }



  AddSuggestion(suggestionForm: any){
    this.http.post<{message:any,suggestion: Suggestion}>(BACKEND_URL,suggestionForm).subscribe(res=>{
      alert('Comment Added Successfully');
    },error=>{
      alert('Comment Not Posted Please Retry'+error.message)
    });
  }

}
