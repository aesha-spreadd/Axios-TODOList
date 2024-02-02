import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
   background: linear-gradient(309deg, #9F74C7 0%, #F6BDBF 83.13%);
  }
`;

export const Container = styled.div`
  text-align: center;
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
`;

export const TodoListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

export const InputField = styled.input`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.00625em;
  padding: 5px;
  margin: 0;
  border: 2px solid #5f6368;
  background: #fff;
  max-width: 300px;
  width: 100%;
  border-radius: 8px;
  color: #000;
  float: left;
  clear: both;

  &::placeholder {
    font-size: 13px;
    margin: 0 20px 0 0;
    color: #000;
  }

  &::checkbox {
    cursor: pointer;
  }
`;

export const H1 = styled.h1`
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const TodoItem = styled.li`
  border: 1px solid #404246;
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px;
  list-style: none;
  flex: 1;
  background-color: #ffff;
  position: relative;
  transition: background 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
  max-width: 500px;
  width: 100%;
  height: auto;

  &:hover {
    box-shadow: 0px 1px 14px 0px rgba(0, 0, 0, 0.1);
    background-color: #f0f0f0;
  }
`;

export const Button = styled.button`
  position: sticky;
  cursor: pointer;
  background: none;
  border: none;
  box-shadow: none;
  color: #fff;

  svg {
    width: 16px;
    height: 20px;
    cursor: pointer;
    color: #000;
  }
`;

export const TodoHover = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonWrapper = styled.div`
  margin: 35px 0 0 0;
  position: sticky;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  padding: 8px 0 0 0;

  &::before {
    content: '';
    border: 0.5px solid #37383a;
    position: absolute;
    max-width: 500px;
    width: 100%;
    top: 0;
  }
`;

export const Update = styled.div`
  display: flex;
`;

export const InputFieldUpdate = styled.input`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.00625em;
  padding: 5px;
  margin: 0;
  border: 2px solid #5f6368;
  background: #202124;
  min-width: 360px;
  width: 100%;
  border-radius: 8px;
  color: #fff;
  float: left;
  clear: both;
`;

export const updateTodo = styled.div``;

export const CheckLists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TodoListUl = styled.div`
  margin: 50px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const ButtonsdeleteWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const CompletedTask = styled.div`
  white-space: nowrap;
`;

export const ChecklistTitle = styled.div`
  font-size: 24px;
  margin: 10px;
  font-weight: bold;
`;

export const ChecklistButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NotesField = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const TodoItemText = styled.div`
  height: auto;
  min-height: 99px !important;
`;

export const CheckListData = styled.div`
  min-height: 98px;
  height: auto;
`;
