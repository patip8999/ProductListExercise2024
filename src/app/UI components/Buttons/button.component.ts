import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    templateUrl: './button.component.html',
    standalone: true,
    selector: 'app-button',
    imports: [CommonModule]
})

export class ButtonComponent {
    @Input() buttonType: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' = 'primary';
    @Input() label: string = '';
    @Input() isLoading: boolean = false;
    @Output() buttonClick = new EventEmitter<void>();
  
    handleClick() {
      if (!this.isLoading) {
        this.buttonClick.emit();
      }
    }
  }
