import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {Exercise} from '../exercise.model';
import {UIService} from '../../shared/ui.service';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducers';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  exercisesFetched$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private uiService: UIService, private store: Store<fromTraining.State>) {
  }

  ngOnInit() {
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.exercisesFetched$ = this.store.select(fromRoot.getIsLoading);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
