
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../context/AuthContext";

// const CollegeDetails = () => {
//   const { id } = useParams();
//   const [job, setJobs] = useState({});
//   const navigateTo = useNavigate();
//   const { authuser } = useAuthContext();

//   useEffect(() => {
//     axios
//       .get(`/api/job/college/${id}`, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setJob(res.data.job);
//       })
//       .catch((error) => {
//         navigateTo("/notfound");
//       });
//   }, [id, navigateTo]);

//   return (
//     <section className="min-h-screen p-4">
//       <div className="container mx-auto bg-slate-800 shadow-lg rounded-lg p-4 m-[300px] mt-80">
//         <h3 className="text-2xl font-bold mb-4 text-slate-50">Job Details</h3>
        
//         <div className="space-y-4 text-slate-50">
//           <p>
//             <strong>Title:</strong> <span>{job.title}</span>
//           </p>
//           <p>
//             <strong>Category:</strong> <span>{job.category}</span>
//           </p>
//           <p>
//             <strong>Country:</strong> <span>{job.country}</span>
//           </p>
//           <p>
//             <strong>City:</strong> <span>{job.city}</span>
//           </p>
//           <p>
//             <strong>Location:</strong> <span>{job.location}</span>
//           </p>
//           <p>
//             <strong>Description:</strong> <span>{job.description}</span>
//           </p>
//           <p>
//             <strong>Job Posted On:</strong> <span>{job.jobPostedOn}</span>
//           </p>
//           <p>
//             <strong>Salary:</strong>{" "}
//             {job.fixedSalary ? (
//               <span>{job.fixedSalary}</span>
//             ) : (
//               <span>
//                 {job.salaryFrom} - {job.salaryTo}
//               </span>
//             )}
//           </p>

//           {/* Apply Now link */}
//           {authuser && authuser.role === "Faculty" ? null : (
//             <Link 
//               to={`/application/${job._id}`} 
//               className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//             >
//               Apply Now
//             </Link>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

//export default CollegeDetails;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const CollegeJobs = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);
  const { authUser } = useAuthContext();
  // const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`/api/job/college/${id}`, {
          withCredentials: true,
        });
        setJobs(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  // if (!authUser) {
  //   navigateTo("/");
  // }

  return (
    <section className="min-h-screen p-40">
      <div className="container mx-auto">
        <h1 className="text-3xl text-white font-bold text-center mb-8 bg-blend-saturation">{`All Current Research Opportunities`}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-32">
          {jobs.jobs &&
            jobs.jobs.map((element) => (
              <div
                className="bg-slate-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                key={element._id}
              >
                <h2 className="text-xl text-slate-50 font-semibold">{element.title}</h2>
                <p className="text-slate-50">{element.category}</p>
                <p className="text-slate-50">Posted By: {element.postedBy.username}</p>
                <p className="text-slate-50">{element.postedBy?.college}</p>
                <Link
                  to={`/job/${element._id}`}
                  className="mt-4 inline-block text-blue-600 hover:underline"
                >
                  Job Details
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CollegeJobs;

