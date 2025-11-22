const requestStore = new Map<string, number[]>();

export function checkRateLimit(identifier: string, limit: number = 5): boolean {
    const current = Date.now();
    const window = 60000;

    const requests = requestStore.get(identifier) || [];
    const recentRequests = requests.filter(time => current - time < window);

    if(recentRequests.length >= limit) {
        return false;
    }

    recentRequests.push(current);
    requestStore.set(identifier, recentRequests);

    return true;    
}

export function getRemainingRequestsUntilRateLimit(identifier: string, limit: number = 5): number {
    const current = Date.now();
    const window = 60000;

    const requests = requestStore.get(identifier) || [];

    const recentRequests = requests.filter(time => current - time < window);

    return Math.max(0, limit - recentRequests.length);
}