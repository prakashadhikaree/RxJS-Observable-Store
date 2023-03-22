import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userList = new BehaviorSubject<string[]>([]);
  public users$: Observable<string[]>

  constructor() {
    this.users$ = this.userList.asObservable()
  }

  getUsers() {
    return this.userList.asObservable();
  }

  get users() {
    return this.userList.getValue();
  }

  addUser(user: string) {
    const users = this.userList.getValue();
    users.push(user);
    this.userList.next(users);
  }

  removeUser(user: string) {
    const users = this.userList.getValue();
    const index = users.indexOf(user);
    if (index > -1) {
      users.splice(index, 1);
    }
    this.userList.next(users);
  }
}
