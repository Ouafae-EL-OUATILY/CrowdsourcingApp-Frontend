import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormdataService {

  constructor() { }

  convertToFormData(form: any){
    const formData = new FormData();
    let keys = Object.keys(form)
    for(let key of keys){
      if (form.image){
          form.append()
      } else

      form.append(key,JSON.stringify(form[key]))
    }
  }
}
