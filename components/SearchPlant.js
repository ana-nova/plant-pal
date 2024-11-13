// import FuzzySearch from "fuzzy-search";
// import { useState } from "react";
// import { plants } from "@/assets/plants";

// export default function SearchPlants() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredSearch, setFilteredSearch] = useState(plants);

//   const searcher = new FuzzySearch(plants, ["name", "botanicalName"], {
//     caseSensitive: false,
//   });

//   function handleSearchChange(event) {
//     const query = event.target.value;
//     setSearchQuery(query);

//     // Perform fuzzy search on both 'name' and 'botanicalName' fields
//     if (query) {
//       const results = searcher.search(query);
//       setFilteredSearch(results);
//     } else {
//       // If search query is cleared, show all plants
//       setFilteredSearch(plants);
//     }
//   }
//   return (
//     <p>
//       <input
//         placeholder="Search plants"
//         type="text"
//         onChange={handleSearchChange}
//         value={searchQuery}
//       />
//     </p>
//   );
// }
