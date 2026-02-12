import React, { useRef, useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import { WindowControls } from '#components'
import { SlideWrapper } from '#hoc'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import useSlideStore from '#store/slide'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

const MobileResume = () => {
  const containerRef = useRef(null)
  const [pageWidth, setPageWidth] = useState(0)
  const { slides } = useSlideStore()

  const activeFileData = slides["mobile_resume"]?.data;
  
  const fileUrl = activeFileData?.path ? `/files/${activeFileData.path}` : "/files/resume.pdf";

  useEffect(() => {
    const el = containerRef.current
    
    const update = () => {
      if (!el) return
      // subtract some padding to avoid overflow
      const w = Math.max(320, el.clientWidth - 8)
      setPageWidth(w)
    }

    update()

    let ro
    try {
      ro = new ResizeObserver(update)
      if (el) ro.observe(el)
    } catch (e) {
      // ResizeObserver not supported; fall back to window resize
      console.error('ResizeObserver not supported, falling back to window resize:', e)  
      window.addEventListener('resize', update)
    }

    return () => {
      try {
        if (ro && el) ro.unobserve(el)
      } catch (e) {
        console.error('Cleanup failed:', e)
      }
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="w-full overflow-auto">
      <div id="window-header" className="flex items-center justify-between px-4 py-3 bg-white/50">
        <WindowControls target={'mobile_resume'} storeType="slide" />
        <h2 className="text-base">{activeFileData?.path || "Resume.pdf"}</h2>
        <a href={fileUrl} download className="cursor-pointer">
          <Download className="icon" />
        </a>
      </div>

      <div ref={containerRef}>
        <Document file={fileUrl}>
          {/* Pass measured width to Page so it scales for mobile */}
          <Page pageNumber={1} renderTextLayer renderAnnotationLayer width={pageWidth || undefined} />
        </Document>
      </div>
    </div>
  )
}

const MobileResumeWindow = SlideWrapper(MobileResume, 'mobile_resume')

export default MobileResumeWindow
