import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";

const ApproveTransfer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const approveTransfer = async () => {
    try {
      const response = await axios.get(`/api/transfer/approve-transfer?token=${token}`);
      if (response.data.success) {
        setDialogMessage(response.data.message);
        setIsLoading(false);
      } else {
        setDialogMessage(response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during transfer approval:", error);
      setDialogMessage(error.response?.data?.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      approveTransfer();
    } else {
      setDialogMessage("Invalid or missing token.");
      setIsLoading(false);
    }
    setDialogOpen(true);
  }, [token]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    navigate("/pprofile");
  };

  return (
    <Dialog open={dialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>{isLoading ? "Processing..." : "Approval Status"}</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <DialogContentText>{dialogMessage}</DialogContentText>
        )}
      </DialogContent>
      {!isLoading && (
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ApproveTransfer;
