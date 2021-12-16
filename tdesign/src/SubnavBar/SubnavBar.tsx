import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Section {
  displayName: string;
  slug: string;
}

interface ISubnavBarProps {
  title?: string;
  sections?: Array<Section>;
  visibleSection?: Pick<Section, "slug">;
}
const SubnavBar = ({
  title,
  sections,
  visibleSection,
  ...rest
}: ISubnavBarProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.up("sm")]: {
          borderBottom: `1px solid ${theme.palette.grays.gray26.main}`,
        },
        ul: {
          display: { xs: "none", sm: "inline" },
          paddingLeft: "0px",
          marginBottom: "inherit",
          marginTop: "inherit",
        },
        ".unstyledLink": {
          color: "inherit",
          textDecoration: "inherit",
        },
        ".sectionLink": {
          display: "inline",
          color: ({ palette }) => `1px solid ${palette.grays.gray25.main}`,
          "&:not(:last-child)": {
            mr: "24px",
          },
        },
        ".sectionLink:hover": {
          color: "flambeeRed.main",
        },
      }}
      {...(rest as any)}
    >
      <Typography variant="title1" className="title">
        {title}
      </Typography>
      <Box
        sx={{
          display: { xs: "none", sm: "inline" },
          height: "16px",
          mx: "16px",
          borderLeft: "1px solid black",
        }}
      >
        &nbsp;
      </Box>
      <ul>
        {sections?.map(({ displayName, slug }, i) => (
          <li
            key={i}
            className={`sectionLink ${!!visibleSection ? "active" : ""}`}
          >
            <Typography
              variant="smallHighlightedSB"
              fontSize="14px"
              className="section"
              key={i}
            >
              <a className={"unstyledLink"} href={`#${slug}`}>
                {displayName}
              </a>
            </Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default SubnavBar;
