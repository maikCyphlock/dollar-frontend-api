import { useState, useEffect } from "react";
import FuzzySearch from "react-fuzzy";
import TremorCard from "./TremorCard";

function Search({ list }) {
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <>
      {list && (
        <FuzzySearch
          list={list}
          keys={["author", "title"]}
          width={"100%"}
          className="w-full max-w-lg"
          placeholder="buscador"
          inputStyle={{
            backgroundColor: "rgb(3, 7, 20)",
            color: "white",
            border: "1px solid rgb(66, 68, 82)",
            borderRadius: "0.25rem",
            width: "100%",
          }}
          inputWrapperStyle={{
            padding: 0,
            margin: 0,
            width: "100%",
            backgroundColor: "transparent",
          }}
          isDropdown={true}
          onSelect={(newSelectedItem) => {
            // Local state setter defined elsewhere

            setSelectedItem(newSelectedItem);
          }}
        />
      )}

      {selectedItem && (
        <TremorCard bank={selectedItem} urlname={selectedItem.id} />
      )}
    </>
  );
}

export default Search;
