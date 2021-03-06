import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order } from './order.model';
import { MEAT_API } from '../app.api'
import { LoginService } from '../security/login/login.service';

@Injectable()
export class OrderService {

  constructor(
    private cartService: ShoppingCartService,
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  cartItems(): CartItem[] {
    return this.cartService.items
  }

  itemsValue(): number {
    return this.cartService.total()
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item)
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item)
  }

  checkoutOrder(order: Order): Observable<string> {
    return this.http.post<Order>(`${MEAT_API}/orders`, order)
      .pipe(
        map(order => order.id)
      )
  }

  clear() {
    this.cartService.clear()
  }
}