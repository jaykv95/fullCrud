import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DataServiceService } from '../../data-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  companyForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private dataService: DataServiceService) { }
  get f() { return this.companyForm.controls }
  ngOnInit() {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      owner: ['', [Validators.required]],
      address: ['', Validators.required],
      companyStatus: ['', [Validators.required]],
    })
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.companyForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.companyForm.value)
    this.dataService.addCompany(this.companyForm.value).subscribe(data => {
      console.log(data)
      this.router.navigate(['listCompany']);
    }, err => {
      console.log(err)
    })
  }
  clear() {
    this.companyForm.reset();
 
  }
}
