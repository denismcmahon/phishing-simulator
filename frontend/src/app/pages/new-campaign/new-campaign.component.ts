import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar.component';
import { Router } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { EmailTemplateService } from '../../services/email-template.service';
import { TargetService } from '../../services/target.service';

@Component({
  selector: 'app-new-campaign',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './new-campaign.component.html',
})
export class NewCampaignComponent implements OnInit {
  name = '';
  startDate = '';
  emailTemplateId = '';
  selectedTargets: string[] = [];

  templates: any[] = [];
  targets: any[] = [];
  errorMessage = '';
  successMessage = '';

  constructor(
    private campaignService: CampaignService,
    private templateService: EmailTemplateService,
    private targetService: TargetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.templateService.getTemplates().subscribe((data) => (this.templates = data));
    this.targetService.getTargets().subscribe((data) => (this.targets = data));
  }

  onToggleTarget(id: string, checked: boolean): void {
    if (checked) {
      this.selectedTargets.push(id);
    } else {
      this.selectedTargets = this.selectedTargets.filter(t => t !== id);
    }
  }

  onCheckboxChange(event: Event, id: string): void {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;

    this.onToggleTarget(id, isChecked);
  }

  onSubmit(): void {
    if (!this.name || !this.emailTemplateId || this.selectedTargets.length === 0) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.campaignService.createCampaign({
      name: this.name,
      startDate: new Date(this.startDate),
      emailTemplateId: this.emailTemplateId,
      targets: this.selectedTargets
    }).subscribe({
      next: () => {
        this.successMessage = 'Campaign created!';
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      },
      error: () => this.errorMessage = 'Something went wrong.'
    });
  }
}
