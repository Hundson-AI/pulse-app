import axios, { AxiosInstance } from 'axios';
import type { ApiConfig } from './api.types';
import Config from 'src/config';
import { useState } from 'react';
import { useDataPersist } from '@hooks';
import { DataPersistKeys } from '@hooks';
const { getPersistData } = useDataPersist();

export const DEFAULT_API_CONFIG: ApiConfig = {
    url: typeof Config.API_URL == 'string' ? Config.API_URL : '',
    timeout: 10000,
};

const loadImageFile = async (imageUrl: string) => {
    const response = await fetch(imageUrl);

    return response.blob();
};

const readFileAsync = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
            typeof reader.result == 'string' ? resolve(reader.result) : reject;
        };

        reader.readAsDataURL(file);

        reader.onerror = reject;
    });
};

export class Api {
    axiosInstance: AxiosInstance;
    config: ApiConfig;

    constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
        this.config = config;

        this.axiosInstance = axios.create({
            baseURL: this.config.url,
            timeout: this.config.timeout,
            headers: {
                Accept: 'application/json',
            },
        });
    }

    async postMultipart(url: string, data: any) {
        const formData = new FormData();
        let imageUrl: string = '';

        Object.keys(data).map(key => {
            console.log(key);
            const value = data[key];

            if (key == 'tags' || key == 'image') {
                console.log('tags value will be ignored');
            } else if (key == 'imageString') {
                imageUrl = value;
            } else if (key == 'aiGenerated') {
                formData.append('ai_generated', value);
            } else if (Array.isArray(value)) {
                value.forEach(item => formData.append(`${key}`, item));
            } else {
                if (value === '') {
                    formData.append(key, 'none');
                } else {
                    formData.append(key, value);
                }
            }

            return true;
        });

        const imageBlob = await loadImageFile(imageUrl);
        const extension = imageBlob.type.split('/')[1];
        const fileName = imageUrl.split('/').pop();
        const file = await new File([imageBlob], fileName + '.' + extension);
        const fileDataUrl = await readFileAsync(file);
        await formData.append('image', fileDataUrl);

        const response = await this.axiosInstance.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            transformRequest: (data, headers) => {
                return data;
            },
        });

        return response;
    }

    async setClientHeaders(token: string) {
        this.axiosInstance.interceptors.request.use(function (config) {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
    }
}

export const api = new Api();
