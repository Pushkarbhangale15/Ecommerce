import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartModel } from '../cart/cart.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://dummyjson.com/products'; //  API URL

  private url = 'http://localhost:3000/products'; // URL for the cart

  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();
  cartmodelobj: CartModel = new CartModel();
  constructor(private http: HttpClient) {}

  // For Getting the Products
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // For Adding the product to the cart
 // src/app/services/api.service.ts
addToCart(product: any) {
  this.http.get(this.url).subscribe((res: any) => {
    const existingProduct = res.find((item: any) => item.id === product.id.toString());
    console.log(existingProduct);
    if (existingProduct) {
      existingProduct.quantity++;
      this.http.put(`${this.url}/${existingProduct.id}`, existingProduct).subscribe();
    } else {
      this.cartmodelobj.id = product.id.toString();
      this.cartmodelobj.title = product.title;
      this.cartmodelobj.price = product.price;
      this.cartmodelobj.image = product.images[0];
      this.cartmodelobj.quantity = 1;
      this.http.post(this.url, this.cartmodelobj).subscribe((res) => {
        this.updateCartItemCount();
      });
    }
  });
}
  // For Getting the Item that are selected to the cart
  getItems(): Observable<any> {
    return this.http.get(this.url).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // For deleting the product from the cart

  deleteData(id: any): Observable<any> {
    console.log(id);
    return this.http.delete<any>(this.url + '/' + id).pipe(
      map((res: any) => {
        console.log(res);
        this.updateCartItemCount();
        return res;
      })
    );
  }

  updateQuantity(id: number, quantity: number): Observable<any> {
    return this.http.patch<any>(`${this.url}/${id}`, { quantity }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getCartItemCount(): Observable<number> {
    return this.http
      .get<any[]>(this.url)
      .pipe(map((items: any[]) => items.length));
  }
  private updateCartItemCount(): void {
    this.getCartItemCount().subscribe((count) => {
      this.cartItemCountSubject.next(count);
    });
  }
}
