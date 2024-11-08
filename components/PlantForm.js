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
    <FormContainer onSubmit={handleSubmit}>
      <Title>{initialData.name ? "Edit Plant" : "Add a New Plant"}</Title>

      <FormLabel htmlFor="name">
        Plant Name
        <TextInput
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
        <TextInput
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
        <TextArea
          id="description"
          name="description"
          placeholder="Enter description (optional)"
          defaultValue={initialData.description || ""}
        />
      </FormLabel>

      <Fieldset>
        <Legend>Light Needs</Legend>
        <OptionsContainer>
          {[
            { label: "Full Sun ☀️☀️☀️", value: "Full Sun" },
            { label: "Partial Shade ☀️☀️", value: "Partial Shade" },
            { label: "Full Shade ☀️", value: "Full Shade" },
          ].map((option) => (
            <RadioLabel key={option.value}>
              <input
                type="radio"
                name="lightNeed"
                value={option.value}
                required
                defaultChecked={initialData.lightNeed === option.value}
              />
              {option.label}
            </RadioLabel>
          ))}
        </OptionsContainer>
      </Fieldset>

      <Fieldset>
        <Legend>Water Needs</Legend>
        <OptionsContainer>
          {[
            { label: "Low 💧", value: "Low" },
            { label: "Medium 💧💧", value: "Medium" },
            { label: "High 💧💧💧", value: "High" },
          ].map((option) => (
            <RadioLabel key={option.value}>
              <input
                type="radio"
                name="waterNeed"
                value={option.value}
                required
                defaultChecked={initialData.waterNeed === option.value}
              />
              {option.label}
            </RadioLabel>
          ))}
        </OptionsContainer>
      </Fieldset>

      <Fieldset>
        <Legend>Fertiliser Season</Legend>
        <OptionsContainer>
          {[
            { label: "Spring 🌱", value: "Spring" },
            { label: "Summer 🐝", value: "Summer" },
            { label: "Fall 🍂", value: "Fall" },
            { label: "Winter ❄️", value: "Winter" },
          ].map((season) => (
            <CheckboxLabel key={season.value}>
              <input
                type="checkbox"
                name="fertiliserSeason"
                value={season.value}
                defaultChecked={initialData.fertiliserSeason.includes(
                  season.value
                )}
              />
              {season.label}
            </CheckboxLabel>
          ))}
        </OptionsContainer>
      </Fieldset>

      <StyledButton>
        <button type="submit">
          {isEditMode ? "Save Changes" : "Add Plant"}
        </button>
        <button type="button" onClick={onToggleForm}>
          Cancel
        </button>
      </StyledButton>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
  display: flex;
  justify-content: center;
`;

const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 1rem;
  color: #555;
`;

const TextInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  resize: none;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Fieldset = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
`;

const Legend = styled.legend`
  font-size: 1rem;
  color: #666;
  padding: 0 5px;
`;

const OptionsContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.95rem;
  color: #555;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.95rem;
  color: #555;
`;

const StyledButton = styled.p`
  display: flex;
  justify-content: center;
`;
