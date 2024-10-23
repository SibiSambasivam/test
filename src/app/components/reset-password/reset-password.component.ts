import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  newPassword: string = '';

  constructor(private authService: AuthService, private msgService: MessageService) { }

  resetPassword() {
    this.authService.getUserByEmail(this.email).subscribe(users => {
      if (users.length > 0) {
        const user = users[0]; 
        user.password = this.newPassword;

        this.authService.updateUser(user).subscribe(() => {
          this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Password reset successful' });
        }, error => {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update password' });
        });
      } else {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Email not found' });
      }
    });
  }
}
