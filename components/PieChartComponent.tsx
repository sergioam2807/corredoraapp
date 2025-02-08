'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
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
  const [metrics, setMetrics] = useState([
    { label: 'Venta', current: 0, total: 0, fill: 'var(--color-venta)' },
    { label: 'Arriendo', current: 0, total: 0, fill: 'var(--color-arriendo)' },
    {
      label: 'Arriendo T',
      current: 0,
      total: 0,
      fill: 'var(--color-arriendo-t)',
    },
  ])
  const [totalProperties, setTotalProperties] = useState(0)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch('/api/metrics')
        const data = await response.json()

        setMetrics([
          {
            label: 'Venta',
            current: data.ventaProperties,
            total: data.totalProperties,
            fill: 'var(--color-venta)',
          },
          {
            label: 'Arriendo',
            current: data.arriendoProperties,
            total: data.totalProperties,
            fill: 'var(--color-arriendo)',
          },
          {
            label: 'Arriendo T',
            current: data.arriendoTemporalProperties,
            total: data.totalProperties,
            fill: 'var(--color-arriendo-t)',
          },
        ])
        setTotalProperties(data.totalProperties)
      } catch (error) {
        console.error('Error fetching metrics:', error)
      }
    }

    fetchMetrics()
  }, [])

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
        <CardTitle className="text-xl font-bold pb-0 sm:-mt-3">
          Vista General
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex flex-col sm:flex-row items-center justify-center sm:-mt-14 -mb-14">
        <CardFooter className="flex-col gap-3 text-sm ">
          <div className="flex items-center gap-2 font-medium leading-none">
            Propiedades por categoria{' '}
            <TrendingUp className="h-4 w-4 text-success-600" />
          </div>
          <div className="flex flex-col gap-1 sm:justify-start sm:items-start items-center w-full">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex sm:justify-start sm:items-center justify-between w-full px-6 sm:px-0 gap-2"
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
          className="mx-auto aspect-square max-h-[250px] min-w-[250px] min-h-[250px] -mt-16 sm:mt-0"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
            <Pie
              data={metrics}
              dataKey="current"
              fill="#8884d8"
              innerRadius={39}
              nameKey="label"
              outerRadius={59}
              paddingAngle={5}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        dominantBaseline="middle"
                        textAnchor="middle"
                        x={viewBox.cx}
                        y={viewBox.cy}
                      >
                        <tspan
                          className="fill-foreground text-2xl font-bold "
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 7}
                        >
                          {totalProperties.toLocaleString()}
                        </tspan>
                        <tspan
                          className="fill-muted-foreground text-xs font-semibold "
                          style={{ fontSize: '0.6rem' }}
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 13}
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
