import styled from "styled-components";
import { colors } from "../utils/colors";

export const Logo = styled.img`
  height: auto;
  width: 150px;

  @media (max-width: 768px) {
    width: 40px;
  }
`;

export const LogoName = styled.h5`
  font-size: 30px;
  margin: 0;
  margin-right: 5px;
  padding: 0;
  color: ${colors.secondary};

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

export const LogoDesc = styled.p`
  font-size: 16px;
  color: ${colors.accent};

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
