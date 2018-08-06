import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputComponent } from './input/input.component';
import { RatingComponent } from './rating/rating.component';
import { RadioComponent } from './radio/radio.component';
import { OrderService } from '../order/order.service';
import { RestaurantService } from '../restaurants/restaurants.service';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';

@NgModule({
    declarations: [
        InputComponent,
        RadioComponent,
        RatingComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ShoppingCartService,
                RestaurantService,
                OrderService
            ]
        }
    }
}