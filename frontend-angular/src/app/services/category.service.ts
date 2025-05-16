// services/category.service.ts
import {inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Category} from '../types/category';
import {ApiPath} from '../constants/api-path';

@Injectable({providedIn: 'root'})
export class CategoryService {
    private readonly apiService = inject(ApiService)

    async getAll(): Promise<Category[]> {
        return this.apiService.getAll<Category>(ApiPath.CATEGORIES);
    }
}
