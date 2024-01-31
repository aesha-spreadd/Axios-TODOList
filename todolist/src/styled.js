import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #202124;
  }
`;

export const Container = styled.div`
  text-align: center;
  max-width: 1080px;
  margin: 0 auto;
`;

export const TodoListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const InputField = styled.input`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: 0.00625em;
  padding: 5px;
  margin: 0;
  border: 2px solid #5f6368;
  background: #202124;
  min-width: 280px;
  border-radius: 8px;
  color: #fff;
  float: left;
  clear: both;
`;

export const H1 = styled.h1`
  color: #fff;
`;

export const TodoItem = styled.li`
  border: 1px solid #404246;
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px;
  list-style: none;
  flex: 1;
  color: #fff;
  position: relative;
  transition: background 0.3s;
  box-sizing: border-box;

  &:hover {
    background: #404246;
  }
`;

export const Button = styled.button`
  position: sticky;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
  color: #fff;
  display: block;
  top: 5px;
  right: 5px;
`;

export const TodoHover = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const ButtonWrapper = styled.div`
  position: sticky;
  display: flex;
  justify-content: end;
  align-items: end;
`;

export const Update = styled.div`
  display: flex;
`;

export const InputFieldUpdate = styled.input`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
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
