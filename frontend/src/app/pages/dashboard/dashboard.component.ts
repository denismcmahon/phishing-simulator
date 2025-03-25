import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dummyCampaigns = [
    { name: 'HR Policy Reminder', sent: 10, clicks: 5, submits: 2, status: 'Done' },
    { name: 'IT Security Check', sent: 7, clicks: 3, submits: 1, status: 'Ongoing' },
    { name: 'Benefit Re-Enrollment', sent: 0, clicks: 0, submits: 0, status: 'Draft' }
  ];
}
