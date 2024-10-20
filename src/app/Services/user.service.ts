import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Credentials {
    readonly email: string;
    readonly  username: string;
    readonly password: string;
    readonly roles: string[];
    
}

export interface LoginResponse {
    data: {
        id: string;
    };
}



@Injectable({ providedIn: 'root'})
export class UserService {
    httpClient: HttpClient = inject(HttpClient);
    
    register(credentials: Credentials): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>( 'https://fakestoreapi.com/users',
            {
                data: credentials
            }
        )
    }
}
