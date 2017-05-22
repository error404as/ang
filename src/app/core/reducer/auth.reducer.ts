import { ActionReducer, Action } from '@ngrx/store';

let initState = {
    logged: false,
    name: ''
};

export const authReducer: ActionReducer<any> = (store: any = initState, action: Action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                logged: true,
                name: action.payload.name
            };
        case 'LOGOUT':
            return {
                logged: false,
                name: ''
            };
        default:
            return store;
    }
};
