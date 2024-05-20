import PropTypes from "prop-types";
import { useState } from "react";

const Task = ({ title, desc, id, deleteIt, status }) => {
  const handleDelete = () => {
    deleteIt(id);
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      params: {
        id: id,
      },
    });
  };

  const [status1, setStatus1] = useState(status);

  const handleChange = (e) => {
    setStatus1(e.target.checked ? "success" : "processing");
    fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        description: desc,
        id,
        status: e.target.checked ? "success" : "processing",
      }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  };

  return (
    <>
      <div>
        <div
          className={
            status === "processing"
              ? "bg-yellow-500 w-[300px] p-6 border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700"
              : "bg-green-700 w-[300px] p-6 border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700"
          }
        >
          <h5 className="mb-1 text-3xl font-bold flex justify-between tracking-tight text-white">
            <div>{title}</div>
            <span>
              <input
                type="checkbox"
                className="w-6 h-6"
                checked={status1 === "success"}
                onChange={handleChange}
              />
            </span>
          </h5>
          <p className="font-normal text-gray-800">{desc}</p>
          <div className="mt-3 flex justify-end">
            <button
              className="outline pl-3 pr-3 text-white rounded-sm"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Task.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteIt: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
export default Task;
