import styled from "@emotion/styled"
import React from "react"
import { PostDetail } from "src/types"
import NotionRenderer from "../components/NotionRenderer"

type Props = {
  data: PostDetail
}

const PageDetail: React.FC<Props> = ({ data }) => {
  if (!data) return null
  return (
    <StyledWrapper>
      <NotionRenderer recordMap={data.recordMap} />
    </StyledWrapper>
  )
}

export default PageDetail

const StyledWrapper = styled.div`
  margin: 0 auto;
  max-width: 56rem;
`
