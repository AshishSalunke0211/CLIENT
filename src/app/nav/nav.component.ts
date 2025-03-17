import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule, NgIf, TitleCasePipe } from '@angular/common';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown'
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,CommonModule,BsDropdownModule,RouterLink,RouterLinkActive,TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService); // Make account service public to use in template as well
  //loggedIn = false;
  model:any = {};
  private router = inject(Router)
  private toastr = inject(ToastrService)


  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members');
        //this.loggedIn = true;
      },
      error: error => this.toastr.error(error.error)
    })
  }

  logout()
  {
    this.accountService.logout();
    //this.loggedIn = false;
    this.router.navigateByUrl('/');
  }

}
