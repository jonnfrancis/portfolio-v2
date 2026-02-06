import { WindowControls } from '#components'
import { socials } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import React from 'react'

const Contact = () => {
  return (
    <>
        <div id="window-header">
            <WindowControls target="contact" />
            <h2>Contact Me</h2>
        </div>

        <div className="p-5 space-y-5">
            <img src="/images/johnfrancis.jpg" alt="John Francis" className='w-20 rounded-full' />

            <h3>Let's Ship it</h3>
            <p>Currently architecting the next generation of web experiences. If you have a vision that requires precision and scale, let’s build it.</p>
            <a 
                href="mailto:johnmosima7@gmail.com" 
                className="inline-flex flex-col group transition-all duration-300"
            >
                <span className="text-xs uppercase tracking-widest">Direct Mail</span>
                <span className="text-sm font-medium group-hover:underline">
                    johnfrancis@gmail.com
                </span>
            </a>

            <ul>
                {socials.map(({ id, bg, link, icon, text }) => (
                    <li key={id} style={{ backgroundColor: bg }}>
                        <a href={link} target='_blank' rel='noopener noreferrer' title={text}>
                            <img src={icon} alt={text} size="size-5" />
                            <p>{text}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </>
  )
}

const ContactWindow = WindowWrapper(Contact, "contact")

export default ContactWindow