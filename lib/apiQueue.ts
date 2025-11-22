import axios from "axios";
import { headers } from "next/headers";

type QueueJob = {
    id: string;
    message: string;
    status: 'pending' | 'processing' | 'success' | 'error';
    response?: any;
    error?: string;
    timestamp?: number;
}

class APIQueue {
    private queue: QueueJob[] = [];
    private processing = false;
    private listeners: Set<() => void> = new Set();

    addJob(message: string): string {
        const id = Date.now().toString() + Math.random().toString(36);

        const newJob: QueueJob = {
            id,
            message,
            status: 'pending',
            timestamp: Date.now()
        }

        this.queue.push(newJob);
        this.notifyListeners();
        this.processQueue();

        return id;
    }

    private async processQueue() {
        if (this.processing || this.queue.length === 0) {
            return;
        }

        this.processing = true;

        while (this.queue.length > 0) {
            const job = this.queue.find(j => j.status === "pending");

            if (!job) {
                break;
            }

            job.status = "processing";
            this.notifyListeners();

            try {
                const response = await axios.post('/api/movemoney', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: job.message })
                });

                const data = await response.data;

                if (response.status === 429) {
                    console.log('Rate limited! Putting job back in queue...');

                    job.status = 'pending';
                    this.notifyListeners();

                    await new Promise(resolve => setTimeout(resolve, 3000));

                    continue;
                }

                if (data.ok) {
                    job.status = 'success';
                    job.response = data;
                } else {
                    job.status = 'error';
                    job.response = data;
                    job.error = data.message || 'Request failed';
                }
            } catch (err) {
                job.status = 'error';
                job.error = err instanceof Error ? err.message : 'Unknown error';
            }
            this.notifyListeners();
        }

        this.processing = false;
    }

    subscribe(listener: () => void): () => void {
        this.listeners.add(listener);

        // Return unsubscribe function
        return () => {
            this.listeners.delete(listener);
        };
    }

    // Notify all subscribers that queue changed
    private notifyListeners() {
        this.listeners.forEach(listener => listener());
    }

    // Get copy of entire queue
    getQueue(): QueueJob[] {
        return [...this.queue];
    }

    // Count pending jobs
    getPendingCount(): number {
        return this.queue.filter(j => j.status === 'pending').length;
    }

    // Get currently processing job
    getCurrentJob(): QueueJob | undefined {
        return this.queue.find(j => j.status === 'processing');
    }

    // Count successful jobs
    getSuccessCount(): number {
        return this.queue.filter(j => j.status === 'success').length;
    }

    // Count failed jobs
    getErrorCount(): number {
        return this.queue.filter(j => j.status === 'error').length;
    }

    // Remove completed jobs (success or error)
    clearCompleted(): void {
        this.queue = this.queue.filter(j =>
            j.status === 'pending' || j.status === 'processing'
        );
        this.notifyListeners();
    }

    // Clear entire queue
    clearAll(): void {
        this.queue = [];
        this.processing = false;
        this.notifyListeners();
    }

    // Check if queue is processing
    isProcessing(): boolean {
        return this.processing;
    }
}