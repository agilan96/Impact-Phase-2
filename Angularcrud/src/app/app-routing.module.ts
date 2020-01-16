import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent }      from './employee/employee.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { MasterComponent } from './master/master.component';
import { EditComponent } from './edit/edit.component';
import { DemoComponent } from './demo/demo.component';

export const appRoutes: Routes = [
  { path: 'home', component: EmployeeComponent,canActivate:[AuthGuard] },
 
  {path: 'employee', component:EmployeeComponent},
  
  {path: 'master', component:MasterComponent},
  {path: 'demo', component:DemoComponent},
  {path: 'edit', component:EditComponent},
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
},
{ path : '', redirectTo:'/login', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
