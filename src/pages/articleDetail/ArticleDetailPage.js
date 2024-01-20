import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import BreadCrumbs from '../../components/BreadCrumbs'
import {images, stables} from '../../constants';
import {Link, useParams} from 'react-router-dom';
import SuggestedPosts from './container/SuggestedPosts';
import CommentsContainer from '../../components/comments/CommentsContainer';
import SocialShareButtons from '../../components/SocialShareButtons';
import { getSinglePost } from '../../services/index/posts';
import { useQuery} from '@tanstack/react-query';
import { generateHTML } from '@tiptap/html';
import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Italic from '@tiptap/extension-italic';
import parse from 'html-react-parser';

const postsData=[
    {
        _id:"1",
        image:images.postImage,
        title:"Help Children Get Better Education",
        createdAt:"2023-04-15"
    },
    {
        _id:"2",
        image:images.postImage,
        title:"Help Children Get Better Education",
        createdAt:"2023-04-15"
    },
    {
        _id:"3",
        image:images.postImage,
        title:"Help Children Get Better Education",
        createdAt:"2023-04-15"
    },
    {
        _id:"4",
        image:images.postImage,
        title:"Help Children Get Better Education",
        createdAt:"2023-04-15"
    }
]

const tagsData=[
    "Medical",
    "Lifestyle",
    "Learn",
    "Healthy",
    "Food",
    "Diet",
    "Education"
]

export default function ArticleDetailPage() {

  const { slug } = useParams();
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
      setBody(
        parse(generateHTML(data?.body,[
          Bold,
          Italic,
          Text,
          Paragraph,
          Document
        ]))
        );
    }
  },[data]);

  return (
    <MainLayout>
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
          <div className="mt-4 prose prose-sm sm:prose-base">
            {body}
          </div>
          <CommentsContainer className="mt-10" logginedUserId="a" />
        </article>
        <div>
          <SuggestedPosts
            header="Latest Article"
            posts={postsData}
            tags={tagsData}
            className="mt-8 lg:mt-0 lg:max-w-xs"
          />
          <div className='mt-7'>
            <h2 className='font-roboto font-medium text-dark-hard mb-4 md:text-xl'>Share on:</h2>
            <SocialShareButtons url={encodeURI("https://github.com/chahat30")} title={encodeURIComponent("Github")}/>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
