"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { LoaderCircle } from "lucide-react";
import imageCompression from "browser-image-compression";
import { useEffect, useRef, useState } from "react";

const LevelUpload = () => {
  const aiImageInput = useRef<HTMLInputElement>(null);
  const normalImageInput = useRef<HTMLInputElement>(null);

  const [AIImage, setAIImage] = useState<File | null>(null);
  const [normalImage, setNormalImage] = useState<File | null>(null);

  const [AIImageName, setAIImageName] = useState("");
  const [normalImageName, setNormalImageName] = useState("");

  const [AIPrompt, setAIPrompt] = useState("");

  const [AIImageCopyrightCredit, setAIImageCopyrightCredit] = useState("");
  const [normalImageCopyrightCredit, setNormalImageCopyrightCredit] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const generateUploadUrl = useMutation(api.levelUpload.generateUploadUrl);
  const createImageWithImageStorageID = useMutation(api.levelUpload.createImageWithImageStorageID);

  useEffect(() => {
    if (!AIImage || !normalImage || !AIImageName || !normalImageName || !AIPrompt || !AIImageCopyrightCredit || !normalImageCopyrightCredit) {
      setSubmitButtonDisabled(true);
    } else {
      setSubmitButtonDisabled(false);
    }
  }, [AIPrompt, AIImage, normalImage, AIImageName, normalImageName, AIImageCopyrightCredit, normalImageCopyrightCredit]);

  async function handleImageSubmission() {
    const aiNameInput = document.getElementById("ai-name") as HTMLInputElement;
    const normalNameInput = document.getElementById("normal-name") as HTMLInputElement;

    const aiPromptInput = document.getElementById("ai-prompt") as HTMLInputElement;

    const aiCopyrightInput = document.getElementById("ai-copyright") as HTMLInputElement;
    const normalCopyrightInput = document.getElementById("normal-copyright") as HTMLInputElement;

    // check if form has all required fields
    if (!AIImage || !normalImage || !AIImageName || !normalImageName || !AIPrompt || !AIImageCopyrightCredit || !normalImageCopyrightCredit) {
      alert("Please fill out all required fields.");
      return;
    } else {
      setIsSubmitting(true);
      setSubmitButtonDisabled(true);

      // create buffers for JPEG upload
      const aiImageBuffer = await AIImage.arrayBuffer();
      const normalImageBuffer = await normalImage.arrayBuffer();

      let aiFile = AIImage;
      let normalFile = normalImage;

      if (aiImageBuffer && normalImageBuffer) {
        // convert buffer to a Blob
        const aiBlob = new Blob([aiImageBuffer], { type: "image/jpeg" });
        const normalBlob = new Blob([normalImageBuffer], { type: "image/jpeg" });
        
        // convert Blob to File
        aiFile = new File([aiBlob], AIImage.name.replace(/\.[^/.]+$/, ".jpg"), { type: "image/jpeg" });
        normalFile = new File([normalBlob], normalImage.name.replace(/\.[^/.]+$/, ".jpg"), { type: "image/jpeg" });
      }

      // image compression options regardless of conversion
      const imageCompressionOptions = {
        maxSizeMB: 1.0,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };

      // gets compressed file
      const compressedAIFile = await imageCompression(aiFile, imageCompressionOptions);
      const compressedNormalFile = await imageCompression(normalFile, imageCompressionOptions);

      // uploads the image to convex and then creates a new level with the image

      // For AI
      const aiPostUrl = await generateUploadUrl();
      const aiResult = await fetch(aiPostUrl, {
        method: "POST",
        headers: {
          "Content-Type": "image/jpeg"
        },
        body: compressedAIFile,
      });
      const ai = await aiResult.json();
      const aiImageID = await createImageWithImageStorageID({
        storageId: ai.storageId,
        internalName: aiNameInput.value,
        isAIGenerated: true,
        AIPrompt: aiPromptInput.value,
        copyrightCredit: aiCopyrightInput.value
      });

      // For Normal
      const normalPostUrl = await generateUploadUrl();
      const normalResult = await fetch(normalPostUrl, {
        method: "POST",
        headers: {
          "Content-Type": "image/jpeg"
        },
        body: compressedNormalFile,
      });
      const normal = await normalResult.json();
      const normalImageID = await createImageWithImageStorageID({
        storageId: normal.storageId,
        internalName: normalNameInput.value,
        isAIGenerated: false,
        copyrightCredit: normalCopyrightInput.value
      });

      // TODO: ADD logic for uploading the level

      // reset form and close dialog
      setAIImage(null);
      setNormalImage(null);
      aiImageInput.current!.value = "";
      normalImageInput.current!.value = "";
      setAIImageName("");
      setNormalImageName("");
      setAIPrompt("");
      setAIImageCopyrightCredit("");
      setNormalImageCopyrightCredit("");
      setSubmitButtonDisabled(false);
      setIsSubmitting(false);

      alert("Level Successfully Created!");
    }
  }

  return ( 
    <div className="space-y-2">
      <h2 id="level-upload" className="text-3xl">Level Upload</h2>
      <div className="flex flex-col items-center">
        <div className="grid w-full items-center gap-1.5 py-2">
          <Label htmlFor="ai-image">
            AI Image <span className="font-bold text-red-500">*</span>
          </Label>
          <Input
            id="ai-image"
            type="file"
            accept="image/jpg, image/jpeg"
            ref={aiImageInput}
            onChange={(event) => setAIImage(event.target.files![0])}
            disabled={isSubmitting}
          />
        </div>
        <div className="grid w-full items-center gap-1.5 py-2">
          <Label htmlFor="ai-name">
            AI Image Name <span className="font-bold text-red-500">*</span>
          </Label>
          <Input
            id="ai-name"
            type="text"
            value={AIImageName}
            onChange={(event) => setAIImageName(event.target.value)}
            disabled={isSubmitting}
            placeholder="AI Image Internal Name"
          />
        </div>
        <div className="grid w-full items-center gap-1.5 py-2">
          <Label htmlFor="ai-prompt">
            AI Image Prompt <span className="font-bold text-red-500">*</span>
          </Label>
          <Input
            id="ai-prompt"
            type="text"
            value={AIPrompt}
            onChange={(event) => setAIPrompt(event.target.value)}
            disabled={isSubmitting}
            placeholder="Prompt used to generate image"
          />
        </div>
        <div className="grid w-full items-center gap-1.5 py-2">
          <Label htmlFor="ai-copyright">
            AI Image Copyright Info <span className="font-bold text-red-500">*</span>
          </Label>
          <Input
            id="ai-copyright"
            type="text"
            value={AIImageCopyrightCredit}
            onChange={(event) => setAIImageCopyrightCredit(event.target.value)}
            disabled={isSubmitting}
            placeholder="Copyright info associated with image"
          />
        </div>
        <div className="grid w-full items-center gap-1.5 py-2">
          <Label htmlFor="normal-image">
            Normal Image <span className="font-bold text-red-500">*</span>
          </Label>
          <Input
            id="normal-image"
            type="file"
            accept="image/jpg, image/jpeg"
            ref={normalImageInput}
            onChange={(event) => setNormalImage(event.target.files![0])}
            disabled={isSubmitting}
          />
        </div>
        <div className="grid w-full items-center gap-1.5 py-2">
          <Label htmlFor="normal-name">
            Normal Image Name <span className="font-bold text-red-500">*</span>
          </Label>
          <Input
            id="normal-name"
            type="text"
            value={normalImageName}
            onChange={(event) => setNormalImageName(event.target.value)}
            disabled={isSubmitting}
            placeholder="Normal Image Internal Name"
          />
        </div>
        <div className="grid w-full items-center gap-1.5 py-2">
          <Label htmlFor="normal-copyright">
            Normal Image Copyright Info <span className="font-bold text-red-500">*</span>
          </Label>
          <Input
            id="normal-copyright"
            type="text"
            value={normalImageCopyrightCredit}
            onChange={(event) => setNormalImageCopyrightCredit(event.target.value)}
            disabled={isSubmitting}
            placeholder="Copyright info associated with image"
          />
        </div>
        {isSubmitting ? (
          <Button variant="default" className="w-full my-2 flex flex-row" disabled={true}>
            <LoaderCircle className="animate-spin mr-2" size={24} /> Submitting
          </Button>
        ) : (
          <Button
            variant="default"
            className="w-full my-2"
            disabled={submitButtonDisabled}
            onClick={handleImageSubmission}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};
 
export default LevelUpload;