import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { EmployeeService } from '../employee.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialog } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { element } from 'protractor';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; 

export interface Master {
 MasterName:string;
 Value:string;
}
export class Employee {  
  Id:string;
   MasterName: string;  
   Value: string;  
    Deleted:string;
} 


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
  
})
export class MasterComponent implements OnInit {
  
  checked: boolean = false;
  allLists: any;
  displayedColumns: string[] = ['MasterName', 'Action'];
  displayedColumns2:string[]=['Value','buttons'];
  dataSource : MatTableDataSource<Master[]>;
  allValues: Employee[];
  sam:Master[];
  List:string;
  dataSource2: MatTableDataSource<Employee[]>;
  name1:string;
  name2:Employee;
  isValid:boolean;
  selection = new SelectionModel<Master>(true,[]);
  employeeForm: any;  
  dataSaved = false;  
  employee1: Employee;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) paginator2: MatPaginator;

   
  constructor(private employeeService : EmployeeService,private httpService: HttpClient,public dialog:MatDialog,private formbulider: FormBuilder) { 
  
  }

  ngOnInit(){
    this.employeeForm = this.formbulider.group({  
       
      Value: ['', [Validators.required]],   
    });
    this.loadAllMasterLists().subscribe(result =>{
      this.dataSource = new MatTableDataSource(result) as any;
      this.sam=result;
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.isValid=true;
     
    })
   
  this.loadAllMasterLists();
 

  }
  onFormSubmit() {  
  
    this.dataSaved = false;  
    const employee = this.employeeForm.value;  
    
    this.employee1=this.employeeForm.value;
    this.employee1.Deleted="0";
    this.employee1.Id="0";
    this.employee1.MasterName=this.List;
    console.log(this.employee1);

    this.add(employee); 
    
     
    this.employeeForm.controls['Value'].reset();  
  }  
  
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();

}

 
}
applyFilter2(filterValue: string) {
  this.dataSource2.filter = filterValue.trim().toLowerCase();

  if (this.dataSource2.paginator) {
    this.dataSource2.paginator.firstPage();

}


}
add(employee: Employee)
  {
    console.log(employee);
    this.employeeService.InsertValue(employee).subscribe(()=>{
      this.getMaster(this.List);
      this.dataSource2.paginator = this.paginator2;
    });
  }
loadAllMasterLists() {  
    
  return this.httpService.get<Master[]>('https://localhost:44308/Api/Employee/All');
  
}
getMaster(master:string)
{
  this.httpService.get<Employee[]>('https://localhost:44308/Api/Employee/Selected/'+master).subscribe(value => { 
  this.allValues=value;  
  this.List=master;
  
  this.dataSource2=new MatTableDataSource(value) as any;
  console.log(this.dataSource2);
  
  
 
  this.isValid=false;
 
});

}
enable(employee: Employee){  

 this.employeeService.enableValue(employee).subscribe(()=>{this.loadAllMasterLists();this.getMaster(employee.MasterName);});
 
}
disable(employee: Employee){  
console.log(employee);
this.employeeService.disableValue(employee).subscribe(()=>{this.loadAllMasterLists();this.getMaster(employee.MasterName);});

}
back(){
  this.isValid=false;
  this.ngOnInit();
}

onChange(employee:Employee) {
 
  console.log(employee.Value);
 if(!employee.Deleted)
 {
   this.disable(employee);
 }
 else{
  this.enable(employee);
 }
}



  
}