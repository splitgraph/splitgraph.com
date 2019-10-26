import sidebar from "../compile/compiledSidebar";
import { Flex, Box } from "@splitgraph/design";

// const sidebar = require("../compile/sidebar");

const SidebarNode = ({ id, url, metadata: { title } = {}, children }) => {
  return (
    <li>
      <span>{title}</span>
      {children && (
        <ul>
          {children.map(child => (
            <SidebarNode {...child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar = sidebar => {
  return (
    <>
      {sidebar && sidebar.metadata && sidebar.metadata.title && (
        <h1>{sidebar.metadata.title}</h1>
      )}
      <ul>
        <SidebarNode {...sidebar} />
      </ul>
    </>
  );
};

const TestPage = () => {
  return (
    <Flex>
      <Box>
        <Sidebar {...sidebar} />
      </Box>
      <Box>
        <pre>{JSON.stringify(sidebar, null, 2)}</pre>
      </Box>
    </Flex>
  );
};

export default TestPage;
