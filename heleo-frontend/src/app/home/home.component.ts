import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService:DataServiceService) { }

  ngOnInit() {
this.dataService.getAll().subscribe(data=>{
  console.log(data)
},err=>{
  console.log(err)
}
)
  }

}
