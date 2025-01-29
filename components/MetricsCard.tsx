import { Card, CardBody } from '@nextui-org/react'
import { PieChartComponent } from './PieChartComponent'

export default function MetricsCard() {
  return (
    <Card className="max-w-[800px] px-2">
      <CardBody className="gap-2 ">
        <div className="flex justify-center items-center text-center ">
          <h1 className="text-xl font-bold w-64">Vista General</h1>
        </div>
        <div className="flex flex-row ">
          <div>
            <div className="w-full flex flex-col items-start gap-1">
              <div className="flex justify-start items-center gap-2">
                <p className="text-sm font-bold">Venta:</p>
                <div className="flex">
                  <p className="text-sm font-bold">5</p>
                  <p className="text-sm font-bold"> / </p>
                  <p className="text-sm font-bold">10</p>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2">
                <p className="text-sm font-bold">Arriendo:</p>
                <div className="flex">
                  <p className="text-sm font-bold">5</p>
                  <p className="text-sm font-bold"> / </p>
                  <p className="text-sm font-bold">10</p>
                </div>
              </div>
              <div className="flex justify-start items-center gap-2">
                <p className="text-sm font-bold">Arriendo T:</p>
                <div className="flex">
                  <p className="text-sm font-bold">5</p>
                  <p className="text-sm font-bold"> / </p>
                  <p className="text-sm font-bold">10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
