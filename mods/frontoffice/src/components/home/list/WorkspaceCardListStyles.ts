import styled from "styled-components";

export const WorkspaceCardListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

export const WorkspaceCardListMultiRowWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  /* The logic to center only the first row items */
  & > *:nth-child(-n + 4) {
    margin-left: auto;
    margin-right: auto;
  }
`;
