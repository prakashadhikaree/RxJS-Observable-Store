import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public profile: string = 'https://github.com/prakashadhikary';

  public constructor() {
    /* Empty COnstructor */
  }

  public ngOnInit() {
    /* Empty OnInit Method */
  }

}
