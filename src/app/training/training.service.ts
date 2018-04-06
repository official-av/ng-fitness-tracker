import {Exercise} from './exercise.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {UIService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as fromTraining from './training.reducers';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import {take} from 'rxjs/operators';

@Injectable()
export class TrainingService {
  fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService, private store: Store<fromTraining.State>) {

  }

  fetchExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      }).subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new Training.SetAvailableExercises(exercises));
        this.store.dispatch(new UI.StopLoading());
      }, error => {
        this.uiService.showSnackbar('Oops! Looks like you are having connectivity issues. Try Again later.', null, 2000);
        this.store.dispatch(new UI.StopLoading());
      }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'cancelled',
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100)
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new Training.SetFinishedExercises(exercises));
    }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
