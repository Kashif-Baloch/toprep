"use client";
import api from "@/config/axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Video {
  id: string;
  title: string;
  description: string;
  videoLink: string;
  category: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [totalVideos, setTotalVideos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = Number(process.env.NEXT_PUBLIC_USER_LIMIT!) || 2;
  const tabs = [
    "Health and Fitness",
    "Professional Dressing and Attire",
    "Key Performance Indicators",
    "Selling Skills",
    "Relation Building",
    "Education",
    "AI",
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [tab, setTab] = useState(tabs[activeTab]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(
          `/v1/media/get-videos?category=${tab}&page=${page}&limit=${limit}`,
        );
        setVideos(res.data.videos);
        setTotalVideos(res.data.totalVideos);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [tab, page, limit]);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Exclusive Video Content
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Access in-depth, expert-curated videos that cover all aspects of sales
          mastery by experienced managers of corporates.
        </p>
      </div>
      {/* Tabs Navigation - Similar to the screenshot */}
      <div className="flex overflow-x-auto pb-2 mb-8 hide-scrollbar">
        <div className="flex space-x-2 justify-center mx-auto">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(index);
                setTab(tab);
              }}
              className={`px-4 py-2 text-[12px] font-medium rounded-full whitespace-nowrap transition-colors ${
                activeTab === index
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* Video Content Area */}
      <div className=" p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">{tabs[activeTab]} Videos</h3>
        {loading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <Loader2 className="animate-spin" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[50vh]">
            <p className="text-red-600 text-2xl font-bold">{error}</p>
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Placeholder for videos - replace with actual content */}
            {videos.slice(0, 2).map((video) => (
              <div key={video.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="aspect-w-16 aspect-h-9  rounded mb-3"></div>
                <h4 className="font-medium my-3">{video.title}</h4>
                <iframe
                  className="aspect-video rounded-md"
                  src={video.videoLink}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center h-[50vh] justify-center">
            <h1 className="text-2xl font-bold text-gray-600">
              No videos found
            </h1>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center ">
        <Link
          href={`/videos/${tab}`}
          className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-10 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          View More
        </Link>
      </div>
    </section>
  );
};

export default Videos;
