import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailTemplate } from '../../models/email-template.model';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar.component';

@Component({
  selector: 'app-email-templates',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './email-templates.component.html',
  styleUrl: './email-templates.component.scss'
})
export class EmailTemplatesComponent {
  templates: EmailTemplate[] = [
    {
      id: '1',
      name: 'Security Alert',
      subject: 'Your password was reset',
      body: 'Hi, we noticed your password was changed. If this wasn’t you, click here.'
    },
    {
      id: '2',
      name: 'Company Update',
      subject: 'Q1 Benefits Policy',
      body: 'Please review the new HR benefits policy for Q1 2024.'
    }
  ];

  selectedTemplate: EmailTemplate | null = null;
  isNew = false;

  startNewTemplate() {
    this.selectedTemplate = {
      id: '',
      name: '',
      subject: '',
      body: ''
    };
    this.isNew = true;
  }

  editTemplate(template: EmailTemplate) {
    this.selectedTemplate = { ...template };
    this.isNew = false;
  }

  saveTemplate() {
    if (this.isNew) {
      const newTemplate = {
        ...this.selectedTemplate!,
        id: crypto.randomUUID()
      };
      this.templates.push(newTemplate);
    } else {
      const index = this.templates.findIndex(t => t.id === this.selectedTemplate!.id);
      this.templates[index] = this.selectedTemplate!;
    }

    this.selectedTemplate = null;
  }

  deleteTemplate(id: string) {
    this.templates = this.templates.filter(t => t.id !== id);
  }

  cancelEdit() {
    this.selectedTemplate = null;
  }
}
