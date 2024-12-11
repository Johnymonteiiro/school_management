"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

const chartConfig = {
  total_alunos: {
    label: "Total de Alunos",
    color: "hsl(var(--chart-1))",
  },
  
} satisfies ChartConfig;

export function Chart() {
  const [chartData, setChartData] = useState([]);

  // Buscar os dados das turmas
  useEffect(() => {
    async function fetchTurmas() {
      try {
        const response = await fetch("http://127.0.0.1:5001/detalhes_turmas");
        if (!response.ok) throw new Error("Erro ao buscar turmas");

        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Erro ao carregar os dados das turmas:", error);
      }
    }

    fetchTurmas();
  }, []);

  return (
    <Card className="max-w-[1200px] w-full">
      <CardHeader>
        <CardTitle>Gráfico de Turmas</CardTitle>
        <CardDescription>Quantidade de alunos por turma</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart
            data={chartData}
            width={1200}
            height={600}
            barCategoryGap="15%"
            margin={{ top: 20, right: 40, left: 40, bottom: 40 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="nome_turma"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 14 }}
              tickFormatter={(value) =>
                value.length > 12 ? `${value.slice(0, 12)}...` : value
              }
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="total_alunos"
              fill="var(--color-total_alunos)"
              radius={[6, 6, 0, 0]}
              name="Total de Alunos"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Última atualização <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando o número total de alunos por turma cadastrada.
        </div>
      </CardFooter>
    </Card>
  );
}
