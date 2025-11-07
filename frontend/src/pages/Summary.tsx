import { useState } from "react";
import type { FormEvent } from "react"


const Summary = () => {
  const [inputText, setInputText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSummaryModal, setSaveSummaryModal] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputText.trim()) {
      alert("Please enter some text to summarize.");
      return;
    }

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

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    setSaving(true);

    try {
      const response = await fetch("http://localhost:8000/save_summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title: title, summary: summary}),
      }
      );

      if (!response.ok) {
        throw new Error(`HTTP ERROR! Status: ${response.status}`)
      };

      setInputText("");
      setIsSubmitted(false);
    } catch (error: any) {
      console.error("Error: ", error)
      alert("Failed to save your summary. Please try again.")
    } finally {
      setSaving(false);
      setTitle("");
      setSaveSummaryModal(false);
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
                disabled={loading}
                className={`${loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700" } text-white font-medium rounded-lg px-5 py-2.5`}
            >
                { loading ? "Summarizing..." : "Summarize" }
            </button>
          </div>
        </div>
      </form>

      {isSubmitted && (
        <div className="w-full mt-6 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Summary:</h2>
          <p>{summary}</p>
          <button
            onClick={() => setSaveSummaryModal(true)}
            className={"bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg mt-2.5 px-5 py-2.5"}
        >
            Save
          </button>
        </div>
      )}

      {saveSummaryModal && (
        <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-2xl w-96 relative border border-gray-700">
            <button
              onClick={() => setSaveSummaryModal(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center text-purple-400">
              Save your summary
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSaveSummaryModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`px-4 py-2 rounded-lg font-medium ${
                  saving
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                } text-white`}
              >
                {saving ? "Saving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Summary;
