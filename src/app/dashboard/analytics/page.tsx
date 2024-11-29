"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, ArrowUp } from "lucide-react";

export default function Analytics() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Painel principal */}
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Bot className="stroke-blue-500" />
            <strong className="ml-2">AI analytics</strong>
          </div>
        </div>

        <div className="flex items-center justify-evenly w-full mt-20">
          <div>
            <h3>You can analyze all data for any student</h3>
          </div>

          <div className="rounded px-4 pt-10 border w-[600px] h-[700px] box-border relative">
            {/* Resposta da AI */}
            <div className="flex">
              <div>
                <div className="flex items-center border p-2 bg-blue-500 shadow-2xl justify-center rounded-full">
                  <Bot size={35} className="stroke-zinc-100" />
                </div>
              </div>
              <div className="px-4">
                <p className="text-zinc-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias magnam in sit velit molestiae dignissimos voluptatum
                  nobis quia impedit repellat nihil temporibus soluta autem
                  dolor praesentium ab, enim minima ipsa eum sunt id distinctio
                  laborum. Omnis nesciunt unde odio. Debitis. Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Molestias magnam in sit
                  velit molestiae dignissimos voluptatum nobis quia impedit
                  repellat nihil temporibus soluta autem dolor praesentium ab,
                  enim minima ipsa eum sunt id distinctio laborum. Omnis
                  nesciunt unde odio. Debitis.
                </p>
              </div>
            </div>

            {/* Input e Botão */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 w-full bg-white p-2 rounded-lg shadow-md">
                <Input
                  className="flex-1 border-none shadow-none focus:ring-0 focus:outline-none"
                  placeholder="Type your message..."
                />
                <Button className="p-2">
                  <ArrowUp />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//  <div className="flex items-center rounded-full w-4 h-4 gap-2">
//             <Bot className="stroke-green-500" />
//             <strong>Aluno360</strong>
//           </div>
//           <p className="text-sm text-muted-foreground">
//             Interaja com o assistente para obter ajuda personalizada e insights
//             analíticos.
//           </p>
//           <div className="flex flex-col gap-2">
//             <input
//               type="text"
//               placeholder="Digite sua pergunta aqui..."
//               className="w-full rounded-lg border border-muted bg-white p-2 text-sm focus:ring-2 focus:ring-blue-500"
//             />
//             {/* Botão enviar */}
//             <button className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600">
//               Enviar
//             </button>
//           </div>
