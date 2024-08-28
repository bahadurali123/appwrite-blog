import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import authService from "../appwrite/auth.service";
import { login, logout } from "./store/authslice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";
import dbservice from "../appwrite/dbconfig.service";
import { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } from "./store/postslice"

function App() {
  const [loding, setLoding] = useState(true);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.posts);

  useEffect(() => {
    // useEffect for Auth Service
    authService.getCurrentUser()
      .then((userData) => {
        // console.log("CUser: ", userData);
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoding(false));

    // useEffect for Posts Service
    if (status === "idle") {
      const featchPosts = async () => {
        dispatch(fetchPostsStart());
        try {
          const response = await dbservice.getPosts()
          if (response) {
            // console.log("Posts Response is: ", response);
            dispatch(fetchPostsSuccess({ postsData: response.documents }));
          }
        } catch (error) {
          dispatch(fetchPostsFailure({ error: error.toString() }));
        }

      }

      featchPosts()
    }
  }, [])

  return !loding ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
