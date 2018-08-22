import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
//platformBrowserDynamic().bootstrapModule(AppModule, {preserveWhitespaces: true});
//o preserveWhitespaces é pra compilação do angular 6 não juntar os elementos da tela,
//e respeitar o espaçamento entre botões, por exemplo. Pode ser colocado na configuração 
//de componentes especificos, mas aqui vale pra aplicação inteira.
