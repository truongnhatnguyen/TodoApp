import React, { useState } from "react";
import Tag from "../Tag/index.js";
import TodoForm from "../TodoForm.js";
import Todo from "../Todos.js/index.js";
import "./style.scss";

function TodoList({ value = 0 }) {
  const storageTodo = JSON.parse(localStorage.getItem("todo"));
  const [todos, setTodos] = useState(storageTodo ?? []);
  const [currentTag, setCurrentTag] = useState(value);
  console.log(currentTag);
  const [defautFarams, setDefautFarams] = useState({
    value
  })
  console.log(
    defautFarams
  );
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    setTodos((todos) => {
      const newTodos = [todo, ...todos];

      const jsonTodos = JSON.stringify(newTodos);
      localStorage.setItem("todo", jsonTodos);

      return newTodos;
    });

    // setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const onHandleTagName = (value) => {
    setCurrentTag(value);
    setDefautFarams(prev=>(
   {...prev, value: +value}
     
     
      ))
    console.log(defautFarams);
  };

  const TagList = [
    { label: "All", value: 0 },
    { label: "Active", value: 1 },
    { label: "Complete", value: 2},
  ];
  return (
    <div className="wrap">
      <h1>What needs to be done?</h1>
      <TodoForm onSubmit={addTodo} />
      <div className="tag">
        {TagList.map((item, idx) => (
          <Tag
            key={idx}
            isActive={currentTag === item.value}
            onClick={() => {
              onHandleTagName(item.value);
            }}
          >
            {" "}
            {item.label}
          </Tag>
        ))}
      </div>
      <hr style={{border:'1px solid black'}}/>
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
