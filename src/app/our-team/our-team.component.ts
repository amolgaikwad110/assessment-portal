import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent implements OnInit {

  constructor(private service: AssessmentService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe((res:any) => {
      console.log(res);
    })
  }

}
