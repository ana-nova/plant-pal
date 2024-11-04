import React from "react";
import styled from "styled-components";
export default function PlantForm({
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
    <FormContainer onSubmit={handleSubmit}>
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
        <textarea
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
    </FormContainer>
  );
}
const FormContainer = styled.form`
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px 10px 30px;
  margin: 20px 38px 23px 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
