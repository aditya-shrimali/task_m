import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newBoard, setNewBoard] = useState({
    title: "",
    description: "",
    background: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/boards/new", {
      method: "POST",
      body: JSON.stringify({ ...newBoard }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBoards([...boards, data]);
        setNewBoard({ title: "", description: "", status: "processing" });
      });
  };
  const handleDelete = (id) => {
    setLoading(true);
    fetch(`http://localhost:3000/api/boards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error deleting board");
        }
      })
      .then(() => {
        setBoards(boards.filter((board) => board._id !== id));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/boards/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBoards(data);
      });
  }, []);
  console.log(boards);
  return (
    <>
      <div className="bg-purple-200 h-[100vh] flex p-5 pr-7">
        <div className="flex m-2 gap-3 flex-wrap w-[80%]">
          {boards.map((board) => (
            <Box
              height={180}
              width={180}
              display="flex"
              key={board._id}
              flexDirection={"column"}
              alignItems="center"
              justifyContent="center"
              sx={{ border: "2px solid grey" }}
            >
              <a
                href=""
                key={board._id}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/boards/${board._id}`);
                }}
              >
                <p className="text-4xl font-semibold">{board.title}</p>
              </a>
              <div className="mt-4 flex justify-end">
                <button
                  className="outline pl-4 pr-4 text-black rounded-sm"
                  id={board._id}
                  onClick={() => handleDelete(board._id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </Box>
          ))}
        </div>
        <div className="w-[20%]">
          <div className="mt-3 max-h-[250px] flex-1 outline rounded flex flex-col justify-center px-6 py-6 lg:px-8 lg:py-10">
            <form className="space-y-2" onSubmit={handleSubmit}>
              <div className=" flex justify-center text-2xl font-semibold">
                Add Board
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="title"
                    required
                    value={newBoard.title}
                    onChange={(e) =>
                      setNewBoard({ ...newBoard, title: e.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="description"
                    name="description"
                    type="text"
                    autoComplete="description"
                    required
                    value={newBoard.description}
                    onChange={(e) =>
                      setNewBoard({
                        ...newBoard,
                        description: e.target.value,
                      })
                    }
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Board
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
