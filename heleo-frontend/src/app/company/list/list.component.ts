import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../data-service.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private dataService: DataServiceService, private router: Router) { }
  allCompany: any = [];
  ngOnInit() {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.dataService.getAll().subscribe(
      res => {
        this.allCompany = res;
        console.log(this.allCompany)
      },
      err => {
        console.log(err)
      }
    )
  }

  delete(company) {
    this.dataService.deleteCompany(company.id).subscribe(
      res => {
        console.log(res)
        this.getAllCompanies();
      },
      err => {
        console.log(err)
      })
  }
  edit(company) {
    this.router.navigate(['editCompany', company.id])
  }
}

