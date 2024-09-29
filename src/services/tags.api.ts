import { Api } from './api';

export class TagApi extends Api {
    async getAllTags() {
        try {
            const response: any = await this.axiosInstance.get('/tag/list');
            return response.data.data as Tag[];
        } catch (error) {
            console.error(error);
        }
    }
}

export const tagApi = new TagApi();

export interface Tag {
    tag_id: string;
    tag_name: string;
}
