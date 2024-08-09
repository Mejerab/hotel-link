import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from "react-helmet";

const Rooms = () => {
    AOS.init()
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [condition, setCondition] = useState('mixed');
    const itemsPerPage = 6;
    useEffect(() => {
        axios(`http://localhost:5000/rooms?page=${currentPage}&size=${itemsPerPage}&condition=${condition}`, { withCredentials: true })
            .then(res => setRooms(res.data))
    }, [currentPage, condition])
    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNext = () => {
        if (currentPage < 3) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className="xl:ml-6 mx-3 xl:mr-4 my-8">
            <Helmet>
                <title>Hotel Link || Rooms</title>
            </Helmet>
            <h3 className="text-center text-3xl font-bold mt-12">Room Collection</h3>
            <div className="w-fit ml-auto mb-12">
                <details className="dropdown dropdown-end mr-1">
                    <summary tabIndex={0} role="button" onClick={() => setClicked(!clicked)} className="btn m-1 px-7 bg-gray-400 text-white">Filter <span>{
                        clicked ? <TiArrowSortedUp className="text-lg" /> :
                            <TiArrowSortedDown className="text-lg" />
                    }</span></summary>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><button onClick={() => setCondition('mixed')}>Mixed</button></li>
                        <li><button onClick={() => setCondition('inorder')}>Price Inorder</button></li>
                        <li><button onClick={() => setCondition('disorder')}>Price Disorder</button></li>
                    </ul>
                </details>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-9 mt-8 gap-x-16">
                {
                    rooms.map(room => <div data-aos="fade-up" key={room._id} className="card bg-base-100 xl:mx-- mx-auto w-96 h-[32rem] shadow-xl">
                        <figure>
                            <img className="w-full h-60"
                                src={room.room_image}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{room.hotel_name}</h2>
                            <p className="text-xl font-semibold">Price: ${room.price_per_night}</p>
                            <p className="text-gray-500">{room.room_description}</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => user ? navigate(`/details/${room._id}`) : document.getElementById('my_modal_4').showModal()} className="btn bg-gray-400 px-7 text-white">View Details</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div className="join flex justify-center mt-12">
                <button onClick={handlePrev} className="join-item btn"><FaArrowLeft /></button>
                <button onClick={() => setCurrentPage(0)} className={currentPage === 0 ? 'join-item btn btn-active' : 'join-item btn'}>1</button>
                <button onClick={() => setCurrentPage(1)} className={currentPage === 1 ? 'join-item btn btn-active' : 'join-item btn'}>2</button>
                <button onClick={() => setCurrentPage(2)} className={currentPage === 2 ? 'join-item btn btn-active' : 'join-item btn'}>3</button>
                <button onClick={() => setCurrentPage(3)} className={currentPage === 3 ? 'join-item btn btn-active' : 'join-item btn'}>4</button>
                <button onClick={handleNext} className="join-item btn"><FaArrowRight /></button>
            </div>
        </div>
    );
};

export default Rooms;