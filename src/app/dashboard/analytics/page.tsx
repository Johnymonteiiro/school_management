"use client";

import { Button } from "@/components/ui/button";
import { GrDocumentPerformance } from "react-icons/gr";
import { AiOutlineMessage } from "react-icons/ai";
import { BiAnalyse } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import { Bot, ArrowUp, User, ShieldHalf } from "lucide-react";
import { useRef, useEffect, useState, startTransition } from "react";

type Message = {
  message: string;
  sender: "user" | "bot";
};

export default function Analytics() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserMessage = async (formData: FormData) => {
    const userMessage = formData.get("message") as string;
    if (!userMessage) return;

    startTransition(() => {
      setMessages((prev) => [
        ...prev,
        { message: userMessage, sender: "user" },
      ]);
    });

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/assistent/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await response.json();

      const answer = data.result.assistent.answer;
       const cleanMessage = answer.replace(/^```html|```$/g, "").trim();
      if (cleanMessage) {
        startTransition(() => {
          setMessages((prev) => [
            ...prev,
            {
              message: cleanMessage,
              sender: "bot",
            },
          ]);
        });
      } else {
        startTransition(() => {
          setMessages((prev) => [
            ...prev,
            {
              message: "Sorry, I couldn't understand your question.",
              sender: "bot",
            },
          ]);
        });
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      startTransition(() => {
        setMessages((prev) => [
          ...prev,
          { message: "Sorry, something went wrong.", sender: "bot" },
        ]);
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Bot className="stroke-blue-500" />
            <strong className="ml-2">AI Analytics</strong>
          </div>
        </div>

        <div className="flex justify-evenly w-full mt-10">
          <div>
            <h1 className="text-zinc-900 font-bold text-2xl mb-8">
              Analyzing student data <br /> and identifying patterns of dropout
              risk
            </h1>
            <div className="border-l pl-4">
              <div className="flex items-center pb-4">
                <ShieldHalf className="stroke-blue-500" />
                <h3 className="text-base pl-2">Identify At-Risk Students</h3>
              </div>
              <div className="flex items-center pb-4">
                <GrDocumentPerformance size={20} className="stroke-blue-500" />
                <h3 className="text-base pl-2">Monitor Academic Performance</h3>
              </div>
              <div className="flex items-center pb-4">
                <MdContactSupport size={22} className="fill-blue-500" />
                <h3 className="text-base pl-2">Support Decision-Making</h3>
              </div>
              <div className="flex items-center pb-4">
                <BiAnalyse size={20} className="fill-blue-500" />
                <h3 className="text-base pl-2">Improve Resource Allocation</h3>
              </div>
              <div className="flex items-center">
                <AiOutlineMessage size={20} className="fill-blue-500" />
                <h3 className="text-base pl-2">Facilitate Communication</h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded px-4 pt-10 border w-[600px] h-[700px] box-border relative bg-white">
            <div className=" h-[700px] w-full overflow-y-auto">
              <div className="flex-1 overflow-y-auto space-y-6 p-4">
                {messages?.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-2 ${
                        m.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      {m.sender === "bot" ? (
                        <div>
                          <div className="flex items-center border p-1 bg-blue-500 shadow-2xl justify-center rounded-full">
                            <Bot size={30} className="stroke-zinc-100" />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center border p-1 bg-zinc-800 shadow-2xl justify-center rounded-full">
                            <User size={30} className="stroke-zinc-100" />
                          </div>
                        </div>
                      )}
                      <div
                        className={`px-4 py-2 rounded-lg shadow max-w-[100%] ${
                          m.sender === "user"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-[#f8fdff] text-zinc-700"
                        }`}
                      >
                        {m.sender === "bot" ? (
                          <div
                            dangerouslySetInnerHTML={{ __html: m.message }}
                          ></div>
                        ) : (
                          m.message
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="mr-2">
                      <div className="flex items-center border p-1 bg-blue-500 shadow-2xl justify-center rounded-full">
                        <Bot size={30} className="stroke-zinc-100" />
                      </div>
                    </div>
                    <p className="px-4 py-2 rounded-lg shadow-sm bg-blue-50 text-blue-800">
                      Loading...
                    </p>
                  </div>
                )}
                <div ref={chatEndRef}></div>
              </div>
            </div>

            <div>
              <div className="pb-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleUserMessage(formData);
                    e.currentTarget.reset();
                  }}
                  className="flex items-center gap-2 w-full bg-gray-50 p-2 rounded-lg shadow-md"
                >
                  <input
                    name="message"
                    className="flex-1 resize-none border-none shadow-none focus:ring-0 focus:outline-none overflow-hidden bg-gray-50 text-gray-700 px-3 py-2 rounded-lg"
                    placeholder="Type your question or request..."
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = target.scrollHeight + "px";
                    }}
                  />
                  <Button
                    type="submit"
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                  >
                    <ArrowUp />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
