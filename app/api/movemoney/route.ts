import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getRemainingRequestsUntilRateLimit } from "@/lib/rateLimitter";

const RATE_LIMIT = 5;

export async function POST(req: NextRequest) {
    if (req.method != "POST") {
        return NextResponse.json({
            status: 403,
            echo: "Method not supported!!!"
        })
    }

    const identifier = req.headers.get("x-forwarded-for") || "anonymous";
    console.log(identifier);

    if (!checkRateLimit(identifier, RATE_LIMIT)) {
        return NextResponse.json({
            status: "error",
            echo: "Rate limit exceeded. Please try again later."
        }, {
            status: 429,
            headers: {
                'X-RateLimit-Remaining': '0',
                'Retry-After': '60'
            }
        });
    }

    try {
        const body = await req.json();
        const { message } = body;

        if (!message) {
            return NextResponse.json({
                status: "error",
                echo: "Message is required"
            }, { status: 400 });
        }

        await new Promise(resolve => setTimeout(resolve, 2000));

        const remaining = getRemainingRequestsUntilRateLimit(identifier, RATE_LIMIT);

        return NextResponse.json({
            status: "ok",
            echo: message
        }, {
            headers: {
                'X-RateLimit-Remaining': remaining.toString()
            }
        });
    } catch (err) {
        console.log("Error occurred while moving money: " + err);
        return NextResponse.json({
            status: "error",
            echo: "Invalid request"
        }, { status: 400 });
    }
}