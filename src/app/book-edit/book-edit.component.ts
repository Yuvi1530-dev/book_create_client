import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../service/service.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookEditForm: FormGroup;
  formSubmit: boolean = false;
  bookList: any = [];
  bookEdit: any = [];
  successPopup: boolean = false;
  failurePopup: boolean = false;
  message: String="";
  constructor(private fb: FormBuilder, private sendData: Service, private getData: ActivatedRoute,private route :Router) {
    this.bookEditForm = this.fb.group({
      title: [null, [Validators.required,Validators.minLength(3)]],
      author: [null, [Validators.required,Validators.minLength(3)]],
      publication_year: [null, [Validators.required,Validators.minLength(4)]],
      description: [null, [Validators.required, Validators.minLength(30)]]
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.bookEditForm.controls;
  }

  ngOnInit(): void {
    let urlData = this.getData.snapshot.params['id']
    this.sendData.apiCall({isbn:urlData}, "POST", "book/findBook").subscribe((res: any) => {
      if (res.status == 1) {
        this.bookList=res.data
      } else {
        this.route.navigate([''])
      }
    })
  }

  creatBook = () => {
    this.formSubmit = true;
    let getFormValues = Object.assign({}, this.bookEditForm.value);
    let payload = {
      title: getFormValues.title,
      author: getFormValues.author,
      publication_year: getFormValues.publication_year,
      isbn:  this.getData.snapshot.params['id'],
      description: getFormValues.description
    };
    if (this.bookEditForm.valid) {
      this.sendData.apiCall(payload, "POST", "book/updateBook").subscribe((res: any) => {
        if (res.status == 1) {
          this.successPopup = true;
          this.failurePopup = false;
          this.message =res.message;
        } else {
          this.successPopup = false;
          this.failurePopup = true;
          this.message =res.message;
        }
        setTimeout(() => {
          this.successPopup = false;
          this.failurePopup = false;
          
          this.route.navigate(['book_list'])
        }, 10000);
      })
    } else {

    }

  }
}
