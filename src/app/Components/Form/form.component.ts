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
    formService: UserService = inject(UserService);
    message: WritableSignal<string> = signal('');
    model: WritableSignal<Credentials> = signal({
        email:'',
        username:'',
        password:'',
        roles:[]
    });

    roles: string[] = ['Merchant', 'Seller']

    OnFormSubmitted(loginForm: any) {
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
                loginForm.reset()
            }
        })
    }

    toggleRole(role: string) {
    const currentRoles = this.model().roles;
    const updateRoles = [];

    let roleExist = false;
    for ( const currentRole of currentRoles) {
        if (currentRole === role) {
            roleExist = true;

        } else {
            updateRoles.push(currentRole);
        }

    }
    if(!roleExist) {
        updateRoles.push(role);
    }
    this.model.set({
        email: this.model().email,
        username: this.model().username,
        password: this.model().password,
        roles: updateRoles,
     
      });


    }
}