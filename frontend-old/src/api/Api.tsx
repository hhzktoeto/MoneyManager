import axios from "axios";
import {ApiPath} from "./ApiPath.ts";

class Api {
    client = axios.create({
        baseURL: "http://localhost:8080"
    });

    async getAll<TResponse>(path: ApiPath): Promise<Array<TResponse>> {
        const response = await this.client.get(path);
        return response.data;
    }

    async add<TRequest, TResponse>(path: ApiPath, data: TRequest): Promise<TResponse> {
        const response = await this.client.post(path, data);
        return response.data;
    }

    async delete(path: ApiPath, id: number): Promise<void> {
        const response = await this.client.delete(path.concat(`/${id}`))
        return response.data;
    }
}

export const api = new Api();
