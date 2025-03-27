import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar.component';
import { RouterLink } from '@angular/router';
import { CampaignService, Campaign } from '../../services/campaign.service';
import { TargetService } from '../../services/target.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  campaigns: Campaign[] = [];
  totalCampaigns = 0;
  totalTargets = 0;
  phishRate: number = 0;

  constructor(
    private campaignService: CampaignService,
    private targetService: TargetService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadCampaigns();
    this.loadTargetCount();
    this.fetchPhishRate();
  }

  loadCampaigns(): void {
    this.campaignService.getCampaigns().subscribe((data) => {
      this.campaigns = data;
      this.totalCampaigns = data.length;
    });
  }

  loadTargetCount(): void {
    this.targetService.getTargets().subscribe((data) => {
      this.totalTargets = data.length;
    });
  }

  sendCampaign(id: string): void {
    this.campaignService.sendCampaign(id).subscribe({
      next: () => this.loadCampaigns(),
      error: () => alert('Failed to send campaign')
    });
  }

  fetchPhishRate() {
    this.http.get<{ phishRate: number }>('http://localhost:3000/api/campaigns/stats/phish-rate')
      .subscribe({
        next: (res) => {
          console.log('DM ==> res.phishRate: ', res.phishRate);
          this.phishRate = res.phishRate;
        },
        error: (err) => {
          console.error('Failed to load phish rate:', err);
        }
      });
  }

}
