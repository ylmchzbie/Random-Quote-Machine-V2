import React, { useState, useEffect } from "react";
import "./App.css";
import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import LoadingThreeDotsPulse from "./LoadingThreeDotsPulse";
import SplitText from "./SplitText";
import Aurora from './Aurora';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const API_KEY = "jaFa+dzN8Ybhcx3X+b8kHA==qATAwCNJgRz4vsXr";

function getRandomGradientStops() {
  // Generate three random colors for Aurora colorStops
  const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
  return [randomColor(), randomColor(), randomColor()];
}

function App() {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [loading, setLoading] = useState(false);
  const [colorStops, setColorStops] = useState(getRandomGradientStops());

  // Fetch a new quote from the API
  const fetchNewQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": API_KEY }
      });
      const data = await response.json();
      setQuote({ quote: data[0].quote, author: data[0].author });
      setColorStops(getRandomGradientStops()); // Change Aurora color stops
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({
        quote: "Oops! Couldn't fetch a quote.",
        author: "Unknown"
      });
      setColorStops(getRandomGradientStops()); // Still change Aurora color stops
    } finally {
      setLoading(false);
    }
  };

  // Fetch a new quote when the component mounts
  useEffect(() => {
    fetchNewQuote();
  }, []);

  // Render the quote and buttons
  return (
    <div className="fixed inset-0 min-h-screen w-full flex items-center justify-center overflow-hidden" style={{ zIndex: 0 }}>
      {/* Aurora as animated background */}
      <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={colorStops}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div
        id="quote-box"
        className="flex flex-col items-center relative z-10"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center my-8 gap-4">
            <LoadingThreeDotsPulse />
          </div>
        ) : (
          <>
            <div className="md:container mx-auto px-4 flex flex-wrap grid grid-row-2 gap-4">
              <SplitText
                text={quote.quote}
                className="text-2xl font-semibold text-center justify-center-safe mb-4"
                delay={20}
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
              />
              <h1 id="author" className="font-bold text-xl mb-6 drop-shadow-xl">{quote.author}</h1>
            </div>
          </>
        )}

        <div className="buttons flex flex-row items-center gap-6 mt-2 justify-center place-content-end-safe">
          <button id="new-quote" className="text-white font-bold py-2 px-4 rounded-full" onClick={fetchNewQuote} disabled={loading}>
            New Quote
          </button>
          <a
            id="tweet-quote"
            className="flex flex-row items-center gap-2"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.quote}" - ${quote.author}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter /> <span>Share</span>
          </a>
        </div>
      </div>
      <footer className="w-full text-center py-4 text-white/70 text-sm absolute bottom-0 left-0 z-20 flex flex-col items-center gap-2">
        <div className="flex flex-row gap-4 justify-center mb-1">
          <a
            href="https://github.com/ylmchzbie"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-white"
            aria-label="GitHub"
          >
            <FaGithub size={22} color="white" />
          </a>
          <a
            href="https://www.linkedin.com/in/caryl-manalo-25aa1b204/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-white"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={22} color="white" />
          </a>
          <a
            href="mailto:carylcium@gmail.com"
            className="hover:text-white transition-colors text-white"
            aria-label="Email"
          >
            <FaEnvelope size={22} color="white" />
          </a>
        </div>
        <div>
          © {new Date().getFullYear()} Quote Generator &mdash; Powered by React & API Ninjas | Developed by Caryl Manalo
        </div>
      </footer>
    </div>
  );
}

export default App;