"use client"

import { Users } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { candidate: "macron", votes: 18768639, fill: "#4988ed" },
  { candidate: "lepen", votes: 13288686, fill: "#c80b41" },
  { candidate: "melenchon", votes: 7712520, fill: "#c8161d" },
  { candidate: "zemmour", votes: 2485226, fill: "#16c89b" },
]

const chartConfig = {
  votes: {
    label: "Voix",
  },
  macron: {
    label: "Emmanuel Macron",
    color: "hsl(var(--chart-1))",
  },
  lepen: {
    label: "Marine Le Pen", 
    color: "hsl(var(--chart-2))",
  },
  melenchon: {
    label: "Jean-Luc Mélenchon",
    color: "hsl(var(--chart-3))",
  },
  zemmour: {
    label: "Éric Zemmour",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function HorizontalChart() {
  // Calculer le total des voix
  const totalVotes = chartData.reduce((sum, item) => sum + item.votes, 0)

  return (
    <Card className="w-full bg-transparent border-none">
      <CardHeader>
        <CardTitle className='text-white'>Résultats Élection Présidentielle</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart 
            accessibilityLayer
            data={chartData}
            layout="vertical"
            barCategoryGap="20%" // Augmente l'espace entre les barres
            margin={{
              left: 30,
            }}
          >
            <YAxis
              dataKey="candidate"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              tick={{ fill: '#ffffff', fontSize: 16 }} // Noms des candidats en blanc
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis 
              dataKey="votes" 
              type="number" 
              hide 
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent 
                formatter={(value) => value.toLocaleString()} 
                hideLabel 
              />}
            />
            <Bar dataKey="votes" layout="vertical" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-lg">
        <div className="flex gap-2 font-medium text-white leading-none">
          Total des votes exprimés: {totalVotes.toLocaleString()} <Users className="h-4 w-4" />
        </div>

      </CardFooter>
    </Card>
  )
}
