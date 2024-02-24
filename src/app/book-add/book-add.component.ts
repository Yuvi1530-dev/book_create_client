import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, AbstractControl, Validators } from "@angular/forms";
import { Service } from "../service/service.service";
@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  bookAddForm: FormGroup;
  formSubmit: boolean = false;
  successPopup: boolean = false;
  failurePopup: boolean = false;
  message: String="";
  constructor(private fb: FormBuilder, private sendData: Service) {
    this.bookAddForm = this.fb.group({
      title: ['', [Validators.required,Validators.minLength(3)]],
      author: ['', [Validators.required,Validators.minLength(3)]],
      publication_year: ['', [Validators.required,Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(30)]]
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.bookAddForm.controls;
  }

  ngOnInit(): void { }

  creatBook = () => {
    this.formSubmit = true;
    let getFormValues = Object.assign({}, this.bookAddForm.value);
    let payload = {
      title: getFormValues.title,
      author: getFormValues.author,
      publication_year: getFormValues.publication_year,
      description: getFormValues.description
    };
    if (this.bookAddForm.valid) {
      this.sendData.apiCall(payload, "POST", "book/addBook").subscribe((res: any) => {
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
          
          this.bookAddForm.reset();
        }, 10000);
      })
    }

  }
}
