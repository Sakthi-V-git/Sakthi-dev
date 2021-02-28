import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CityService } from './city.service';
import { customer } from './customer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  myControl = new FormControl();
  options: string[];
  registerForm: FormGroup;
  filteredOptions: Observable<any[]>;
  
  @ViewChild('myForm') customerDetails:NgForm;
  constructor(private  cityService:CityService ){ 
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
          }) 
    )
  }

  filter(val: string): Observable<any[]> {
    return this.cityService.getData()
     .pipe(
       map(response => response.filter(option => { 
         return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
      }

      public customer:customer= {

        fullname:'',
        number:'',
        email:'',
        city:''

      }
      onSubmit(data:FormData){
        console.log(data);
        return data;
      }
      displayedColumns: string[] = ['fullname', 'number', 'email', 'city'];
}
