import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json();

    const client = new AssemblyAI({
      apiKey: process.env.CAPTION_API_KEY,
    });

    const data = {
      audio: audioFileUrl,
    };

    const transcript = await client.transcripts.transcribe(data);
    console.log(transcript.words);
    return NextResponse.json({ result: transcript.words });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
