import sidebar from "../compile/compiledSidebar";

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
    <>
      <Sidebar {...sidebar} />
      <pre>{JSON.stringify(sidebar, null, 2)}</pre>;
    </>
  );
};

export default TestPage;
