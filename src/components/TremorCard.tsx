import {
  AreaChart,
  Badge,
  BadgeDelta,
  Card,
  Flex,
  Metric,
  Title,
} from "@tremor/react";
import { useEffect, useState } from "react";
export interface GetHistory {
  id: number;
  monitor_id: string;
  price: number;
  timestamp: Date;
}
const valueFormatter = function (number: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

export default function Example({
  bank,
  urlname,
}: {
  bank: any;
  urlname: string;
}) {
  const [bankdata, setBankdata] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await fetch(
        `https://dolarve-backend.onrender.com/get-history-id/${urlname}`
      )
        .then((response) => response.json())
        .then((data: GetHistory[]) => {
          const newData = data.map((item) => ({
            fecha: new Intl.DateTimeFormat("es", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(new Date(item.timestamp)),
            precio: item.price,
            monitor_id: item.monitor_id,
          }));
          setBankdata(newData);
        })
        .catch((error) => console.error(error));
    }
    fetchData();
  }, [bank, urlname]);

  return (
    <Card>
      <Title className=" flex gap-1 justify-between mb-4">
        <img src={`${urlname}.webp`} className="h-6 w-6" alt="" />
        {bank.title}
        <Badge size="xs">hoy</Badge>
      </Title>
      <Flex
        className="space-x-3 truncate"
        justifyContent="start"
        alignItems="baseline"
      >
        <Metric>
          {valueFormatter(bank?.price)}{" "}
          {
            <BadgeDelta
              isIncreasePositive={true}
              deltaType={
                calcIfpriceUpOrDown(bank?.price, bankdata).priceUpOrDown
              }
            >
              {calcPercentageChange(bank?.price, bankdata)}
            </BadgeDelta>
          }
        </Metric>
      </Flex>
      <AreaChart
        className="h-72 mt-4"
        data={bankdata}
        index="fecha"
        categories={["precio"]}
        colors={["cyan"]}
        showXAxis={true}
        showGridLines={false}
        startEndOnly={true}
        showYAxis={false}
        showLegend={false}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
}
function calcIfpriceUpOrDown(price, priceArray: []) {
  let priceUpOrDown = "unchanged";
  let messageSpanish = "sin cambios";
  priceArray.some((item) => {
    if (item.precio > price) {
      priceUpOrDown = "decrease";
      messageSpanish = "disminuyó";
      return true;
    } else if (item.precio < price) {
      priceUpOrDown = "increase";
      messageSpanish = "aumentó";
      return true;
    }
  });
  return { priceUpOrDown, messageSpanish };
}

function calcPercentageChange(price, priceArray: []) {
  var ultimoPrecio = priceArray?.at(-2)?.precio;

  // Calcula el cambio porcentual
  var cambioPorcentual = ((price - ultimoPrecio) / ultimoPrecio) * 100;

  // Redondea al número entero más cercano para evitar decimales innecesarios

  return cambioPorcentual.toFixed(2) + "%";
}
