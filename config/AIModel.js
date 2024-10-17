import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "write a script to generate 30 seconds video on topic    : Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "A bustling marketplace in ancient Rome, with merchants selling goods and people going about their daily lives. Realistic, vibrant colors, focus on the detail of the clothing and architecture.",\n    "ContentText": "Imagine ancient Rome, a city teeming with life. The year is 79 AD, and the air is thick with the scent of spices, leather, and sweat.  A bustling marketplace sprawls before you, filled with merchants hawking their wares."\n  },\n  {\n    "imagePrompt": "A close-up portrait of a Roman soldier, his face hardened and weathered, with a determined expression. Realistic, dramatic lighting, focus on the details of his armor and weaponry.",\n    "ContentText": "Among the crowds, a young Roman soldier named Lucius strides through the marketplace. His bronze armor gleams in the sun, a stark contrast to the colorful chaos around him. He’s on a mission, a mission that will change his life forever."\n  },\n  {\n    "imagePrompt": "A panoramic view of Mount Vesuvius erupting, spewing ash and smoke into the sky. Realistic, dramatic lighting, focus on the scale and intensity of the eruption.",\n    "ContentText": "Suddenly, the earth trembles. A low rumble echoes through the city, quickly escalating into a deafening roar. From the distance, Mount Vesuvius, the once-dormant volcano, begins to erupt."\n  },\n  {\n    "imagePrompt": "A group of terrified Romans fleeing from the eruption, their faces filled with fear and desperation. Realistic, dramatic lighting, focus on the chaotic scene and the people\'s expressions.",\n    "ContentText": "Panic erupts. The ground shakes violently, and a massive plume of ash and smoke engulfs the city. Romans scramble to escape the wrath of the volcano, their faces etched with fear and despair."\n  },\n  {\n    "imagePrompt": "A close-up of a Roman citizen being buried by volcanic ash, their expression frozen in terror. Realistic, dramatic lighting, focus on the detail of the ash covering the person.",\n    "ContentText": "The ash falls like a relentless snowstorm, suffocating the city and its inhabitants. Lucius, caught in the chaos, watches in horror as people are buried alive by the deadly ash."\n  },\n  {\n    "imagePrompt": "A wide shot of the city of Pompeii buried in volcanic ash, with only the ruins of buildings visible. Realistic, muted colors, focus on the vastness and emptiness of the scene.",\n    "ContentText": "In a matter of hours, the once vibrant city of Pompeii is buried under a thick layer of volcanic ash. The city falls silent, its people frozen in time, their stories preserved by the very force that destroyed them."\n  },\n  {\n    "imagePrompt": "A modern archaeologist uncovering a Roman artifact from the ruins of Pompeii. Realistic, focus on the detail of the artifact and the archaeologist\'s expression of discovery.",\n    "ContentText": "Centuries later, archaeologists excavate the ruins of Pompeii, revealing a snapshot of life in ancient Rome. The buried city offers a glimpse into the past, a testament to the power of nature and the fragility of human existence."\n  }\n]\n```\n\n**Explanation:**\n\nThis JSON structure provides a basic storyboard for a 30-second video.  Each object in the array represents a scene:\n\n* **imagePrompt:** This is a detailed prompt for an AI image generator like Midjourney or DALL-E 2. It includes information on the scene, lighting, composition, and desired realism.\n* **ContentText:**  This is a short, descriptive text that narrates the scene and helps viewers understand the story.\n\n**How to Use This:**\n\n1. **Generate Images:** Use the `imagePrompt` from each object to generate images using your chosen AI art generator.\n2. **Edit and Assemble:** Edit the generated images to match the narrative and create a smooth flow between scenes. Add transitions and sound effects as needed.\n3. **Add Narration:**  Use the `ContentText` to create a voiceover or on-screen text narration that complements the visuals.\n\n**Important Notes:**\n\n* The provided content text is a starting point. You can adapt and expand upon it to create a richer narrative.\n* Consider adding additional scenes or details to better flesh out the story.\n* Experiment with different AI image generators and settings to achieve the desired look for your video.\n* Use music and sound design to enhance the emotional impact of your video.\n\nRemember, this script is a foundation. You can customize it further to tell your own unique version of this historical story. \n',
        },
      ],
    },
  ],
});
