import React, { useState, useEffect } from "react";
import "./App.css";
import { FaEnvelope, FaGithub, FaLinkedin, FaQuoteLeft, FaQuoteRight, FaXTwitter } from "react-icons/fa6";
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
            <div className="md:container mx-auto px-2 sm:px-4 flex flex-wrap grid grid-row-3 gap-2 sm:gap-4 w-full max-w-full sm:max-w-2xl">
              <SplitText
                text={quote.quote}
                className="text-2xl sm:text-4xl md:text-6xl font-semibold text-center justify-center-safe mb-2 sm:mb-4"
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
              <p id="author" className="text-lg sm:text-2xl font-black mb-4 sm:mb-6">{quote.author}</p>
            </div>
          </>
        )}

        <div className="buttons flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2 justify-center w-full">
          {/* Pill design for New Quote */}
          <button
            id="new-quote"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-2 px-4 sm:px-6 rounded-full shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-auto"
            onClick={fetchNewQuote}
            disabled={loading}
          >
            New Quote
          </button>
          {/* Stroke (outline) design for Share */}
          <a
            id="tweet-quote"
            className="flex flex-row items-center gap-2 border-2 border-white text-white font-bold py-2 px-4 sm:px-6 rounded-full transition-all duration-200 hover:bg-white hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-auto justify-center"
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