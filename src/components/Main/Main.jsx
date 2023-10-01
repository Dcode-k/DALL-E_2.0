import { Route, Routes } from 'react-router-dom';
// import styles from './Main.module.css'
import Home from '../Home/Home';
import CreatePost from '../CreatePost/CreatePost';

const Main=()=>{
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/create-post" element={<CreatePost/>}/>
        </Routes>
    )
}

export default Main;