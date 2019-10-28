import sidebar from "../compile/compiledSidebar";
import { Flex, Box } from "@splitgraph/design";
import Link from "next/link";

import { Sidebar } from "@splitgraph/design";

// const sidebar = require("../compile/sidebar");

const TestPage = () => {
  return (
    <Flex>
      <Box>
        <Sidebar sidebar={sidebar} Link={Link} />
      </Box>
      <Box>
        <pre>{JSON.stringify(sidebar, null, 2)}</pre>
      </Box>
    </Flex>
  );
};

export default TestPage;
