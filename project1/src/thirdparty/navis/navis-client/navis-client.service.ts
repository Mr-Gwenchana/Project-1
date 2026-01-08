import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { NavisAuthService } from '../navis-auth/navis-auth.service';

@Injectable()
export class NavisClientService implements OnModuleInit {
    constructor(
        private readonly http: HttpService,
        private readonly auth: NavisAuthService,
    ) { }

    // Khởi tạo interceptor 
    onModuleInit() {
        // Attach bearer token vào đầu
        this.http.axiosRef.interceptors.request.use(async (config) => {
            if (config.url?.includes('/api/login')) return config;

            const token = await this.auth.getBearerToken();
            (config as any).headers = config.headers ?? {};
            (config.headers as any)['Authorization'] = `Bearer ${token}`;
            return config;
        });

        // Handle response, xử lýkhi token hết hạn hoặc lỗi
        this.http.axiosRef.interceptors.response.use(
            (res) => res,
            async (err: AxiosError) => {
                const status = err.response?.status;
                const original = err.config as (AxiosRequestConfig & { _retry?: boolean });

                if (
                    status === 401 &&
                    original &&
                    !original._retry &&
                    !original.url?.includes('/api/login')
                ) {
                    original._retry = true;
                    const newToken = await this.auth.forceRefresh();
                    original.headers = original.headers ?? {};
                    (original.headers as any)['Authorization'] = `Bearer ${newToken}`;

                    return this.http.axiosRef.request(original);
                }
                throw err;
            },
        );
    }

    async request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return await lastValueFrom(this.http.request<T>(config));
    }

    get<T = any>(url: string, config?: AxiosRequestConfig) {
        return this.request<T>({ ...(config ?? {}), method: 'GET', url });
    }
}
