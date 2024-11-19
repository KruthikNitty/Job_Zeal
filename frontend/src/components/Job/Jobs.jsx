import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (query = "") => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/job/search${query}`, {
        withCredentials: true,
      });
      setJobs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let query = "?";
    if (searchQuery) query += `q=${searchQuery}&`;
    if (salaryType === "fixed") {
      if (fixedSalary) query += `fixedSalary=${fixedSalary}&`;
    } else if (salaryType === "ranged") {
      if (salaryFrom) query += `salaryFrom=${salaryFrom}&`;
      if (salaryTo) query += `salaryTo=${salaryTo}&`;
    }

    fetchJobs(query);
  };

  if (!isAuthorized) {
    navigateTo("/");
    return null;
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search for jobs by title, category, or city"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: "8px", marginRight: "10px", width: "300px" }}
          />
          <select
            value={salaryType}
            onChange={(e) => setSalaryType(e.target.value)}
            style={{ padding: "8px", marginRight: "10px" }}
          >
            <option value="">Select Salary Type</option>
            <option value="fixed">Fixed Salary</option>
            <option value="ranged">Ranged Salary</option>
          </select>
          {salaryType === "fixed" && (
            <input
              type="text"
              placeholder="Fixed Salary"
              value={fixedSalary}
              onChange={(e) => setFixedSalary(e.target.value)}
              style={{ padding: "8px", marginRight: "10px", width: "150px" }}
            />
          )}
          {salaryType === "ranged" && (
            <>
              <input
                type="number"
                placeholder="Salary From"
                value={salaryFrom}
                onChange={(e) => setSalaryFrom(e.target.value)}
                style={{ padding: "8px", marginRight: "10px", width: "150px" }}
              />
              <input
                type="number"
                placeholder="Salary To"
                value={salaryTo}
                onChange={(e) => setSalaryTo(e.target.value)}
                style={{ padding: "8px", marginRight: "10px", width: "150px" }}
              />
            </>
          )}
          <button
            type="submit"
            style={{
              padding: "8px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#0056b3";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#007bff";
            }}
          >
            Search
          </button>
        </form>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
