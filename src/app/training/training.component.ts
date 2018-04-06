import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from './training.service';
import * as fromTraining from './training.reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.TrainingState>) {
  }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }

}
