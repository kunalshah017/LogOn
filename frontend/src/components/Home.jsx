import { Link } from 'react-router-dom'
import NavBar from './NavBar'

const Home = () => {

    return (
        <>
            <NavBar />
            <div className='
                h-screen
                flex
                justify-center
                items-center
                bg-gradient-to-r
                from-green-400
                to-blue-500
                text-white
                text-3xl
                font-bold
                '>
                Home Page
            </div>
        </>
    )
}

export default Home