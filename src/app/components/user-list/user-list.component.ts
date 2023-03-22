import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  userList: string[] = [];
  newUser: string = '';

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this._dataService.users$.subscribe((users) => {
      this.userList = users;
    });
    // this.showBehaviorSubjectExample1();
    // this.showBehaviorSubjectExample2();
  }

  addUser() {
    this._dataService.addUser(this.newUser);
    this.newUser = '';
  }

  removeUser(user: any) {
    this._dataService.removeUser(user);
  }

  showBehaviorSubjectExample1() {
    // Create a new BehaviorSubject with an initial value of 0
    const myBehaviorSubject = new BehaviorSubject(0);

    // Subscribe to the BehaviorSubject
    myBehaviorSubject.subscribe((value) => console.log(`Subscriber 1: ${value}`));

    // Emit a new value
    myBehaviorSubject.next(1);

    // Subscribe to the BehaviorSubject again
    myBehaviorSubject.subscribe((value) => console.log(`Subscriber 2: ${value}`));

    //Emit another new value
    myBehaviorSubject.next(2);
  }

  showBehaviorSubjectExample2() {
    const myAnotherBehaviorSubject = new BehaviorSubject('Namaste');

    // two new subscribers will get initial value
    myAnotherBehaviorSubject.subscribe((value) =>
      console.log(`Subscriber 1: ${value}`)
    );

    myAnotherBehaviorSubject.subscribe((value) =>
      console.log(`Subscriber 2: ${value}`)
    );

    // two subscribers will get new value
    myAnotherBehaviorSubject.next('Sewaro');

    // new subscriber will get latest value
    myAnotherBehaviorSubject.subscribe((value) =>
      console.log(`Subscriber 3: ${value}`)
    );

    // all three subscribers will get new value
    myAnotherBehaviorSubject.next('Jojolopa');

    // new subscriber will get latest value
    myAnotherBehaviorSubject.subscribe((value) =>
      console.log(`Subscriber 4: ${value}`)
    );
  }
}
