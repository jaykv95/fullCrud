import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DataServiceService } from '../../data-service.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  companyForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  id: any;
  constructor(private fb: FormBuilder, private router: Router, private dataService: DataServiceService, private activeRoute: ActivatedRoute) { }
  get f() { return this.companyForm.controls }
  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id')
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      owner: ['', [Validators.required]],
      address: ['', Validators.required],
      companyStatus: ['', [Validators.required]],
    })
    this.getDataById();
  }

  getDataById() {
    this.dataService.getById(this.id).subscribe(
      res => {
        console.log(res)
        this.companyForm.controls['companyName'].setValue(res.companyName);
        this.companyForm.controls['owner'].setValue(res.owner);
        this.companyForm.controls['address'].setValue(res.address);
        this.companyForm.controls['companyStatus'].setValue(res.companyStatus);
      },
      err => {
        console.log(err)
      }
    )
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.companyForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.companyForm.value)
    this.dataService.updateCompany(this.id, this.companyForm.value).subscribe(data => {
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
