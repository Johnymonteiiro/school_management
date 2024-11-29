"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, ArrowUp, User } from "lucide-react";
import {
  useOptimistic,
  useRef,
  useEffect,
  useState,
  startTransition,
} from "react";

type Message = {
  message: string;
  sender: "user" | "bot";
};

export default function Analytics() {
  const [messages, setMessages] = useState<Message[]>([]); // Estado local para mensagens
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

    // Adiciona a mensagem do usuário ao estado
    startTransition(() => {
      setMessages((prev) => [
        ...prev,
        { message: userMessage, sender: "user" },
      ]);
    });

    setIsLoading(true);

    try {
      // Faz a chamada para a API (simulação abaixo)
      // const response = await fetch("/api/ai-response", {
      //   method: "POST",
      //   body: JSON.stringify({ message: userMessage }),
      //   headers: { "Content-Type": "application/json" },
      // });

      // const data = await response.json();

      // Adiciona a resposta da API ao estado
      startTransition(() => {
        setMessages((prev) => [
          ...prev,
          { message: "Hi there !", sender: "bot" },
        ]);
      });
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
      {/* Painel principal */}
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Bot className="stroke-blue-500" />
            <strong className="ml-2">AI Analytics</strong>
          </div>
        </div>

        <div className="flex items-center justify-evenly w-full mt-10">
          <div>
            <h3>You can analyze all data for any student</h3>
          </div>

          <div className="rounded px-4 pt-10 border w-[600px] h-[700px] box-border relative flex flex-col bg-white">
            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto space-y-6 p-4">
              {messages?.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      m.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {m.sender === "bot" ? (
                      <div className="flex items-center border p-1 bg-blue-500 shadow-2xl justify-center rounded-full">
                        <Bot size={30} className="stroke-zinc-100" />
                      </div>
                    ) : (
                      <div className="flex items-center border p-1 bg-zinc-800 shadow-2xl justify-center rounded-full">
                        <User size={30} className="stroke-zinc-100" />
                      </div>
                    )}
                    <p
                      className={`px-4 py-2 rounded-lg shadow-md ${
                        m.sender === "user"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {m.message}
                    </p>
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illo, accusantium culpa! Rem hic et aliquid quo repudiandae
                    eius a pariatur iure vero quidem corporis voluptates,
                    similique possimus, in quaerat tempore?
                  </p>
                </div>
              )}
              <div ref={chatEndRef}></div>
            </div>

            {/* Campo de entrada */}
            <div className="absolute bottom-4 left-4 right-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleUserMessage(formData);
                  e.currentTarget.reset();
                }}
                className="flex items-center gap-2 w-full bg-gray-50 p-2 rounded-lg shadow-md"
              >
                <Input
                  name="message"
                  className="flex-1 border-none shadow-none focus:ring-0 focus:outline-none"
                  placeholder="Type your question or request..."
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
  );
}
