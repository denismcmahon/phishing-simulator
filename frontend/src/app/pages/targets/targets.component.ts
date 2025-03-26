import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetService } from '../../services/target.service';
import { Target } from '../../models/target.model';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar.component';

@Component({
  selector: 'app-targets',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './targets.component.html',
  styleUrl: './targets.component.scss'
})
export class TargetsComponent implements OnInit {
  targets: Target[] = [];
  selectedTarget: Target | null = null;
  isNew = false;

  constructor(private targetService: TargetService) {}

  ngOnInit(): void {
    this.loadTargets();
  }

  loadTargets(): void {
    this.targetService.getTargets().subscribe(data => this.targets = data);
  }

  startNewTarget(): void {
    this.selectedTarget = { email: '' };
    this.isNew = true;
  }

  editTarget(target: Target): void {
    this.selectedTarget = { ...target };
    this.isNew = false;
  }

  saveTarget(): void {
    if (!this.selectedTarget?.email) return;

    const op = this.isNew
      ? this.targetService.createTarget(this.selectedTarget)
      : this.targetService.updateTarget(this.selectedTarget._id!, this.selectedTarget);

    op.subscribe(() => {
      this.loadTargets();
      this.selectedTarget = null;
    });
  }

  deleteTarget(id: string): void {
    if (confirm('Delete this target?')) {
      this.targetService.deleteTarget(id).subscribe(() => this.loadTargets());
    }
  }

  cancelEdit(): void {
    this.selectedTarget = null;
  }
}
