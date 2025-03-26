import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailTemplate } from '../models/email-template.model';

@Injectable({ providedIn: 'root' })
export class EmailTemplateService {
  private apiUrl = 'http://localhost:3000/api/email-templates';

  constructor(private http: HttpClient) {}

  getTemplates(): Observable<EmailTemplate[]> {
    return this.http.get<EmailTemplate[]>(this.apiUrl);
  }

  createTemplate(template: Partial<EmailTemplate>): Observable<EmailTemplate> {
    return this.http.post<EmailTemplate>(this.apiUrl, template);
  }

  updateTemplate(id: string, template: Partial<EmailTemplate>): Observable<EmailTemplate> {
    return this.http.put<EmailTemplate>(`${this.apiUrl}/${id}`, template);
  }

  deleteTemplate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
