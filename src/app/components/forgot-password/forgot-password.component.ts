import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authService: AuthService, private msgService: MessageService) { }

  sendTemporaryPassword() {
    this.authService.getUserByEmail(this.email).subscribe(users => {
      if (users.length > 0) {
        const user = users[0]; 
        const tempPassword = this.generateTemporaryPassword();
        user.password = tempPassword;

        this.authService.updateUser(user).subscribe(() => {
          this.msgService.add({ severity: 'success', summary: 'Success', detail: `Temporary password sent to ${this.email}: ${tempPassword}` });
        });
      } else {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Email not found' });
      }
    });
  }

  private generateTemporaryPassword(): string {
    return Math.random().toString(36).slice(-8); 
  }
}
