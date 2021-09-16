import {
  Box,
  Tabs as MuiTabs,
  Tab as MuiTab,
  TabProps,
  TabsProps,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <p>{children}</p>
        </Box>
      )}
    </div>
  );
};

export const Tab = ({ sx, ...rest }: TabProps) => {
  return (
    <MuiTab
      disableRipple
      sx={{
        textTransform: "none",
        fontWeight: (theme) => theme.typography.fontWeightRegular,
        color: "rgba(3,3,3, 0.7)",
        "&.Mui-selected": {
          color: "black",
        },
        "&.Mui-focusVisible": {
          backgroundColor: "rgba(100, 95, 228, 0.32)",
        },
        ...sx,
      }}
      {...(rest as any)}
    />
  );
};

interface TabBodyProps {
  icon?: React.ReactElement;
  label: string;
  value?: string | number;
}
export const TabBody = ({ icon, label, value }: TabBodyProps) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
    }}
  >
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {icon}
      &nbsp;
      <span>{label}</span>
    </Box>
    {!!value && (
      <Box sx={{ color: "rgba(85, 86, 86, 1)", fontSize: ".5", ml: ".5rem" }}>
        {value}
      </Box>
    )}
  </Box>
);

interface ITabsProps extends TabsProps {
  currentTab: string;
  handleChange: (_: React.SyntheticEvent, newValue: string) => void;
  orientation: "horizontal" | "vertical";
  loading?: boolean;
  showDialog?: (show: boolean) => void; //for mobile
  children?: React.ReactNode;
}
const Tabs = ({
  currentTab,
  handleChange,
  orientation,
  children,
  ...rest
}: ITabsProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <MuiTabs
      value={currentTab}
      onChange={handleChange}
      orientation={orientation}
      aria-label="Tab chooser"
      // variant="scrollable"
      sx={{
        margin: matches ? "1em" : "",
        ".MuiTabs-indicator": {
          left: 0,
          background: (theme) => theme.palette.flambeeRed.light,
        },
        marginBottom: orientation !== "vertical" && "2rem",
      }}
      {...(rest as any)}
    >
      {children}
    </MuiTabs>
  );
};

export default Tabs;
