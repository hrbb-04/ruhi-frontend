import React from "react";
import { Link } from "react-router-dom";

const ModuleDetails2 = () => {
  return (
    <section className="relative flex flex-col lg:flex-row overflow-hidden">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10">
        <div className="text-center max-w-2xl">
          <h2 className="text-2xl lg:text-4xl font-display font-bold text-textDark mb-5">
            Explore Our Features
          </h2>
          <p className="text-base lg:text-lg text-textDark/80 mb-10">
            Two powerful tools to help you find spiritual guidance
          </p>

          <div className="mt-10 opacity-80">
            <div className="inline-block p-6 border-4 border-accentDark rounded-full">
              <div className="w-24 h-24 border-4 border-accentDark rounded-full flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-accentDark  rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panels */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="w-full flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-gradient-to-br from-white to-primary rounded-2xl shadow-xl overflow-hidden border border-secondary">
            <div className="p-6">
              <h3 className="text-xl font-display font-bold text-secondary mb-3">
                Emotion Detection
              </h3>
              <p className="text-textDark mb-5">
                Share how you feel and receive personalized guidance from
                Quranic verses and Hadith
              </p>
              <Link to="/emotion">
                <button className="bg-gradient-to-r from-accent to-goldLight text-textDark font-bold py-3 px-6 rounded-xl w-full shadow-lg shadow-accent/30">
                  Try Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-gradient-to-br from-white to-primary rounded-2xl shadow-xl overflow-hidden border border-secondary">
            <div className="p-6">
              <h3 className="text-xl font-display font-bold text-secondary mb-3">
                Hadith Explorer
              </h3>
              <p className="text-textDark mb-5">
                Discover prophetic wisdom organized by topics and emotions
              </p>
              <Link to="/hadith">
                <button className="bg-gradient-to-r from-accent to-goldLight text-textDark font-bold py-3 px-6 rounded-xl w-full shadow-lg shadow-accent/30">
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

export default ModuleDetails2;
