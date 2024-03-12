import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { authContext } from '@/context/authContext';
import { useContext } from 'react';
const TopBar = () => {
  const { logout, user } = useContext(authContext);
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to={'/'} className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex items-center gap-4">
          <Button
            variant={'ghost'}
            className="shad-button_ghost"
            onClick={logout}
          >
            <img src="/assets/icons/logout.svg" width={20} height={20} />
          </Button>
          <Link to={`/profile/${user?.id}`}>
            <img
              alt="profile-pic"
              src="/assets/images/profile.png"
              width={20}
              height={20}
              className="rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
