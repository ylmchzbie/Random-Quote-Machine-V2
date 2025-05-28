import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "jaFa+dzN8Ybhcx3X+b8kHA==qATAwCNJgRz4vsXr";

function App() {
  const [quote, setQuote] = useState({ quote: "", author: "" });

  const fetchNewQuote = async () => {
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
    }
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  return (
    <div className="container max-w-sm rounded overflow-hidden shadow-">
      <div id="quote-box">
        <p id="text">"{quote.quote}"</p>
        <p id="author">- {quote.author}</p>

        <div className="buttons">
          <button id="new-quote" onClick={fetchNewQuote}>
            New Quote
          </button>
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `"${quote.quote}" - ${quote.author}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweet
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;