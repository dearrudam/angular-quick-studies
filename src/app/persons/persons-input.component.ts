import { Component } from '@angular/core';

import { PersonsServices } from './persons.service';

@Component({
  selector: 'app-persons-input',
  templateUrl: './persons-input.component.html',
  styleUrls: ['./persons-input.component.css']
})
export class PersonsInputComponent {

  enteredPersonName = '';

  constructor(private personsService: PersonsServices) { }

  onCreatePerson() {
    this.personsService.addPerson(this.enteredPersonName);
    this.enteredPersonName = '';
  }
}
