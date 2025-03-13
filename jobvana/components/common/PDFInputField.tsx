import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa6";
import FileViewer from "./FileViewer";

const PDFInputField: React.FC<{
  handleResumeChange: (resume: string | File) => void;
  resume: string | File;
  resumeUrl: string | null;
  setResumeUrl: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ handleResumeChange, resume, resumeUrl, setResumeUrl }) => {
  const [displayResumeUrl, setDisplayResumeUrl] = useState<string | null>(
    resumeUrl
  );
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    // Ensure display updates when resumeUrl changes
    if (resumeUrl) {
      setDisplayResumeUrl(resumeUrl);
    }
  }, [resumeUrl]);

  const handleUploadResume = async (file: File) => {
    handleResumeChange(file);

    // Create a temporary URL for preview and update file name
    const fileUrl = URL.createObjectURL(file);
    setDisplayResumeUrl(fileUrl);
    setResumeUrl(fileUrl);
    setFileName(file.name);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        handleUploadResume(acceptedFiles[0]);
      }
    },
  });

  return (
    <div className="self-center flex flex-col gap-4">
      {/* Drag & Drop File Upload */}
      <div
        {...getRootProps()}
        className={`p-6 bg-white border-2 border-dashed rounded-lg cursor-pointer transition ${
          isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center flex flex-col items-center">
          <FaUpload className="w-5 h-5 text-gray-500" />
          <p className="text-gray-600 mt-2">
            Drag & Drop or click to select a file
          </p>
          <p className="text-sm text-gray-400">Only PDF files allowed</p>
        </div>
      </div>

      {/* Display File Preview & Name */}
      {displayResumeUrl && (
        <div className="mt-4 flex flex-col bg-gray-100 p-3 rounded-lg">
          <p className="text-gray-700 font-medium">
            {fileName || "Uploaded File"}
          </p>
          <FileViewer fileUrl={displayResumeUrl} />
        </div>
      )}
    </div>
  );
};

export default PDFInputField;
