import { DatePicker } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import moment from "moment";
import { Helmet } from "react-helmet";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);

    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get(`https://hotel-server-site.vercel.app/bookings?email=${user?.email}`, {withCredentials: true})
            .then(res => setBookings(res.data))
    }, [user]) 
    const handleChange = (_id) => {
        if (day && month && year) {
            axios.put(`https://hotel-server-site.vercel.app/bookings/${_id}`, { day, month, year })
                .then(() => {
                    // console.log(res.data)
                    toast.success('Date changed successfully')
                    window.location = window.location.href;
                })
        }
        else {
            toast.error('Change date in the box')
        }
    }
    const handleCancel = (id, room_id, day, month, year) => {
        // console.log(day, month, year);

        const today = moment().format('YYYY-M-D');
        // console.log(today, day, month);
        const date = `${year}-${month + 1}-${day - 1}`;
        // console.log(date);

        if (today === date) {
            Swal.fire({
                title: "Notice!",
                text: "Your cannot cancel booking one day before the date.",
                icon: "error",
                cancelButtonColor: "#d33",
                confirmButtonText: "Return"
            });
        }
        else {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.put(`https://hotel-server-site.vercel.app/rooms/${room_id}`, { availability: 'Available' }, { withCredentials: true })
                        .then(() => console.log('put done')
                        )
                    axios.delete(`https://hotel-server-site.vercel.app/bookings/${id}`, { withCredentials: true })
                        .then(() => {
                            console.log('Delete done')
                        })
                    const remaining = bookings.filter(book => book._id !== id);
                    setBookings(remaining);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        }
    }
    const onChange = (date) => {
        setDay(date.$D);
        setMonth(date.$M);
        setYear(date.$y);
    };
    const handleSubmit = room_id => {
        const select = document.getElementById('select').value;
        const text = document.getElementById('text').value;
        const nothing = { room_id, select, text, date: moment().toISOString(), user: user?.displayName || user?.email, photo: user?.photoURL };
        if (select !== 'Rating' && text !== '') {
            axios.post('https://hotel-server-site.vercel.app/reviews', nothing)
                .then(() => {
                    console.log('Review done')
                    toast.success('Review sent')
                })

        }
        else {
            toast.error('You need to give rating and write some text first');
        }
    }

    return (
        <div className="xl:ml-6 mx-auto xl:mr-4 my-8">
            <Helmet>
                <title>Hotel Link || My Bookings</title>
            </Helmet>
            <h3 className="text-center text-3xl font-bold mt-12">My Bookings</h3>
            <div className="grid gap-y-7 mt-5 min-h-44 lg:mx-3">
                {
                    bookings.map(booking =>
                        <div className= 'border rounded-2xl xl:mx-0 mx-auto lg:w-full lg:ml-0 w-[95%] lg:p-4 p-2 lg:flex items-center' key={booking._id}>
                            <div className='lg:w-1/3'>
                                <img className="w-full md:h-[210px] xl:rounded-none rounded-t-xl" src={booking.room_image} alt="" />
                            </div>
                            <div className= "lg:w-2/3 mx-auto w-full lg:ml-5 lg:mt-0 mt-5" >
                                <h4 className="text-2xl font-bold">{booking.hotel_name}</h4>
                                <p className="font-medium my-4">Price: ${booking.price_per_night}</p>
                                <p className="font-medium my-4">Country: {booking.country}</p>
                                <p className="font-medium my-4">Room Size: {booking.room_size}</p>
                                <div className='grid grid-cols-2 w-full gap-y-4'>
                                    <DatePicker className="input input-bordered px-7" onChange={onChange} />
                                    <button onClick={() => handleChange(booking._id)} className="btn mx-3 bg-gray-400 text-white px-7">Change Date</button>
                                    <button className="btn bg-white text-gray-400 border-gray-400" onClick={() => document.getElementById(booking.hotel_name).showModal()}>Rate the room</button>
                                    <dialog id={booking.hotel_name} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <div className="text-center mx-auto">
                                                <h3 className="text-xl font-semibold">Rate This Room</h3>
                                                <div className="my-6 mx-12">
                                                    <select defaultValue={null} id="select" className="select mb-4 select-bordered  w-full" required>
                                                        <option defaultValue={null} selected disabled>Rating</option>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                        <option value={4}>4</option>
                                                        <option value={5}>5</option>
                                                    </select>
                                                    <textarea id="text" className="textarea mb-4 textarea-bordered w-full" placeholder="Your Message" required></textarea>
                                                    <form method="dialog">
                                                        <button onClick={() => handleSubmit(booking.room_id)} className="btn bg-gray-400 text-white w-full">Add Review</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </dialog>
                                    <button onClick={() => handleCancel(booking._id, booking.room_id, booking.day, booking.month, booking.year)} className="btn mx-3 px-7 text-white bg-red-500">Cancel</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MyBookings;