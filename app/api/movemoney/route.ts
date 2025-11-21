import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    if(req.method != "POST") {
        return NextResponse.json({
            status: "error",
            echo: "Method not supported!!!"
        })
    }

    try {
        const body = await req.json();
        const { message } = body;

        await new Promise(resolve => setTimeout(resolve, 2000));

        return NextResponse.json({
            status: "ok",
            echo: message
        });
    } catch(err) {
        console.log("Error occurred while moving money: " + err);
        return NextResponse.json({
            status: "error",
            echo: "Invalid request"
        }, { status: 400 });
    }
}