import "./globals.css"
import {Route,Routes} from "react-router-dom"
import LoginForm from "./_auth/forms/SignInForm"
import RegisterForm from "./_auth/forms/SignUpForm"
import {Home,Explore,CreatePost,UpdatePost,PostDetails,Saved,Profile,Users,UpdateProfile} from "@/_root/pages/index"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"



const App = () => {
  return (
   <main>
        <Routes>
            {/* public routes */}
                <Route element={<AuthLayout />} >
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} /> 
                </Route>
           {/* private routes */}
           <Route element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route element={<Explore />} path="/explore" />
                <Route element={<Saved />} path="/saved" />
                <Route element={<Users />} path="/all-users" />
                <Route element={<UpdatePost />} path="/update-post/:id" />
                <Route element={<PostDetails />} path="/posts/:id" />
                <Route element={<CreatePost />} path="/create-post" />
                <Route element={<Profile />} path="/profile/:id" />
                <Route element={<UpdateProfile />} path="/update-profile/:id" />
            </Route>
        </Routes>
   </main>
  )
}

export default App
