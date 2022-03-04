import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  url = '';

  isLoggedIn = false;

  constructor(private router: Router, private service: AssessmentService) { 
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        console.log(e.url);
        this.url = e.url;
      }
    });
  }

  ngOnInit(): void {
    this.service.isLoggedIn$.subscribe((res: boolean) => {
      this.isLoggedIn = res;
    })
  }

  logout() {
    localStorage.clear();
    this.service.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.service.isLoggedIn$.unsubscribe();
  }
}
