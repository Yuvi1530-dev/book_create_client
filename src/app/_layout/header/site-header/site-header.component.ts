import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  active: Number = 0;
  constructor(private router: Router) { }
  ngOnInit(): void { }

  changeNvaigate = (id: any) => {
    if (id == 1) {
      this.active = 1;
      this.router.navigate(['']);
    } else if (id == 2) {
      this.active = 2;
      this.router.navigate(['/book_list']);

    }
  }
}
