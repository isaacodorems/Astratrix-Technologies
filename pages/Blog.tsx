
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const Blog: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 text-center">
          Latest Insights
        </h1>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16">
            Stay updated with the latest trends in African AI, business automation, and digital transformation.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.id} 
              className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="h-64 overflow-hidden relative">
                 <img 
                    src={post.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-slate-900 uppercase tracking-wide">
                    {post.category}
                 </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-azure transition-colors leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-6 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-2 text-azure font-bold group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
