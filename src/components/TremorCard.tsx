import { AreaChart, Card, Flex, Metric, Title } from "@tremor/react";

const valueFormatter = function (number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

export default function Example({ history, bank, urlname }) {
  const data = history.history;

  const curatedData = data.map((item) => {
    return { data: item.exchange_rate.flat(), date: item.date };
  });

  let bankdata = curatedData.map((i) => {
    return {
      date: Intl.DateTimeFormat("es", {
        month: "short",
        day: "numeric",
      }).format(new Date(i.date)),
      ...i.data.filter((e) => e.bank === bank)[0],
    };
  });

  return (
    <Card>
      <Title className=" flex gap-1">
        <img src={`${urlname}.webp`} className="h-6 w-6" alt="" srcset="" />
        {bankdata?.[0].bank}{" "}
      </Title>
      <Flex
        className="space-x-3 truncate"
        justifyContent="start"
        alignItems="baseline"
      >
        <Metric>{valueFormatter(bankdata?.[0].selling)}</Metric>
      </Flex>
      <AreaChart
        className="h-72 mt-4"
        data={bankdata}
        index="date"
        categories={["buying", "selling"]}
        colors={["indigo", "cyan"]}
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

// .map((item) => ({
//   bank: item.exchange_rate[0].bank,

//   compra: item.exchange_rate[0].buying,

//   venta: item.exchange_rate[0].selling,

//   date: Intl.DateTimeFormat("es", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   }).format(new Date(item.date)),
// })),

function formateDateTime(date) {
  return Intl.DateTimeFormat("es", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
