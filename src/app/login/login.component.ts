import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  /**
   * This is currently only on Frontend
   */
  skills = [
    {
      skillName: 'Angular',
      skillId: 1,
    },
    {
      skillName: 'Java',
      skillId: 2,
    },
    {
      skillName: 'DevOps',
      skillId: 3,
    },
  ];

  constructor(
    private router: Router,
    private service: AssessmentService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      employeeId: ['', Validators.required],
      password: ['', Validators.required],
      skills: ['', Validators.required],
    });
  }

  login() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      const data = {
        employeeId: this.loginForm.value.employeeId,
        password: this.loginForm.value.password,
        skills: this.loginForm.value.skills,
      };

      console.log('Data >>>', data);
      this.service.login(data).subscribe((res: any) => {
        localStorage['token'] = res["jwt"];
        this.service.isLoggedIn$.next(true);
        this.router.navigateByUrl('/quiz', { state: data.skills });

        this.service.toast$.next({
          type: 'success',
          message: 'You are logged in successfully'
        })
      }, (err: any) => {
        this.service.isLoggedIn$.next(false);
        this.service.toast$.next({
          type: 'error',
          message: 'Internal server error'
        })
      });
    } else {
      this.service.isLoggedIn$.next(false);
      this.service.toast$.next({
        type: 'error',
        message: 'Please fill all the details.'
      })
    }
  }
}
