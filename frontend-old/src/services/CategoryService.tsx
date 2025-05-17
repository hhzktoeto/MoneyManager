import type {Category} from "../types/Category.ts";
import {api} from "../api/Api.tsx";
import {ApiPath} from "../api/ApiPath.ts";

class CategoryService {
    async getAllCategories(): Promise<Array<Category>> {
        return api.getAll<Category>(ApiPath.Categories);
    }
}

export const categoryService = new CategoryService();