import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { DatePicker } from "antd";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaPlay } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Helmet } from "react-helmet";
const Detail = () => {
    const detail = useLoaderData();
    const { user } = useContext(AuthContext);
    const [overAll, setOverAll] = useState(0);
    const [on, setOn] = useState(false);
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const { _id, hotel_name, country, room_size, room_description, room_image, special_offers, price_per_night, availability } = detail;

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios.get(`https://hotel-server-site.vercel.app/reviews`)
            .then(res => setReviews(res.data))
    }, [])
    const real = reviews.filter(review => review.room_id === _id);
    let rating = 0;
    for (const rate of real) {
        rating = rating + parseInt(rate.select);
    }
    rating = rating / real.length;
    useEffect(() => {
        setOverAll(rating)
    }, [rating])

    const [able, setAble] = useState({ availability });
    const aDetail = { room_id: _id, day, month, year, hotel_name, room_image, price_per_night, country, room_size, email: user.email, availability };
    const handleBook = () => {
        if (day && month && year) {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to book this room!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, book it!"
            }).then((result) => {
                const nothing = { availability: 'Unavailable' };
                if (result.isConfirmed) {
                    axios.put(`https://hotel-server-site.vercel.app/rooms/${_id}`, nothing, { withCredentials: true })
                        .then(() => {
                            console.log('done')
                            setAble(nothing);
                        }
                        )
                    axios.post('https://hotel-server-site.vercel.app/bookings', aDetail, { withCredentials: true })
                        .then(() => console.log('done')
                        );
                    Swal.fire({
                        title: "Booked!",
                        text: "Your room booked successfully.",
                        icon: "success"
                    });
                }
            });
        }
        else {
            toast.error('Set a date to book.')
        }
    }
    const onChange = (date) => {
        // console.log(date, dateString);
        setDay(date.$D)
        setMonth(date.$M)
        setYear(date.$y)
    };
    return (
        <>
        <Helmet>
            <title>Hotel Link || Details</title>
        </Helmet>
            <div className="border-2 m-3 xl:m-5 rounded-2xl flex xl:flex-row flex-col items-center">
                <div className="w-full xl:w-1/2">
                    <img src={room_image} className="w-full xl:h-[500px] sm:rounded-t-2xl xl:rounded-l-2xl" alt="" />
                </div>
                <div className="w-full xl:my-0 my-12 xl:w-1/2 ml-5">
                    <h4 className="text-3xl font-bold  mb-4">{hotel_name}</h4>
                    {
                        room_description.length > 60 ? <p className="text-gray-400 font-medium">{room_description.slice(0, 60)}<br />{room_description.slice(60, 500)}</p> : <p className="text-gray-400 font-medium">{room_description}</p>
                    }
                    <p className="text-lg font-semibold my-4">Country: {country}</p>
                    <p className="text-lg font-semibold my-4">Price: ${price_per_night}</p>
                    <p className="text-lg font-semibold my-4">Room Size: {room_size}</p>
                    <p className="text-lg font-semibold my-4">Availability: {able.availability}</p>
                    <p className="text-lg font-semibold">Special Offers:</p>
                    <ul className="list-disc ml-36">
                        {special_offers.map((off, idx) => <li className="font-medium" key={idx}>{off}</li>)}
                    </ul>
                    <div className="flex justify-end mr-12 mt-7">
                        <DatePicker className="input input-bordered px-7 mr-5" onChange={onChange} />
                        {able.availability !== 'Available' ? <button className="btn text-white bg-gray-400 px-7" disabled>Book Now</button> :
                            <button onClick={handleBook} className="btn text-white bg-gray-400 px-7">Book Now</button>}
                    </div>
                </div>
            </div>
            <div className="m-5 border-2 p-5 rounded-2xl">
                <div className="flex justify-between mx-3">
                    <button onClick={() => setOn(!on)} className="text-3xl text-gray-400 font-semibold flex items-center"><FaPlay className={on ? 'rotate-90 transition-transform' : 'rotate-0 transition-transform'} /> Reviews</button>
                    <span className="text-3xl text-gray-400 font-semibold flex items-center">Overall Rating: {overAll>0 ? overAll.toString().slice(0, 3) : 'No rating'}</span>
                </div>
                <div className={on ? 'block' : 'hidden'}>
                    <div id="container" className="w-full flex flex-col">
                        {
                            real.length === 0 ? <div className="flex my-5 justify-center items-center text-red-500">No Reviews Added.</div> :
                                real.map(realOne =>
                                    <div key={realOne._id} className="chat chat-start mt-3">
                                        <div className="chat-image avatar">
                                            <div className="w-10 rounded-full">
                                                {realOne.photo ? <img className="bg-base-200 p-1" src={realOne.photo} alt="" /> : <IoPersonCircleSharp className="pr-2 text-5xl" />}
                                            </div>
                                        </div>
                                        <div className="chat chat-start">
                                            <div className="chat-header justify-between">
                                                {realOne.user}
                                                <time className="ml-7 text-sm opacity-50">Rating: {realOne.select}</time>
                                            </div>
                                        </div>
                                        <div className="chat-bubble">{realOne.text}</div>
                                        <div className="chat-footer opacity-50">{realOne.date.slice(0, 10)}</div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default Detail;