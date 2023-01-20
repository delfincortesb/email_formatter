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
    <>
      <main className="max-w-xl mx-auto flex flex-col gap-8 w-full mt-8">
        <h1 className="text-white font-black text-5xl text-center">
          Email List Formatter
        </h1>
        <section className="flex flex-col gap-6 ">
          <form
            onSubmit={() => formatData(data, event)}
            className={`flex flex-col justify-around gap-1.5 w-full mx-auto`}
          >
            <textarea
              className={`min-h-[200px] cursor-auto outline outline-white outline-1 bg-[#181818] text-white p-1 text-sm focus:outline-blue-500`}
              autoFocus
              placeholder="Paste your email list here!"
              onChange={(e) => setData(e.target.value)}
              value={data}
            ></textarea>
            <button
              type="submit"
              className="bg-white text-sm"
            >
              Submit
            </button>
          </form>
          <div
            className={`flex flex-col justify-around gap-1.5 w-full mx-auto`}
          >
            <textarea
              className="w-full min-h-[200px] text-white p-1 text-sm"
              placeholder="You'll see your results here!"
              disabled
              value={results.join("\n")}
            />
            <button
              type="button"
              onClick={copyToClipboard}
              className="bg-white text-sm"
            >
              Copy
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
