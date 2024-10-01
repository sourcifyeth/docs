import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChainSelect from "./components/ChainSelect";

const NUMBER_OF_TOP_CHAINS = 10;

type statsType = {
  [key: string]: {
    full_match: number;
    partial_match: number;
  };
};

export type Chain = {
  name: string;
  title?: string; // Longer name for some networks
  chainId: number;
  shortName: string;
  network: string;
  networkId: number;
  supported?: boolean;
  etherscanAPI?: string;
};

const Chart = ({
  stats,
  sourcifyChainMap,
  sourcifyChains,
}: {
  stats: statsType | undefined;
  sourcifyChainMap: {
    [id: number]: Chain;
  };
  sourcifyChains: Chain[];
}) => {
  const [selectedChain, setSelectedChain] = useState<string>("1");

  if (!stats || Object.keys(sourcifyChainMap).length === 0) {
    return <div></div>;
  }

  const getFormattedChainData = (key: string) => {
    const keyInt = parseInt(key);
    return {
      name:
        sourcifyChainMap?.[keyInt] &&
        (sourcifyChainMap[keyInt]?.name || sourcifyChainMap[keyInt].title) +
          ` (${keyInt})`, // Shorter name takes precedence
      fullMatch: stats[key]?.full_match ?? 0,
      partialMatch: stats[key]?.partial_match ?? 0,
      total: (stats[key]?.full_match ?? 0) + (stats[key]?.partial_match ?? 0),
    };
  };

  const formattedData = Object.entries(stats)
    .sort(([aKey, aStats], [bKey, bStats]) => {
      // Sort selected chain to start of the list
      if (aKey === selectedChain && bKey !== selectedChain) return -1;
      if (aKey !== selectedChain && bKey === selectedChain) return 1;

      // Sort Ethereum chains to start of the list
      const preferredChains = ["1", "11155111", "17000"];
      const aKeyPreferred = preferredChains.indexOf(aKey);
      const bKeyPreferred = preferredChains.indexOf(bKey);
      if (aKeyPreferred > -1 && bKeyPreferred > -1) {
        return aKeyPreferred - bKeyPreferred;
      }
      if (aKeyPreferred > -1) return -1;
      if (bKeyPreferred > -1) return 1;

      return (
        bStats.full_match +
        bStats.partial_match -
        (aStats.full_match + aStats.partial_match)
      );
    })
    .slice(0, NUMBER_OF_TOP_CHAINS)
    .map(([key, chainStats]) => getFormattedChainData(key));

  const total = Object.values(stats).reduce((prev, curr, i) => {
    return prev + curr.full_match + curr.partial_match;
  }, 0);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
        {total.toLocaleString()} contracts verified on Sourcify in total
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span>
          {getFormattedChainData(selectedChain).total.toLocaleString()}{" "}
          contracts verified on&nbsp;
        </span>
        <div style={{ width: "220px" }}>
          <ChainSelect
            value={selectedChain}
            handleChainIdChange={(newChainId) =>
              setSelectedChain(newChainId.toString())
            }
            availableChains={sourcifyChains.map((chain) => chain.chainId)}
            transparent
            sourcifyChains={sourcifyChains}
          />
        </div>
      </div>
      <div
        style={{
          height: "18rem",
          width: "91.67%",
          maxWidth: "40rem",
          marginTop: "1rem",
          marginBottom: "8rem",
          fontSize: "0.875rem",
          alignSelf: "center",
        }}
      >
        <ResponsiveContainer>
          <BarChart
            data={formattedData}
            {...{
              overflow: "visible",
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip cursor={{ fill: "rgba(232, 239, 255, 0.4)" }} />
            <XAxis
              dataKey="name"
              angle={30}
              textAnchor="start"
              interval={0} // Display every label
            />
            <YAxis
              width={40}
              dataKey="total"
              domain={[
                0,
                (dataMax: number) => {
                  const digits = dataMax.toString().length - 1;
                  const roundedMax =
                    Math.ceil(dataMax / 10 ** digits) * 10 ** digits;
                  return roundedMax;
                },
              ]}
              tickFormatter={(tick) => tick.toLocaleString()}
            />
            <Legend verticalAlign="top" align="center" height={36} />
            <Bar
              name="Full Matches"
              dataKey="fullMatch"
              fill="#2B50AA"
              stackId="a"
            />
            <Bar
              name="Partial Matches"
              dataKey="partialMatch"
              fill="#7693DA"
              stackId="a"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/////////////////////////////
////// MAIN COMPONENT ///////
/////////////////////////////

export default Chart;
