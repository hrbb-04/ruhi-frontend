import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ModuleDetails = () => {
  const sectionRef = useRef(null);
  const leftPanelRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftPanelRef.current,
          pinSpacing: false,
          scrub: true,
        });

        gsap.fromTo(
          card1Ref.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: card1Ref.current,
              start: "top bottom",
              end: "center center",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          card2Ref.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: card2Ref.current,
              start: "top bottom",
              end: "center center",
              scrub: true,
            },
          },
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="snap-section relative min-h-0 lg:min-h-[200vh] flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Left Panel */}
      <div
        ref={leftPanelRef}
        className="w-full lg:w-1/2 min-h-[50vh] lg:h-screen flex items-center justify-center p-6 lg:p-12 z-10"
      >
        <div className="text-center max-w-2xl py-12 lg:py-0">
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-textDark mb-4 lg:mb-6">
            Explore Our Features
          </h2>
          <p className="text-base lg:text-xl text-textDark/80 mb-8 lg:mb-12">
            Two powerful tools to help you find spiritual guidance
          </p>

          <div className="mt-8 lg:mt-12 opacity-80">
            <div className="inline-block p-4 lg:p-8 border-4 border-quotesDark rounded-full">
              <div className="w-16 h-16 lg:w-32 lg:h-32 border-4  border-quotesDark rounded-full flex items-center justify-center">
                <div className="w-10 h-10 lg:w-20 lg:h-20 border-4  border-quotesDark rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panels */}
      <div className="w-full lg:w-1/2 lg:ml-auto">
        <div
          ref={card1Ref}
          className="min-h-[50vh] lg:min-h-screen w-full flex items-center justify-center p-4 lg:p-8"
        >
          <div className="max-w-md w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-6">
              <h3 className="text-xl lg:text-2xl font-display font-bold text-purple-900 mb-4">
                Emotion Detection
              </h3>
              <p className="text-gray-700 mb-6">
                Share how you feel and receive personalized guidance from
                Quranic verses and Hadith
              </p>
              <Link to="/emotion">
                <button className="bg-gradient-to-r from-accent to-goldLight text-textDark font-bold py-3 px-6 rounded-xl w-full transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50">
                  Try Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={card2Ref}
          className="min-h-[50vh] lg:min-h-screen w-full flex items-center justify-center p-4 lg:p-8"
        >
          <div className="max-w-md w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-display font-bold text-purple-900 mb-4">
                Hadith Explorer
              </h3>
              <p className="text-gray-700 mb-6">
                Discover prophetic wisdom organized by topics and emotions
              </p>
              <Link to="/hadith">
                <button className="bg-gradient-to-r from-accent to-goldLight text-textDark font-bold py-3 px-6 rounded-xl w-full transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50">
                  Explore Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleDetails;
