import { sidebarLinks } from '@/constants';
import { authContext } from '@/context/authContext';
import { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';

const LeftBar = () => {
  const { user, logout } = useContext(authContext);
  const location = useLocation();
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to={'/'} className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user?.imageUrl || '/assets/images/profile.svg'}
            alt="prodile"
            height={30}
            width={30}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.username}</p>
            <p className="small-regular text-light-3">
              {user?.bio || 'just do it'}
            </p>
          </div>
        </Link>
        <ul className="flex flex-col gap-10">
          {sidebarLinks.map((link, idx) => {
            const currentPath = location.pathname == link.route;
            return (
              <NavLink
                to={link.route}
                key={idx}
                className={`leftsidebar-link group flex items-center gap-4 py-3 px-4 ${
                  currentPath && 'bg-primary-500'
                }`}
              >
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className={`group-hover:invert-white`}
                />
                <span className="hover:text-light-2">{link.label}</span>
              </NavLink>
            );
          })}
        </ul>
        <Button
          variant={'ghost'}
          className="shad-button_ghost"
          onClick={logout}
        >
          <img
            src="/assets/icons/logout.svg"
            width={30}
            height={30}
            alt="logout"
          />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </div>
    </nav>
  );
};

export default LeftBar;
