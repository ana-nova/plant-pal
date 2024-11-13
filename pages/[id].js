import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import PlantForm from "@/components/PlantForm";

const lightNeedIcon = {
  "Full Sun": "☀️☀️☀️",
  "Partial Shade": "☀️☀️",
  "Full Shade": "☀️",
};

const waterNeedIcon = {
  Low: "💧",
  Medium: "💧💧",
  High: "💧💧💧",
};

const seasonIcons = {
  Spring: "🌱",
  Summer: "🐝",
  Fall: "🍂",
  Winter: "❄️",
};

export default function PlantDetails({ plants, onDeletePlant, onEditPlant }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) return null;

  const plant = plants.find((plant) => plant.id === id);

  if (!plant) return <p>Plant not found</p>;

  function handleDelete() {
    setShowConfirmation(true);
  }
  function handleCancelDelete() {
    setShowConfirmation(false);
  }
  function handleConfirmDelete() {
    onDeletePlant(plant.id);
    setShowConfirmation(false);
  }
  function handleEditClick() {
    setShowEdit(true);
  }
  function handleEdit(updatedPlant) {
    onEditPlant(plant.id, updatedPlant);
    setShowEdit(false);
  }
  function toggleUploadImage() {
    setUploadOpen(!uploadOpen);
  }

  async function handleImageUpload(event) {
    event.preventDefault();
    const file = event.target.image.files[0];
    const formData = new FormData(event.target);

    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(
        `Your image is larger than ${maxSizeMB}MB. Please select a smaller image.`
      );
      return;
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const newImageUrl = data.secure_url;

        const updatedPlant = { ...plant, imageUrl: newImageUrl };

        onEditPlant(plant.id, updatedPlant);
        setUploadOpen(false);
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred during the upload.");
    }
  }

  return (
    <>
      <Link href="/">Back</Link>
      {!showEdit ? (
        <Container>
          <h1>Details Page</h1>

          <RoundImage
            alt={`image of ${plant.name}`}
            src={plant.imageUrl || "/assets/empty.avif"}
            width={200}
            height={200}
          />

          <button onClick={toggleUploadImage}>Upload Image</button>
          {uploadOpen && (
            <UploadForm
              onSubmit={handleImageUpload}
              encType="multipart/form-data"
            >
              <UploadPopUp>
                <h3>Upload Your Plant</h3>

                <label htmlFor="file-upload"></label>
                <StyledFileInput
                  type="file"
                  id="file-upload"
                  name="image"
                  accept=".jpg, .jpeg, .png"
                  required
                />
                <button type="submit">Upload</button>
                <button onClick={toggleUploadImage}>Cancel</button>
              </UploadPopUp>
            </UploadForm>
          )}

          <h2>{plant.name}</h2>
          <p>{plant.botanicalName}</p>
          <p>{plant.description}</p>
          <p>
            Light: {lightNeedIcon[plant.lightNeed]} {plant.lightNeed}
          </p>
          <p>
            Water need: {waterNeedIcon[plant.waterNeed]} {plant.waterNeed}
          </p>
          <p>
            Fertiliser season:
            {plant.fertiliserSeason.map((season) => (
              <span key={season}>
                {seasonIcons[season]} {season}{" "}
              </span>
            ))}
          </p>

          <section>
            <button onClick={handleEditClick}>Edit</button>
            {!showConfirmation ? (
              <button onClick={handleDelete}>Delete</button>
            ) : (
              <>
                <p>Are you sure?</p>
                <button onClick={handleCancelDelete}>Cancel</button>
                <button onClick={handleConfirmDelete}>Delete</button>
              </>
            )}
          </section>
        </Container>
      ) : (
        <PlantForm
          initialData={plant}
          onSubmitPlant={handleEdit}
          onToggleForm={() => setShowEdit(false)}
          isEditMode={true}
        />
      )}
    </>
  );
}

const Container = styled.article`
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

const RoundImage = styled(Image)`
  border-radius: 100%;
`;

const UploadForm = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadPopUp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: whitesmoke;
  width: 350px;
  height: 150px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px var(--color-shadow);
`;

const StyledFileInput = styled.input`
  background-color: lightgrey;
  width: 200px;
`;
