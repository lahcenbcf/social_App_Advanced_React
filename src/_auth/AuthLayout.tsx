import {Outlet,Navigate} from "react-router-dom"


const AuthLayout = () => {
  const isAuthenticated=false
  return (
    <div>
      {isAuthenticated ? <Navigate to={"/"} />
      :
      <div className="w-full flex">
      
      <section className="flex flex-1 justify-center items-center py-10 px-8">
        <Outlet />
      </section>

      <img
      src="/assets/images/side-img.svg"
      alt="logo"
      className="hidden xl:block h-screen w-1/2 object-cover"
      />
      </div>
       }
    </div>
  )
}

export default AuthLayout
