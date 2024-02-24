import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Service } from "../service/service.service";
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

// export interface BookList {
//   Title: String,
//   Author: String,
//   ISBN: Number
// }
export class BookListComponent implements OnInit {
  current_page    : number = 1;
  BookDetails: any = []
  failurePopup: boolean = false;
  message: string = '';
  display: any = 'none';
  successPopup: boolean = false;
  isbn: Number = 0;
  totalPage: number = 0;
  skip: number = 0;
  limit: number = 10;
  isPaginationBth : boolean = false;
  // BookList
  constructor(private route: Router, private getData: Service) { }
  ngOnInit(): void {
    this.getBookList();
  }

  bookEdit = (id: number) => {
    this.route.navigate([`book_edit/${id}`])
  }
  bookReadDescribtion = (id: number) => {
    this.route.navigate([`book_description/${id}`])
  }
  getBookList() {
    this.getData.apiCall({ n_Skip: this.skip, n_Limit: this.limit }, "POST", "book/bookList").subscribe((res: any) => {
      if (res.status == 1) {
        this.failurePopup = false;
        this.BookDetails = res.data;
        this.totalPage =res.total;
        this.skip =res.skip
        this.limit =res.limit
        this.isPaginationBth =res.total >=10 ? true : false;

      } else {
        this.failurePopup = true;
        this.message = res.message;
      }
    })
  }
  confirMation(id: number) {
    this.display = 'block'
    this.isbn = id;
  }
  closeModal() {
    this.display = 'none';
  }
  deleteBook() {
    this.getData.apiCall({ isbn: this.isbn }, "POST", "book/bookDelete").subscribe((res: any) => {
      if (res.status == 1) {
        this.failurePopup = false;
        this.successPopup = true;
        this.message = res.message;
        this.getBookList();
      } else {
        this.failurePopup = true;
        this.successPopup = false;
        this.message = res.message;
      }
      setTimeout(() => {
        this.failurePopup = false;
        this.successPopup = false;
        this.message = '';
        this.display = 'none';
      }, 6000);
    })
  }
  getPage(current_page:any)
  {
      this.current_page = current_page;
      if(current_page == 1)
      {
          this.skip = 0 
      }
      else
      {
          this.skip = (current_page - 1) * this.limit;
      }
      var where_val = {
        n_Skip   : this.skip,
        n_Limit    : this.limit,
    }
      this.getData.apiCall(where_val, "POST", "book/bookList").subscribe((res: any) => {
        if (res.status == 1) {
          this.failurePopup = false;
          this.BookDetails = res.data;
          this.totalPage =res.total;
          this.skip =res.skip
          this.limit =res.limit
          this.isPaginationBth =res.total >=1 ? true : false;
        } else {
          this.failurePopup = true;
          this.message = res.message;
        }
      })
    }
}
