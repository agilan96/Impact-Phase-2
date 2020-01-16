import { Component, OnInit } from '@angular/core';  
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { EmployeeService } from '../employee.service';  
import { Employee,sample } from '../employee';  
import {MatSnackBar} from '@angular/material/snack-bar';
import { createHostListener } from '@angular/compiler/src/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({  
  selector: 'app-employee',  
  templateUrl: './employee.component.html',  
  styleUrls: ['./employee.component.css']  
})  

export class EmployeeComponent implements OnInit {  
  dataSaved = false;  
  employeeForm: any;  
  allEmployees: Observable<Employee[]>;  
  employeeIdUpdate = null;  
  message = null;  
  name=null;
  displayedColumns:string[]=['Value','buttons'];
  dataSource:Employee[];
  dataSource2:any=[];
  selectedFeatures: any = [];
  s:sample;
  constructor(private formbulider: FormBuilder, private employeeService:EmployeeService,private _snackBar:MatSnackBar,private http: HttpClient) 
  {
    
   }  
  
  ngOnInit() {  
    this.employeeForm = this.formbulider.group({  
      MasterName: ['', [Validators.required]],  
      Value: ['', [Validators.required]],   
    });  
    this.loadAll();
    
  }  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });  }
 loadAll() {  
    this.allEmployees = this.employeeService.getAllValues();  
    
 } 
  onFormSubmit() {  
    this.dataSaved = false;  
    const employee = this.employeeForm.value;  
    this.Create(employee); 
     
    this.employeeForm.controls['Value'].reset();  
  }  
 
  Create(employee: Employee) {  
    if (this.employeeIdUpdate == null) {  
      this.employeeService.InsertValue(employee).subscribe(  
        () => {  
          this.dataSaved = true;           
          this.message = 'Record Added Successfully';  
          this.openSnackBar(this.message,"Close");
          this.loadAll();  
          this.employeeIdUpdate = null;  
          
          
        }  
        
      );  
    
    }  
  }   
  deleteValue(employeeId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.employeeService.deleteValueById(employeeId).subscribe(() => {  
      this.dataSaved = true;  
      this.message = 'Record Deleted Successfully';  
      this.openSnackBar(this.message,"Close");
      this.loadAll();  
      this.employeeIdUpdate = null;  
      this.employeeForm.controls['Value'].reset();  
  
    });  
  }  
}
  saveForm(){
    if(confirm("Are you sure you want to save this ?") )
    {       
      this.employeeService.saveMaster().subscribe(() => {  
        this.dataSaved = true;        
        this.message = 'Record Saved Successfully'; 
        this.openSnackBar(this.message,"Close");
        this.loadAll();  
        this.employeeIdUpdate = null;  
        this.employeeForm.reset();  
      });  
    
    } 
    
  }
  resetForm() {  
    this.employeeForm.controls['MasterName'].reset();  
    this.message = null;  
    this.dataSaved = false;  
  }  

}  
