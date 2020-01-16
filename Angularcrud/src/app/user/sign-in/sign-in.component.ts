import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean=false;
  employeeForm: any;  
  username:string;
  password:string;
  hide = true;
  constructor(private userService : UserService,private router : Router,private formbulider: FormBuilder,private _snackBar:MatSnackBar) { }

  ngOnInit() {
    this.employeeForm = this.formbulider.group({  
      Username: ['', [Validators.required]],  
      Password: ['', [Validators.required]],   
    });  
   
  }
  
  myFunction() {
    this.hide = !this.hide;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });  }

  OnSubmit(){

   this.username=this.employeeForm.value.Username;
   this.password=this.employeeForm.value.Password;
     this.userService.userAuthentication(this.username,this.password).subscribe((data : any)=>{
      
    
      localStorage.setItem('userToken',data.access_token);   
      this.router.navigate(['/home']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
      if(this.isLoginError==true)
   {
     
     this.openSnackBar("Invalid Username or Password","Close"); 
  
   };
    }
   )
   
    
  }

}
