import { Injectable } from '@angular/core';

import { CourseItem } from '../../entities';

@Injectable()
export class CoursesService {

    private defaultCourses: CourseItem[] = [
        {
            id: 1,
            name: 'HTTP',
            duration: 90,
            pubdate: new Date(new Date().getTime() - 864000000),
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
            pubdate: new Date(new Date().getTime() - 518400000),
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
            pubdate: new Date(new Date().getTime() + 518400000),
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
            pubdate: new Date(2015, 10, 5),
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
            pubdate: new Date(2015, 10, 5),
            topRated: false,
            description: `
                Lorem consectetur asperiores, voluptatum at placeat aut, odio repellat.
                `
        }
    ];

    constructor() {
    }

    public createCourse(course: CourseItem): number {
        let id = 1;
        let courses = this.getCourses();
        if (courses.length) {
            id = courses.map((itm) => itm.id).reduce((a, b) => Math.max(a, b)) + 1;
        }
        course.id = id;
        return this.addCourse(course);
    }
    public getCourses(): CourseItem[] {
        return this.defaultCourses;
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
        this.defaultCourses = this.getCourses().filter((itm) => itm.id !== id);
    }

    private addCourse(course: CourseItem): number {
        this.defaultCourses.push(course);
        return course.id;
    }

}
