import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  countDown!:Subscription;
  counter = 10;
  tick = 1000;
  constructor(private service: AssessmentService) { }

  ngOnInit(): void {
    if(this.counter >= 0) {
      this.countDown = timer(0, this.tick)
      .subscribe(() => {
        --this.counter;
        if(this.counter === 0) {
          this.service.testTimeout$.next(true);
        }
      }) 
    }
  }

  ngOnDestroy(){
    this.countDown.unsubscribe();
  }

}
