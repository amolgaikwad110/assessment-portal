import { Component, OnInit } from '@angular/core';
import { AssessmentService } from './assessment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'assessment-tool';

  type = '';

  message = '';

  isShown!: boolean;

  constructor(private service: AssessmentService) {}

  ngOnInit() {
    this.service.toast$.subscribe((res: any) => {
      this.type = res['type'];
      this.message = res['message'];
      this.isShown = true;
    });

    this.service.close$.subscribe((res: boolean) => {
      this.isShown = !res;
    });
  }

  ngOnDestroy() {
    this.service.toast$.unsubscribe();
    this.service.close$.unsubscribe();
  }
}
