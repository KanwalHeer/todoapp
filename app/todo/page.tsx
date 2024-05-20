"use client";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

//edit value types
type editModelTyoe = {
  value: string;
  index: number | null;
};

function Todo() {
  //states
  let [todo, settodo] = useState<string>("");
  const [todosList, settodoList] = useState<string[]>([]);
  const [editModel, setEditModel] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<editModelTyoe>({
    value: "",
    index: null,
  });

  //functions
  //addtodo funcction:
  const AddTodo = () => {
    settodoList([...todosList, todo]);
  };

  // clear function;
  const ClearTodo = () => {
    settodo("");
  };

  //delete function;
  const deleteTodo = (index: number) => {
    settodoList(todosList.filter((item, i) => i !== index));
  };

  //edit function;
  const editTodo = (index: number) => {
    const newTodos = [...todosList];
    newTodos.splice(index, 1, todo);
    settodoList(newTodos);
    setEditModel(false);
    settodo("");
  };

  return (
    <div className="containers flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32 justify-center">
      <div>
        <h1 className="text-3xl text-gray-500 font-bold underline text-center mt-4">
          Todo App
        </h1>
      </div>
      <div className="text-center mt-4 flex gap-2  flex-wrap justify-center space-x-2 my-5 ">
        <input
          className="text-xl rounded-md shadow-md  "
          type="text"
          placeholder="Enter todo"
          value={todo}
          onChange={(e) => {
            todo = e.target.value;
            settodo(todo);
          }}
        />

        <div className="max-lg:flex flex-row  ">
          <button
            className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded p-3 mr-3"
            onClick={() => {
              {
                editModel ? editTodo(editValue.index as number) : AddTodo();
              }
            }}
          >
            {editModel ? "Edit Todo" : "Add Todo"}
          </button>

          <button
            className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded p-3"
            onClick={ClearTodo}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="w-[10rem] sm:w-[20rem] md:w-[40rem] lg:w-[45rem] xl:w-[50rem]  m-auto flex flex-col gap-2 sm col ">
        {todosList.map((mytodo: string, i: number) => {
          return (
            <div
              key={i}
              className="bg-violet-600 flex justify-between items-center p-2 rounded-lg shadow-md"
            >
              <div className="flex gap-2">
                <div className="text-lg text-white">{mytodo}</div>
              </div>
              <div className="flex gap-2 min-sm:flex-col">
                <FaTrash
                  className="hover:text-red-500 cursor-pointer text-white text-2xl mr-2"
                  onClick={() => {
                    deleteTodo(i);
                  }}
                />

                <FaEdit
                  className="hover:text-green-500 cursor-pointer text-white text-2xl"
                  onClick={() => {
                    settodo(mytodo);
                    setEditModel(true);
                    setEditValue({ value: mytodo, index: i });
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
