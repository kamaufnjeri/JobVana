import { uploadFile } from "@/utils/fileUploadUtils";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrashAlt } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import FileViewer from "./FileViewer";

const PDFInputField: React.FC<{
  handleResumeChange: (resume: string) => void;
  resume: string;
}> = ({ handleResumeChange, resume }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadResume = async (file: File) => {
    setLoading(true);
    setError(null); // Reset error before upload

    try {
      const resumeUrl = await uploadFile(file);
      handleResumeChange(resumeUrl);
    } catch (err) {
      setError("Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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

      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <span className="h-6 w-6 border-4 border-t-gray-900 border-gray-300 rounded-full animate-spin"></span>
        </div>
      ) : (
        resume && (
          <div className="mt-4 flex justify-between items-center bg-gray-100 p-2 rounded-lg">
            <FileViewer fileUrl={resume} />
          </div>
        )
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default PDFInputField;
