// src/app/services/campaign.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Campaign {
  _id: string;
  name: string;
  emailTemplateId?: string;
  targets?: string[];

  sent: number;
  clicks: number;
  submits: number;

  status: 'Draft' | 'Ongoing' | 'Done';
  startDate?: Date;
  endDate?: Date;
}

@Injectable({ providedIn: 'root' })
export class CampaignService {
  private apiUrl = 'http://localhost:3000/api/campaigns';

  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.apiUrl);
  }

  createCampaign(data: Partial<Campaign>): Observable<Campaign> {
    return this.http.post<Campaign>(this.apiUrl, data);
  }

  updateCampaign(id: string, data: Partial<Campaign>): Observable<Campaign> {
    return this.http.put<Campaign>(`${this.apiUrl}/${id}`, data);
  }

  deleteCampaign(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  sendCampaign(id: string) {
    return this.http.post(`${this.apiUrl}/${id}/send`, {});
  }
}
