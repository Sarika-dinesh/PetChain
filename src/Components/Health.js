import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Input,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PetHealth = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vaccinationDate: "",
    vaccineType: "",
    nextDueDate: "",
    allergies: "",
    file: null,
  });

  const [vaccinationRecords, setVaccinationRecords] = useState([
    {
      vaccinationDate: "2023-08-15",
      vaccineType: "Rabies Vaccine",
      nextDueDate: "2024-08-15",
      file: { name: "rabies-vaccine.pdf" },
    },
    {
      vaccinationDate: "2023-05-10",
      vaccineType: "Distemper Vaccine",
      nextDueDate: "2024-05-10",
      file: { name: "distemper-vaccine.pdf" },
    },
  ]);

  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [allergies, setAllergies] = useState([
    "Peanut Allergy",
    "Dust Allergy",
  ]);
  const [pastTreatments, setPastTreatments] = useState([
    "Treated for ear infection",
    "Vaccination against flu",
  ]);
  const [minorIllnessRecords, setMinorIllnessRecords] = useState([
    "Cough",
    "Fever",
  ]);

  const petData = {
    name: "Coco",
    petId: "12345",
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleAddIllness = () => {
    if (formData.minorIllness.trim()) {
      setMinorIllnessRecords([...minorIllnessRecords, formData.minorIllness]);
      setFormData({ ...formData, minorIllness: "" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShareWithVet = () => {
    if (!formData.vetId.trim()) {
      alert("Please enter a valid Vet ID.");
      return;
    }
    alert(`Data shared with Vet ID: ${formData.vetId}`);
    setFormData({ ...formData, vetId: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!formData.vaccinationDate.trim()) {
      newErrors.vaccinationDate = "Vaccination date is required";
    } else if (formData.vaccinationDate > today) {
      newErrors.vaccinationDate = "Vaccination date cannot be in the future";
    }

    if (!formData.vaccineType.trim())
      newErrors.vaccineType = "Vaccine type is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setVaccinationRecords([
        ...vaccinationRecords,
        {
          vaccinationDate: formData.vaccinationDate,
          vaccineType: formData.vaccineType,
          nextDueDate: formData.nextDueDate,
          file: formData.file,
        },
      ]);
      setFormData({
        vaccinationDate: "",
        vaccineType: "",
        nextDueDate: "",
        allergies: "",
        file: null,
      });
      setShowConfirmation(true);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static" sx={{ bgcolor: "orange", color: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">PetChain</Typography>
          <Box>
            <Button
              color="inherit"
              onClick={() => navigate("/profile")}
              sx={{ ml: 2 }}
            >
              My Profile
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/insurance")}
              sx={{ ml: 2 }}
            >
              Insurance
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/pet-health")}
              sx={{ ml: 2 }}
            >
              Pet Health
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/owner-transfer")}
              sx={{ ml: 2 }}
            >
              Ownership Transfer
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          padding: 3,
        }}
      >
        <Container
          maxWidth="md"
          sx={{ bgcolor: "white", p: 4, borderRadius: 2, boxShadow: 3 }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Pet Health
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography>
              <strong>Pet's Name:</strong> {petData.name}
            </Typography>
            <Typography>
              <strong>Pet ID:</strong> {petData.petId}
            </Typography>
          </Box>

          <Typography variant="h6" gutterBottom>
            Vaccination Record
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  name="vaccinationDate"
                  label="Vaccination Date"
                  type="date"
                  value={formData.vaccinationDate}
                  onChange={handleChange}
                  error={!!errors.vaccinationDate}
                  helperText={errors.vaccinationDate}
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      paddingTop: "8px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  name="vaccineType"
                  label="Vaccine Type"
                  value={formData.vaccineType}
                  onChange={handleChange}
                  error={!!errors.vaccineType}
                  helperText={errors.vaccineType}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  name="nextDueDate"
                  label="Next Due Date"
                  type="date"
                  value={formData.nextDueDate}
                  onChange={handleChange}
                  error={!!errors.nextDueDate}
                  helperText={errors.nextDueDate}
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      paddingTop: "8px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Input
                  fullWidth
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                  inputProps={{ accept: "image/*,application/pdf" }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "70%",
                    padding: "14px 12px",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ bgcolor: "orange" }}
                >
                  Add Record
                </Button>
              </Grid>
            </Grid>
          </Box>

          {showConfirmation && (
            <Typography
              variant="h6"
              color="green"
              align="center"
              sx={{ mt: 2 }}
            >
              Record added successfully!
            </Typography>
          )}

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Uploaded Records
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "23%" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Vaccination Date
              </Typography>
              {vaccinationRecords.map((record, idx) => (
                <Typography key={idx} sx={{ textAlign: "left" }}>
                  {formatDate(record.vaccinationDate)}{" "}
                  {/* Use formatDate function here */}
                </Typography>
              ))}
            </Box>
            <Box sx={{ width: "23%" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Vaccine Type
              </Typography>
              {vaccinationRecords.map((record, idx) => (
                <Typography key={idx} sx={{ textAlign: "left" }}>
                  {record.vaccineType}
                </Typography>
              ))}
            </Box>
            <Box sx={{ width: "23%" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Next Due Date
              </Typography>
              {vaccinationRecords.map((record, idx) => (
                <Typography key={idx} sx={{ textAlign: "left" }}>
                  {formatDate(record.nextDueDate)}{" "}
                  {/* Use formatDate function here */}
                </Typography>
              ))}
            </Box>
            <Box sx={{ width: "23%" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                File
              </Typography>
              {vaccinationRecords.map((record, idx) => (
                <Typography key={idx} sx={{ textAlign: "left" }}>
                  {record.file.name}
                </Typography>
              ))}
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Allergies
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
              fullWidth
              name="allergies"
              label="Add Allergy"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="e.g., Peanut Allergy"
              size="small"
              sx={{ mr: 2 }}
            />
            <Button
              variant="contained"
              onClick={() => {
                if (formData.allergies.trim()) {
                  setAllergies([...allergies, formData.allergies]);
                  setFormData({ ...formData, allergies: "" });
                }
              }}
              sx={{ bgcolor: "orange" }}
            >
              Add
            </Button>
          </Box>
          {allergies.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Allergy Records:
              </Typography>
              {allergies.map((allergy, idx) => (
                <Typography key={idx} sx={{ mb: 0.5 }}>
                  - {allergy}
                </Typography>
              ))}
            </Box>
          )}

          <Typography variant="h6" gutterBottom>
            Past Treatments
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
              fullWidth
              name="pastTreatment"
              label="Add Past Treatment"
              value={formData.pastTreatment}
              onChange={handleChange}
              placeholder="e.g., Treated for ear infection"
              size="small"
              sx={{ mr: 2 }}
            />
            <Button
              variant="contained"
              onClick={() => {
                if (formData.pastTreatment.trim()) {
                  setPastTreatments([
                    ...pastTreatments,
                    formData.pastTreatment,
                  ]);
                  setFormData({ ...formData, pastTreatment: "" });
                }
              }}
              sx={{ bgcolor: "orange" }}
            >
              Add
            </Button>
          </Box>
          {pastTreatments.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Past Treatment Records:
              </Typography>
              {pastTreatments.map((treatment, idx) => (
                <Typography key={idx} sx={{ mb: 0.5 }}>
                  - {treatment}
                </Typography>
              ))}
            </Box>
          )}

          <Typography variant="h6" gutterBottom>
            Minor Illnesses
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
              fullWidth
              name="minorIllness"
              label="Add Minor Illness"
              value={formData.minorIllness}
              onChange={handleChange}
              placeholder="e.g., Cough"
              size="small"
              sx={{ mr: 2 }}
            />
            <Button
              variant="contained"
              onClick={() => {
                if (formData.minorIllness.trim()) {
                  setMinorIllnessRecords([
                    ...minorIllnessRecords,
                    formData.minorIllness,
                  ]);
                  setFormData({ ...formData, minorIllness: "" });
                }
              }}
              sx={{ bgcolor: "orange" }}
            >
              Add
            </Button>
          </Box>
          {minorIllnessRecords.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Illness Records:
              </Typography>
              {minorIllnessRecords.map((illness, idx) => (
                <Typography key={idx} sx={{ mb: 0.5 }}>
                  - {illness}
                </Typography>
              ))}
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 3,
            }}
          >
            <TextField
              name="vetId"
              label="Vet ID"
              value={formData.vetId}
              onChange={handleChange}
              placeholder="e.g., VET12345"
              size="small" // Makes the input field smaller
              sx={{ width: "150px", mr: 2 }} // Sets a fixed width for compactness
            />
            <Button
              variant="contained"
              onClick={handleShareWithVet}
              sx={{
                bgcolor: "orange",
                px: 2, // Padding for a balanced button size
                height: "40px", // Align button height with the input field
              }}
            >
              Share With Vet
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PetHealth;
