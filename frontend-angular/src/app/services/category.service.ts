// services/category.service.ts
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {api} from '../api/api';
import {Category} from '../types/category';
import {ApiPath} from '../constants/api-path';

@Injectable({providedIn: 'root'})
export class CategoryService {
    constructor(private readonly api: api) {}

    getAll(): Observable<Category[]> {
        return this.api.getAll<Category>(ApiPath.CATEGORIES);
    }
}
