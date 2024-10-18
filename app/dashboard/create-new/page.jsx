"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";

const CreateNewPage = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const handleClick = () => {
    // GetVideoScript();

    //testing
    const fileUrl = "https://firebasestorage.googleapis.com/v0/b/ai-video-generator-e5638.appspot.com/o/ai-short-video%2Fc26779f3-89d9-491d-bb99-18d6ed2c5f45.mp3?alt=media&token=a4294a29-cd20-4c18-9bee-5e2caa7d9a8e"
    GenerateAudioCaption(fileUrl)
  };

  //Get Video Script
  const GetVideoScript = async () => {
    setLoading(true);
    const prompt = `write a script to generate ${formData.duration} video on topic : ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`;
    console.log(prompt);
    const result = await axios
      .post("/api/get-video-script", { prompt })
      .then((resp) => {
        setVideoScript(resp.data.result);
        GenerateAudioFile(resp.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  //Generate audio file
  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();
    videoScriptData.forEach((item) => {
      script = script + item.ContentText + " ";
    });
    await axios
      .post("/api/generate-audio", { text: script, id: id })
      .then((resp) => {
        setAudioFileUrl(resp.data.result)
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  //Generate audio caption 
  const GenerateAudioCaption = async (fileUrl) => {
    setLoading(true);

    await axios.post("/api/generate-caption", {audioFileUrl: fileUrl}).then(resp => {
      setCaptions(resp.data.result);
    }).catch(error => {
      console.log(error);
    })
    setLoading(false);
  }

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>
      <div className="mt-10 shadow-lg p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* Create Button */}
        <Button className="mt-10 w-full text-xl" onClick={handleClick}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
};

export default CreateNewPage;
