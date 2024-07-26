import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from "./routes/Home/home";
import About from "./routes/About/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookItem from "./routes/Book/book";
import SingleBook from "./routes/Book/singleBook"
import CreateBook from "./routes/Book/CreateBook";
import EditBook from "./routes/Book/editBook";
function App() {

  return (
    <div>
        <Router>
          <Header> </Header>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/books" element={<BookItem/>}></Route>
            <Route path="/books/:slug" element={<SingleBook/>}></Route>
            <Route path="/createbook" element={<CreateBook/>}></Route>
            <Route path="/editbook/:slug" element={<EditBook/>}></Route>
          </Routes>
          <Footer></Footer>
        </Router>
    </div>
  )
}

export default App
