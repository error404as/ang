import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ModalConfig } from '../../entities';

@Injectable()
export class ModalService {
    public active = new BehaviorSubject<boolean>(false);
    public active$ = this.active.asObservable();

    public msg: string;
    public title: string;
    private action: Function;

    constructor() {
    }

    public open(options: ModalConfig) {
        this.title = options.title;
        this.msg = options.msg;
        this.action = options.submit;
        this.active.next(true);
    }

    public submit () {
        this.action();
        this.active.next(false);
    }

}
