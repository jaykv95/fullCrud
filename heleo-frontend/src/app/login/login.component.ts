import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import {first} from 'rxjs/operators'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    localStorage.clear();
    this.loginForm = this.fb.group({
      email: ['',[ Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value) .pipe(first())
      .subscribe(
        data => {
         console.log(data)
         this.router.navigate(['home'])
        },
        error => {
          this.loading = false;
        })
  }

}
