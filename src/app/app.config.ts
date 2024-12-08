import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding,   } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { BasketReducer } from './Store/basket.reducers';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideHttpClient(), provideStore({basket: BasketReducer, })]
};
