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
  { candidate: "macron", votes: 18768639, fill: "#4988ed", party: "La République En Marche" },
  { candidate: "lepen", votes: 13288686, fill: "#c80b41", party: "Rassemblement National" },
  { candidate: "melenchon", votes: 7712520, fill: "#c8161d", party: "La France Insoumise" },
]

const chartConfig = {
  votes: {
    label: "Voix",
  },
  macron: {
    label: "Paul Biya",
    color: "hsl(var(--chart-1))",
  },
  lepen: {
    label: "Maurice Kamto", 
    color: "hsl(var(--chart-2))",
  },
  melenchon: {
    label: "Cabral L",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function HorizontalChart() {
  // Calculer le total des voix
  const totalVotes = chartData.reduce((sum, item) => sum + item.votes, 0)
  
  const totalRegistered = 40000000 

  const nullVotes = Math.round(totalRegistered * 0.05) 

  return (
    <Card className="w-full bg-transparent border-none">
      <CardHeader>
        <CardTitle className='text-white'>Élections Présidentielles du Cameroun</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart 
            accessibilityLayer
            data={chartData}
            layout="vertical"
            barCategoryGap="30%" // Augmente l'espace entre les barres
            margin={{
              left: 30,
            }}
          >
            <YAxis
              dataKey="candidate"
              type="category"
              tickLine={false}
              tickMargin={8}
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
      <CardFooter className="flex-col items-start gap-8 text-md bg-[#ffffff16] pt-4 rounded-md">
        <div className="flex gap-2 font-medium text-white leading-none">
          <p className='text-slate-400'>Nombres d&apos;inscrits: </p>{totalRegistered.toLocaleString()} <Users className="h-4 w-4" />
        </div>
        <div className="flex gap-2 font-medium text-white leading-none">
          <p className='text-slate-400'>Total des votes exprimés:</p> {totalVotes.toLocaleString()} <Users className="h-4 w-4" />
        </div>
        <div className="flex gap-2 font-medium text-white leading-none">
          <p className='text-slate-400'>Bulletins nuls:</p> {nullVotes.toLocaleString()} <Users className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
