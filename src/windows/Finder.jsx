import { WindowControls } from '#components'
import { locations } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import useLocationStore from '#store/location'
import useWindowStore from '#store/window'
import clsx from 'clsx'
import { Search } from 'lucide-react'
import React from 'react'

const Finder = () => {
    const { openWindow } = useWindowStore()
    const { activeLocation, setActiveLocation } = useLocationStore();

    const renderList = (name, items) => (
        <div>
            <h3>{name}</h3>
            <ul>
                {items.map((item) => (
                    <li key={item.id} className={clsx(item.id === activeLocation.id ? 'active' : 'not-active')} onClick={() => setActiveLocation(item)}>
                        <img src={item.icon} className='w-4' alt={item.name} />
                        <p className="text-sm truncate font-medium">{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

    const openItem = (item) => {
        if (item.fileType === 'pdf') return openWindow("resume", {
            path: item.name
        })
        if (item.kind === "folder") return setActiveLocation(item)
        if (['fig', 'url'].includes(item.fileType) && item.href)
            return window.open(item.href, '_blank')

        openWindow(`${item.fileType}${item.kind}`, item)
    }
    
    return (
        <>
            <div id="window-header">
                <WindowControls target="finder" />
                <Search className='icon' />
            </div>

            <div className="bg-white flex h-full">
                <div className="sidebar">
                    {renderList("Favorites", Object.values(locations))}
                    {renderList("Work", locations.work.children)}
                    {renderList("Education", locations.education.children)}
                </div> 
                <ul className="content">
                    {activeLocation.children.map((item) => (
                        <li key={item.id} className={item.position} onClick={() => openItem(item)}>
                            <img src={item.icon} alt={item.name} /> 
                            <p className="text-sm truncate font-medium">{item.name}</p>
                        </li>
                    ))}
                </ul>    
            </div>
        </>
    )
}

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;