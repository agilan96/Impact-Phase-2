import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import{Employee}from '../../app/employee';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  
  constructor(private formbulider: FormBuilder,private httpService: HttpClient) { }
  
  values: Employee[];
  ngOnInit() {  
this.dropdown();
  }
dropdown(){
  this.httpService.get<Employee[]>('https://localhost:44308/Api/Employee/Demo/Countries').subscribe(value => { 
  
  
  this.values=value;
 
 
});

}
}
