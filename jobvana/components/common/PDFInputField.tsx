import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa6";
import FileViewer from "./FileViewer";

const PDFInputField: React.FC<{
  handleResumeChange: (resume: string | File) => void; // handles resume change setting resume field in application form data
  resume: string | File; // the resume if set
  resumeUrl: string | null; // url to resume if updating application
  setResumeUrl: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ handleResumeChange, resume, resumeUrl, setResumeUrl }) => {
  const [displayResumeUrl, setDisplayResumeUrl] = useState(resumeUrl);

  const handleUploadResume = async (file: File) => {
    // function to handle when pdf file for resume is selected
    handleResumeChange(file);
    // create a temporary url for resume selected to display it
    const fileUrl = URL.createObjectURL(file);
    setResumeUrl(fileUrl);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // accepsts only pdf documents
    accept: {
      "application/pdf": [".pdf"],
    },
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

      {displayResumeUrl && (
        <div className="mt-4 flex justify-between items-center bg-gray-100 p-2 rounded-lg">
          <FileViewer fileUrl={displayResumeUrl} />
        </div>
      )}
    </div>
  );
};

export default PDFInputField;
