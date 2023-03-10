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
    <div className="mx-auto mt-8 flex max-w-xs flex-col gap-8 text-center sm:max-w-lg lg:max-w-xl">
      <h1 className="text-center text-5xl font-black text-white">
        Email List Formatter
      </h1>
      <section className="flex flex-col gap-6 ">
        <form
          onSubmit={() => formatData(data, event)}
          className={`flex w-full flex-col justify-around gap-1.5`}
        >
          <textarea
            className={`block min-h-[200px] cursor-auto resize-y rounded bg-[#0D1117] p-1 text-sm text-[#C9D1D8] outline outline-1 outline-[#50585F] focus:outline-blue-500`}
            autoFocus
            placeholder="Paste your email list here!"
            onChange={(e) => setData(e.target.value)}
            value={data}
          ></textarea>
          <button
            type="submit"
            className="rounded-md bg-green-700 py-2 text-sm text-white transition-colors hover:bg-green-600"
          >
            Submit
          </button>
        </form>
        <div className={`flex w-full flex-col justify-around gap-1.5`}>
          <textarea
            className="block min-h-[200px] resize-y rounded bg-gray-800 p-1 text-sm text-[#C9D1D8]"
            placeholder="You'll see your results here!"
            disabled
            value={results.join("\n")}
          />
          <button
            type="button"
            onClick={copyToClipboard}
            className="rounded-md bg-gray-700 py-2 text-sm text-white hover:outline hover:outline-2 hover:outline-blue-500 "
          >
            Copy
          </button>
        </div>
      </section>
    </div>
  );
}
