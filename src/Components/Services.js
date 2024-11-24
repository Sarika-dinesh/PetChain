import React from "react";
import LostFound from "../Assets/lostf_processed.png";
import HealthCare from "../Assets/vet_processed.png";
import InsuraceClaim from "../Assets/insurance_processed.png";
import OwnershipTransfer from "../Assets/TranferOwner.png"

const Work = () => {
  const workInfoData = [
    {
      image: LostFound,
      title: "Lost & Found",
      text: "",
    },
    {
      image: HealthCare,
      title: "Pet Health Management",
      text: "",
    },
    {
      image: InsuraceClaim,
      title: "Insurance Claims",
      text: "",
    },
    {
        image: OwnershipTransfer,
        title: "Ownership Tranfers",
        text: "",
      },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading"></p>
        <h1 className="primary-heading" style={{fontSize: "30px"}}>Services We Provide</h1>
        <p className="primary-text">
          
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" style={{height:'250px', width:'200px'}}/>
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;