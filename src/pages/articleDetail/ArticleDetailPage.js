import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import BreadCrumbs from '../../components/BreadCrumbs'
import {images, stables} from '../../constants';
import {Link, useParams} from 'react-router-dom';
import SuggestedPosts from './container/SuggestedPosts';
import CommentsContainer from '../../components/comments/CommentsContainer';
import SocialShareButtons from '../../components/SocialShareButtons';
import { getAllPosts, getSinglePost } from '../../services/index/posts';
import { useQuery} from '@tanstack/react-query';
import { useSelector} from 'react-redux';
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton';
import ErrorMessage from '../../components/ErrorMessage';
import parseJsonToHtml from '../../utils/parseJsonToHtml';
import Editor from '../../components/editor/Editor';

export default function ArticleDetailPage() {

  const { slug } = useParams();
  const userState = useSelector(state => state.user);
  const [breadCrumbsData, setbreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
  });

  useEffect(()=>{
    if(data){
      setbreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: "Article title", link: `/blog/${data.slug}` },
      ]);
      setBody(parseJsonToHtml(data?.body));
    }
  },[data]);

  const { data:postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  return (
    <MainLayout>
      {isLoading ? (<ArticleDetailSkeleton/>) : isError ? (<ErrorMessage message="Couldn't fetch post"/>):
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbsData} />
          <img
            className="rounded-xl w-full"
            src={data?.photo ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo : images.samplePostImage }
            alt={data?.title}
          />

          <div className='mt-4 flex gap-2'>
          {data?.categories.map((category) => (
            <Link
            className="text-primary text-sm font-roboto inline-block mt-4 md:text-base"
            to={`/blog?category=${category.name}`}
            >
            {category.name}
            </Link>
          ))}
          </div>
          <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
            {data?.title}
          </h1>
          <div className="w-full">
            {!isLoading && !isError && (
                <Editor content={data?.body} editable={false} />
            )}
            </div>
          <CommentsContainer comments={data?.comments} className="mt-10" logginedUserId={userState?.userInfo?._id} postSlug={slug}/>
        </article>
        <div>
          <SuggestedPosts
            header="Latest Article"
            posts={postsData?.data}
            tags={data?.tags}
            className="mt-8 lg:mt-0 lg:max-w-xs"
          />
          <div className='mt-7'>
            <h2 className='font-roboto font-medium text-dark-hard mb-4 md:text-xl'>Share on:</h2>
            <SocialShareButtons url={encodeURI(window.location.href)} title={encodeURIComponent(data?.title)}/>
          </div>
        </div>
      </section>
      }
    </MainLayout>
  );
}
