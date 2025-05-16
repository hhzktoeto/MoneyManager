import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {ApiPath} from '../constants/api-path';

@Injectable({providedIn: "root"})
export class ApiService {
    private readonly baseUrl = "http://localhost:8080";
    private http = inject(HttpClient);

    async getAll<T>(path: ApiPath): Promise<T[]> {
        return firstValueFrom(
            this.http.get<T[]>(this.baseUrl.concat(path))
        );
    }

    async add<TRequest, TResponse>(path: ApiPath, data: TRequest): Promise<TResponse> {
        return firstValueFrom(
            this.http.post<TResponse>(this.baseUrl.concat(path), data)
        );
    }

    async delete(path: ApiPath, id: number): Promise<void> {
        const url = this.baseUrl.concat(path).concat("/").concat(id.toString());
        return firstValueFrom(
            this.http.delete<void>(url)
        );
    }
}
