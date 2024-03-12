import { bottombarLinks } from '@/constants';
import { Link, useLocation } from 'react-router-dom';

const BottomBar = () => {
  const location = useLocation();
  return (
    <nav className="bottom-bar w-full md:hidden">
      {bottombarLinks.map((link, idx) => {
        const currentPath = location.pathname == link.route;
        return (
          <Link
            to={link.route}
            key={idx}
            className={`leftsidebar-link group flex flex-col items-center p-2 rounded-full transition ${
              currentPath && 'bg-primary-500'
            }`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={15}
              height={15}
              className={`group-hover:invert-white`}
            />
            <span className="hover:text-light-2 text-xs">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomBar;
