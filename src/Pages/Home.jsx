import { IoMdArrowRoundForward } from 'react-icons/io';
import './Home.css'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Popular from './Popular';
import { Map, Marker } from 'pigeon-maps';
import { Link } from 'react-router-dom';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [populars, setPopulars] = useState([]);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios.get('https://hotel-server-site.vercel.app/rooms?page=1&size=6', { withCredentials: true })
            .then(res => setPopulars(res.data))
        axios.get('https://hotel-server-site.vercel.app/reviews')
            .then(res => setReviews(res.data))
    }, [])
    const [hue, setHue] = useState(0);
    const color = `hsl(${hue % 360}deg 39% 70%)`;
    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email;
        if (email.value) {
            toast.success('Subscribed successfully');
            email.value = ''
        }
        else{
            toast.error('You may login first')
        }
    }
    return (
        <>
            <Helmet>
                <title>Hotel Link || Home</title>
            </Helmet>
            <div className="banner bg-[url(https://imageio.forbes.com/specials-images/imageserve/63fe2d74e3f606d11f07b7f7/terrace-on-lake/960x0.jpg?height=474&width=711&fit=bounds)] bg-cover py-52 bg-center relative -top-[4.04rem] z-10">
                <div className='relative z-30 text-center '>
                    <h2 className='text-5xl text-white font-semibold'>Welcome to Hotel Link</h2>
                    <p className='text-gray-500 my-4'>You are welcome to the best hotel services. <br /> We provide the best hotel services all over the world in your budget.</p>
                    <a href='#rooms' className='px-7 btn btn-outline text-white border-white rounded-full'>Explore more <IoMdArrowRoundForward className='text-white text-lg' /></a>
                </div>
            </div>
            <div id='rooms' className='mb-12 z-50 mx-auto lg:mx-6'>
                <h3 className='text-center text-3xl font-semibold mb-3'>Featured Rooms</h3>
                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-9 xl:gap-x-16 my-8'>
                    {
                        populars.slice(0, 6).map(popular => <Popular key={popular._id} popular={popular}></Popular>)
                    }
                </div>
                <div className='text-center'>
                    <Link to='/rooms' className='px-7 btn bg-gray-400 text-white'>Show more</Link>
                </div>
            </div>
            <div className='mb-12'>
                <h3 className='text-center text-3xl my-8 font-bold'>User Reviews</h3>
                <div className='border-2 mx-3 lg:mx-6 rounded-2xl p-4'>
                    {
                        reviews.slice(0, 12).map(review =>
                            <div key={review._id} className="chat chat-start mt-3">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        {review.photo ? <img className="bg-base-200 p-1" src={review.photo} alt="" /> : <IoPersonCircleSharp className="pr-2 text-5xl" />}
                                    </div>
                                </div>
                                <div className="chat chat-start">
                                    <div className="chat-header justify-between">
                                        {review.user}
                                        <time className="ml-7 text-sm opacity-50">Rating: {review.select}</time>
                                    </div>
                                </div>
                                <div className="chat-bubble">{review.text}</div>
                                <div className="chat-footer opacity-50">{review.date.slice(0, 10)}</div>
                            </div>)
                    }
                </div>
            </div>
            <div className='banner relative bg-[url(https://png.pngtree.com/thumb_back/fw800/background/20240424/pngtree-umbrella-and-chair-around-swimming-pool-in-hotel-resort-with-sunrise-image_15666127.jpg)] bg-center bg-cover py-16'>
                <div className='relative z-30 text-center text-white mx-auto'>
                    <h3 className='font-semibold text-2xl'>Subscribe our Newsletter</h3>
                    <p className='text-gray-400'>Subscribe to our newsletter to stay updated & know the <br /> upcomming offers, deals & updates.</p>
                    <form onSubmit={handleSubmit} className='mt-4'>
                        <div className='relative w-fit mx-auto'>
                            <input type="text" name='email' defaultValue={user?.email} className='w-96 rounded border bg-transparent py-[0.8rem] px-4 text-sm' placeholder='Your email address' required />
                            <button className='btn absolute top-0 right-0 rounded-r rounded-l-none'>Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <h3 className='text-center text-3xl my-8 font-bold'>Our location</h3>
                <div className='w-[97%] mx-auto rounded-2xl'>
                    <Map height={400} defaultCenter={[41.684509, -86.156206]} defaultZoom={11}>
                        <Marker
                            width={50}
                            anchor={[41.684509, -86.156206]}
                            color={color}
                            onClick={() => setHue(hue + 20)}
                        />
                    </Map>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Home;