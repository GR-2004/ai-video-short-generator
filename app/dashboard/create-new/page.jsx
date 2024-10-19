"use client";
import React, { useContext, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { useEffect } from "react";

const CreateNewPage = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const {videoData, setVideoData} = useContext(VideoDataContext)
  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const handleClick = () => {
    GetVideoScript();

    //testing
    // const fileUrl = "https://firebasestorage.googleapis.com/v0/b/ai-video-generator-e5638.appspot.com/o/ai-short-video%2Fc26779f3-89d9-491d-bb99-18d6ed2c5f45.mp3?alt=media&token=a4294a29-cd20-4c18-9bee-5e2caa7d9a8e"
    // GenerateAudioCaption(fileUrl)
  };

  //Get Video Script
  const GetVideoScript = async () => {
    try {
      setLoading(true);
      const prompt = `write a script to generate ${formData.duration} video on topic : ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`;
      console.log(prompt);
      const resp = await axios.post("/api/get-video-script", { prompt });
      if (resp?.data?.result) {
        setVideoData(prev => ({
          ...prev,
          'videoScript': resp.data.result
        }))
        setVideoScript(resp.data.result);
        await GenerateAudioFile(resp.data.result);
      }
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
    }
  };

  //Generate audio file
  const GenerateAudioFile = async (videoScriptData) => {
    try {
      setLoading(true);
      let script = "";
      const id = uuidv4();
      videoScriptData.forEach((item) => {
        script = script + item.ContentText + " ";
      });
      const resp = await axios.post("/api/generate-audio", {
        text: script,
        id: id,
      });
      if (resp?.data?.result) {
        setVideoData(prev => ({
          ...prev,
          'audioFileUrl': resp.data.result
        }))
        setAudioFileUrl(resp.data.result);
        await GenerateAudioCaption(resp.data.result, videoScriptData);
      }
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
    }
  };

  //Generate audio caption
  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    try {
      setLoading(true);
      const resp = await axios.post("/api/generate-caption", {
        audioFileUrl: fileUrl,
      });
      if (resp?.data?.result) {
        setVideoData(prev => ({
          ...prev,
          'captions': resp.data.result
        }))
        setCaptions(resp.data.result);
        GenerateImage(videoScriptData);
      }
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
    }
  };

  const GenerateImage = async (videoScriptData) => {
    let images = [];
    for(const element of videoScriptData){
      try {
        const resp = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt
        });
        if(resp.data.result){
          console.log(resp.data.result);
          images.push(resp.data.result);
          setVideoData(prev => ({
            ...prev,
            'imageList': images
          }))
        }
      } catch (error) {
        console.log("error: ",error);
      }
    }
    setImageList(images);
    setLoading(false);
  };

  useEffect(() => {
    console.log("videoData: ", videoData);
  }, [videoData])

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
