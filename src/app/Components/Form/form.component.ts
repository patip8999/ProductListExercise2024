import { Component, inject, signal, WritableSignal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Credentials, UserService } from "../../Services/user.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    templateUrl: './form.component.html',
    standalone: true,
    imports: [RouterModule, CommonModule, FormsModule]
})
export class FormComponent {
    private readonly formService: UserService = inject(UserService); 
    public message: WritableSignal<string> = signal(''); 
    public model: WritableSignal<Credentials> = signal({
        email: '',
        username: '',
        password: '',
        roles: []
    });

    public roles: string[] = ['Merchant', 'Seller']; 

    public OnFormSubmitted(loginForm: any): void { 
        console.log('Dane formularza zostały przesłane:', {
            email: this.model().email,
            username: this.model().username,
            password: this.model().password,
            roles: this.model().roles,
        });

        this.formService.register({
            email: this.model().email,
            password: this.model().password,
            username: this.model().username,
            roles: this.model().roles,
        }).subscribe({
            next: (response) => {
                this.message.set('User registered successfully');
                loginForm.reset();
            }
        });
    }

   
}