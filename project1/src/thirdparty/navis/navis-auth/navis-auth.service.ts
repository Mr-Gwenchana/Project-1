import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';

const CACHE_KEY = 'navis_token';
type CachedToken = { token: string; expiresAt: number };

@Injectable()
export class NavisAuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly http: HttpService,
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
    ) { }

    private async loginAndSetCache(): Promise<string> {
        const userName = this.configService.get<string>('NAVIS_USERNAME');
        const password = this.configService.get<string>('NAVIS_PASSWORD');

        const res = await lastValueFrom(this.http.post('/api/login',
            {
                username: userName,
                password: password
            }
        ))

        const data = res.data;
        const token = data.token;

        if (!token) 
            throw new UnauthorizedException('Token login not found');

        const TTL_MS = this.configService.get<number>('NAVIS_TOKEN_TTL_MS');
        const expiresAt = Date.now() + TTL_MS;

        // TTL milliseconds
        await this.cache.set(CACHE_KEY, { token, expiresAt } satisfies CachedToken, TTL_MS);

        return token;
    }

    async getBearerToken(): Promise<string> {
        const cached = await this.cache.get<CachedToken>(CACHE_KEY);
        if (cached && Date.now() < cached.expiresAt)
            return cached.token;
        return this.loginAndSetCache();
    }

    async forceRefresh(): Promise<string> {
        await this.cache.del(CACHE_KEY);
        return this.getBearerToken();
    }
}
