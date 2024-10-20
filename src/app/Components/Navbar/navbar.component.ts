import { Component, inject, Signal } from "@angular/core";
import { RouterModule } from "@angular/router";

import { toSignal } from "@angular/core/rxjs-interop";
import { CategoriesService } from "../../Services/categories.service";
@Component({
    templateUrl: './navbar.component.html',
    standalone: true,
    imports:[RouterModule],
    selector: 'app-navbar'
})
export class NavbarComponent {
    categoriesService: CategoriesService = inject(CategoriesService);
    buttonColorr: string[] = ['#DDA0DD', '#DB7093', '#00BFFF', '#008B8B'];
    categoriesSignal: Signal<string[]> = toSignal(this.categoriesService.getAll(), { initialValue: []});
}