import * as React from "react";
import { Box } from "@material-ui/core";

export interface INewsletterSignupProps {}

const NewsletterSignup = ({}: INewsletterSignupProps) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Box
      className="footer-section"
      sx={{
        ".cta-newsletter-signup": {
          display: "table",
          border: "1px solid",
          borderColor: expanded ? "gray" : "white",
          color: expanded ? "gray" : "white",
          opacity: expanded ? "0.75" : "inherit",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          ":hover": {
            cursor: "pointer",
            borderColor: "sglightblue",
          },
        },
      }}
    >
      <h3
        className="footer-section-header cta-newsletter-signup"
        onClick={(_) => setExpanded(!expanded)}
      >
        Sign Up for Email Newsletter
      </h3>
      {expanded && (
        <iframe
          src="https://cdn.forms-content.sg-form.com/6966c725-e1ed-11ea-b09c-c642a2177fd0"
          style={{
            left: 0,
            top: 0,
            minWidth: "min(600px, 100%)",
            maxWidth: "100%",
            minHeight: "30rem",
            border: "none",
            background: "none",
            overflowY: "hidden",
          }}
        />
      )}
    </Box>
  );
};

export default NewsletterSignup;
