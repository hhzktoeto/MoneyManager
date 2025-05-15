import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiPath} from '../constants/api-path';

@Injectable({providedIn: "root"})
export class api {
    private readonly baseUrl: string;
    private httpClient: HttpClient;

    constructor(client: HttpClient) {
        this.baseUrl = "http://localhost:8080";
        this.httpClient = client;
    }

    getAll<TResponse>(path: ApiPath): Observable<Array<TResponse>> {
        return this.httpClient.get<Array<TResponse>>(this.baseUrl.concat(path));
    }

    add<TRequest, TResponse>(path: ApiPath, data: TRequest): Observable<TResponse> {
        return this.httpClient.post<TResponse>(this.baseUrl.concat(path), data);
    }

    delete(path: ApiPath, id: number): Observable<void> {
        return this.httpClient.delete<void>(this.baseUrl.concat(path).concat(id.toString()))
    }
}
