import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { authInterceptProvider } from '../app/utils/jwt.interceptor';
import { AppComponent } from './app.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';  // Ensure this is imported

import { routes } from './app.routes';  // Import your routes configuration

@NgModule({
  declarations: [
    AppComponent,
    TripListingComponent,
    TripCardComponent,
    AddTripComponent,
    EditTripComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NavbarComponent  // Import the NavbarComponent here
  ],
  providers: [
    authInterceptProvider 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
