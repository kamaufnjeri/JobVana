const StatsSection: React.FC = () => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-6 border border-borderColor rounded-lg shadow-md">
          <h3 className="text-h3 font-semibold text-primary">50,000+</h3>
          <p className="text-h5 opacity-80">People Hired</p>
        </div>

        <div className="p-6 border border-borderColor rounded-lg shadow-md">
          <h3 className="text-h3 font-semibold text-primary">10,000+</h3>
          <p className="text-h5 opacity-80">Companies Hiring</p>
        </div>

        <div className="p-6 border border-borderColor rounded-lg shadow-md">
          <h3 className="text-h3 font-semibold text-primary">120,000+</h3>
          <p className="text-h5 opacity-80">Jobs Posted</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
