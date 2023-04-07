import './App.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./index.css";

let todoItemId = 0;

const TodoItemInputField = (props) => {
  const [input, setInput] = useState("");

  const onSubmit = () => {
    props.onSubmit(input);
    setInput("");
  };

  return (<div>
    <TextField
      id="todo-item-input"
      label="Todo Item"
      variant="outlined"
      onChange={(e) => setInput(e.target.value)} value={input}
    />
    <Button variant="outlined" onClick={onSubmit}>Submit</Button>
  </div>);
};

const TodoItem = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(props.todoItem.todoItemContent);
  const style = props.todoItem.isFinished ? { textDecoration: 'line-through' } : {};
  const handleEditClick = () => {
    setIsEditMode(true);
  };
  const handleSaveClick = () => {
    setIsEditMode(false);
    props.onEdit(props.todoItem.id,inputValue);
  };
  return (<li>
    {isEditMode ? (
      <TextField
        value = {inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    ) : (
      <span style={style} onClick={() => props.onTodoItemClick(props.todoItem)}>{props.todoItem.todoItemContent}</span>
    )}
    <Button variant="outlined" onClick={() => props.onRemoveClick(props.todoItem)}>Remove</Button>
    {isEditMode ? (
      <Button variant="outlined" onClick={handleSaveClick}>Save</Button>
    ) : (
      <Button variant="outlined" onClick={handleEditClick}>Edit</Button>
    )}
  </li>);
};


const TodoItemList = (props) => {
  const todoList = props.todoItemList.map((todoItem, index) => {

    return <TodoItem
      key={index}
      todoItem={todoItem}
      onTodoItemClick={props.onTodoItemClick}
      onRemoveClick={props.onRemoveClick}
      onEdit={props.onEdit}
    />;
  });
  return (<div>
    <ul>{todoList}</ul>
  </div>);
};

function App() {
  const [todoItemList, setTodoItemList] = useState([]);
  const onEdit = (id, newContent) => {
    setTodoItemList(todoItemList.map((todoItem) => {
      if (todoItem.id === id) {
        return {
          ...todoItem,
          todoItemContent: newContent,
        };
      } else {
        return todoItem;
      }
    }));
  };
  const onSubmit = (newTodoItem) => {
    setTodoItemList([...todoItemList, {
      id: todoItemId++,
      todoItemContent: newTodoItem,
      isFinished: false,
    }]);
  };

  const onTodoItemClick = (clickedTodoItem) => {
    setTodoItemList(todoItemList.map((todoItem) => {
      if (clickedTodoItem.id === todoItem.id) {
        return {
          id: clickedTodoItem.id,
          todoItemContent: clickedTodoItem.todoItemContent,
          isFinished: !clickedTodoItem.isFinished,
        };
      } else {
        return todoItem;
      }
    }));
  };

  const onRemoveClick = (removedTodoItem) => {
    setTodoItemList(todoItemList.filter((todoItem) => {
      return todoItem.id !== removedTodoItem.id;
    }));
  };

  return (
    <div className="App" style={{ marginTop: '16px' }}>
      <TodoItemInputField onSubmit={onSubmit} />
      <TodoItemList
        todoItemList={todoItemList}
        onTodoItemClick={onTodoItemClick}
        onRemoveClick={onRemoveClick}
        onEdit={onEdit}
      />
    </div>
  );
}

export default App;
