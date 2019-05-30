import { Injectable } from '@angular/core';
import { Subject, Subscriber, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PersonsServices {

  personsSubject = new Subject<string[]>();
  personsFetching = new Subject<boolean>();
  persons: string[] = [];
  internalSubscriber: Subscription;
  fetchedPersons: Subscription;

  constructor(private http: HttpClient) {
    this.internalSubscriber = this.personsSubject.subscribe(persons => {
      this.persons = persons;
    });
  }

  reset() {
    this.personsFetching.next(true);
    if (this.fetchedPersons) {
      this.fetchedPersons.unsubscribe();
      this.fetchedPersons = null;
    }
    this.fetchedPersons = this.http.get('https://swapi.co/api/people')
      .pipe(map((response: any) => {
        return response.results.map(character => character.name);
      }))
      .subscribe(treatedResponse => {
        this.personsSubject.next(treatedResponse);
        this.personsFetching.next(false);
      });
  }

  fetchPersons() {
    if (!this.fetchedPersons) {
      this.reset();
    }
  }

  addPerson(name: string) {
    this.persons.push(name);
    this.personsSubject.next(this.persons);
  }

  removePerson(name: string) {
    this.persons = this.persons.filter(person => person !== name);
    this.personsSubject.next(this.persons);
  }

}
