import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversationStep, setConversationStep] = useState("start"); // Initial Step

  const sendMessage = async () => {
    if (!input.trim()) return;

    let newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    let botResponse = "I didn't understand that.";

    // Handling different conversation steps
    if (conversationStep === "start") {
      if (input === "1") {
        botResponse = "Great! Please enter your preferred job location.";
        setConversationStep("askLocation");
      } else if (input === "2") {
        botResponse = "You selected Portal Assistance. How can I help?";
        setConversationStep("portalHelp");
      } else {
        botResponse = "Please choose 1 for 'Job' or 2 for 'Portal Assistance'.";
      }
    } else if (conversationStep === "askLocation") {
      botResponse = `Looking for jobs in ${input}. Here are some options:\n\n1. Software Developer\n2. Data Analyst\n3. Marketing Manager\n\nReply with the job number to see details.`;
      setConversationStep("jobList");
    } else if (conversationStep === "jobList") {
      botResponse = `You selected job ${input}. Would you like to apply? (Yes/No)`;
      setConversationStep("applyJob");
    } else if (conversationStep === "applyJob") {
      if (input.toLowerCase() === "yes") {
        botResponse = "Great! Redirecting you to the application process...";
      } else {
        botResponse = "No problem! Let me know if you need more job options.";
        setConversationStep("start"); // Restart conversation
      }
    }

    setMessages([...newMessages, { sender: "bot", text: botResponse }]);
  };

  return (
    <div className="chatbot-container">
      <h2>Job Search Assistant</h2>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={conversationStep === "start" ? "1: Job | 2: Portal Assistance" : "Type your response..."}
      />
      <button onClick={sendMessage}>Send</button>

      <style>
        {`
          .chatbot-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            height: 100vh;
            background-color: #1e1e1e;
            color: white;
          }

          .chatbox {
            width: 80%;
            max-width: 500px;
            height: 400px;
            overflow-y: auto;
            background: #333;
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 10px;
          }

          .message {
            padding: 8px;
            margin: 5px 0;
            border-radius: 5px;
          }

          .user {
            background-color: #007bff;
            text-align: right;
          }

          .bot {
            background-color: #28a745;
            text-align: left;
          }

          input {
            width: 80%;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            border: none;
          }

          button {
            padding: 10px 15px;
            background: #00b4d8;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default Chatbot;
