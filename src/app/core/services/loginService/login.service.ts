import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, Request, RequestOptions, Headers,
    URLSearchParams, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class LoginService {

    public authed = new BehaviorSubject<boolean>(false);
    public authed$ = this.authed.asObservable();
    public username;
    private token: string;
    private url: string = 'http://178.62.199.58:3010/auth';

    constructor(private http: Http) {
        let cred = localStorage.getItem('utoken');
        if (cred) {
            this.token = cred;
            this.getUserInfo();
        }
    }

    public logInServer(name: string, password: string): Observable<any> {
        let requestOptions = new RequestOptions();
        let request: Request;

        requestOptions.url = this.url + '/login';
        requestOptions.method = RequestMethod.Post;
        requestOptions.body = {login: name, password};
        request = new Request(requestOptions);
        return this.http.request(request).map((res) => {
            let result = res.json();
            if (result.token) {
                localStorage.setItem('utoken', result.token);
                this.token = result.token;
                this.getUserInfo();
            }
            return result;
        });
    }

    public userInfoServer(): Observable<any> {
        let requestOptions = new RequestOptions();
        let request: Request;
        let headers: Headers = new Headers();

        headers.set('Authorization', this.token);

        requestOptions.url = this.url + '/userinfo';
        requestOptions.method = RequestMethod.Post;
        requestOptions.headers = headers;
        request = new Request(requestOptions);
        return this.http.request(request).map((res) => res.json());
    }

    public logOut() {
        console.log('LoginService: logout');
        this.username = '';
        this.authed.next(false);
        localStorage.removeItem('utoken');
    }

    public getUserInfo() {
        this.userInfoServer().subscribe((res) => {
            this.username = res.name.first + ' ' + res.name.last;
            this.authed.next(true);
        }, (err) => {
            this.logOut();
        });
    }

    public isAuthenticated(): boolean {
        return this.authed.getValue();
    }

}
