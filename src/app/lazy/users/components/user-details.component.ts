import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { DataComponent } from '@core/utils';
import { IUser } from '@core/interfaces';
import { UsersRepository } from '@core/abstractions';
import { TakeUntilDestroy } from '@core/decorators';

@Component({
  selector: 'app-user-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
@TakeUntilDestroy
export class UserDetailsComponent
  extends DataComponent
  implements OnInit, OnDestroy
{
  readonly faUser = faUser;

  user?: IUser;

  private componentDestroy!: () => Observable<any>;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private repository: UsersRepository
  ) {
    super();
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.repository
        .get(userId)
        .pipe(takeUntil(this.componentDestroy()))
        .subscribe((user) => {
          this.user = user;
          this.cd.markForCheck();
        });

      this.repository.fetch(userId);
    }
  }

  ngOnDestroy(): void {}

  onBackClick(): void {
    this.router.navigate(['users']);
  }
}
