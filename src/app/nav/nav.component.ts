import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule, NgIf } from '@angular/common';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,CommonModule,BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService); // Make account service public to use in template as well
  //loggedIn = false;
  model:any = {};


  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        //this.loggedIn = true;
      },
      error: error => console.log(error),
    })
  }

  logout()
  {
    this.accountService.logout();
    //this.loggedIn = false;
  }

}
