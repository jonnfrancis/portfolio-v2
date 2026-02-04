import dayjs from "dayjs"

import { navIcons, navLinks } from "#constants"

const Navbar = () => {
    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="Mac Logo" />
                <p className="font-bold">John's Portfolio</p>

                <ul>
                    {navLinks.map((item) => (
                        <li key={item.id} className="cursor-pointer hover:underline">
                            {item.name}
                        </li>
                    )
                    )}
                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.map(({ id, img }) => (
                        <li key={id} className="cursor-pointer">
                            <img src={img} alt={`icon-${id}`} />
                        </li>
                    ))}
                </ul>

                <time>{dayjs().format("ddd MMM D h:mm A")}</time>
            </div>
        </nav>
    )
}

export default Navbar