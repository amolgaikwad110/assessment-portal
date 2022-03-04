import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { AssessmentService } from '../assessment.service';
import { questions } from '../data/questions';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, OnDestroy {

  questions: any = [];
  skillId: any;
  isQuestionSubmitted = false;
  score = 0;

  constructor(
    private service: AssessmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log(this.router.getCurrentNavigation()!.extras.state);
    this.skillId = this.router.getCurrentNavigation()!.extras.state || 1;
  }

  ngOnInit(): void {

    this.service.getQuestions(+this.skillId).subscribe((res:any) => {
      this.questions = res['questions'];
      this.questions.map((question: any) => {
        question['answer'] = '';
      });
    });

    // this.service.testTimeout$.subscribe((res: boolean) => {
    //   if (res) {
    //     console.log('Test Timeout');
    //     this.onSubmit();
    //   }
    // });
  }

  onChange(index: number, option: string) {
    this.questions[index].answer = option;
  }

  onSubmit() {
    let questions = this.questions.map((question: any) => {
      return {
        questionId: question['questionId'],
        answer: question['answer'],
      };
    });

    console.log('Submit', questions);

    this.service.submitQuiz(this.skillId , questions).subscribe((res:any) => {
      console.log('Quizes Submitted Successfully');
      // this.router.navigate(['/result', { state: res['score'] }]);
      this.isQuestionSubmitted = true;
      this.score = res['score']
    });

  }

  ngOnDestroy(): void {
    this.service.testTimeout$.unsubscribe();
  }
}
