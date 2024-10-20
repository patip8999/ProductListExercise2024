import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductModel } from "../Models/product.model";


@Injectable({ providedIn: 'root'})
export class Productservice {
    httpClient: HttpClient = inject(HttpClient);

getAllInCategory(category: string): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]> ( `https://fakestoreapi.com/products/category/${category}`)
}

getAll(): Observable<ProductModel[]> {
return this.httpClient.get<ProductModel[]> ('https://fakestoreapi.com/products')
}

getOne(id: string): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`https://fakestoreapi.com/products/${id}`)
}
}