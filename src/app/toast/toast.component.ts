import { Component, Input, OnInit, Output } from '@angular/core';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  @Input() message = '';

  @Input() type = '';

  @Input() isShown!: boolean;

  constructor(private service: AssessmentService) { }

  ngOnInit(): void {

  }

  close() {
    this.service.close$.next(true);
  }

}
