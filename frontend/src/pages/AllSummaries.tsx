import { useEffect, useState } from "react";
import axios from "axios";

const AllSummaries = () => {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/all_summaries")
                setData(response.data.summaries);
            } catch (err) {
                console.error("Error occurred when fetching the summaries.")
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) return <p className="text-white text-xl">Loading...</p>;
//   const data = [
//     { id: 1, title: "Alphabets", summary: "ABC" },
//     { id: 2, title: "Whole Numbers", summary: "012" },
//     { id: 3, title: "Natural Numbers", summary: "123" },
//   ];

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900 p-8">
      <div className="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700">
        <h1 className="text-3xl font-semibold text-center text-white py-6 border-b border-gray-700">
          All Summaries
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-200">
            <thead className="bg-gray-700 text-gray-100 text-left">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                  Sr No.
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">
                  Summary
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-gray-700 hover:bg-gray-700/60 transition"
                >
                  <td className="px-6 py-4">{row.id}</td>
                  <td className="px-6 py-4">{row.title}</td>
                  <td className="px-6 py-4">{row.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSummaries;
