import { useNavigate } from "react-router";

const Appbar = () => {
  const navigate = useNavigate();
  const logstatus = localStorage.getItem("token") === "" ? "signin" : "logout";

  const handleLogout = () => {
    localStorage.setItem("token", "");
    navigate("/signin");
  };
  const handleLogin = () => {
    navigate("/signin");
  };
  return (
    <div className="bg-purple-200">
      <div className="bg-purple-200 w-[90%] m-auto flex justify-between border-b-2 border-black pl-12 pr-12 pt-3 pb-2">
        <div>
          <a href="/dashboard" className="text-4xl font-semibold">
            TASK_M
          </a>
        </div>
        <div className="flex gap-3 text-3xl font-semibold">
          {logstatus === "signin" ? (
            <div>
              <button onClick={handleLogin}>login</button>
            </div>
          ) : null}
          {logstatus === "logout" ? (
            <div>
              <button onClick={handleLogout}>logout</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
