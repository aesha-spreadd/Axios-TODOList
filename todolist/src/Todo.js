import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TodoListWrapper,
  InputField,
  H1,
  TodoItem,
  Button,
  TodoHover,
  ButtonWrapper,
  Update,
  InputFieldUpdate,
  CheckLists,
  TodoListUl,
  ButtonsdeleteWrapper,
  ChecklistTitle,
  CompletedTask,
  ChecklistButton,
  NotesField,
  TodoItemText,
  CheckListData,
} from './styled';
import { MdAdd } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';
import { FaRegSave } from 'react-icons/fa';
import { GrChapterPrevious, GrUpdate } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import { IoIosCheckbox } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';

const Todo = () => {
  const uniqueId = () => '_' + Math.random().toString(36).substr(2, 9);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [showChecklistInput, setShowChecklistInput] = useState(false);
  const [updatedItemTitle, setUpdatedItemTitle] = useState('');
  const [newChecklistItems, setNewChecklistItems] = useState('');
  const [todos, setTodos] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newChecklist, setNewChecklist] = useState('');
  const [updateId, setUpdateId] = useState();
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [prevMessages, setPrevMessages] = useState({});
  const [deletedchecklist, setDeletedChecklist] = useState([]);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [addedItem, setAddedItem] = useState();
  const [completedCount, setCompletedCount] = useState(0);
  const [addingItemToChecklist, setAddingItemToChecklist] = useState();
  const [completedTasksCount, setCompletedTasksCount] = useState({});
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchTodos();
    fetchChecklist();
  }, []);

  useEffect(() => {
    const updatedCompletedTasksCount = {};
    checklists.forEach((checklist) => {
      const completedTasks = checklist.items.filter((item) => item.completed);
      updatedCompletedTasksCount[checklist.id] = completedTasks.length;
    });
    setCompletedTasksCount(updatedCompletedTasksCount);
  }, [checklists]);

  const handleChecklistIconClick = () => {
    setShowChecklistInput((prev) => !prev);
  };

  const handleUpdateChecklistItemUI = (checklistId, itemId, updatedTitle) => {
    const updatedChecklists = checklists.map((checklist) => {
      if (checklist.id === checklistId) {
        const updatedItems = checklist.items.map((item) =>
          item.id === itemId ? { ...item, title: updatedTitle } : item
        );
        return { ...checklist, items: updatedItems };
      }
      return checklist;
    });

    setChecklists(updatedChecklists);
  };

  const handleUpdateChecklistItemDB = async (
    checklistId,
    itemId,
    updatedTitle
  ) => {
    try {
      setUpdating(true);

      const updatedChecklists = checklists.map((checklist) => {
        if (checklist.id === checklistId) {
          const updatedItems = checklist.items.map((item) =>
            item.id === itemId ? { ...item, title: updatedTitle } : item
          );
          return { ...checklist, items: updatedItems };
        }
        return checklist;
      });

      await axios.put(`http://localhost:3002/checklists/${checklistId}`, {
        items: updatedChecklists.find((c) => c.id === checklistId).items,
      });

      setChecklists(updatedChecklists);
      setUpdating(false);
      setUpdatingItemId(null);
      setUpdatedItemTitle('');
      console.log('Checklist item updated successfully');
    } catch (error) {
      setUpdating(false);
      console.error('Error updating checklist item:', error);
    }
  };

  const handleIndividualChecklistItemUpdate = async (checklistId, itemId) => {
    try {
      const updatedTitle = prompt('Enter the updated title:');
      if (updatedTitle !== null) {
        handleUpdateChecklistItemUI(checklistId, itemId, updatedTitle);
        await handleUpdateChecklistItemDB(checklistId, itemId, updatedTitle);
      }
    } catch (error) {
      console.error('Error updating individual checklist item:', error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3002/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      if (newTodo.trim() === '') {
        alert('Todo title cannot be empty');
        return;
      }

      const response = await axios.post('http://localhost:3002/todos', {
        title: newTodo,
        completed: false,
      });

      setTodos((prevTodos) => [...prevTodos, response.data]);
      setNewTodo('');
      console.log(newTodo);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const fetchChecklist = async () => {
    try {
      const response = await axios.get('http://localhost:3002/checklists');
      setChecklists(response.data);
    } catch (error) {
      console.error('Error fetching checklists:', error);
    }
  };

  const addChecklist = async (title, items) => {
    try {
      const response = await axios.post('http://localhost:3002/checklists', {
        title: title,
        items: items.map((item) => ({
          id: uniqueId(),
          title: item,
          completed: false,
        })),
      });

      setChecklists((prevChecklists) => [...prevChecklists, response.data]);
      setNewChecklist('');
      setNewChecklistItems('');
    } catch (error) {
      console.error('Error adding checklist:', error);
    }
  };

  const handleChecklistClick = () => {
    if (newChecklist.trim() === '') {
      alert('Checklist title cannot be empty');
      return;
    }

    const items = newChecklistItems.split(',').map((item) => item.trim());

    if (items.some((item) => item === '')) {
      alert('Checklist items cannot be empty');
      return;
    }

    addChecklist(newChecklist, items);
    setShowChecklistInput(false);
  };

  const deleteTodo = async (id) => {
    try {
      const deletedTodo = todos.find((todo) => todo.id === id);

      await axios.delete(`http://localhost:3002/todos/${id}`);
      console.log(`Todo with id ${id} deleted successfully.`);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

      await axios.post('http://localhost:3002/deletedTodos', deletedTodo);

      setDeletedChecklist((prevDeletedChecklists) => [
        ...prevDeletedChecklists,
        deletedTodo,
      ]);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const deleteChecklist = async (id) => {
    try {
      const deletedChecklist = checklists.find(
        (checklist) => checklist.id === id
      );

      console.log('Deleted Checklist:', deletedChecklist);

      await axios.delete(`http://localhost:3002/checklists/${id}`);
      console.log(`Checklist with id ${id} deleted successfully.`);

      setChecklists((prevChecklists) =>
        prevChecklists.filter((checklist) => checklist.id !== id)
      );

      await axios.post(
        'http://localhost:3002/deletedChecklists',
        deletedChecklist
      );

      setDeletedChecklist((prevDeletedChecklists) => [
        ...prevDeletedChecklists,
        deletedChecklist,
      ]);
    } catch (error) {
      console.error('Error deleting checklist:', error);
    }
  };

  const toggleItemCheckbox = async (checklistId, itemId) => {
    try {
      const updatedChecklists = checklists.map((checklist) => {
        if (checklist.id === checklistId) {
          const updatedItems = checklist.items.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          );
          return { ...checklist, items: updatedItems };
        }
        return checklist;
      });

      const itemToUpdate = updatedChecklists
        .find((c) => c.id === checklistId)
        .items.find((item) => item.id === itemId);

      await axios.put(`http://localhost:3002/checklists/${checklistId}`, {
        items: updatedChecklists.find((c) => c.id === checklistId).items,
      });

      setCompletedCount((prevCount) =>
        itemToUpdate.completed ? prevCount - 1 : prevCount + 1
      );

      setChecklists(updatedChecklists);
    } catch (error) {
      console.error('Error updating checklist item:', error);
    }
  };

  const updateTodo = async (id, isChecklist = false) => {
    try {
      const itemToUpdate = isChecklist
        ? checklists.find((item) => item.id === id)
        : todos.find((item) => item.id === id);

      const updatedItem = isChecklist
        ? { id, title: updatedTitle, items: itemToUpdate.items }
        : { id, title: updatedTitle, completed: itemToUpdate.completed };

      const endpoint = isChecklist
        ? `http://localhost:3002/checklists/${id}`
        : `http://localhost:3002/todos/${id}`;

      await axios.put(endpoint, updatedItem);

      if (isChecklist) {
        setChecklists((prevItems) =>
          prevItems.map((item) => (item.id === id ? updatedItem : item))
        );
      } else {
        setTodos((prevItems) =>
          prevItems.map((item) => (item.id === id ? updatedItem : item))
        );
      }

      setPrevMessages((prev) => ({ ...prev, [id]: updatedTitle }));
      setUpdateId(null);
      setUpdatedTitle('');
      console.log('Item updated successfully');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleAddItem = async (titleId, newTitle) => {
    try {
      const titleToUpdate = checklists.find(
        (checklist) => checklist.id === titleId
      );

      const newItem = {
        id: uniqueId(),
        title: newTitle,
        completed: false,
      };

      const updatedTitle = {
        ...titleToUpdate,
        items: [...titleToUpdate.items, newItem],
      };

      setChecklists((prevChecklists) =>
        prevChecklists.map((checklist) =>
          checklist.id === titleId ? updatedTitle : checklist
        )
      );

      await axios.put(
        `http://localhost:3002/checklists/${titleId}`,
        updatedTitle
      );
      setNewItemTitle('');
      setAddingItemToChecklist(null);
      setAddedItem(newItem);
      setUpdateId(null);
      setUpdatedTitle('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <Container>
      <H1>ToDo List</H1>
      <TodoListWrapper>
        <InputField
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Take a Note....."
        />
        <Button>
          <IoAdd onClick={addTodo} />
        </Button>
        <Button>
          <IoIosCheckbox onClick={handleChecklistIconClick} />
        </Button>
        {showChecklistInput && (
          <CheckLists>
            <InputField
              type="text"
              value={newChecklist}
              onChange={(e) => setNewChecklist(e.target.value)}
              placeholder="Add Checklist....."
            />
            <InputField
              type="text"
              value={newChecklistItems}
              onChange={(e) => setNewChecklistItems(e.target.value)}
              placeholder="Add Checklist Items"
            />
            <Button>
              <IoAdd onClick={handleChecklistClick} />
            </Button>
          </CheckLists>
        )}
      </TodoListWrapper>
      <TodoListUl>
        {todos.map((todo) => (
          <TodoItem key={todo.id}>
            {updateId === todo.id ? (
              <Update>
                <InputFieldUpdate
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <Button>
                  <FaRegSave onClick={() => updateTodo(todo.id)} />
                </Button>
              </Update>
            ) : (
              <TodoHover>
                <TodoItemText>{todo.title}</TodoItemText>
                {prevMessages[todo.id] && (
                  <div>
                    <span className="prviousbutton">
                      <GrChapterPrevious /> {prevMessages[todo.id]}
                    </span>
                  </div>
                )}
                <ButtonWrapper>
                  <Button>
                    <MdDelete onClick={() => deleteTodo(todo.id)} />
                  </Button>
                  <Button>
                    <GrUpdate onClick={() => setUpdateId(todo.id)} />
                  </Button>
                </ButtonWrapper>
              </TodoHover>
            )}
          </TodoItem>
        ))}

        {checklists?.map((checklist) => (
          <TodoItem key={checklist.id}>
            {updateId === checklist.id ? (
              <Update>
                <InputFieldUpdate
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <Button>
                  <FaRegSave onClick={() => updateTodo(checklist.id, true)} />
                </Button>
              </Update>
            ) : (
              <TodoHover>
                <CheckListData>
                  <ChecklistButton>
                    <ChecklistTitle>{checklist.title}</ChecklistTitle>
                    <Button>
                      <MdAdd
                        onClick={() => setAddingItemToChecklist(checklist.id)}
                      />
                    </Button>
                  </ChecklistButton>

                  {checklist.items?.map((item) => (
                    <NotesField key={item.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() =>
                            toggleItemCheckbox(checklist.id, item.id)
                          }
                        />
                        {item.completed ? (
                          <span style={{ textDecoration: 'line-through' }}>
                            {item.title}
                          </span>
                        ) : (
                          <span>{item.title}</span>
                        )}
                      </label>

                      <Button>
                        <MdEdit
                          onClick={() =>
                            handleIndividualChecklistItemUpdate(
                              checklist.id,
                              item.id
                            )
                          }
                        />
                      </Button>
                    </NotesField>
                  ))}

                  {addingItemToChecklist === checklist.id ? (
                    <div>
                      <InputFieldUpdate
                        type="text"
                        value={newItemTitle}
                        onChange={(e) => setNewItemTitle(e.target.value)}
                      />
                      <Button>
                        <FaRegSave
                          onClick={() =>
                            handleAddItem(checklist.id, newItemTitle)
                          }
                        />
                      </Button>
                    </div>
                  ) : null}
                </CheckListData>
                <ButtonWrapper>
                  <ButtonsdeleteWrapper>
                    <Button onClick={() => deleteChecklist(checklist.id)}>
                      <MdDelete />
                    </Button>
                    <Button>
                      <MdEdit
                        onClick={() => {
                          setUpdateId(checklist.id);
                          setUpdatingItemId(null);
                        }}
                      />
                    </Button>
                  </ButtonsdeleteWrapper>
                  <CompletedTask>
                    Completed Tasks: {completedTasksCount[checklist.id] || 0}
                  </CompletedTask>
                </ButtonWrapper>
              </TodoHover>
            )}
          </TodoItem>
        ))}
      </TodoListUl>
    </Container>
  );
};

export default Todo;
