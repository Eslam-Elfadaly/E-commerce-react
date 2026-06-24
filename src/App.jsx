
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home  from './pages/Home'
import Shop from './pages/Shop'
import Blog from './pages/Blogs/Blog'
import Category from './pages/Category'
import CategoryProducts from './components/CategoryProducts'
import Favorite from './pages/Favorite'
import ProductPage from './pages/ProductPage'
import Lifestyle from './pages/Blogs/BlogElements/Lifestyle'
import SocialMedia from './pages/Blogs/BlogElements/SocialMedia'
import CompanyNews from './pages/Blogs/BlogElements/CompanyNews'
import Electronics from './pages/Blogs/BlogElements/Electronics'
import ScrollToTop from './components/ScrollToTop'
import SignUp from './pages/signPages/signUp'
import { Toaster } from 'sonner'
import Login from './pages/signPages/Login'

function App() {

return (
<>
<Toaster position='top-center' duration={2000}/>
<ScrollToTop/>
<Routes>
  <Route path='/' element={<MainLayout/>}>

  <Route path='signUp' element={<SignUp/>}/>
  <Route path='logIn' element={<Login/>}/>


  <Route index element={<Home/>}/>
  <Route path='shop' element={<Shop/>}/>

{/* blogPage */}
  <Route path='blog' element={<Blog/>}/>

  {/* blogs */}
  <Route path='blog/Lifestyle' element={<Lifestyle/>}/>
  <Route path='blog/SocialMedia' element={<SocialMedia/>}/>
  <Route path='blog/CompanyNews' element={<CompanyNews/>}/>
  <Route path='blog/Electronics' element={<Electronics/>}/>
  
  <Route path='favorite' element={<Favorite/>}/>
  <Route path='product/:id' element={<ProductPage/>}/>

  <Route path='category' element={<Category/>}>
  <Route path=':name' element={<CategoryProducts/>}/>
  </Route>

  </Route>
</Routes>
</>
  )
}

export default App
