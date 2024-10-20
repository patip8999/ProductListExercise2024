import { Component, inject, Signal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CategoriesService } from "../../Services/categories.service";
import { toSignal } from "@angular/core/rxjs-interop";
@Component({
    templateUrl: './navbar.component.html',
    standalone: true,
    imports:[RouterModule],
    selector: 'app-navbar'
})
export class NavbarComponent {
    categoriesService: CategoriesService = inject(CategoriesService);
    categoriesSignal: Signal<string[]> = toSignal(this.categoriesService.getAll(), { initialValue: []})
}