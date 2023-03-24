import "./App.css";
import { FormEvent, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useLocalStorage } from "react-use";

export default function App() {
  const [tasks, setTasks] = useState("");
  const [list, setList] = useLocalStorage<string[]>("list", []);
  const [completed, setCompleted] = useLocalStorage<string[]>("completed", []);

  useEffect(() => {
    const storedList = localStorage.getItem("tasksList");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  function sumbitNewTask(event: FormEvent) {
    event.preventDefault();
    if (tasks.length <= 0 || !tasks.trim()) {
      alert("You need to enter some task!");
      setTasks("");
    } else {
      setList((list) => [...list, tasks]);

      setTasks("");

      alert("Task added to the list");
    }
  }

  function deleteTask(task: string) {
    const taskToRemove = task;

    const filteredList = list?.filter((listTasks) => listTasks != taskToRemove);

    alert(`Removed task ${task}`);

    setList(filteredList);
  }

  return (
    <div className="h-screen w-screen bg-zinc-100 flex items-center justify-center">
      <div id="container">
        <div className="h-full w-full bg-zinc-200 m-4 p-4 rounded-2xl justify-center">
          <h1 className="font-bold text-8xl flex items-center justify-center">
            TO DOs
          </h1>
          <form onSubmit={sumbitNewTask}>
            <div
              id="input-wrapper"
              className="flex items-center justify-center"
            >
              <input
                className="rounded p-2 px-4 w-3/4 text-xl ml-4"
                type="text"
                placeholder="Enter your tasks here"
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-500 p-2 m-4 rounded text-xl"
              >
                Add
              </button>
            </div>
          </form>
          <div className="w-full h-full p-4 rounded items-center justify-center">
            <ul>
              {list?.map((task, index) => (
                <li
                  key={index}
                  className={`bg-gray-300 w-full h-full p-2 rounded flex items-center mb-2 justify-between ${
                    completed?.includes(task) ? "line-through" : ""
                  }`}
                >
                  <span className="font-bold ml-2 text-2xl">{task}</span>
                  <div className="flex">
                    <input
                      type="checkbox"
                      className="h-8 w-8 border border-rounded-2xl m-2"
                      name="checking"
                      checked={completed?.includes(task)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCompleted((completed) => [...completed, task]);
                        } else {
                          setCompleted((completed) =>
                            completed?.filter(
                              (completedTask) => completedTask !== task
                            )
                          );
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        deleteTask(task);
                      }}
                    >
                      <FaRegTrashAlt className="h-8 w-8 m-2 text-red-500 hover:opacity-50" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
