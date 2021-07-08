import { Grid, Paper, Typography } from "@material-ui/core";
import withThemes from "@splitgraph/docs/components/DemoComponents/withThemes";
import StyledComponents from "@splitgraph/docs/components/DemoComponents/styled-components";
import CSSProp from "@splitgraph/docs/components/DemoComponents/css-prop";
import StyledUtil from "@splitgraph/docs/components/DemoComponents/styled-util-fn";
import ArrowText from "@splitgraph/docs/components/DemoComponents/arrow-text/ArrowText";

const ThemeDemo = () => {
  return (
    <Paper>
      <Typography variant="h3">Styling with theme</Typography>
      <Typography variant="h5">Demo of different styling approaches</Typography>
      <hr />
      <Grid container spacing={24} sx={{ padding: "1rem" }}>
        <Grid item xs={5}>
          <Paper elevation={5} sx={{ padding: "1rem" }}>
            <h3>{"<ArrowText />"}</h3>
            <ArrowText />
            <p>
              (lp-demo-leon component using{" "}
              <code>props.theme.palette.primary[100]</code> from our theme)
            </p>
            The Emotion {"<ThemeProvider>"} covers all child components of the
            /lp page. See <a href="https://emotion.sh/docs/theming">docs</a>{" "}
            here.
          </Paper>
        </Grid>
        <Grid item xs={7} />
        <Grid item xs={5}>
          <Paper elevation={5} sx={{ padding: "1rem" }}>
            <h3>
              <a href="https://emotion.sh/docs/styled" target="_new">
                styled components
              </a>{" "}
              (e.g. `styled.div` )
            </h3>
            <StyledComponents />
            <p>
              using Emotion's <code>import styled from "@emotion/styled";</code>
            </p>
          </Paper>
        </Grid>
        <Grid item xs={7} />
        <Grid item xs={5}>
          <Paper elevation={5} sx={{ padding: "1rem" }}>
            <h3>
              <a href="https://emotion.sh/docs/styled" target="_new">
                css prop
              </a>{" "}
              <em>
                (Note: you may need a pragma for this e.g. /** @jsxImportSource
                @emotion/react */)
              </em>
            </h3>
            <CSSProp />
          </Paper>
        </Grid>
        <Grid item xs={7} />
        <Grid item xs={5}>
          <Paper elevation={5} sx={{ padding: "1rem" }}>
            <h3>
              {"styled() - experimental style injection from the MUI team"}
            </h3>
            <StyledUtil />
          </Paper>
        </Grid>
        <Grid item xs={7} />
      </Grid>
    </Paper>
  );
};

export default withThemes(ThemeDemo);
