import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/page"
import MainLayout from "./Layout/MainLayout"
import OtherLayout from "./Layout/OtherLayout"
import Login from "./pages/Login/page"
import SignUp from "./pages/SignUp/page"
import Profile from "./pages/profile/page"
import BlogList from "./pages/BlogList/page"
import Contact from "./pages/Contact/page"
import DashboardProfile from "./components/Profile/DashboardProfile"
import Favourites from "./components/Profile/Favourites"
import LikedBlogs from "./components/Profile/LikedBlogs"
import Description from "./pages/Description/Description"
import Categories from "./pages/Categories/Categories"
import AdminLogin from "./pages/AdminLogin/AdminLogin"
import AdminDashboard from "./pages/Admin/page"
import Dashboard from "./components/AdminComponents/Dashboard/Dashboard"
import AddBlog from "./components/AdminComponents/AddBlog/AddBlog"
import EditBlog from "./components/AdminComponents/ManageBlogs/ManageBlogs"
import UpdateBlog from "./components/AdminComponents/ManageBlogs/Update/UpdateBlog"
import ManageAccount from "./components/Profile/ManageAccount"
import Help from "./components/Profile/Help"
import { ToastContainer } from "react-toastify";
import { useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "./store/auth.js"
import ProtectedRoute from "./secure/ProtectedRoute.jsx"


function App() {

  const backendLink = useSelector((state)=>state.prod.link);
  const dispatch = useDispatch()


  useEffect(() => {
    const checkCookie = async () => {
      try {
        const response = await axios.get(`${backendLink}/api/user/cookie`, {
          withCredentials: true
        });

        if (response.data.message === true) {
          dispatch(authActions.login());
        } else {
          dispatch(authActions.logout());
        }
      } catch (error) {
        dispatch(authActions.logout());
      }
    };

    checkCookie();
  }, [backendLink]);

  return (
    <div>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="/blogs" element={<BlogList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/description/:id" element={<Description />}/>
          <Route path="/categories/:id" element={<Categories />}/>

          <Route path="/profile" element={<ProtectedRoute>
            <Profile />
          </ProtectedRoute> }>
            <Route index element={<DashboardProfile />} />
            <Route path="/profile/favourites" element={<Favourites />} />
            <Route path="/profile/liked-blogs" element={<LikedBlogs />} />
            <Route path="manage-account" element={<ManageAccount />} />
            <Route path="help-section" element={<Help />} />
          </Route>

        </Route>
        
        <Route element={<OtherLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/adminLogin" element={<AdminLogin  />} />

          <Route path="/admin-dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute> }>
            <Route index element={<Dashboard />} />
            <Route path="add-blog" element={<AddBlog />}/>
            <Route path="manage-blog" element={<EditBlog />} />
            <Route path="update-blog/:id" element={<UpdateBlog />}
            />
          </Route>

        </Route>
      </Routes>
    </div>
  )
}

export default App
