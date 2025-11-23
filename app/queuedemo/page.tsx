"use client";

import { useState, useEffect, useRef } from 'react';
import {
    Play, Plus, Trash2, RefreshCw, AlertCircle, CheckCircle2, Clock, XCircle,
    Loader2, Zap, Server
} from "lucide-react";
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Alert, AlertDescription, AlertTitle
} from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import axios from 'axios';
import { motion } from "framer-motion"

type QueueJob = {
    id: string;
    message: string;
    status: 'pending' | 'processing' | 'success' | 'error';
    response?: any;
    error?: string;
    timestamp: number;
    rateLimitRemaining?: number;
};

class APIQueue {
    private queue: QueueJob[] = [];
    private processing = false;
    private listeners: Set<() => void> = new Set();
    private currentRateLimitRemaining: number = 5;
    private rateLimitResetTime: number | null = null;

    addJob(message: string): string {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);

        const newJob: QueueJob = {
            id,
            message,
            status: 'pending',
            timestamp: Date.now()
        };

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
            const job = this.queue.find(j => j.status === 'pending');

            if (!job) {
                break;
            }

            job.status = 'processing';
            this.notifyListeners();

            try {
                const response = await axios.post('/api/movemoney',
                    { message: job.message },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                const data = response.data;

                const rateLimitRemaining = response.headers['x-ratelimit-remaining'];
                if (rateLimitRemaining !== undefined) {
                    this.currentRateLimitRemaining = parseInt(rateLimitRemaining);
                    job.rateLimitRemaining = this.currentRateLimitRemaining;

                    if (this.rateLimitResetTime === null) {
                        this.rateLimitResetTime = Date.now() + 60000;
                    }
                }

                if (data.status === "ok") {
                    job.status = 'success';
                    job.response = data;
                } else {
                    job.status = 'error';
                    job.response = data;
                    job.error = data.echo || 'Request failed';
                }

                this.notifyListeners();
            } catch (error: any) {
                if (error.response?.status === 429) {

                    this.currentRateLimitRemaining = 0;
                    this.rateLimitResetTime = Date.now() + 60000;

                    job.status = 'pending';
                    this.notifyListeners();
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    continue;
                }

                job.status = 'error';
                job.error = error.response?.data?.echo || error.message || 'Unknown error';

                this.notifyListeners();
            }

            this.notifyListeners();
        }

        this.processing = false;
    }

    subscribe(listener: () => void): () => void {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener());
    }

    getQueue(): QueueJob[] {
        return [...this.queue];
    }

    getCounts() {
        return {
            pending: this.queue.filter(j => j.status === 'pending').length,
            success: this.queue.filter(j => j.status === 'success').length,
            error: this.queue.filter(j => j.status === 'error').length,
            total: this.queue.length
        };
    }

    getRateLimitInfo() {
        return {
            remaining: this.currentRateLimitRemaining,
            resetTime: this.rateLimitResetTime
        };
    }

    clearCompleted(): void {
        this.queue = this.queue.filter(j =>
            j.status === 'pending' || j.status === 'processing'
        );
        this.notifyListeners();
    }

    clearAll(): void {
        this.queue = [];
        this.processing = false;
        this.notifyListeners();
    }

    isProcessing(): boolean {
        return this.processing;
    }
}

const apiQueue = new APIQueue();

export default function QueueDemoPage() {
    const [, forceUpdate] = useState({});
    const [messageInput, setMessageInput] = useState('');
    const [autoSendCount, setAutoSendCount] = useState(5);
    const [timeUntilReset, setTimeUntilReset] = useState<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    useEffect(() => {
        const unsubscribe = apiQueue.subscribe(() => {
            forceUpdate({});
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const rateLimitInfo = apiQueue.getRateLimitInfo();
            if (rateLimitInfo.resetTime) {
                const timeLeft = Math.max(0, rateLimitInfo.resetTime - Date.now());
                setTimeUntilReset(timeLeft);

                if (timeLeft === 0) {
                    setTimeUntilReset(null);
                }
            } else {
                setTimeUntilReset(null);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const queue = apiQueue.getQueue();
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [queue.length]);

    const counts = apiQueue.getCounts();
    const isProcessing = apiQueue.isProcessing();
    const rateLimitInfo = apiQueue.getRateLimitInfo();

    const handleSendMessage = () => {
        const message = messageInput || `Task #${queue.length + 1}`;
        apiQueue.addJob(message);
        setMessageInput('');
    };

    const handleAutoSend = () => {
        for (let i = 0; i < autoSendCount; i++) {
            setTimeout(() => {
                apiQueue.addJob(`Batch Task ${queue.length + i + 1}`);
            }, i * 150);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-800"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
            case 'processing':
                return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800"><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Processing</Badge>;
            case 'success':
                return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 dark:border-green-800"><CheckCircle2 className="w-3 h-3 mr-1" /> Success</Badge>;
            case 'error':
                return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200 dark:border-red-800"><XCircle className="w-3 h-3 mr-1" /> Failed</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const formatTimeRemaining = (ms: number) => {
        const seconds = Math.ceil(ms / 1000);
        return `${seconds}s`;
    };

    return (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="p-4 py-12 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Queue Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Real-time visualization of API request processing and rate limiting.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => apiQueue.clearCompleted()}
                        disabled={counts.success === 0 && counts.error === 0}
                        className="cursor-pointer"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Cleanup
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => apiQueue.clearAll()}
                        disabled={queue.length === 0}
                        className="cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear All
                    </Button>
                </div>
            </div>
            {
                rateLimitInfo.remaining !== null && (
                    <Alert className={cn(
                        "transition-all duration-300",
                        rateLimitInfo.remaining === 0
                            ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
                            : rateLimitInfo.remaining <= 2
                                ? "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900"
                                : "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900"
                    )}>
                        <Server className={cn(
                            "h-4 w-4",
                            rateLimitInfo.remaining === 0
                                ? "text-red-600 dark:text-red-400"
                                : rateLimitInfo.remaining <= 2
                                    ? "text-yellow-600 dark:text-yellow-400"
                                    : "text-blue-600 dark:text-blue-400"
                        )} />
                        <AlertTitle className={cn(
                            rateLimitInfo.remaining === 0
                                ? "text-red-800 dark:text-red-300"
                                : rateLimitInfo.remaining <= 2
                                    ? "text-yellow-800 dark:text-yellow-300"
                                    : "text-blue-800 dark:text-blue-300"
                        )}>
                            Rate Limit Status
                        </AlertTitle>
                        <AlertDescription className={cn(
                            "mt-2 text-sm",
                            rateLimitInfo.remaining === 0
                                ? "text-red-700 dark:text-red-400"
                                : rateLimitInfo.remaining <= 2
                                    ? "text-yellow-700 dark:text-yellow-400"
                                    : "text-blue-700 dark:text-blue-400"
                        )}>
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div className="flex items-center gap-6">
                                    <div>
                                        <span className="font-semibold text-lg">
                                            {rateLimitInfo.remaining} / 5
                                        </span>
                                        <span className="ml-2">requests remaining</span>
                                    </div>
                                    {
                                        timeUntilReset !== null && timeUntilReset > 0 && (
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>Resets in <span className="font-mono font-semibold">{formatTimeRemaining(timeUntilReset)}</span></span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="flex-1 min-w-[200px]">
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className={cn(
                                                "h-2 rounded-full transition-all duration-300",
                                                rateLimitInfo.remaining === 0
                                                    ? "bg-red-500"
                                                    : rateLimitInfo.remaining <= 2
                                                        ? "bg-yellow-500"
                                                        : "bg-blue-500"
                                            )}
                                            style={{ width: `${(rateLimitInfo.remaining / 5) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AlertDescription>
                    </Alert>
                )
            }
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                        <Server className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{counts.total}</div>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">{counts.pending}</div>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-500">{counts.success}</div>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Failed</CardTitle>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600 dark:text-red-500">{counts.error}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-blue-600" />
                                Actions
                            </CardTitle>
                            <CardDescription>Add jobs to the processing queue</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Single Task</label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Task name (optional)"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        className="cursor-pointer"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Batch Generator</label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={autoSendCount}
                                        onChange={(e) => setAutoSendCount(Number(e.target.value))}
                                    />
                                    <Button variant="secondary" onClick={handleAutoSend} className="cursor-pointer whitespace-nowrap">
                                        <Play className="w-4 h-4 mr-2" />
                                        Run Batch
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
                        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <AlertTitle className="text-blue-800 dark:text-blue-300">How it works</AlertTitle>
                        <AlertDescription className="text-blue-700 dark:text-blue-400 mt-2 text-xs leading-relaxed">
                            Jobs are processed FIFO. Each job takes ~2s. The API enforces a rate limit of 5 requests per minute.
                            When exceeded, requests are automatically queued and retried after the cooldown period.
                        </AlertDescription>
                    </Alert>
                </div>
                <Card className="lg:col-span-2 flex flex-col h-[600px]">
                    <CardHeader className="border-b">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Job Feed</CardTitle>
                                <CardDescription>Live stream of worker activity</CardDescription>
                            </div>
                            {
                                isProcessing && (
                                    <Badge variant="secondary" className="animate-pulse">
                                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                        Worker Active
                                    </Badge>
                                )
                            }
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 relative">
                        <ScrollArea className="h-[500px] w-full p-4">
                            {
                                queue.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                                        <Server className="w-12 h-12 mb-4 opacity-20" />
                                        <p>Queue is empty</p>
                                        <p className="text-sm">Start adding tasks to see them here.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {
                                            queue.map((job, index) => (
                                                <div
                                                    key={job.id}
                                                    className={cn(
                                                        "border rounded-lg p-4 transition-all duration-300",
                                                        job.status === 'processing'
                                                            ? "bg-secondary/50 border-blue-500/50 shadow-md scale-[1.01]"
                                                            : "bg-card hover:bg-secondary/20"
                                                    )}
                                                >
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs font-mono text-muted-foreground">#{index + 1}</span>
                                                            <h4 className="font-semibold text-sm">{job.message}</h4>
                                                        </div>
                                                        <span className="text-[10px] text-muted-foreground font-mono">
                                                            {new Date(job.timestamp).toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        {getStatusBadge(job.status)}

                                                        <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[100px]">
                                                            ID: {job.id}
                                                        </span>
                                                    </div>

                                                    {
                                                        job.status === 'success' && job.response && (
                                                            <div className="mt-3 p-2 bg-green-500/5 rounded text-xs font-mono text-green-700 dark:text-green-400 border border-green-500/10">
                                                                {`> Response: ${JSON.stringify(job.response.echo)}`}
                                                            </div>
                                                        )
                                                    }

                                                    {
                                                        job.status === 'error' && (
                                                            <div className="mt-3 p-2 bg-red-500/5 rounded text-xs font-mono text-red-700 dark:text-red-400 border border-red-500/10">
                                                                {`> Error: ${job.error}`}
                                                            </div>
                                                        )
                                                    }

                                                    {
                                                        job.rateLimitRemaining !== undefined && (
                                                            <span className="text-[10px] text-muted-foreground font-mono">
                                                                Rate limit: {job.rateLimitRemaining}/5
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                            ))
                                        }
                                        <div ref={scrollRef} />
                                    </div>
                                )
                            }
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}