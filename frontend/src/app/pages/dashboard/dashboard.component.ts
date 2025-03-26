import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar.component';
import { RouterLink } from '@angular/router';
import { CampaignService, Campaign } from '../../services/campaign.service';
import { TargetService } from '../../services/target.service';

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

  constructor(
    private campaignService: CampaignService,
    private targetService: TargetService
  ) {}

  ngOnInit(): void {
    this.loadCampaigns();
    this.loadTargetCount();
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
}
