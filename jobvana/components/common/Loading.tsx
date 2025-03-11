const Loading: React.FC<{ styles: string }> = ({ styles }) => {
  // component for loading state i.e if fetching jobs from backend

  return (
    <>
      <div className={`w-full flex items-center justify-center ${styles}`}>
        <span className="h-20 w-20 border-8 border-t-gray-900 border-gray-300 rounded-full animate-spin"></span>
      </div>
    </>
  );
};

export default Loading;
