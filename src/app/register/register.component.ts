import { Component, EventEmitter, inject, Inject, input, Input, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 // @Input() usersFromHomeComponent:any; // Old approch for parent to child communication
 //usersFromHomeComponent = input.required<any>() // Using input Signal for parent to child communication
 //@Output() cancelRegister = new EventEmitter(); // Child to Parent communication
 cancelRegister = output<boolean>(); // New way to doing without EventEmitter
 private accountService = inject(AccountService);

  model:any = {}

  register()
  {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => console.log(error)
    })
  }

  cancel()
  {
    this.cancelRegister.emit(false);
  }

}
