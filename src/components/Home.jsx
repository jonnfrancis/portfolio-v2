import { locations } from '#constants'
import useLocationStore from '#store/location';
import useWindowStore from '#store/window';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { Draggable } from 'gsap/draggable';


const projects = locations.work?.children ?? [];

const Home = () => {
    const { setActiveLocation } = useLocationStore()
    const { openWindow } = useWindowStore();

    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project);
        openWindow("finder");
    } 

    useGSAP(() => {
        Draggable.create(".folder")
    }, [])
  return (
    <section id="home">
        <ul>
            {projects.map((project) => (
                <li key={project.id} onClick={() => handleOpenProjectFinder(project)} className={clsx("group folder", project.windowPosition)}>
                    <img src={project.icon} alt={project.name} />
                    <p>{project.name}</p>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default Home