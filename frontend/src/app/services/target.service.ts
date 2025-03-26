import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Target } from '../models/target.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TargetService {
  private apiUrl = 'http://localhost:3000/api/targets';

  constructor(private http: HttpClient) {}

  getTargets(): Observable<Target[]> {
    return this.http.get<Target[]>(this.apiUrl);
  }

  createTarget(target: Partial<Target>): Observable<Target> {
    return this.http.post<Target>(this.apiUrl, target);
  }

  updateTarget(id: string, target: Partial<Target>): Observable<Target> {
    return this.http.put<Target>(`${this.apiUrl}/${id}`, target);
  }

  deleteTarget(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
