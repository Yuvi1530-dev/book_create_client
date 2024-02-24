import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BookAddComponent } from './book-add/book-add.component';
import { BookReadComponent } from './book-read/book-read.component';
import {BookEditComponent  } from "./book-edit/book-edit.component";
import { BookListComponent } from "./book-list/book-list.component";
import { SitLayoutComponent } from "./_layout/site/sit-layout/sit-layout.component";
const routes: Routes = [
  {
    path: '',
    component :SitLayoutComponent,
    children: [
      { path: '', component: BookAddComponent, pathMatch: 'full', data: { title: 'Add Book' } },
    ]
  }, {
    path: 'book_description/:id',
    component :SitLayoutComponent,
    children: [
      { path: '', component: BookReadComponent, pathMatch: 'full', data: { title: 'Read Book' } },
    ]
  }, {
    path: 'book_edit/:id',
    component :SitLayoutComponent,
    children: [
      { path: '', component: BookEditComponent, pathMatch: 'full', data: { title: 'Read Edit' } },
    ]
  },{
    path: 'book_list',
    component :SitLayoutComponent,
    children: [
      { path: '', component: BookListComponent, pathMatch: 'full', data: { title: 'Book List' } },
    ]
  }
];

export const routing = RouterModule.forRoot(routes, {
  useHash: false,
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled',
  preloadingStrategy: PreloadAllModules
});
