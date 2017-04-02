import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadingService {
    public active = new BehaviorSubject<boolean>(false);
    public active$ = this.active.asObservable();

    constructor() {
    }

    public open() {
        this.active.next(true);
    }

    public close () {
        this.active.next(false);
    }

}
