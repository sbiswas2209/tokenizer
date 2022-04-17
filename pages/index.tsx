import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await fetch("/api/tokenize", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ input: input }),
    });
    const data = await result.json();
    console.log(data);
    setResult(data.tokens);
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <form className="m-4 flex" onSubmit={handleSubmit}>
          <input
            className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            placeholder="Enter Input String"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r"
          >
            Find Tokens
          </button>
        </form>
      </div>
      <br />
      {result.length !== 0 ? (
        result.split("|").map((e) => (
          <>
            <div key={result.split("|").indexOf(e)}>
              Token {result.split("|").indexOf(e) + 1} : {e}
            </div>
            <br />
          </>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Home;
