import Head from "next/head";
import Link from "next/link";

import {
  Header,
  Footer,
  MainContent,
  Sidebar,
  Heading,
  SubHeading,
  Text,
  Box
} from "@splitgraph/design";
import { BaseLayout } from "@splitgraph/design/Layout";

const IndexPage = () => (
  <BaseLayout>
    <Box
      sx={{
        display: "grid",
        gridGap: 4,
        gridTemplateColumns: "repeat(auto-fit, minmax(128px, 1fr))"
      }}
    >
      <Heading p={3} bg="muted">
        Hello
      </Heading>
      <Box p={3} color="background" bg="primary">
        CSS Grid
      </Box>
    </Box>
  </BaseLayout>
);

// const IndexPage = () => (
//   <div>
//     <Head>
//       <title>Index Title</title>
//     </Head>

//     <Header>
//       <Heading>Splitgraph</Heading>
//     </Header>

//     <Sidebar>
//       <SubHeading>Sidebar</SubHeading>
//     </Sidebar>

//     <MainContent>
//       <Heading>Lorem ipsum...</Heading>
//       <SubHeading>Dolor, sit amet...</SubHeading>
//     </MainContent>

//     <Footer>
//       <ul>
//         <li>
//           <Link href="/auth/sign_in" prefetch={false}>
//             <a>Login</a>
//           </Link>
//         </li>
//         <li>
//           <Link href="/IndexPage" prefetch={false}>
//             <a>IndexPage (this)</a>
//           </Link>
//         </li>
//         <li>
//           <Link href="/" prefetch={false}>
//             <a>Index</a>
//           </Link>
//         </li>
//       </ul>
//     </Footer>
//   </div>
// );

export default IndexPage;
