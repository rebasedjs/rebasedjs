import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CacheModule, FirebaseModule, StateModule } from '@rebased/angular';
import { environment } from '../environments/environment';

import { counter } from './reducers';
import { stateLoader } from '@rebased/state';
import { FIREBASE_CONFIG } from './configs/firebase';
import { firebaseLoader } from '@rebased/firebase';
import { cacheLoader } from '@rebased/cache';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StateModule.forRoot({
      // enable devtools when production is false
      production: environment.production,
      // devtools option. see more at
      // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
      trace: true,
      // define an initial state
      state: {
        counter: 420 // comment this line
      },
      // pass in the app reducers
      reducers: { counter },
      loader: stateLoader
    }),
    FirebaseModule.forRoot({
      config: FIREBASE_CONFIG,
      persistence: false,
      loader: firebaseLoader
    }),
    CacheModule.forRoot({
      dbName: environment.dbName,
      dbStore: environment.dbStore,
      loader: cacheLoader
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
