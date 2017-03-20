import React from 'react';
import styled from 'styled-components';

export const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <Backdrop>
      <ModalBox>
        <ModalHeader>
          {onClose && <button type="button" onClick={onClose}>Close</button>}
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
      </ModalBox>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 50;
`;

const ModalBox = styled.div`
  background-color: #cdcdcd;
  border-radius: 5px;
  max-width: 500px;
  min-height: 300px;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  border-bottom: 1px solid black;
  display: flex;
`;

const ModalBody = styled.div`
  width: 100%;
  flex-grow: 1;
`;
