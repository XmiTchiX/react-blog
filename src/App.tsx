import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, ResetPassword, Login, Register, Profile, MyPosts, CreatePost, NotFound, ShowPost } from './pages';
import { Header } from './components';
import { AuthProvider } from './AuthContext';
import { GuestMiddleware, AuthMiddleware} from './middlewares';


const pages = {
  Home : { url: "/", name:"Home", page: <Home/> },
  ResestPassword : { url: "/resetpassword", name:"ResetPassword", page: <ResetPassword/>},
  Login : { url: "/login", name:"Login", page: <Login/>},
  Register : { url: "/register", name:"Register", page: <Register/>},
  Profile : { url: "/profile", name:"Profile", page: <Profile/>},
  MyPosts : { url: "/posts/mine", name:"My posts", page: <MyPosts/>},
  CreatePost : { url: "/posts/create", name:"Create Post", page: <CreatePost/>},
  ShowPost : { url: "/posts/", name:"Show post", page: <ShowPost/>},
  NotFound : { url: "*", name:"Not found", page: <NotFound/>}
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='min-h-screen flex flex-col text-mainBlack font-normal '>
          <Header />
          <main className='grow relative'>
            <Routes>
              <Route path={ pages.Home.url } element={ pages.Home.page } />
              <Route path={ pages.ShowPost.url+":id" } element={ pages.ShowPost.page } />
              <Route element={ <GuestMiddleware/> }>
                <Route path={ pages.Login.url } element={ pages.Login.page } />
                <Route path={ pages.Register.url } element={ pages.Register.page } />
                <Route path={ pages.ResestPassword.url } element={ pages.ResestPassword.page } />
              </Route>
              <Route element={ <AuthMiddleware/> }>
                <Route path={ pages.Profile.url } element={ pages.Profile.page } />
                <Route path={ pages.MyPosts.url } element={ pages.MyPosts.page } />
                <Route path={ pages.CreatePost.url } element={ pages.CreatePost.page } />
              </Route>
              <Route path={ pages.NotFound.url } element={ pages.NotFound.page } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
export {pages} ;
