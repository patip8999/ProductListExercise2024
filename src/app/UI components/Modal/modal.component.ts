import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    templateUrl: './modal.component.html',
    standalone: true,
    imports: [],
    selector: 'app-modal'
})
export class ModalComponent {
    @Output() close = new EventEmitter<void>();
    onClose() {
        this.close.emit();
    }
}