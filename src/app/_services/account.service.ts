import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient); // Inject HttpClient to make HTTP Request 
  baseUrl = 'http://localhost:5000/api/'; // Backend API URL
  currentUser = signal<User | null>(null);


  login(model:any) //in model we send username and password
  {
    return this.http.post<User>(this.baseUrl + 'account/login',model).pipe(  // here we pass model as a body 
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user)); //Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
          this.currentUser.set(user);
        }
      })
    )         
  }

  register(model:any)
  {
    return this.http.post<User>(this.baseUrl + 'account/register' , model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    )
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
