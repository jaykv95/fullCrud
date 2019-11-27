import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListComponent } from './company/list/list.component'
import { AddComponent } from './company/add/add.component'
import { EditComponent } from './company/edit/edit.component'


const routes: Routes = [

  { path: 'signUp', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listCompany', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'addCompany', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'editCompany/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
