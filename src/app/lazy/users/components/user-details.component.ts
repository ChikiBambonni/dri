import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AppRepository } from '@core/services';
import { DataComponent } from '@core/utils';
import { IUser } from '@core/interfaces';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent extends DataComponent implements OnInit {
  readonly faUser = faUser;

  user?: IUser;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private repository: AppRepository
  ) {
    super();
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.repository
        .getUser(userId)
        .pipe(
          tap((response) => {
            this.isLoading = false;
            this.error = response.error;
            this.cd.markForCheck();
          }),
          filter((response) => !response.error)
        )
        .subscribe((response) => {
          this.user = response.value!;
          this.cd.markForCheck();
        });
    }
  }

  onBackClick(): void {
    this.router.navigate(['users']);
  }
}
