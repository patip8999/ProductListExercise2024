import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    templateUrl: './navbar.component.html',
    standalone: true,
    imports: [RouterModule],
    selector: 'app-navbar',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}