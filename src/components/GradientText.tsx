import styled from "@emotion/styled";
import { FC } from "react";
import { Typography } from "@mui/material";

const StyledText = styled.span`
  & > span {
    background: -webkit-linear-gradient(#ff77f4, #ff4e4e, white);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

interface TextProps {
  primary: string;
}

const GradientText: FC<TextProps> = ({ primary }) => {
  return (
    <StyledText>
      <Typography variant="h1" component="span" fontWeight="600">
        {primary}
      </Typography>
    </StyledText>
  );
};

export default GradientText;
