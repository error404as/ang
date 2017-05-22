import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, Request, RequestOptions, Headers,
    URLSearchParams, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

@Injectable()
export class LoginService {

    public authed: boolean = false;
    public token: string;
    private url: string = 'http://178.62.199.58:3010/auth';

    constructor(private http: Http, private store: Store<any>) {
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
        this.authed = false;
        this.store.dispatch({type: 'LOGOUT'});
        localStorage.removeItem('utoken');
    }

    public getUserInfo() {
        this.userInfoServer().subscribe((res) => {
            this.authed = true;
            this.store.dispatch({type: 'LOGIN', payload: {
                name: res.name.first + ' ' + res.name.last,
                logged: true
            }});
        }, (err) => {
            this.logOut();
        });
    }

    public isAuthenticated(): boolean {
        return this.authed;
    }

}
