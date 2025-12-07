import React from 'react';
import { Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const Blog: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-16 text-center">
          Latest Insights
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.id} 
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-azure hover:shadow-lg transition-all duration-300 group cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-4 text-sm mb-4">
                <span className="text-azure font-bold px-3 py-1 bg-azure/10 rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-azure transition-colors">
                {post.title}
              </h2>
              
              <p className="text-gray-600 mb-6">
                {post.excerpt}
              </p>
              
              <span className="text-slate-900 font-medium border-b border-azure pb-0.5 group-hover:text-azure transition-colors">
                Read Article
              </span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;