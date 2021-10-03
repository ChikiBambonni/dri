import { Observable } from 'rxjs';
import { IPaginationOptions, IUser } from '@core/interfaces';

export abstract class Repository<T> {
  abstract fetchAll(options?: IPaginationOptions): void;
  abstract getAll(): Observable<T[]>;
  abstract getLoadingAll(): Observable<boolean>;
  abstract getCount(): Observable<number>;

  abstract fetch(id: string): void;
  abstract get(id: string): Observable<T | undefined>;
}

export abstract class UsersRepository extends Repository<IUser> {}
