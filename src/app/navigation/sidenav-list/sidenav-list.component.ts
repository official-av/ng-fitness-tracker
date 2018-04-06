import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  closeSidenav() {
    this.sidenavClose.emit();
  }
}
