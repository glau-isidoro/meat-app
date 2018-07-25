import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu/menu-item/menu-item.model';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): CartItem[] {
    return this.cartService.items
  }

  total(): number {
    return this.cartService.total()
  }

  clear() {
    this.cartService.clear()
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item)
  }

  addItem(item: MenuItem) {
    this.cartService.addItem(item)
  }

}
