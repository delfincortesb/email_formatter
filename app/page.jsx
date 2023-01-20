"use client";

import { useState } from "react";
import Head from "next/head";

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
          combinedEmails.push(currentEmail);
          currentEmail = "";
        }
        currentEmail += email;
      } else {
        currentEmail += email;
      }
    });

    if (currentEmail.length > 0) {
      combinedEmails.push(currentEmail.replace(" ", ""));
    }

    setResults(combinedEmails);
  }
  function copyToClipboard() {
    return navigator.clipboard.writeText(results);
  }
  return (
    <>
      <main>
        <div>
          <form
            onSubmit={() => formatData(data, event)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              gap: 6,
              width: "500px",
            }}
          >
            <textarea
              style={{
                minHeight: "200px",
                cursor: "auto",
                outline: "1px solid black",
              }}
              onChange={(e) => setData(e.target.value)}
              value={data}
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div
          style={{
            paddingTop: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: 6,
            width: "500px",
          }}
        >
          <h2>Results:</h2>
          <textarea
            style={{ width: "100%", minHeight: "200px" }}
            disabled
            value={results.join("\n")}
          />
          <button
            type="button"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
      </main>
    </>
  );
}
