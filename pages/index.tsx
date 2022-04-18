import jsTokens from "js-tokens";
import type { NextPage } from "next";
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
      <h1 className="text-center text-3xl font-bold text-yellow-400 mt-5">Compiler Mini Project</h1>
      <div className="flex justify-center items-center mt-5">
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
      <div className={"absolute left-[50%] top-[50%] translate-x-[-50%] mt-[-200px] " +(result.length>0 ? 'border-4 p-5 border-yellow-500': 'border-none')}>
        {result.length !== 0 ? (
          result.split("|").map((e) => (
            <>
              <div key={result.split("|").indexOf(e)}>
                <span className="text-yellow-400 text-lg font-bold">Token {result.split("|").indexOf(e) + 1}</span>: {e}
              </div>
              <br />
            </>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Home;
