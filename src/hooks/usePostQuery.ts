import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { queryKey } from "src/constants/queryKey"
import { PostDetail } from "src/types"

const usePostQuery = (slug?: string) => {
  const router = useRouter()
  const { slug: slugFromQuery } = router.query
  const { data } = useQuery<PostDetail>({
    queryKey: queryKey.post(`${slug || slugFromQuery}`),
    enabled: false,
  })

  return data
}

export default usePostQuery
