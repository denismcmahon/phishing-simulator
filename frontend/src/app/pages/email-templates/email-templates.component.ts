import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailTemplateService } from '../../services/email-template.service';
import { EmailTemplate } from '../../models/email-template.model';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar.component';

@Component({
  selector: 'app-email-templates',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './email-templates.component.html',
  styleUrl: './email-templates.component.scss'
})
export class EmailTemplatesComponent implements OnInit {
  templates: EmailTemplate[] = [];
  selectedTemplate: EmailTemplate | null = null;
  isNew = false;

  constructor(private templateService: EmailTemplateService) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.templateService.getTemplates().subscribe({
      next: (data) => this.templates = data,
      error: () => alert('Failed to load templates')
    });
  }

  startNewTemplate(): void {
    this.selectedTemplate = { _id: '', name: '', subject: '', body: '' };
    this.isNew = true;
  }

  editTemplate(template: EmailTemplate): void {
    this.selectedTemplate = { ...template };
    this.isNew = false;
  }

  saveTemplate(): void {
    if (!this.selectedTemplate) return;

    const op = this.isNew
      ? this.templateService.createTemplate(this.selectedTemplate)
      : this.templateService.updateTemplate(this.selectedTemplate._id, this.selectedTemplate);

    op.subscribe({
      next: () => {
        this.loadTemplates();
        this.selectedTemplate = null;
      },
      error: () => alert('Error saving template')
    });
  }

  deleteTemplate(id: string): void {
    console.log('DM ==> deleteTemplate ==> this.templates: ', this.templates);
    console.log('DM ==> deleteTemplate ==> id: ', id);
    if (!confirm('Delete this template?')) return;

    this.templateService.deleteTemplate(id).subscribe({
      next: () => this.loadTemplates(),
      error: () => alert('Error deleting template')
    });
  }

  cancelEdit(): void {
    this.selectedTemplate = null;
  }
}
