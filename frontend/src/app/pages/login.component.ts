import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.errorMessage = err.error.message || 'Invalid credentials';
      }
    });
  }
}
