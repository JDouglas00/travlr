import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';
import { Inject, Injectable } from '@angular/core';
//import { Http } from '@angular/http';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  baseUrl = 'http://localhost:3000/api';

  // Method to get the JWT token
  getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl + '/trips');
  }

  addTrip(formData: Trip): Observable<Trip> {
    const token = this.getToken();
    return this.http.post<Trip>(this.baseUrl + '/trips', formData, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl + '/trips/' + tripCode);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    const token = this.getToken();
    return this.http.put<Trip>(this.baseUrl + '/trips/' + formData.code, formData, {
      headers: { 'Authorization': `Bearer ${token}` }

  });
  }
  
  deleteTrip(tripCode: string): Observable<any> {
    const token = this.getToken();
    return this.http.delete<any>(this.baseUrl + '/trips/' + tripCode, {
      headers: { 'Authorization': `Bearer ${token}` }
    
    });
  }

  // Authentication methods
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }
}



