import {AuthService} from '../app/services/AuthService';

class TokenManager {
    private isRefreshing = false;
    private refreshPromise: Promise<void> | null = null;
    private refreshTimer: NodeJS.Timeout | null = null;
    private refreshInterval = 60 * 1000;

    async refreshToken() {
        if (this.isRefreshing) {
            return this.refreshPromise;
        }
        console.log('Попытка обновить токен');
        this.isRefreshing = true;
        this.refreshPromise = (async () => {
            AuthService.refresh().catch((error) => {
                this.stopRefresh();
                console.log(error);
            }).finally(() => {
                    this.isRefreshing = false;
                    this.refreshPromise = null;
                }
            );
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
