import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly _loaderStateSubject = new BehaviorSubject<boolean>(false);

  /* GETTERS */
  public get loaderState$(): Observable<boolean> {
    return this._loaderStateSubject.asObservable();
  }

  /* MAIN METHODS */
  public start() {
    this._loaderStateSubject.next(true);
  }

  public complete() {
    this._loaderStateSubject.next(false);
  }
}
