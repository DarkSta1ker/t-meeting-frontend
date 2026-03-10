import {clearInterval} from 'node:timers';

class TokenManager {
    private isRefreshing = false;
    private refreshPromise: Promise<void> | null = null;
    private refreshTimer: NodeJS.Timeout | null = null;
    private refreshInterval = 10 * 60 * 1000;

    async refreshToken() {
        if (this.isRefreshing) {
            return this.refreshPromise;
        }
        this.isRefreshing = true;
        this.refreshPromise = (async () => {
            try {
                const response = await fetch('/api/auth/refresh', {
                    method: 'POST',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`Could not refresh tocken`);
                }
            } catch (error) {
                this.stopRefresh();
                throw error;
            } finally {
                this.isRefreshing = false;
                this.refreshPromise = null;
            }
        })();
        return this.refreshPromise;
    }

    startRefresh(intervalMs: number = this.refreshInterval) {
        this.stopRefresh();
        this.refreshTimer = setInterval(() => {
            this.refreshToken().catch((error) => {
                console.log('Ошибка при попытке обновить токен', error);
            });
        }, intervalMs);
    }

    stopRefresh() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    }

}

export const tokenManager = new TokenManager();
