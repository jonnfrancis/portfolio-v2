import dayjs from "dayjs"

import { navIcons, navLinks } from "#constants"
import useWindowStore from "#store/window"

const Navbar = () => {
    const { openWindow } = useWindowStore();
    return (
        <nav>
            <div>
                <img src="/images/logo.png" alt="Mac Logo" />
                <p className="font-bold">John's Portfolio</p>

                <ul>
                    {navLinks.map((item) => (
                        <li key={item.id} className="cursor-pointer hover:underline" onClick={() => openWindow(item.type)}>
                            <p>{item.name}</p>
                        </li>
                    )
                    )}
                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.map(({ id, img }) => (
                        <li key={id} className="cursor-pointer">
                            <img src={img} alt={`icon-${id}`} className="icon-hover" />
                        </li>
                    ))}
                </ul>

                <time>{dayjs().format("ddd MMM D h:mm A")}</time>
            </div>
        </nav>
    )
}

export default Navbar