import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Pages/Home.jsx'
import { Protected, Login } from './components/index'

import Signup from './components/Pages/Signup.jsx'
import AllPosts from './components/Pages/AllPosts.jsx'
import AddPost from './components/Pages/AddPost.jsx'
import EditPost from './components/Pages/EditPost.jsx'
import Post from './components/Pages/Post.jsx'
import TermsConditions from './components/Pages/TermsConditions.jsx'
import PrivacyPolicy from './components/Pages/PrivacyPolicy.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signup",
        element: (
          <Protected authatication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "login",
        element: (
          <Protected authatication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication>
            {" "}
            <AllPosts />
          </Protected>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            {" "}
            <AddPost />
          </Protected>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            {" "}
            <EditPost />
          </Protected>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <Protected authatication>
            <Post />
          </Protected>
        ),
      },
      {
        path: "/terms-conditions",
        element: (
          <TermsConditions />
        ),
      },
      {
        path: "/privacy-policy",
        element: (
          <PrivacyPolicy />
        ),
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)