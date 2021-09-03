import { MuiLink as Link } from "@splitgraph/tdesign";

export interface IHeaderRightProps {}

const HeaderRight = ({}: IHeaderRightProps) => {
  return (
    <>
      <Link href="/blog">Blog</Link>
      <Link href="/docs">Docs</Link>
      <Link className="button-link--outline desktop-only" href="/connect">
        Connect
      </Link>
      <Link className="button-link" href="/explore">
        Data2
      </Link>
    </>
  );
};

export default HeaderRight;
