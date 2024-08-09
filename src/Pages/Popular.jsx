import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../provider/AuthProvider';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Popular = ({ popular }) => {
    AOS.init();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { _id, hotel_name, price_per_night, room_description, room_image } = popular;
    return (
        <div data-aos="fade-up" className="card xl:mx-0 mx-auto bg-base-100 w-96 h-[32rem] shadow-xl">
            <figure>
                <img className="w-full h-60"
                    src={room_image}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{hotel_name}</h2>
                <p className="text-xl font-semibold">Price: {price_per_night}</p>
                <p className="text-gray-500">{room_description}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => user ? navigate(`/details/${_id}`) : document.getElementById('my_modal_4').showModal()} className="btn bg-gray-400 px-7 text-white">View Details</button>
                </div>
            </div>
        </div>
    );
};

Popular.propTypes = {
    popular: PropTypes.object
}
export default Popular;