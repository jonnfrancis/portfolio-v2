const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Jan 28, 2026",
    title:
      "Black Gold? Why Bio-Slurry is Actually More Valuable than the Gas",
    image: "https://res.cloudinary.com/dxvygt0ay/image/upload/v1769605527/sdqkqx4ptorze729f6wy.jpg",
    link: "https://www.bioafrisolns.org/blogs/black-gold-why-bio-slurry-is-actually-more-valuable-than-the-gas",
  },
  {
    id: 2,
    date: "Jan 02, 2026",
    title:
      "Black Gold? Why Bio-Slurry is Actually More Valuable than the Gas",
    image: "https://res.cloudinary.com/dxvygt0ay/image/upload/v1758642998/tdpy7kfirp9ornq7fmyc.jpg",
    link: "https://www.bioafrisolns.org/blogs/black-gold-why-bio-slurry-is-actually-more-valuable-than-the-gas",
  },
  {
    id: 3,
    date: "Dec 01, 2025",
    title: "BioAfri Solns Shines at Ignite Kenya Startup Challenge",
    image: "https://res.cloudinary.com/dxvygt0ay/image/upload/v1763455205/ub4re2cxrvqlj0tcvlyo.jpg",
    link: "https://www.bioafrisolns.org/blogs/bioafri-solns-shines-at-ignite-kenya-startup-challenge-innovation-impact-youth-entrepreneurship",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "Vanilla.js" ],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS"],
  },
  {
    category: "UI/UX Design",
    items: ["Figma", "Canva", "Dribbble"],
  },
  {
    category: "Backend",
    items: ["Django", "Node.js", "Flask", "Jaclang"],
  },
  {
    category: "Motion & 3D",
    items: ["GSAP", "Framer Motion", "Lottie", "Three.js"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "Prisma"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker", "Coolify"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/jonnfrancis",
  },
  {
    id: 2,
    text: "Instagram",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "https://instagram.com/johnfrancis.dev",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/jonnfrancis7",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://linkedin.com/in/john-francis-732259211",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.JPG",
    tags: ["Memories", "People"],
  },
  {
    id: 2,
    img: "/images/gal3.JPG",
    tags: ["Favorites", "Places"],
  },
  {
    id: 3,
    img: "/images/gal2.jpg",
    tags: ["Places", "Favorites"],
  },
  {
    id: 4,
    img: "/images/gal4.jpg",
    tags: ["Memories", "People"]
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "BioafriSolns Ecommerce Web App",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[20vh] left-7", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "Bioafri Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "The BioAfrisolns website is a clean, modern platform built to showcase sustainable bioenergy and bio-catalyst solutions for homes, industries, and communities.",
            "Rather than a static corporate site, it focuses on storytelling using motion, video, and strong visuals to communicate impact, innovation, and environmental responsibility.",
            "The experience guides users through BioAfri’s mission, products, and real-world applications in a way that feels informative, credible, and forward-thinking.",
            "It is built with Next.js and Tailwind CSS, optimized for performance, responsiveness, and smooth transitions, with a strong emphasis on clarity, accessibility, and brand trust."
          ],
        },
        {
          id: 2,
          name: "bioafrisolns.org",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://www.bioafrisolns.org/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "bioafrisolns.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-1.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://www.figma.com/design/3lKcEXUsZHXXY5NQF3rH3B/BioAfri-Soln?m=auto&t=cAkLq3YaBKAZZeEw-1",
          position: "top-60 right-20",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "UrbanKikapu Ecommerce Web App",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[40vh] left-7",
      children: [
        {
          id: 1,
          name: "UrbanKikapu Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-20 left-20",
          description: [
            "UrbanKikapu is a modern e-commerce platform built to simplify how electronics are discovered, compared, and purchased in Kenya.",
            "The project focuses on delivering a premium, trust-driven shopping experience, combining clean UI, smooth animations, and a mobile-first design inspired by platforms like Amazon and Jumia.",
            "At its core, UrbanKikapu supports real-world buying behavior with features such as Pay on Delivery, WhatsApp-assisted ordering, and flexible payment options including M-Pesa, Airtel Money, and card payments.",
            "From a technical standpoint, the platform was designed and developed using a modern web stack, with performance, scalability, and SEO baked in from the start to support organic growth and fast load times.",
            "Beyond just selling products, UrbanKikapu was built as a scalable foundation ready to expand into multiple categories, integrate customer reviews, product recommendations, and downloadable datasheets for informed purchasing decisions.",
          ],
        },
        {
          id: 2,
          name: "urbankikapu.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://www.figma.com/design/rLH4RFycdhekb76vg5MtOv/Urban-Kikapu?m=auto&t=cAkLq3YaBKAZZeEw-6",
          position: "top-5 right-10",
        },
        {
          id: 4,
          name: "urbankikapu-ecommerce.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/project-2.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://www.figma.com/design/rLH4RFycdhekb76vg5MtOv/Urban-Kikapu?m=auto&t=cAkLq3YaBKAZZeEw-6",
          position: "top-60 left-5",
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "StoreIt Cloud Storage App",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[60vh] left-7",
      children: [
        {
          id: 1,
          name: "StoreIt Cloud Storage Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "StoreIt is a modern cloud storage platform designed to make file management simple, secure, and accessible from anywhere.",
            "It uses OTP-based authentication powered by Appwrite, allowing users to sign in securely without traditional passwords.",
            "Built with Next.js and Tailwind CSS, StoreIt delivers a sleek, responsive interface with fast performance and a clean, modern design.",
            "Users can upload, store, and preview multiple file types, including images, audio, documents, and unsupported formats, all from a personalized dashboard.",
            "Each user starts with 2GB of free storage and can clearly see how their space is distributed across documents, media, images, and other file types.",
            "StoreIt also supports secure file sharing via email, making collaboration and content distribution effortless."
          ],
        },
        {
          id: 2,
          name: "StoreIt.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://storage-management-sigma.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "storeit.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-3.png",
        },
        {
          id: 5,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/jonnfrancis/storage-management",
          position: "top-60 right-20",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/johnfrancis.jpg",
    },
    {
      id: 2,
      name: "graduant-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/johnfrancis-2.png",
    },
    {
      id: 3,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/johnfrancis-3.jpg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/johnfrancis.jpg",
      description: [
        "Hello! I’m John Francis, a software engineer / web developer from Kenya specializing in AI-powered web experiences for startups and growing businesses.",
        "I specialize in building AI-integrated backends paired with animated, high-performance frontends using tools like React, Next.js, GSAP, and Jaclang. ",
        "I focus on outcomes over hours: faster launches, smarter workflows, and products that feel premium while staying maintainable under the hood.",
        "Outside of dev work, you'll find me cycling, gaming, experimenting with AI product ideas, watching tech videos & anime or impulse-buying gadgets I absolutely convinced myself I needed 😅",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Prev Portfolio.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash1.png",
    },
    {
      id: 2,
      name: "Prev Portfolio.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

const SLIDE_CONFIG = {
  mobile_terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  mobile_contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  mobile_safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  mobile_txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  mobile_imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  mobile_photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  mobile_finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  mobile_resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG, SLIDE_CONFIG };