import { Component, OnInit } from '@angular/core';
import { state, transition, animate, trigger, style } from '@angular/animations';
import { NotificationService } from '../notification.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: 0
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'snackbar message';
  snackVisibility: string = 'hidden';

  constructor(private notification: NotificationService) { }

  ngOnInit() {
    this.notification.notifier.subscribe(message =>{
      this.message = message
      this.snackVisibility = 'visible'
      Observable.timer(3000).subscribe(timer => this.snackVisibility = 'hidden')
    })
  }

}
