"use client";
import { useState } from "react";
import { FaStar, FaTrash, FaEdit } from "react-icons/fa";

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
  const [impsList, setimpList] = useState<string[]>([]);
  const [editValue, setEditValue] = useState<editModelTyoe>({
    value: "",
    index: null,
  });

  //functions
  //addtodo funcction:
  const AddTodo = () => {
    if (todo.trim() === "") return; //// Check if the input is empty
    settodoList([...todosList, todo]);
    settodo("");
  };

  //delete function;
  const deleteTodo = (index: number) => {
    const deletetodolist = todosList.filter((item1, i) => i !== index);
    settodoList(deletetodolist);
    setimpList(impsList.filter((item2) => item2 !== todosList[index]));
  };

  //edit function;
  const editTodo = (index: number) => {
    if (todo.trim() === "") return;
    const newTodos = [...todosList];
    newTodos[index] = todo;
    settodoList(newTodos);
    //important todo list
    if (impsList.includes(editValue.value)) {
      const newImpsList = impsList.map((item) =>
        item === editValue.value ? todo : item
      );
      setimpList(newImpsList);
    }
    setEditModel(false);
    settodo("");
  };

  //makeImportant function
  const makeImportant = (index: number) => {
    if (!impsList.includes(todosList[index])) {
      setimpList([...impsList, todosList[index]]);
    }
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
          className="text-xl rounded-md shadow-md px-2 py-3"
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
        </div>
      </div>

      <div className="m-auto flex flex-col gap-2 w-full max-w-lg px-4">
        {todosList.map((mytodo: string, i: number) => {
          return (
            <div
              key={i}
              className="bg-violet-600 flex justify-between items-center p-2 rounded-lg shadow-md "
            >
              <div className="flex gap-2">
                <div className="text-lg text-white text-wrap word-beak overflow-hidden">{mytodo}</div>
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
                <FaStar
                  className="hover:text-yellow-500 cursor-pointer text-white text-2xl"
                  onClick={() => makeImportant(i)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* importantlist */}
      {impsList.length > 0 && (
        <>
          <div>
            <h1 className="text-3xl text-gray-500 font-bold underline text-center mt-4">
              Important Todo List
            </h1>
          </div>

          <div className="m-auto flex flex-col gap-2 w-full max-w-lg px-4">
            {impsList.map((imptodo: string, i: number) => {
              return (


                <div
                  key={i}
                  className="bg-violet-600 flex justify-between break-words text-wrap items-center p-2 rounded-lg shadow-md"
                >
                  <div className="flex gap-2">
                    <div className="text-lg text-white break-words">{imptodo}</div>
                  </div>
                  <div className="flex gap-2 min-sm:flex-col">
                    <FaTrash
                      className="hover:text-red-500 cursor-pointer text-white text-2xl mr-2"
                      onClick={() => {
                        const deleteImpsList = impsList.filter(
                          (item, j) => j !== i
                        );
                        setimpList(deleteImpsList);
                      }}
                    />
                    <FaStar className="hover:text-yellow-700 cursor-pointer text-yellow-500 text-2xl" />
                  </div>
                </div>

               


              );
            })}
          </div>

          {/* end implist */}
        </>
      )}
    </div>
  );
}

export default Todo;
