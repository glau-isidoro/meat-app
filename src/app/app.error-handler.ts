import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private notification: NotificationService, private inject: Injector) {
    super()
    //quando customizamos um construtor de uma classe que herda outra,
    //o construtor da classe super deixa de ser chamado. Por isso o super().
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    //super.handleError(errorResponse) já faz mais ou menos o que nosso
    //antigo handleError fazia
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message
      switch (errorResponse.status) {
        case 401:
          this.inject.get(LoginService).handleLogin()
          break
        case 403:
          this.notification.notify(message || 'Não autorizado.')
          break
        case 404:
          this.notification.notify(message || 'Recurso não encontrado.')
          break
      }
    }
    super.handleError(errorResponse)
  }
}