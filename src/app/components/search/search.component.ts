import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  public fb: FormBuilder = new FormBuilder();
  public flightForm: FormGroup = new FormGroup({});
  public result: string = '';
  public errorMessage: string = 'No deben contener el mismo valor';

  ngOnInit(): void {
    this.flightForm = this.fb.group(
      {
        origin: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
        destination: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      },
      { validators: this.originDestinationValidator }
    );
  }

  public originDestinationValidator(formGroup: FormGroup) {
    const origin = formGroup.get('origin')?.value;
    const destination = formGroup.get('destination')?.value;
    if(origin === '' || destination === '') {
      return null;
    }
    return origin !== destination ? null : { sameValue: true };
  }

  public inputToUpperCase(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }

  public onSubmit(): void {
    if (this.flightForm.valid) {
      const origin = this.flightForm.value.origin.toUpperCase();
      const destination = this.flightForm.value.destination.toUpperCase();
      this.result = `Origin: ${origin}, Destination: ${destination}`;
    }
  }

  public getValidationClass(controlName: string): string {
    if(this.flightForm.hasError('sameValue')) {
      return 'is-invalid';
    }
    if (
      this.flightForm.get(controlName)?.touched &&
      this.flightForm.get(controlName)?.invalid
    ) {
      return 'is-invalid';
    }
    if (
      this.flightForm.get(controlName)?.touched &&
      this.flightForm.get(controlName)?.valid
    ) {
      return 'is-valid';
    }
    return '';
  }

  public getValidationErrorMessage(controlName: string): string {
    if (this.flightForm.get(controlName)?.hasError('required')) {
      return 'Campo es obligatorio';
    }
    if (this.flightForm.get(controlName)?.hasError('maxlength')) {
      return 'Máximo 3 caracteres';
    }
    if (this.flightForm.get(controlName)?.hasError('minlength')) {
      return 'Mínimo 3 caracteres';
    }
    return '';
  }
}
