import { Form } from 'formik';
import { FC } from 'react';
import styled, { keyframes } from 'styled-components'

export const StyledH1 = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 50px;
`;

export const StyledForm = styled(Form)`
  padding: 40px 60px;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 20px 20px 43px -23px rgba(0,0,0,0.4);
`;

export const StyledGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  width: 350px;
`;

export const StyledInput = styled.input<{error: boolean}>`
  font-size: 20px;
  padding: 1rem 1.5rem;
  outline: none;
  background-color: #e9eff6;
  border: ${({error}) => error ? '1px solid #ff3838' : 'none'};
  border-radius: 14px;
  transition: all .1s linear;

  &::placeholder {
    color: #505254;
  }

  &:hover {
    background: #d4d2d2;

  }
`;

const errorAnim = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledError = styled.div<{error: boolean}>`
  font-size: 15px;
  margin-top: 8px;
  color: #ff3838;
  animation: ${errorAnim} 0.1s linear 1;
`;

export const StyledButton = styled.button`
  width: 100%;
  background: #4460f1;
  border: none;
  font-size: 24px;
  padding: 1rem;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background .1s linear;

  &:hover {
    background: #2547f0;
  }

  &:disabled {
    background: #4460f1;
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StyledDividerH2 = styled.h2`
  margin: 40px 0;
  width: 100%; 
  text-align: center; 
  border-bottom: 1px solid #9fa9b7; 
  line-height: 0.1em;
  font-size: 18px;
  font-weight: normal;

  & span {
    color: #9fa9b7;
    background:#fff; 
    padding:0 10px; 
  }
`;

export const StyledDivider: FC = ({children}) => (
  <StyledDividerH2>
    <span>{children}</span>
  </StyledDividerH2>
)

export const StyledProviders = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledImg = styled.img`
  height: 60px;
  padding: 10px 30px;
  border: 1px solid #9fa9b7;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.1s linear;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 30px -7px rgba(66, 68, 90, 1);
  }
`;



