import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Employee, Master } from './employee'; 
import { create } from 'domain';
import { createHostListener } from '@angular/compiler/src/core';
 
 @Injectable({  
  providedIn: 'root'  
})  
  
export class EmployeeService {  
  url = 'https://localhost:44308/Api/Employee';  
  constructor(private http: HttpClient) { }  
  
 getAllValues(): Observable<Employee[]> {  
    return this.http.get<Employee[]>(this.url + '/AllValues');  
  } 
  getEmployeeById(employeeId: bigint): Observable<Employee> {  
    return this.http.get<Employee>(this.url + '/GetEmployeeDetailsById/' + employeeId);  
  }  
  InsertValue(employee: Employee): Observable<Employee> { 
    console.log(employee); 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Employee>(this.url + '/InsertValues/',  
    employee, httpOptions);  
  }  
  deleteValueById(employeeid: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteValues?id=' +employeeid,  
 httpOptions);  
  }  
  saveMaster(): Observable<string> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<string>(this.url + '/SaveValues',
     httpOptions);    
  }
  enableValue(employee: Employee): Observable<Employee> {  
    console.log(employee);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Employee>(this.url + '/enable/',  
    employee, httpOptions);  
  }  
  disableValue(employee: Employee): Observable<Employee> {  
    console.log(employee);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Employee>(this.url + '/disable/',  
    employee, httpOptions);  
  }  
 
}  