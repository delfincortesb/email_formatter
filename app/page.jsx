"use client";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState();
  const [results, setResults] = useState([]);

  function formatData(data, event) {
    event.preventDefault();

    const r = data
      .split(/\r?\n/)
      .map((e) => {
        if (e.includes("@")) {
          let emailParts = e.split("@");
          let domain = emailParts[1].trim();
          domain = domain.replace(/\s/g, "");
          e = emailParts[0] + "@" + domain;
        }
        return e;
      })
      .filter(Boolean);

    let currentEmail = "";
    const combinedEmails = [];

    r.map((email) => {
      if (email.includes("@")) {
        if (currentEmail.length > 0) {
          combinedEmails.push(currentEmail.replaceAll(" ", ""));
          currentEmail = "";
        }
        currentEmail += email;
      } else {
        currentEmail += email;
      }
    });

    if (currentEmail.length > 0) {
      combinedEmails.push(currentEmail.replaceAll(" ", ""));
    }
    setResults(combinedEmails);
  }

  function copyToClipboard() {
    return navigator.clipboard.writeText(results);
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-8 w-full mt-8">
      <h1 className="text-white font-black text-5xl text-center">
        Email List Formatter
      </h1>
      <section className="flex flex-col w-full gap-6 ">
        <form
          onSubmit={() => formatData(data, event)}
          className={`flex flex-col justify-around gap-1.5 w-full`}
        >
          <textarea
            className={`min-h-[200px] rounded cursor-auto outline w-full outline-[#50585F] outline-1 bg-[#0D1117] text-[#C9D1D8] p-1 text-sm focus:outline-blue-500`}
            autoFocus
            placeholder="Paste your email list here!"
            onChange={(e) => setData(e.target.value)}
            value={data}
          ></textarea>
          <button
            type="submit"
            className="bg-green-700 text-white text-sm py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Submit
          </button>
        </form>
        <div className={`flex flex-col justify-around gap-1.5 w-full`}>
          <textarea
            className="w-full bg-gray-800 rounded min-h-[200px] text-[#C9D1D8] p-1 text-sm"
            placeholder="You'll see your results here!"
            disabled
            value={results.join("\n")}
          />
          <button
            type="button"
            onClick={copyToClipboard}
            className="bg-gray-700 text-white text-sm py-2 rounded-md hover:outline hover:outline-blue-500 hover:outline-2 "
          >
            Copy
          </button>
        </div>
      </section>
    </div>
  );
}
