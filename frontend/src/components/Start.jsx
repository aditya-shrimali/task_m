import { useNavigate } from "react-router";

const Start = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-purple-200 h-[100vh] flex justify-center items-center">
      <div className="max-w-[80%] items-center flex flex-col">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold">Welcome to Task Manager</h1>
          <p className="text-4xl font-semibold">Manage your tasks easily</p>
        </div>
        <div className="mt-5">
          <button
            className="outline m-2 p-1 rounded text-4xl hover:text-green-800 hover:outline-green-800 hover:scale-110 hover:shadow-lg hover:shadow-green-950"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
