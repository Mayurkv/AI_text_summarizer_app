import { useState, FormEvent } from "react";

const Summary = () => {
  const [inputText, setInputText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputText.trim()) {
      alert("Please enter some text to summarize.");
      return;
    }

    // const mockSummary = `Summary: ${inputText.substring(0, 100)}...`;
    // setSummary(mockSummary);

    setLoading(true);
    setIsSubmitted(false);

    try {
      const response = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({text: inputText}),
      }
      );

      if (!response.ok) {
        throw new Error(`HTTP ERROR! Status: ${response.status}`)
      };

      const data = await response.json();
      setSummary(data.summary);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Error: ", error)
      alert("Failed to summarize. Please try again.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full max-w-2xl p-6 text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">AI Text Summarizer</h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          maxLength={5000}
          placeholder="Paste or type your text here (max 5000 characters)..."
          className="w-full h-48 p-3 font-normal rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-white"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            {inputText.length}/5000 characters
          </span>
          <div>
            <button
                type="button"
                onClick={() => setInputText('')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-5 py-2.5"
            >
                Clear
            </button>
            &nbsp;
            <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-5 py-2.5"
            >
                Summarize
            </button>
          </div>
        </div>
      </form>

      {isSubmitted && (
        <div className="w-full mt-6 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summary;
