import styled from "styled-components";
import { colors } from "../utils/colors";

export const DashboardContainer = styled.div`
  height: 100vh;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding: 10px 10px 0 10px;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  @media (max-width: 768px) {
    padding: 10px 0 0 0;
  }
`;

export const ImageListContainer = styled.img`
  width: 300px;
  height: auto;
  transition: 0.5s all ease-in-out;
  border-radius: 15px;
  margin-bottom: 10px;
  cursor: pointer;

  :hover {
    width: 305px;
  }

  @media (max-width: 768px) {
    margin: 0;
    margin-right: 10px;
    height: 200px;
    width: auto;
  }
`;

export const ImageView = styled.img`
  height: 500px;
  width: auto;
  transition: 0.5s all ease-in-out;
  border-radius: 15px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin: 0;
    margin-right: 10px;
    width: 400px;
    height: auto;
  }
`;

export const WorkSpace = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  align-items: center;
  background-color: "rgba(0,0,0,0.5)";
  padding: 0 15px;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const WorkView = styled.div`
  display: flex;
  flex: 1;
  overflow: scroll;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Details = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  padding: 10px;
  color: white;
  opacity: ${({ details }) => (details ? 1 : 0)};
  transition: 0.5s all ease-in-out;
  z-index: 5;
`;

export const ImageSetupContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: ${colors.light};
  border-radius: 15px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 12px;
`;
