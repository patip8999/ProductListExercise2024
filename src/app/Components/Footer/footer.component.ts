import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component ({
    templateUrl: './footer.component.html',
    standalone: true,
    imports: [CommonModule],
    selector: 'app-footer'
})
export class FooterComponent {
    @Input() linkUrl!: string; // Użyj `!` jeśli masz pewność, że będzie dostępne
    @Input() linkText!: string; 
    @Input() companyName!: string; 
  
    currentYear = new Date().getFullYear();
}