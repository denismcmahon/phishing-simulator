import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Redirecting...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: err => {
        this.errorMessage = err.error.message || 'Something went wrong';
      }
    });
  }
}
