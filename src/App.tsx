import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Typography, ListItem, ListItemIcon, Checkbox, ListItemText, ListItemSecondaryAction, IconButton, Container, FormControl, InputLabel, Input, InputAdornment, List } from "@material-ui/core";
import {DeleteOutline, AddOutlined} from "@material-ui/icons";
import { Todo } from './domains/todo/type';
// idを自動で生成してくれるモジュール
import { uuid } from "uuidv4";

const App: React.FC = () => {
  const [inputText, setInputText] = React.useState("");
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const handleInputChange = (
    // input
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputText(e.currentTarget.value);
  };

  const handleAddClicked = () => {
    const newTodo: Todo = {
      id: uuid(),
      content: inputText,
      completed: false,
    };
    //...は一つ一つ展開していくよというスプレッド演算子
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };
  //タスクが完了髪完了か判断する関数 指定されたtodoのcompletedを反転する
  const handleTodoChecked = (id: string) => () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if(todo.id === id){
          return {
            ...todo,
            completed: !todo.completed,
          };
          } else {
            return todo;
          }
      })
    );
  };
  return (
    <Container>
      <Typography variant="h4">Todo </Typography>
      <FormControl>
        <InputLabel >Task name</InputLabel>
        <Input
        value = {inputText}
        onChange = {handleInputChange}
        endAdornment ={
          <InputAdornment position="end">
            <IconButton onClick = {handleAddClicked}>
              <AddOutlined></AddOutlined>
            </IconButton>
          </InputAdornment>
        }
        />
      </FormControl>
      <Typography variant="h5"> Incomplete Task</Typography>
      <List dense>
      {todos.map((todo) => (
      <ListItem button onClick={handleTodoChecked(todo.id)}>
            <ListItemIcon>
              <Checkbox/>
            </ListItemIcon>
            <ListItemText>task 1</ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteOutline />
              </IconButton>
            </ListItemSecondaryAction>
      </ListItem>
      ))}
      </List>
      <Typography variant="h5">Complete Task</Typography>
    </Container>

  );
};

export default App;
