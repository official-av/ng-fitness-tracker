import {NgModule} from '@angular/core';
import {StopTrainingComponent} from './current-training/stop-training.component';

import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {TrainingComponent} from './training.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {SharedModule} from '../shared/shared.module';
import {TrainingRoutingModule} from './training-routing.module';
import {StoreModule} from '@ngrx/store';
import {trainingReducer} from './training.reducers';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    AngularFirestoreModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
