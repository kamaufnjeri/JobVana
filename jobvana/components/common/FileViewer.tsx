import { FaDownload } from "react-icons/fa";
import Button from "./Button";

const FileViewer: React.FC<{ fileUrl: string }> = ({ fileUrl }) => {
  // component to display pdf for the resume

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <iframe
        src={fileUrl}
        width="100%"
        height="480"
        style={{ maxWidth: "640px" }}
        frameBorder="0"
        allowFullScreen
      />{" "}
      <a target="_blank" rel="noopener noreferrer" href={fileUrl} download>
        <Button
          name="Download File"
          children={<FaDownload />}
          styles="bg-primary bg-primary rounded-md text-white h-10 p-2 w-full self-center"
        />
      </a>
    </div>
  );
};

export default FileViewer;
