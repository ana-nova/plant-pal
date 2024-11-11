import React from "react";
import styled from "styled-components";

export default function PlantForm({
  onSubmitPlant,
  onToggleForm,
  isEditMode = false,
  initialData = {
    name: "",
    botanicalName: "",
    description: "",
    lightNeed: "",
    waterNeed: "",
    fertiliserSeason: [],
  },
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    data.fertiliserSeason = formData.getAll("fertiliserSeason");

    onSubmitPlant({ ...initialData, ...data });
    onToggleForm();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData.name ? "Edit Plant" : "Add a New Plant"}</h2>

      <FormLabel htmlFor="name">
        Plant Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter plant name"
          required
          defaultValue={initialData.name || ""}
        />
      </FormLabel>

      <FormLabel htmlFor="botanicalName">
        Botanical Name
        <input
          type="text"
          id="botanicalName"
          name="botanicalName"
          placeholder="Enter botanical name"
          required
          defaultValue={initialData.botanicalName || ""}
        />
      </FormLabel>

      <FormLabel htmlFor="description">
        Description
        <textarea
          id="description"
          name="description"
          placeholder="Enter description (optional)"
          defaultValue={initialData.description || ""}
        />
      </FormLabel>

      <fieldset>
        <legend>Light Needs</legend>
        <OptionsContainer>
          {[
            { label: "Full Sun ☀️☀️☀️", value: "Full Sun" },
            { label: "Partial Shade ☀️☀️", value: "Partial Shade" },
            { label: "Full Shade ☀️", value: "Full Shade" },
          ].map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name="lightNeed"
                value={option.value}
                required
                defaultChecked={initialData.lightNeed === option.value}
              />
              {option.label}
            </label>
          ))}
        </OptionsContainer>
      </fieldset>

      <fieldset>
        <legend>Water Needs</legend>
        <OptionsContainer>
          {[
            { label: "Low 💧", value: "Low" },
            { label: "Medium 💧💧", value: "Medium" },
            { label: "High 💧💧💧", value: "High" },
          ].map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name="waterNeed"
                value={option.value}
                required
                defaultChecked={initialData.waterNeed === option.value}
              />
              {option.label}
            </label>
          ))}
        </OptionsContainer>
      </fieldset>

      <fieldset>
        <legend>Fertiliser Season</legend>
        <OptionsContainer>
          {[
            { label: "Spring 🌱", value: "Spring" },
            { label: "Summer 🐝", value: "Summer" },
            { label: "Fall 🍂", value: "Fall" },
            { label: "Winter ❄️", value: "Winter" },
          ].map((season) => (
            <label key={season.value}>
              <input
                type="checkbox"
                name="fertiliserSeason"
                value={season.value}
                defaultChecked={initialData.fertiliserSeason.includes(
                  season.value
                )}
              />
              {season.label}
            </label>
          ))}
        </OptionsContainer>
      </fieldset>

      <StyledButton>
        <ButtonSave type="submit">
          {isEditMode ? "Save Changes" : "Add Plant"}
        </ButtonSave>
        <ButtonCancel type="button" onClick={onToggleForm}>
          Cancel
        </ButtonCancel>
      </StyledButton>
    </form>
  );
}

const ButtonCancel = styled.button`
  background-color: var(--color-button-cancel);

  &:hover {
    background-color: var(--color-button-cancel-hover);
  }
`;

const ButtonSave = styled.button`
  background-color: var(--color-button-save);

  &:hover {
    background-color: var(--color-button-save-hover);
  }
`;

const FormLabel = styled.label`
  flex-direction: column;
`;

const OptionsContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`;
