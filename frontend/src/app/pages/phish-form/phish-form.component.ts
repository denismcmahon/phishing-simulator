import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-phish-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './phish-form.component.html',
  styleUrls: ['./phish-form.component.scss']
})
export class PhishFormComponent {
  campaignId: string = '';
  submitted = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.campaignId = this.route.snapshot.paramMap.get('campaignId') || '';
  }

  onSubmit() {
    this.http
      .post(`http://localhost:3000/api/campaigns/track-submit/${this.campaignId}`, {})
      .subscribe({
        next: () => {
          console.log('✅ Submit successful');
          this.submitted = true;
        },
        error: (err) => {
          console.error('❌ Error submitting phishing form:', err);
          alert('An error occurred. Please try again.');
        }
      });
  }
}
