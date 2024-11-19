import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    } else {
      const fetchApplications = async () => {
        try {
          let response;
          if (user && user.role === "Employer") {
            response = await axios.get(
              "http://localhost:4000/api/v1/application/employer/getall",
              { withCredentials: true }
            );
          } else {
            response = await axios.get(
              "http://localhost:4000/api/v1/application/jobseeker/getall",
              { withCredentials: true }
            );
          }
          setApplications(response.data.applications);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
      fetchApplications();
    }
  }, [isAuthorized, navigateTo, user]);

  const deleteApplication = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const statusHandler = async (event, applicationId) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/application/status`,
        {
          applicationId,
          status: event.target.value,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Status updated successfully");
        setTimeout(() => {
          toast.success("Email sent successfully");
        }, 2000);
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application._id === applicationId
              ? { ...application, status: event.target.value }
              : application
          )
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
                statusHandler={statusHandler}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  let statusStyle = {};
  if (element.status === "Shortlist") {
    statusStyle.color = "#06D001";
  } else if (element.status === "Reject") {
    statusStyle.color = "red";
  }

  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
        <p>
          <span>Status:</span>{" "}
          <span style={statusStyle}>
            {element.status === "Shortlist"
              ? "Shortlisted"
              : element.status === "Reject"
              ? "Rejected"
              : element.status}
          </span>
        </p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </div>
  );
};




const EmployerCard = ({ element, openModal, statusHandler }) => {
  const [newStatus, setNewStatus] = useState(element.status);

  const updateStatus = () => {
    statusHandler({ target: { value: newStatus } }, element._id);
  };

  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
        <div className="status-container">
        <span style={{marginRight:"10px" }}>Status:</span>
          <select
            className="status-select"
            onChange={(event) => setNewStatus(event.target.value)}
            value={newStatus}
          >
            <option value="Pending">Pending</option>
            <option value="Shortlist">Shortlist</option>
            <option value="Reject">Reject</option>
          </select>
          <button className="update-button" onClick={updateStatus}>
            Update Status
          </button>
        </div>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  );
};

