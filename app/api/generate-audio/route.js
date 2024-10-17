import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/FirebaseConfig";
const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  try {
    const { text, id } = await req.json();
    if(!text && !id){
      return NextResponse.json({message: "text and id is required"})
    }
    const storageRef = ref(storage, "ai-short-video/" + id + ".mp3");
    const request = {
      input: { text: text },
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    };
    const [response] = await client.synthesizeSpeech(request);
    const audioBuffer = Buffer.from(response.audioContent, "binary");
    await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });
  
    const downloadUrl = await getDownloadURL(storageRef);
  
    return NextResponse.json({ result: downloadUrl });
  } catch (error) {
    return NextResponse.json({error: error})
  }
}
