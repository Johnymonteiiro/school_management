"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SelectOptions } from "@/components/select-item";

// Interface para os dados do gráfico
interface ChartData {
  disciplina: string;
  nota: number;
  media: number;
}

// Dados de exemplo do backend
const initialChartData: ChartData[] = [
  { disciplina: "Física", nota: 7.8, media: 5 },
  { disciplina: "Matemática", nota: 8.2, media: 6.5 },
  { disciplina: "Química", nota: 6.5, media: 6.3 },
  { disciplina: "Biologia", nota: 7.0, media: 6.8 },
  { disciplina: "História", nota: 5.8, media: 5.5 },
  { disciplina: "Geografia", nota: 6.2, media: 6.0 },
  { disciplina: "Português", nota: 7.4, media: 7.0 },
  { disciplina: "Inglês", nota: 8.0, media: 6.9 },
  { disciplina: "Artes", nota: 9.1, media: 8.0 },
  { disciplina: "Educação Física", nota: 6.0, media: 5.7 },
  { disciplina: "Filosofia", nota: 7.5, media: 6.6 },
  { disciplina: "Sociologia", nota: 7.2, media: 6.3 },
];

// Configuração do gráfico
const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

const yearOptions = Array.from({ length: 5 }, (_, i) => ({
  value: (2023 - i).toString(),
  label: (2023 - i).toString(),
}));
const semesterOptions = [
  { value: "Primeiro" },
  { value: "Segundo" },
];

export function Chart() {
  const [chartData, setChartData] = useState<ChartData[]>(initialChartData);
  const [year, setYear] = useState<string | null>(null);
  const [semester, setSemester] = useState<string | null>(null);

  const fetchChartData = async (
    year: string | null,
    semester?: string | null
  ): Promise<void> => {
    if (!year) return;

    try {
      const response = await fetch("/api/chart-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ year, semester }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: ChartData[] = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const handleYearFilter = (value: string): void => {
    setYear(value);
    setSemester(null);
    fetchChartData(value);
  };

  const handleSemesterFilter = (value: string): void => {
    if (year) {
      setSemester(value);
      fetchChartData(year, value);
    }
  };

  return (
    <Card className="w-full max-w-[1200px]">
      <CardHeader>
        <CardDescription>
          {semester && year
            ? `Ano: ${year}, Semestre: ${semester}`
            : year
            ? `Ano: ${year}`
            : "Selecione o filtro desejado"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          {/* Filtro por Ano */}
          <SelectOptions
            placeholder="Filtrar por Ano"
            items={yearOptions}
            onValueChange={handleYearFilter}
          />

          <SelectOptions
            placeholder="Filtrar por Semestre"
            items={semesterOptions}
            onValueChange={handleSemesterFilter}
          />
        </div>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            width={500}
            height={300}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="disciplina"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="nota" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="media" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">School managements system</div>
      </CardFooter>
    </Card>
  );
}
