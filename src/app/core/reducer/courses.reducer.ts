import { ActionReducer, Action } from '@ngrx/store';
import { CoursesList } from '../entities';

let initState = {
    page: 0,
    items: []
};

export const coursesReducer: ActionReducer<CoursesList> = (
        store: CoursesList = initState,
        action: Action
    ) => {
    switch (action.type) {
        case 'SET_COURSES_LIST':
            return {
                page: action.payload.page,
                items: action.payload.items.concat()
            };
        case 'ADD_COURSE':
            return {
                page: store.page,
                items: store.items.concat([action.payload])
            };
        case 'UPDATE_COURSE':
            let courses = store.items.concat();
            let course = action.payload;
            courses.forEach((itm, ind, arr) => {
                if (itm.id === course.id) {
                    arr[ind] = course;
                }
            });
            return {
                page: store.page,
                items: courses
            };
        default:
            return store;
    }
};
