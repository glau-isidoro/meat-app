import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderModule } from './order.module';

export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {

  canDeactivate(
    order: OrderComponent,
    activatedRoute: ActivatedRouteSnapshot,
    routeState: RouterStateSnapshot
  ): boolean {
    if(order.isOrderCompleted()) {
      return true
    } else {
      return window.confirm('Deseja desistir do pedido?')
    }
  }

}