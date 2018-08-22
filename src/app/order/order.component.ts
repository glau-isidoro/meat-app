import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  orderForm: FormGroup

  delivery: number = 5

  orderId: string

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)]
        //updateOn: 'blur' se quiser colocar em todos os campos, pode deixar no construtor de FormGroup
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.emailPattern)]
      }),
      emailConfirmation: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.emailPattern)]
      }),
      address: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      number: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.numberPattern)]
      }),
      optionalAddress: new FormControl(''),
      paymentOption: new FormControl('', {validators: [Validators.required]})
    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'})
    //é possível criar validadores para o grupo todo, e verificar ao mesmo tempo campos diferentes.
    //ex: email e confirmação de email.
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if(!emailConfirmation || !email) {
      return undefined
    }
    if (email.value !== emailConfirmation.value) {
      return {emailsDontMatch: true}
    }
    return undefined
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  removeItem(item: CartItem) {
    this.orderService.removeItem(item)
  }

  checkoutOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService
      .checkoutOrder(order)
      .pipe(
        tap((orderId: string) => {
          this.orderId = orderId
        })
      ).subscribe((orderId: string) => {
        this.router.navigate(['/order-summary'])
        this.orderService.clear()
      })
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }

}
