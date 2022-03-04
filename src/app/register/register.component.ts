import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssessmentService } from './../assessment.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: AssessmentService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      employeeId: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      yearsOfExperience: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onRegister() {
    const data = { ...this.registerForm.value };
    if(this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.service.register(data).subscribe((res) => {
        console.log('Register User Successfully');
        this.router.navigateByUrl('/login');

        this.service.toast$.next({
          type: 'success', 
          message: 'You are registered successfully'
        })
      });
    } else {
      console.log('Form is invalid');
      this.service.toast$.next({
        type: 'error', 
        message: 'Please fill all the details.'
      })
    }

  }
}
