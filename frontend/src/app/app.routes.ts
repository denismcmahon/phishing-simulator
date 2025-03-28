import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmailTemplatesComponent } from './pages/email-templates/email-templates.component';
import { TargetsComponent } from './pages/targets/targets.component';
import { NewCampaignComponent } from './pages/new-campaign/new-campaign.component';
import { PhishFormComponent } from './pages/phish-form/phish-form.component';
import { TrackClickComponent } from './pages/track-click/track-click.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'email-templates', component: EmailTemplatesComponent },
  { path: 'targets', component: TargetsComponent },
  { path: 'new-campaign', component: NewCampaignComponent },
  { path: 'track-click/:campaignId/:targetId', component: TrackClickComponent },
  { path: 'phish-form/:campaignId', component: PhishFormComponent },
  { path: 'test-track', component: TrackClickComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
