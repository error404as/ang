import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CourseItem } from '../../entities';

@Injectable()
export class CoursesService {
    public allCourses = new BehaviorSubject<CourseItem[]>([]);
    public allCourses$ = this.allCourses.asObservable();

    private defaultCourses: CourseItem[] = [
        {
            id: 1,
            name: 'HTTP',
            duration: 90,
            date: new Date(new Date().getTime() - 864000000),
            topRated: true,
            description: `
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
                laudantium assumenda, animi veritatis beatae fugit perferendis enim
                aperiam quo sit odit officia, consectetur asperiores, voluptatum at
                placeat aut, odio repellat.
                `
        },
        {
            id: 2,
            name: 'Promises',
            duration: 28,
            date: new Date(new Date().getTime() - 518400000),
            topRated: false,
            description: `
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
                laudantium assumenda, animi veritatis beatae fugit perferendis enim
                aperiam quo sit odit officia, consectetur asperiores, voluptatum at
                placeat aut, odio repellat.
                `
        },
        {
            id: 3,
            name: 'Directives',
            duration: 365,
            date: new Date(new Date().getTime() + 518400000),
            topRated: true,
            description: `
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
                laudantium assumenda, animi veritatis beatae fugit perferendis enim
                aperiam quo sit odit officia, consectetur asperiores, voluptatum at
                placeat aut, odio repellat.
                `
        },
        {
            id: 4,
            name: 'Dependency Injection',
            duration: 365,
            date: new Date(2015, 10, 5),
            topRated: false,
            description: `
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
                laudantium assumenda, animi.
                `
        },
        {
            id: 5,
            name: 'Component',
            duration: 300,
            date: new Date(2015, 10, 5),
            topRated: false,
            description: `
                Lorem consectetur asperiores, voluptatum at placeat aut, odio repellat.
                `
        }
    ];

    constructor() {
        this.allCourses.next(this.defaultCourses);
    }

    public createCourse(course: CourseItem): Promise<number> {
        let courses = this.getCourses();
        let nextId = courses.length ? Math.max(...courses.map((itm) => itm.id)) + 1 : 0;
        course.id = nextId;
        return this.addCourse(course);
    }
    public getCourses(): CourseItem[] {
        return this.allCourses.getValue();
    }
    public getById(id: number): CourseItem[] {
        return this.getCourses().filter((itm) => itm.id === id);
    }
    public updateCourse(course: CourseItem) {
        let old = this.getById(course.id);
        if (old.length === 1) {
            old[0] = course;
        }
    }
    public deleteCourse(id: number) {
        let courses = this.getCourses().filter((itm) => itm.id !== id);
        this.allCourses.next(courses);
    }

    private addCourse(course: CourseItem): Promise<number> {
        return new Promise((resolve) => {
            console.log('Adding course...');
            setTimeout(() => {
                let courses = this.getCourses();
                courses.push(course);
                this.allCourses.next(courses);
                resolve(course.id);
            }, 500);
        });
    }

}
