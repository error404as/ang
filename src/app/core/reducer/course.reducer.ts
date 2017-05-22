import { ActionReducer, Action } from '@ngrx/store';
import { CourseItem } from '../entities';

let initState = {
    id: 0,
    name: '',
    length: 0,
    date: null,
    isTopRated: false,
    description: ''
};

export const courseReducer: ActionReducer<CourseItem> = (
        store: CourseItem = initState,
        action: Action
    ) => {
    switch (action.type) {
        case 'SET_COURSE':
            return action.payload;
        default:
            return store;
    }
};
