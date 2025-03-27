import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-click',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-click.component.html'
})
export class TrackClickComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const campaignId = this.route.snapshot.paramMap.get('campaignId');
    const targetId = this.route.snapshot.paramMap.get('targetId');
    console.log('DM ==> track-click.component.ts ==> campaignId: ', campaignId);
    console.log('DM ==> track-click.component.ts ==> targetId: ', targetId);
    if (!campaignId || !targetId) {
      this.router.navigate(['/login']);
      return;
    }
    this.http
      .post('http://localhost:3000/api/campaigns/log-click', { campaignId, targetId })
      .subscribe({
        next: () => {
          console.log('DM ==> logged click now more to phishing form page ==> campaignId: ', campaignId);
          this.router.navigate([`/phish-form/${campaignId}`], {
            queryParams: { targetId }
          });
        },
        error: () => {
          this.router.navigate(['/login']);
        }
      });
  }
}
