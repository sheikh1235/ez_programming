import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import LoadingScreen from "../loadingScreen/LoadingScreen";

const CodeSnippets = () => {
  let codes = [
    {
      name: "Variables",
      desc: "C++ program to show difference b/w definition and declaration of a variable",
      id: "bab31234-d151-4604-96fc-a02527c65416"
    },
    {
      name: "Loops - 1",
      desc: "To illustrate the purpose of For Loops",
      id: "4b07a1a6-6934-46f3-a2fa-b7058606b9f5"
    },
    {
      name: "Loops - 2",
      desc: "To illustrate the purpose of While loops",
      id: "f8ef53fc-d846-445c-8df3-b0638cf04169"
    },
    {
      name : "IF",
      desc : "This file teaches the use of If as a decision making statement",
      id : "e152a3db-9ebb-4dd6-863c-f60526526345"
    },
  ]

  useEffect(() => {
    document.title = "Code Snippets"
  }, []);

  return (
  <div className="mb-5">
      <Navbar />
      <div className="container mt-5">
      <h2 style={{marginLeft: "50px", marginRight: "50px"}}>
        These code snippets are covering explanation and examples of c++ basics
      </h2>
      </div>
      {codes.map((a) => {
      return (
        <div
          className="card w-75 mx-auto mt-5"
          style={{ borderColor: "#123d35" }}
        >
          <div className="card-body">
            <h5 className="">{a.name}</h5>
            <p className="card-text">
            {a.desc} 
              <Link
                to = {`/homepage/${a.id}`}
                style={{
                  color: "#123d35",
                  float: "right",
                  marginRight: "20px",
                }}
              >
                Open with terminal
                <i
                  className="fa fa-arrow-up ml-1"
                  style={{ color: "#123d35" }}
                ></i>
              </Link>
            </p>
            
          </div>
        </div>
      )
      })}

    </div>)
};

export default CodeSnippets;
