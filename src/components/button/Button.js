import { StyledButtonLoad } from "./StyledButton";

export const Button = ({ loadMore }) => {
  return <StyledButtonLoad onClick={loadMore}>Load more</StyledButtonLoad>;
};
