// import { useState } from "react";

// export default function PlantForm() {
//   const [newPlant, setNewPlant] = useState("");

//   function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData);

//     event.target.reset();
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Create Your Plant</h2>
//       <label htmlFor="plantName">
//         Plant Name
//         <input
//           type="text"
//           name="plantName"
//           id="plantName"
//           //   defaultValue={data.plantName}
//           required
//         />
//       </label>

//       <label htmlFor="botanicalName">
//         Plant Name
//         <input
//           type="text"
//           name="botanicalName"
//           id="botanicalName"
//           //   defaultValue={data.botanicalName}
//           required
//         />
//       </label>

//       <label htmlFor="description">
//         Plant Name
//         <textarea
//           name="description"
//           id="description"
//           //   defaultValue={data.description}
//         />
//       </label>

//       <fieldset>
//         <legend>Light Needs</legend>
//         <label>
//           <input type="radio" name="lightNeeds" id="lightNeeds" />
//         </label>
//       </fieldset>
//     </form>
//   );
// }

import React from "react";

export default function AddPlantForm({
  onSubmitPlant,
  initialData = {
    name: "",
    botanicalName: "",
    description: "",
    lightNeeds: "",
    waterNeeds: "",
    fertiliserSeason: [],
  },
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log("initial data: ", initialData);
    console.log("data: ", data);

    // Die Checkbox-Werte für fertiliserSeason als Array speichern
    data.fertiliserSeason = formData.getAll("fertiliserSeason");

    onSubmitPlant(data);
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Plant</h2>

      <label htmlFor="name">
        Plant Name
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={initialData.name}
          placeholder="Enter plant name"
          required
        />
      </label>

      <label htmlFor="botanicalName">
        Botanical Name
        <input
          type="text"
          id="botanicalName"
          name="botanicalName"
          defaultValue={initialData.botanicalName}
          placeholder="Enter botanical name"
          required
        />
      </label>

      <label htmlFor="description">
        Description
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={initialData.description}
          placeholder="Enter description (optional)"
        />
      </label>

      <fieldset>
        <legend>Light Needs</legend>
        {["Full Sun", "Partial Shade", "Full Shade"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="lightNeeds"
              value={option}
              defaultChecked={initialData.lightNeeds === option}
              required
            />
            {option}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Water Needs</legend>
        {["Low", "Medium", "High"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="waterNeeds"
              value={option}
              defaultChecked={initialData.waterNeeds === option}
              required
            />
            {option}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Fertiliser Season</legend>
        {["Spring", "Summer", "Autumn", "Winter"].map((season) => (
          <label key={season}>
            <input
              type="checkbox"
              name="fertiliserSeason"
              value={season}
              defaultChecked={initialData.fertiliserSeason.includes(season)}
            />
            {season}
          </label>
        ))}
      </fieldset>

      <button type="submit">Add Plant</button>
    </form>
  );
}
