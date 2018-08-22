import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(
    private restauranteService: RestaurantService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.reviews = this.restauranteService.reviewsOfRestaurant(
      this.route.parent.snapshot.params['id'] //pois o id está na rota pai, e não na rota reviews.
    )
  }

}
