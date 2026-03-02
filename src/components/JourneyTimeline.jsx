const JourneyTimeline = ({ journey }) => {
  if (!journey) return null;

  return (
    <section className="w-full mb-8 ">
      <div className="max-w-6xl mx-auto px-5">
        <p className="text-[#9AD000] font-semibold tracking-widest mb-2">
          JOURNEY
        </p>
        <h2 className="text-4xl font-bold text-balck mb-14">{journey.title}</h2>
      </div>
      <div className="w-full py-16 bg-[#052842]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
            {journey.steps?.map((step) => (
              <div key={step.id} className="text-white">
                {/* IMAGE MATCHED TOP BAR */}
                <div className="relative flex items-center mb-6">
                  <span className="w-4 h-4 bg-[#9AD000] "></span>

                  <div className="relative flex-1 ml-4">
                    {/* <div className="border-t-2 border-[#9AD000]"></div> */}
                    <img src="/arrow.png" alt="" className="w-[290px] h-3" />

                    <span className="absolute font-[Syne] left-1/5 -translate-x-1/2 -top-7 text-white text-sm font-semibold">
                      {step.year_range}
                    </span>
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-white font-[Syne] text-lg font-bold mb-5 leading-snug">
                  {step.title}
                </h3>

                {/* DESCRIPTION */}
                <div
                  className="text-[16px] font-[Syne] leading-7 text-white/90"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
