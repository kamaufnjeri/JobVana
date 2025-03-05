import Header from "../layout/Header";

const Loading: React.FC<{styles: string}> = ({styles}) => {
  return (
    <>
      <div className={`w-screen flex items-center justify-center ${styles}`}>
        <span className="h-20 w-20 border-8 border-t-gray-900 border-gray-300 rounded-full animate-spin"></span>
      </div>
    </>
  );
};

export default Loading;
