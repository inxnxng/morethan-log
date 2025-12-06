import { dehydrate } from "@tanstack/react-query"
import { GetStaticProps } from "next"
import { CONFIG } from "site.config"
import { getPosts, getRecordMap } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import { queryKey } from "src/constants/queryKey"
import usePostQuery from "src/hooks/usePostQuery"
import { queryClient } from "src/libs/react-query"
import { filterPosts } from "src/libs/utils/notion"
import Detail from "src/routes/Detail"
import CustomError from "src/routes/Error"
import { NextPageWithLayout } from "src/types"

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts()
  const feedPosts = filterPosts(posts)
  await queryClient.prefetchQuery(queryKey.posts(), () => feedPosts)

  const aboutPage = feedPosts.find(
    (post) => post.id === CONFIG.notionConfig.aboutPageId
  )

  if (aboutPage) {
    const recordMap = await getRecordMap(aboutPage.id)
    await queryClient.prefetchQuery(queryKey.post(aboutPage.id), () => ({
      ...aboutPage,
      recordMap,
    }))
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const AboutPage: NextPageWithLayout = () => {
  const post = usePostQuery(CONFIG.notionConfig.aboutPageId)

  if (!post) return <CustomError />

  const image =
    post.thumbnail ??
    CONFIG.ogImageGenerateURL ??
    `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(post.title)}.png`

  const date = post.date?.start_date || post.createdTime || ""

  const meta = {
    title: post.title,
    date: new Date(date).toISOString(),
    image: image,
    description: post.summary || "",
    type: post.type[0],
    url: `${CONFIG.link}/about`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Detail post={post} />
    </>
  )
}

AboutPage.getLayout = (page) => {
  return <>{page}</>
}

export default AboutPage
