import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How JobZeal Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Job seekers can explore a wide range of job listings that align with 
                their skills and interests, while employers can post jobs and connect 
                with top talent. Signing up is quick and straightforward.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                Utilize our powerful search tools to discover jobs that fit your career 
                goals. Employers can easily post job openings to reach a large pool of 
                qualified candidates.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply for Jobs/Recruit Candidates</p>
              <p>
                Apply for jobs with ease through our user-friendly application process. 
                Employers can review applications and recruit the best candidates to meet 
                their needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
