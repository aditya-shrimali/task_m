import { useEffect, useState } from "react";
import Task from "./Task";
import { useParams } from "react-router";

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const { id } = useParams();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "processing",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://task-m-api.vercel.app/api/tasks/new", {
      method: "POST",
      body: JSON.stringify({ ...newTask, boardId: id }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setNewTask({ title: "", description: "", status: "processing" });
      });
  };

  useEffect(() => {
    fetch(`https://task-m-api.vercel.app/api/tasks/all?boardId=${id}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <>
      <div className="bg-purple-200 h-[100vh] w-full">
        <h1 className="text-4xl font-semibold ml-2 flex flex-col">
          <div className="flex justify-between w-[95%] m-auto ml-0 items-center">
            <div>Board</div>
            <div>
              <button
                className="outline m-2 p-1 rounded "
                onClick={() => {
                  setSidebar(!sidebar);
                }}
              >
                Add Task
              </button>
            </div>
          </div>

          <span className="bg-gray-600 h-1"></span>
        </h1>
        <div className="flex m-2 mr-6">
          <div
            className={
              sidebar
                ? "flex m-4 gap-4 flex-wrap w-[70%]"
                : "flex m-4 gap-4 flex-wrap w-full"
            }
          >
            {tasks.map((task) => {
              return (
                <Task
                  key={task._id}
                  title={task.title}
                  desc={task.description}
                  id={task._id}
                  status={task.status}
                  deleteIt={deleteTask}
                />
              );
            })}
          </div>
          {sidebar && (
            <div className="w-[25%] ">
              <div className="mt-10 max-h-[220px] flex-1 outline rounded p-3 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <form className="space-y-2" onSubmit={handleSubmit}>
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
                        value={newTask.title}
                        onChange={(e) =>
                          setNewTask({ ...newTask, title: e.target.value })
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
                        value={newTask.description}
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
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
                    Add Task
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Board;
