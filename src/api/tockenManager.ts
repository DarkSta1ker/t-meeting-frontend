class TockenManager {
    private isRefreshing = false;
    private refreshPromise: Promise<void> | null = null;

    async refreshTocken() {
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
            } finally {
                this.isRefreshing = false;
                this.refreshPromise = null;
            }
        })();
        return this.refreshPromise;
    }
}

export const tockenManager = new TockenManager();
