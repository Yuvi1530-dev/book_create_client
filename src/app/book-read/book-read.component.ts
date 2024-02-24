import { Component, OnInit } from '@angular/core';
import { Service } from "../service/service.service";
import {ActivatedRoute  } from "@angular/router";
@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.css']
})
// export interface List{

// }
export class BookReadComponent implements OnInit {
  bookRead: any = []
  constructor(private sendData :Service,private getData :ActivatedRoute) {

  }
  ngOnInit(): void {
    let urlData = this.getData.snapshot.params['id']
    this.sendData.apiCall({isbn:urlData}, "POST", "book/findBook").subscribe((res: any) => {
      if (res.status == 1) {
        this.bookRead.push(res.data)
      } else {
      }
    })
  }
}
