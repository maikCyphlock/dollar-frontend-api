import { useState } from "react";
import FuzzySearch from "react-fuzzy";
import TremorCard from "./TremorCard";
// const list = [
//   {
//     id: 1,
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//   },
//   {
//     id: 2,
//     title: "The DaVinci Code",
//     author: "Dan Brown",
//   },
//   {
//     id: 3,
//     title: "Angels & Demons",
//     author: "Dan Brown",
//   },
// ];

function Search({ list }) {
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <>
      <FuzzySearch
        list={list}
        keys={["author", "title"]}
        width={430}
        className
        placeholder="buscador"
        inputStyle={{
          backgroundColor: "rgb(3, 7, 20)",
          color: "white",
          border: "1px solid rgb(66, 68, 82)",
          borderRadius: "0.25rem",
        }}
        inputWrapperStyle={{
          padding: 0,
          margin: 0,
          backgroundColor: "transparent",
        }}
        isDropdown={true}
        onSelect={(newSelectedItem) => {
          // Local state setter defined elsewhere

          setSelectedItem(newSelectedItem);
        }}
      />
      {selectedItem && (
        <TremorCard bank={selectedItem} urlname={selectedItem.id} />
      )}
    </>
  );
}

export default Search;
