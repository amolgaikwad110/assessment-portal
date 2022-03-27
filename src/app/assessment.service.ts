import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  // baseUrl = 'http://localhost:8080/v1/';
  baseUrl = 'https://emp-assissment.herokuapp.com/v1/';

  baseUrlDashboard = 'https://emp-assissment.herokuapp.com/dashboard/';

  testTimeout$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());

  toast$ = new BehaviorSubject<any>({});

  close$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  /**
   * TODO::--Create Interface for Questions
   */
  getQuestions(skillId: number) {
    return this.http.get(this.baseUrl + 'questions?skillId=' + skillId);
  }

  /**
   * TODO::--Create Interface for Register
   */
  register(data: any) {
    return this.http.post(this.baseUrl + 'employee', data);
  }

  /**
   * TODO::--Create Interface for Login
   */
  login(data: any) {
    return this.http.post(this.baseUrl + 'authenticate', data);
  }

  /**
   * submit quizes
   */
  submitQuizes(data: any) {
    return this.http.post(this.baseUrl + 'evaluate', data);
  }

  /**
   * Submit observable
   */
  submitQuiz(skillId: number, data: any) {
    return this.http.post(this.baseUrl + `evaluate?skillId=${skillId}`, data);
  }

  /**
   * Get if user is loggedIn
   */
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  // Get Users
  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }


}
