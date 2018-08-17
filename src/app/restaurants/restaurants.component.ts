import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchbarState = 'hidden'

  restaurants: Restaurant[]

  searchForm: FormGroup

  searchControl: FormControl

  constructor(private restaurantService: RestaurantService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges //pega valor da barra search cada vez que uma letra é digitada
      .debounceTime(500) //não passa pra frente se o valor estiver mudando muito rapido
      .distinctUntilChanged() //não passa pra frente se o valor for igual ao anterior (não repete a mesma busca duas vezes seguidas)
      .switchMap(searchTerm =>
        this.restaurantService
          .getRestaurants(searchTerm)
          .catch(error => Observable.from([]))
      ).subscribe(restaurants => this.restaurants = restaurants);

    this.restaurantService
      .getRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  toggleSearch() {
    this.searchbarState = this.searchbarState === 'hidden' ? 'visible' : 'hidden'
  }

}
