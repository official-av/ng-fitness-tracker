import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class UIService {

  constructor(private snackbar: MatSnackBar) {
  }

  loadingStateChanged = new Subject<boolean>();
  exercisesFetched=false;

  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }

}
