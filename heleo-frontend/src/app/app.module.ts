import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthServiceService } from './auth-service.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { ListComponent } from './company/list/list.component';
import { AddComponent } from './company/add/add.component';
import { EditComponent } from './company/edit/edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    PageNotFoundComponent
  ],
  imports: [FormsModule, ReactiveFormsModule,
    BrowserModule,HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
