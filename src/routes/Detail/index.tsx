import styled from "@emotion/styled"
import usePostQuery from "src/hooks/usePostQuery"
import { PostDetail as PostDetailType } from "src/types"
import useMermaidEffect from "./hooks/useMermaidEffect"
import PageDetail from "./PageDetail"
import PostDetail from "./PostDetail"

type Props = {
  post?: PostDetailType
}

const Detail: React.FC<Props> = ({ post }) => {
  const data = post || usePostQuery()
  useMermaidEffect()

  if (!data) return null
  return (
    <StyledWrapper data-type={data.type}>
      {data.type[0] === "Page" && <PageDetail data={data} />}
      {data.type[0] !== "Page" && <PostDetail data={data} />}
    </StyledWrapper>
  )
}

export default Detail

const StyledWrapper = styled.div`
  padding: 2rem 0;

  &[data-type="Paper"] {
    padding: 40px 0;
  }
  /** Reference: https://github.com/chriskempson/tomorrow-theme **/
  code[class*="language-mermaid"],
  pre[class*="language-mermaid"] {
    background-color: ${({ theme }) => theme.colors.gray5};
  }
`
