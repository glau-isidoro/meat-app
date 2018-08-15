import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu/menu-item/menu-item.model';
import { Injectable } from '@angular/core';
import { NotificationService } from '../../shared/messages/notification.service';

@Injectable()
export class ShoppingCartService {
    items: CartItem[] = []

    constructor(private notification: NotificationService){}

    clear() {
        this.items = []
    }

    addItem(item: MenuItem) {
        let foundItem = this.items.find((cItem) => cItem.menuItem.id === item.id)
        if(foundItem){
            this.increaseQty(foundItem)
        } else {
            this.items.push(new CartItem(item))
        }
        this.notification.notify(`${item.name} foi adicionado ao seu carrinho.`)
    }
    
    increaseQty(item: CartItem) {
        item.quantity =  item.quantity + 1
    }

    decreaseQty(item: CartItem) {
        item.quantity =  item.quantity - 1
        if(item.quantity === 0) {
            this.removeItem(item)
        }
        this.notification.notify(`${item.menuItem.name} foi removido do seu carrinho.`)
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1)
    }

    total(): number {
        return this.items
            .map(item => item.value())
            .reduce((prev, value) => prev + value, 0)
    }

}