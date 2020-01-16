import { BrowserModule } from '@angular/platform-browser';  
import { NgModule } from '@angular/core';  
import { EmployeeService } from './employee.service';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClient } from '@angular/common/http';  
import {  
  MatButtonModule, MatMenuModule, MatDatepickerModule,MatNativeDateModule , MatIconModule, MatCardModule, MatSidenavModule,MatFormFieldModule,  
  MatInputModule, MatTooltipModule, MatToolbarModule, MatTableDataSource, MatTableModule, MatSnackBar, MatSnackBarModule, MatPaginator, MatCheckboxModule  
} from '@angular/material';  
import { MatSelectModule} from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';   
import { AppRoutingModule } from './app-routing.module';  
import { AppComponent } from './app.component';  
import { EmployeeComponent } from './employee/employee.component';
import { NavbarComponent } from './navbar/navbar.component';  
import { RouterModule } from '@angular/router'
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { appRoutes } from './app-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MasterComponent } from './master/master.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EditComponent } from './edit/edit.component';
import { DemoComponent } from './demo/demo.component';

  

@NgModule({  
  declarations: [  
    AppComponent,  
    EmployeeComponent, NavbarComponent,UserComponent,
    SignInComponent,
    MasterComponent,
    EditComponent,
    DemoComponent,
    
  ],  
  imports: [  
    BrowserModule,  
    FormsModule,  
    ReactiveFormsModule,  
    HttpClientModule,  
    BrowserAnimationsModule,  
    MatButtonModule,  
    MatMenuModule,  
    MatDatepickerModule,  
    MatNativeDateModule,  
    MatIconModule,  
    MatRadioModule,  
    MatCardModule,  
    MatSidenavModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatTooltipModule,  
    MatToolbarModule,  
    AppRoutingModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes),
    MatCheckboxModule,
    MatPaginatorModule
  ],  
  exports:[ MatTableModule,
    ],
  providers: [HttpClientModule, EmployeeService,MatDatepickerModule,UserService,AuthGuard,
    ,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }
  ],  
  bootstrap: [AppComponent]  
})  
export class AppModule { }  