import React from 'react'
import { WindowControls } from '#components'
import { socials } from '#constants'
import { SlideWrapper } from '#hoc'

const MobileContact = () => {
  const hasSocials = Array.isArray(socials) && socials.length > 0

  const email = 'johnmosima7@gmail.com' // keep mailto and label in sync

  return (
    <>
      {/* Header: neutral visuals; SlideWrapper owns the backdrop */}
      <div
        id="window-header"
        className="w-full flex items-center justify-between px-4 py-3"
        role="region"
        aria-labelledby="mobile-contact-title"
      >
        <WindowControls target="mobile_contact" storeType="slide" />
        <h2 id="mobile-contact-title" className="text-base font-medium">Contact Me</h2>
      </div>

      <div className="p-5 space-y-5 overflow-auto">
        <img
          src="/images/johnfrancis.jpg"
          alt="John Francis"
          className="w-20 h-20 rounded-full object-cover"
          width={80}
          height={80}
          loading="lazy"
          decoding="async"
        />

        <h3 className="text-lg font-semibold">Let's Ship it</h3>
        <p>
          Currently architecting the next generation of web experiences. If you have a vision that requires precision and scale, let’s build it.
        </p>

        <a
          href={`mailto:${email}`}
          className="inline-flex flex-col group transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 rounded"
        >
          <span className="text-xs uppercase tracking-widest">Direct Mail</span>
          <span className="text-sm font-medium group-hover:underline">
            {email}
          </span>
        </a>

        {!hasSocials ? (
          <div role="status" aria-live="polite" className="text-sm text-neutral-600">
            No social links available.
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3" aria-label="Social links">
            {socials.map(({ id, bg, link, icon, text }) => (
              <li key={id} className="rounded p-3 flex items-center gap-3 text-white" style={{ backgroundColor: bg }}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={text}
                  className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 rounded"
                  style={{ backgroundColor: bg }}
                >
                  <img
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    className="w-6 h-6"
                    loading="lazy"
                    decoding="async"
                  />
                  <p className="text-sm font-medium">{text}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

const MobileContactWindow = SlideWrapper(MobileContact, 'mobile_contact')

export default MobileContactWindow