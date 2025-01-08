'use client'

import * as React from 'react'
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export function PieChartComponent() {
  const totalVisitors = 30

  const metrics = [
    { label: 'Venta', current: 5, total: 10, fill: 'var(--color-venta)' },
    { label: 'Arriendo', current: 5, total: 10, fill: 'var(--color-arriendo)' },
    {
      label: 'Arriendo T',
      current: 5,
      total: 10,
      fill: 'var(--color-arriendo-t)',
    },
  ]

  const chartConfig = {
    venta: {
      label: 'Venta',
      color: 'hsl(var(--chart-1))',
    },
    arriendo: {
      label: 'Arriendo',
      color: 'hsl(var(--chart-2))',
    },
    arriendoT: {
      label: 'Arriendo T',
      color: 'hsl(var(--chart-3))',
    },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl font-bold pb-0 -mt-3">
          Vista General
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex items-center justify-center -mt-14 -mb-14">
        <CardFooter className="flex-col gap-3 text-sm ">
          <div className="flex items-center gap-2 font-medium leading-none">
            Propiedades por categoria <TrendingUp className="h-4 w-4" />
          </div>
          <div className="flex flex-col gap-1 justify-start items-start w-full">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex justify-start items-center gap-2"
              >
                <p className="text-sm font-bold">{metric.label}:</p>
                <div className="flex">
                  <p className="text-sm font-bold text-success-600">
                    {metric.current}
                  </p>
                  <p className="text-sm font-bold mx-1"> / </p>
                  <p className="text-sm">{metric.total}</p>
                </div>
              </div>
            ))}
          </div>
        </CardFooter>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] min-w-[250px] min-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={metrics}
              dataKey="current"
              nameKey="label"
              innerRadius={45}
              outerRadius={65}
              fill="#8884d8"
              paddingAngle={5}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Propiedades
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
