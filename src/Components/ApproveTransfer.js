import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ApproveTransfer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const approveTransfer = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (!token) {
        alert("Invalid or missing approval token.");
        navigate("/pprofile");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/transfer/approve-transfer?token=${token}`
        );
        alert(response.data.message || "Ownership transfer approved successfully!");
      } catch (error) {
        alert(error.response?.data?.message || "An error occurred while approving the transfer.");
      } finally {
        navigate("/pprofile");
      }
    };

    approveTransfer();
  }, [navigate]);

  return <p>Processing ownership transfer...</p>;
};

export default ApproveTransfer;
