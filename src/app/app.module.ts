import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookReadComponent } from './book-read/book-read.component';
import { Service } from "./service/service.service";
import {  HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { SiteHeaderComponent } from './_layout/header/site-header/site-header.component';
import { SitLayoutComponent } from './_layout/site/sit-layout/sit-layout.component';

import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    BookAddComponent,
    BookReadComponent,
    BookEditComponent,
    BookListComponent,
    SiteHeaderComponent,
    SitLayoutComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    routing
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
