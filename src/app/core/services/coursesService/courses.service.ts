import { Injectable } from '@angular/core';
import {
    Http, Response, Request, RequestOptions, Headers,
    URLSearchParams, RequestMethod
} from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { CourseItem2, CoursesList } from '../../entities';

import { AuthHeader } from '../../services';

@Injectable()
export class CoursesService {
    public courses = new BehaviorSubject<CoursesList>({ page: 0, items: [] });
    public courses$ = this.courses.asObservable();
    public courseById = new BehaviorSubject<CourseItem2>({
        id: 0, name: '', length: 0, date: null, isTopRated: false, description: ''
    });
    public courseById$= this.courseById.asObservable();
    private currPage = 0;
    private perpage = 5;

    private url: string = 'http://178.62.199.58:3010/courses';

    constructor(
        private authHttp: AuthHeader,
        private http: Http
        ) {
        this.getFromServer(this.currPage).subscribe((courses) => {
            this.courses.next({ page: this.currPage, items: courses });
        });
    }

    public createCourse(course: CourseItem2): Promise<number> {
        let courses = this.getCourses();
        let nextId = courses.items.length ? Math.max(...courses.items.map((itm) => itm.id)) + 1 : 0;
        course.id = nextId;
        return this.addCourse(course);
    }
    public updateCourse(course: CourseItem2): Promise<number> {
        return new Promise((resolve) => {
            console.log('Updating course...');
            setTimeout(() => {
                let courses = this.getCourses();
                courses.items.forEach((itm, ind, arr) => {
                    if (itm.id === course.id) {
                        console.log('found ')
                        console.log(itm)
                        arr[ind] = course;
                    }
                });
                this.courses.next(courses);
                resolve(course.id);
            }, 300);
        });
    }
    public getCourses(): CoursesList {
        return this.courses.getValue();
    }
    public getById(id: number) {
        this.getFromServerById(id).subscribe((course) => {
            this.courseById.next(course);
        });
    }
    public deleteCourse(id: number) {
        let requestOptions = new RequestOptions();
        let request: Request;

        requestOptions.url = this.url + '/delete';
        requestOptions.method = RequestMethod.Post;
        requestOptions.body = JSON.stringify({id});
        requestOptions.headers = this.authHttp.setAuthHeader();
        request = new Request(requestOptions);

        this.http.request(request).map((res) => res.json()).subscribe((result) => {
            this.getFromServer().subscribe((courses) => {
                this.courses.next({ page: this.currPage, items: courses });
            });
        });
    }

    public getNext(query: string = '') {
        this.getFromServer(this.currPage + 1, query).subscribe((courses) => {
            let page = this.currPage + 1;
            if (courses.length) {
                this.currPage = page;
            }
            this.courses.next({ page, items: courses });
        });
    }

    public getPrev(query: string = '') {
        this.getFromServer(this.currPage - 1, query).subscribe((courses) => {
            let page = this.currPage - 1;
            if (courses.length) {
                this.currPage = page;
            }
            this.courses.next({ page, items: courses });
        });
    }

    public getFromServer(qStart: number = 0, query: string = ''): Observable<CourseItem2[]> {
        let requestOptions = new RequestOptions();
        let request: Request;
        let urlParams: URLSearchParams = new URLSearchParams();

        urlParams.set('start', (qStart * this.perpage).toString());
        urlParams.set('count', this.perpage.toString());
        if (query) {
            urlParams.set('query', query);
        }
        requestOptions.url = this.url;
        requestOptions.method = RequestMethod.Get;
        requestOptions.search = urlParams;
        request = new Request(requestOptions);

        return this.http.request(request).map((res) => res.json());
    }

    public getFilteredByName(query: string) {
        this.getFromServer(0, query).subscribe((courses) => {
            this.currPage = 0;
            this.courses.next({ page: this.currPage, items: courses });
        });
    }

    public getFromServerById(id: number): Observable<CourseItem2> {
        let requestOptions = new RequestOptions();
        let request: Request;

        requestOptions.url = this.url + '/' + id;
        requestOptions.method = RequestMethod.Get;
        request = new Request(requestOptions);

        return this.http.request(request).map((res) => res.json());
    }

    private addCourse(course: CourseItem2): Promise<number> {
        return new Promise((resolve) => {
            console.log('Adding course...');
            setTimeout(() => {
                let courses = this.getCourses();
                courses.items.push(course);
                this.courses.next(courses);
                resolve(course.id);
            }, 300);
        });
    }
}
