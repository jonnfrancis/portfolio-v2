import React from 'react'
import { WindowControls } from '#components'
import { blogPosts } from '#constants'
import { SlideWrapper } from '#hoc'
import { ExternalLink } from 'lucide-react'

const MobileSafari = () => {
  const hasPosts = Array.isArray(blogPosts) && blogPosts.length > 0

  return (
    <>
      {/* Header: keep visual styles minimal since SlideWrapper owns the backdrop/glass */}
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-3 bg-white/50"
        role="region"
        aria-labelledby="mobile-safari-title"
      >
        <WindowControls target="mobile_safari" storeType="slide" />
        <h2 id="mobile-safari-title" className="text-base font-medium">
          Articles
        </h2>
        <div></div>
      </div>

      <div className="px-4 pb-6">
        {!hasPosts ? (
          <div
            role="status"
            aria-live="polite"
            className="text-sm text-neutral-500 px-1 py-3"
          >
            No articles available.
          </div>
        ) : (
          <ul className="space-y-4">
            {blogPosts.map((post, idx) => (
              <li
                key={post.id ?? `post-${idx}`}
                className="rounded-lg overflow-hidden bg-linear-to-tr from-white/8 to-white/4 shadow-sm"
              >
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
                >
                  <div className="relative w-full h-44 bg-gray-100">
                    <img
                      src={post.image}
                      alt="" /* Title is presented textually below; avoid SR duplication */
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-white/90">{post.date}</p>
                        <h3 className="text-base font-semibold text-white line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                      <ExternalLink
                        className="w-5 h-5 text-white/90 ml-3 shrink-0"
                        aria-hidden="true"
                        focusable="false"
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-neutral-600 line-clamp-3">
                      Read the full article on the linked site.
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

const MobileSafariWindow = SlideWrapper(MobileSafari, 'mobile_safari')

export default MobileSafariWindow