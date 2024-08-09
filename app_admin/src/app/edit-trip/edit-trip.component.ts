import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"; 
import { TripDataService } from '../services/trip-data.service'; 
import { Trip } from '../models/trip'; 

@Component({ 
  selector: 'app-edit-trip', 
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './edit-trip.component.html', 
  styleUrls: ['./edit-trip.component.css'] // Fixed typo from 'styleUrl' to 'styleUrls'
}) 
export class EditTripComponent implements OnInit { 

  public editForm!: FormGroup; 
  trip!: Trip; 
  submitted = false; 
  message: string = ''; 

  constructor( 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private tripDataService: TripDataService 
  ) {}

  ngOnInit() : void {    
    // Retrieve stashed trip ID 
    let tripCode = localStorage.getItem("tripCode"); 
    if (!tripCode) { 
      alert("Something went wrong, couldn't find the stashed tripCode!"); 
      this.router.navigate(['']); 
      return; 
    } 

    console.log('EditTripComponent::ngOnInit'); 
    console.log('tripCode:' + tripCode); 

    // Initialize the form
    this.editForm = this.formBuilder.group({ 
      _id: [], 
      code: [tripCode, Validators.required], 
      name: ['', Validators.required], 
      length: ['', Validators.required], 
      start: ['', Validators.required], 
      resort: ['', Validators.required], 
      perPerson: ['', Validators.required], 
      image: ['', Validators.required], 
      description: ['', Validators.required] 
    }); 

    // Fetch the trip data to populate the form
    this.tripDataService.getTrip(tripCode)
    .subscribe({
      next: (value: any) => {
        this.trip = value;
        // Populate our record into the form
        this.editForm.patchValue(value[0]); // Assuming value is an array, adjust if necessary
        if (!value) { 
          this.message = 'No Trip Retrieved!'; 
        } else { 
          this.message = 'Trip: ' + tripCode + ' retrieved'; 
        } 
        console.log(this.message); 
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }

  public onSubmit() { 
    this.submitted = true; 

    if (this.editForm.valid) { 
      this.tripDataService.updateTrip(this.editForm.value)
      .subscribe({
        next: (value: any) => {
          console.log('Trip updated successfully:', value); 
          this.router.navigate(['']); // Navigate to the desired route after update
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
    } 
  }

  // Get the form short name to access the form fields 
  get f() { 
    return this.editForm.controls; 
  }
}

