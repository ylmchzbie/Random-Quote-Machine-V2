import React, { useState, useEffect } from "react";
import "./App.css";
import { FaBeer } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";


const API_KEY = "jaFa+dzN8Ybhcx3X+b8kHA==qATAwCNJgRz4vsXr";

function App() {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [loading, setLoading] = useState(false);

  // Fetch a new quote from the API
  const fetchNewQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": API_KEY }
      });
      const data = await response.json();
      setQuote({ quote: data[0].quote, author: data[0].author });
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({
        quote: "Oops! Couldn't fetch a quote.",
        author: "Unknown"
      });
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
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div id="quote-box">
        {loading ? (
          <div className="flex flex-col items-center justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <>
            <p id="text" className="text-base mb-4">"{quote.quote}"</p>
            <p id="author" className="font-bold text-xl mb-4">- {quote.author}</p>
          </>
        )}

        <div className="buttons flex flex-row items-center gap-6 mt-4 justify-center">
          <button id="new-quote" onClick={fetchNewQuote} disabled={loading}>
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
    </div>
  );
}

export default App;