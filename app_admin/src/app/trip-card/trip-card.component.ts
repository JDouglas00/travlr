import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service'; 
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']  // Ensure this is 'styleUrls' for array type
})
export class TripCardComponent implements OnInit {

  @Input() trip!: Trip;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService, 
    private tripDataService: TripDataService
    
  ) {}

  ngOnInit(): void {    
  }

  public isLoggedIn(): boolean { 
    return this.authenticationService.isLoggedIn(); 
  } 

  public editTrip(trip: Trip): void {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip(tripCode: string): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripDataService.deleteTrip(tripCode)
        .subscribe({
          next: () => {
            console.log('Trip deleted successfully');
            // Trigger any necessary refresh or routing here
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }
}


