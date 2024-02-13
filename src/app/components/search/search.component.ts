import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  public fb: FormBuilder = new FormBuilder();
  public flightForm: FormGroup = new FormGroup({});
  public result: string = '';

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      origin: ['', [Validators.required, Validators.maxLength(3)]],
      destination: ['', [Validators.required, Validators.maxLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.flightForm.valid) {
      const origin = this.flightForm.value.origin.toUpperCase();
      const destination = this.flightForm.value.destination.toUpperCase();
      this.result = `Origin: ${origin}, Destination: ${destination}`;
    }
  }
}
