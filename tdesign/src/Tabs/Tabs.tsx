import {
  Box,
  Tabs as MuiTabs,
  Tab as MuiTab,
  TabProps,
  TabsProps,
} from "@material-ui/core";

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
        fontWeight: ({ typography }) => typography.fontWeightRegular,
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
  isMobile?: boolean;
  loading?: boolean;
  showDialog?: (show: boolean) => void; //for mobile
  children?: React.ReactNode;
}
const Tabs = ({
  currentTab,
  handleChange,
  children,
  isMobile,
  ...rest
}: ITabsProps) => {
  return (
    <MuiTabs
      value={currentTab}
      onChange={handleChange}
      orientation={isMobile ? "horizontal" : "vertical"}
      aria-label="Tab chooser"
      sx={{
        margin: isMobile ? "" : "1em",
        ".MuiTabs-indicator": {
          left: 0,
          background: ({ palette }) => palette.flambeeRed.light,
        },
      }}
      {...(rest as any)}
    >
      {children}
    </MuiTabs>
  );
};

export default Tabs;
