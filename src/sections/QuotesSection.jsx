import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QuotesSection = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const animationRef = useRef(null);

  const carouselItems = [
    {
      arabic:
        "ٱلَّذِينَ ءَامَنُوا۟ وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ ٱللَّهِ ۗ أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
      english:
        "Those who have believed and whose hearts are assured by the remembrance of Allāh. Unquestionably, by the remembrance of Allāh hearts are assured.",
      reference: "Quran 13:28",
      type: "verse",
    },
    {
      arabic:
        "لَيْسَ الْغِنَى عَنْ كَثْرَةِ الْعَرَضِ، وَلَكِنَّ الْغِنَى غِنَى النَّفْسِ",
      english:
        'Narrated Abu Huraira: The Prophet (ﷺ) said, "Wealth is not in having many possessions, but rather (true) wealth is feeling sufficiency in the soul."',
      reference: "Sahih al-Bukhari 6446",
      type: "hadith",
    },
    {
      arabic:
        "اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً",
      english:
        "O Allah, there is no ease other than what You make easy. If You please You ease sorrow.",
      reference: "Hisn al-Muslim 139",
      type: "dua",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      animationRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom top",
          toggleActions: "play none none none",
        },
      });

      animationRef.current.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      animationRef.current.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % carouselItems.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <section
      ref={sectionRef}
      className="snap-section relative min-h-[80vh] flex flex-col bg-gradient-to-br from-quotesDark to-accentDark py-12 md:py-16"
    >
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="text-center max-w-3xl mb-8 md:mb-12">
          <h2
            ref={titleRef}
            className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-textLight mb-3"
          >
            Because the Heart Needs Divine Guidance
          </h2>
          <div className="h-1 w-16 bg-white/50 mx-auto my-4 rounded-full"></div>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-textLight/90 leading-relaxed"
          >
            Let the Quran, Hadith, and Duas illuminate your path when emotions
            weigh heavy.
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <div className="relative w-full h-[350px] md:h-[400px] overflow-hidden rounded-2xl shadow-xl">
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out p-4 ${
                  currentCard === index
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div className="bg-gradient-to-br from-primary to-primaryMedium rounded-xl h-full flex flex-col overflow-hidden border border-gray-100 shadow-lg">
                  <div className="flex-1 overflow-y-auto p-5 md:p-6">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-secondary text-textLight rounded-full text-sm font-medium capitalize">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xl md:text-2xl text-right font-arabic leading-loose mb-4 text-textDark">
                      {item.arabic}
                    </p>
                    <div className="h-px bg-secondary/30 my-4"></div>
                    <p className="text-base text-textDark mb-4 italic">
                      {item.english}
                    </p>
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <p className="text-right text-textDark font-medium">
                      {item.reference}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCard(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentCard === index
                      ? "bg-primary scale-125"
                      : "bg-white/50"
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;
