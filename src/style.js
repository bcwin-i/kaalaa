import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: max-content;
  height: max-content;
`;

export const Overlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: max-content;
    padding: 10px;
    color: white;
    background: rgba(0, 0, 0, 0.8);
`;

export const Row = styled.p`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
