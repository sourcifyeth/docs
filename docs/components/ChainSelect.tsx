import React from "react";
import "./ChainSelect.css";
import SelectSearch, { SelectSearchProps, SelectSearchOption } from "react-select-search";
import { Chain } from "../Chart";
import Fuse from "fuse.js";

function fuzzySearch(options: SelectSearchOption[]) {
  const fuse = new Fuse(options, {
    keys: ["name", "groupName", "items.name"],
    threshold: 0.6,
  });
  return (value: string) => {
    if (!value.length) {
      return options;
    }
    return fuse
      .search(value)
      .map((res: Fuse.FuseResult<SelectSearchOption>) => res.item);
  };
}

type ChainSelectProps = {
  value: string | undefined;
  handleChainIdChange: SelectSearchProps["onChange"];
  id?: string;
  availableChains?: number[];
  transparent?: boolean;
  sourcifyChains: Chain[];
};

export default function ChainSelect({
  value,
  handleChainIdChange,
  id,
  availableChains,
  transparent,
  sourcifyChains,
}: ChainSelectProps) {

  let filteredChains;
  if (availableChains) {
    // Explicitly define which chains to show, like in Etherscan chains
    filteredChains = sourcifyChains.filter((chain) =>
      availableChains.includes(chain.chainId)
    );
  } else {
    filteredChains = sourcifyChains.filter((chain) => chain.supported);
  }

  return (
    <SelectSearch
      onChange={handleChainIdChange}
      value={value}
      options={filteredChains.map((chain) => ({
        name: `${chain.title || chain.name} (${chain.chainId}) `,
        value: chain.chainId,
      }))}
      search
      id={id}
      filterOptions={fuzzySearch}
      emptyMessage="Couldn't fetch Sourcify chains"
      placeholder="Choose chain"
      className={`select-search ${transparent ? "transparent-select" : ""}`}
    />
  );
}
