import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PersonsServices } from './persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit, OnDestroy {

  personsList: string[];
  isFetching = false;
  personsSubscription: Subscription;
  personsFetchingSubscription: Subscription;

  constructor(private persosServices: PersonsServices) {
  }

  ngOnInit() {

    this.personsFetchingSubscription = this.persosServices.personsFetching.subscribe(fetching => this.isFetching = fetching);
    this.persosServices.fetchPersons();
    this.personsList = this.persosServices.persons;
    this.personsSubscription = this.persosServices.personsSubject.subscribe(persons => {
      this.personsList = persons;
    });
  }

  ngOnDestroy() {
    this.personsSubscription.unsubscribe();
    this.personsFetchingSubscription.unsubscribe();
  }

  onRemovePerson(person: string) {
    this.persosServices.removePerson(person);
  }

  resetPersonList() {
    this.persosServices.reset();
  }
}
