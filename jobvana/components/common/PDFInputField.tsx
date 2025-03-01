import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FaTrashAlt } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa6';

const PDFInputField: React.FC = ({ }) => {
  const [file, setFile] = useState<File | null>(null);
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

 

  return (
    <div className="self-center flex flex-col gap-2">
      {/* Drag & Drop File Upload */}
      <div
        {...getRootProps()}
        className={`p-6 bg-white border-2 border-dashed rounded-lg cursor-pointer transition ${
          isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center flex flex-col items-center ">
          <FaUpload className="w-5 h-5 text-gray-500" />
          <p className="text-gray-600 mt-2">Drag & Drop or click to select a file</p>
          <p className="text-sm text-gray-400">Only PDF and DOC files allowed</p>
        </div>
      </div>

      {file && (
        <div className="mt-4 flex justify-between items-center bg-gray-100 p-2 rounded-lg">
          <span className="text-gray-700 text-sm">{file.name}</span>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => setFile(null)}
          >
            <FaTrashAlt className="w-4 h-4" />
          </button>
        </div>
      )}

     
     
    </div>
  );
};

export default PDFInputField
