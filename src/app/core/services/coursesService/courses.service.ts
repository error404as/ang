import { Injectable } from '@angular/core';

import { CourseItem } from '../../entities';

@Injectable()
export class CoursesService {

    private defaultCourses: CourseItem[] = [
        {
            id: 1,
            name: 'Video course 1',
            duration: '1h 30m',
            pubdate: '2015-12-20',
            description: `
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
                laudantium assumenda, animi veritatis beatae fugit perferendis enim
                aperiam quo sit odit officia, consectetur asperiores, voluptatum at
                placeat aut, odio repellat.
                `
        },
        {
            id: 2,
            name: 'Video course 2',
            duration: '28m',
            pubdate: '2015-11-20',
            description: `
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
                laudantium assumenda, animi veritatis beatae fugit perferendis enim
                aperiam quo sit odit officia, consectetur asperiores, voluptatum at
                placeat aut, odio repellat.
                `
        },
        {
            id: 3,
            name: 'Video course 3',
            duration: '6h 5m',
            pubdate: '2015-12-21',
            description: `
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
                laudantium assumenda, animi veritatis beatae fugit perferendis enim
                aperiam quo sit odit officia, consectetur asperiores, voluptatum at
                placeat aut, odio repellat.
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
