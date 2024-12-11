"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Interface para os dados do gráfico
interface ChartData {
  genero: string;
  quantidade: number;
  percentual: number;
  fill?: string; // Associado dinamicamente ao chartConfig
}

// Interface para turmas
interface Turma {
  id_turma: number;
  nome: string;
}

const chartConfig = {
  Masculino: {
    label: "Masculino",
    color: "hsl(var(--chart-1))",
  },
  Femenino: {
    label: "Femenino",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Chart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [selectedTurma, setSelectedTurma] = useState<number | null>(null);

  // Buscar as turmas disponíveis
  useEffect(() => {
    async function fetchTurmas() {
      try {
        const response = await fetch("http://127.0.0.1:5001/turmas");
        if (!response.ok) throw new Error("Erro ao buscar turmas");

        const data: Turma[] = await response.json();
        setTurmas(data);
      } catch (error) {
        console.error("Erro ao carregar as turmas:", error);
      }
    }

    fetchTurmas();
  }, []);

  const fetchChartData = async (turmaId: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5001/alunos_por_genero/${turmaId}`
      );
      if (!response.ok) throw new Error("Erro ao buscar dados do gráfico");

      const data: [string, number, string][] = await response.json();
      const chartConfigKeys = Object.keys(
        chartConfig
      ) as (keyof typeof chartConfig)[];
      const transformedData = data.map(([genero, quantidade, percentual]) => {
        const isValidGenero = chartConfigKeys.includes(
          genero as keyof typeof chartConfig
        );
        return {
          genero,
          quantidade,
          percentual: parseFloat(percentual),
          fill: isValidGenero
            ? chartConfig[genero as keyof typeof chartConfig].color
            : undefined,
        };
      });

      setChartData(transformedData);
    } catch (error) {
      console.error("Erro ao carregar dados do gráfico:", error);
    }
  };

  const handleTurmaChange = (value: string) => {
    const turmaId = parseInt(value, 10);
    setSelectedTurma(turmaId);
    fetchChartData(turmaId);
  };

  // Localizar o nome da turma selecionada
  const turmaSelecionada = turmas.find((turma) => turma.id_turma === selectedTurma);

  return (
    <Card className="flex flex-col max-w-[900px] w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gráfico de Pizza</CardTitle>
        <CardDescription>
          {turmaSelecionada
            ? `Exibindo dados da turma: ${turmaSelecionada.nome}`
            : "Selecione uma turma para exibir os dados"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mb-4">
          <Select onValueChange={handleTurmaChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione uma turma" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Turmas</SelectLabel>
                {turmas.map((turma) => (
                  <SelectItem
                    key={turma.id_turma}
                    value={String(turma.id_turma)}
                  >
                    {turma.nome}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <PieChart width={500} height={500}>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="quantidade"
                nameKey="genero"
                label
              />
              <Legend />
            </PieChart>
          </ChartContainer>
        ) : (
          <p className="text-center text-muted-foreground">
            Selecione uma turma para exibir os dados.
          </p>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Visualizando os dados de gênero por turma{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando dados atualizados por turma selecionada
        </div>
      </CardFooter>
    </Card>
  );
}
