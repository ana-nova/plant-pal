import React from "react";
import styled from "styled-components";

export default function PlantForm({
  onSubmitPlant,
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

    console.log("form data: ", data);

    onSubmitPlant(data);
    event.target.reset();
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Add a New Plant</Title>

      <FormLabel htmlFor="name">
        Plant Name
        <TextInput
          type="text"
          id="name"
          name="name"
          defaultValue={initialData.name}
          placeholder="Enter plant name"
          required
        />
      </FormLabel>

      <FormLabel htmlFor="botanicalName">
        Botanical Name
        <TextInput
          type="text"
          id="botanicalName"
          name="botanicalName"
          defaultValue={initialData.botanicalName}
          placeholder="Enter botanical name"
          required
        />
      </FormLabel>

      <FormLabel htmlFor="description">
        Description
        <TextArea
          id="description"
          name="description"
          defaultValue={initialData.description}
          placeholder="Enter description (optional)"
        />
      </FormLabel>

      <Fieldset>
        <Legend>Light Needs</Legend>
        <OptionsContainer>
          {[
            "Full Sun ☀️☀️☀️☀️",
            "Partial Shade ☀️☀️☀️",
            "Shade ☀️☀️",
            "Full Shade ☀️",
          ].map((option) => (
            <RadioLabel key={option}>
              <input
                type="radio"
                name="lightNeed"
                value={option}
                defaultChecked={initialData.lightNeed === option}
                required
              />
              {option}
            </RadioLabel>
          ))}
        </OptionsContainer>
      </Fieldset>

      <Fieldset>
        <Legend>Water Needs</Legend>
        <OptionsContainer>
          {["Low 💧", "Medium 💧💧", "High 💧💧💧"].map((option) => (
            <RadioLabel key={option}>
              <input
                type="radio"
                name="waterNeed"
                value={option}
                defaultChecked={initialData.waterNeed === option}
                required
              />
              {option}
            </RadioLabel>
          ))}
        </OptionsContainer>
      </Fieldset>

      <Fieldset>
        <Legend>Fertiliser Season</Legend>
        <OptionsContainer>
          {["Spring 🌱", "Summer 🐝", "Autumn 🍂", "Winter ❄️"].map(
            (season) => (
              <CheckboxLabel key={season}>
                <input
                  type="checkbox"
                  name="fertiliserSeason"
                  value={season}
                  defaultChecked={initialData.fertiliserSeason.includes(season)}
                  required
                />
                {season}
              </CheckboxLabel>
            )
          )}
        </OptionsContainer>
      </Fieldset>
      <StyledButton>
        <SubmitButton type="submit">Add Plant</SubmitButton>
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

const SubmitButton = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  color: white;
  background-color: green;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: darkgreen;
  }
`;

const StyledButton = styled.p`
  display: flex;
  justify-content: center;
`;
