import { Download } from "lucide-react"
import { Document, Page, pdfjs } from 'react-pdf';
import { WindowControls } from "#components"
import WindowWrapper from "#hoc/WindowWrapper"

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import useWindowStore from "#store/window";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  const { windows } = useWindowStore();

  const activeFileData = windows["resume"]?.data;

  const fileUrl = activeFileData?.path ? `/files/${activeFileData.path}` : "/files/resume.pdf";
  
  return (
    <>
        <div id="window-header">
            <WindowControls target="resume" />
            <h2>{activeFileData?.path || "Resume.pdf"}</h2>

            <a href={fileUrl} download className="cursor-pointer" title="Download Resume" >
                <Download className="icon" />
            </a>
        </div>  

        <Document file={fileUrl} >
            <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
        </Document>
    </>
  )
}

const ResumeWindow = WindowWrapper(Resume, "resume")

export default ResumeWindow