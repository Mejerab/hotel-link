import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { Helmet } from "react-helmet";
// import moment from "moment";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useLoaderData } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";

const Aboutus = () => {
    const {user} = useContext(AuthContext);
    const messages = useLoaderData();
    const handleSubmit = () => {
        const message = document.getElementById('message').value;
        const container = document.getElementById('chat-container');
        const chat = document.createElement('div');
        chat.classList = `flex items-end justify-end mt-3 rounded-full ml-auto`;
        chat.innerHTML = `
            <div class="py-3 my-5 rounded-full px-6 relative -right-28 text-right bg-base-200 w-fit border">${message}</div>
            <div class="mt-5">
                <time class="text-xs opacity-50">${moment().fromNow()}</time>
            </div>
        `;
        if (message && user) {
            container.appendChild(chat);
            const nothing = { message, time: moment().fromNow() };
            axios.post('http://localhost:5000/messages', nothing, { withCredentials: true })
                .then(() => console.log('data'))
        }
        else{
            toast.error('Type a message first')
        }
    }
    return (
        <div className="xl:ml-6 mx-3 xl:mr-4 my-8">
            <Helmet>
            <title>Hotel Link || About Us</title>
        </Helmet>
            <h3 className="text-center text-3xl font-bold mt-12">About Us</h3>
            <div>
                <h4 className="text-2xl font-semibold mt-6">Unlock Luxury: Find Your Dream Stay with Our Exclusive Hotel Broker Services</h4>
                <p className="mt-2">Imagine a world where your perfect getaway is just a few clicks away. Whether it’s a romantic escape, a lavish staycation, or a business retreat with a touch of indulgence, our hotel broker services are designed to bring your travel dreams to life. Welcome to a world where luxury meets convenience, where your desires are anticipated, and your expectations are exceeded.</p>

                <h4 className="text-lg font-semibold mt-5">Why Settle for Ordinary When You Deserve Extraordinary?</h4>
                <p className=" mt-2">In the realm of travel, why choose from a limited selection when the world’s finest hotels can be curated just for you? We partner with the most exclusive properties across the globe, ensuring that every stay is not just a night away but an unforgettable experience. From the moment you connect with us, our team of dedicated experts works tirelessly to match you with a hotel that speaks to your soul, whether it’s the allure of a hidden boutique or the grandeur of a five-star palace.</p>

                <h4 className="text-xl font-semibold mt-5">Tailored Experiences That Speak Your Language</h4>
                <p className="mt-2">Your journey is as unique as you are. That’s why we don’t just book rooms; we craft experiences. Imagine arriving at your destination to find your favorite bottle of wine waiting for you, or stepping into a suite that’s been customized to reflect your personal style. With us, every detail is tailored to your preferences, making your stay more than just a break from routine it’s an immersion in luxury designed just for you.</p>

                <h4 className="text-xl font-semibold mt-5">Exclusive Perks You Won’t Find Anywhere Else</h4>
                <p className="mt-2">As our valued client, you’re not just booking a room; you’re gaining access to a world of exclusive privileges. Picture complimentary upgrades, late check-outs, spa treatments, and bespoke dining experiences—all at no extra cost. These are the touches that transform a good trip into an unforgettable one, and they’re all part of the exceptional service we offer.</p>

                <h4 className="text-xl font-semibold">Seamless, Stress-Free Booking</h4>
                <p className="mt-2">We know that planning a trip can be overwhelming, but with our streamlined process, it doesn’t have to be. Our user-friendly platform allows you to browse, compare, and book your dream stay effortlessly. And if you ever need assistance, our team is just a call or click away, ready to handle every aspect of your booking with the care and attention you deserve.</p>

                <h4 className="text-xl font-semibold mt-5">Your Next Adventure Awaits</h4>
                <p className="mt-2">Are you ready to unlock the door to unparalleled luxury? Let us be your key to discovering the most exquisite hotels in the world. Whether you’re planning a grand adventure or a quiet retreat, we’re here to ensure your stay is nothing short of perfection. Start your journey with us today and experience the art of travel like never before.</p>

                <p className="mt-2">Book Now and let us elevate your next stay to extraordinary heights. Because when it comes to your travels, you deserve nothing less than the best.</p>
            </div>
            <div className="rounded-2xl">
                <h3 className="text-center text-3xl my-6 font-semibold">Send Feedback</h3>
                <div id="chat-container" className="border-2 px-5 py-5 rounded-2xl">
                    {
                        messages.map(message =>
                            <div key={message._id} className="chat chat-start mt-3">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <IoPersonCircleSharp className="pr-2 text-5xl" />
                                    </div>
                                </div>
                                <div className="chat-bubble">{message.message}</div>
                            </div>)
                    }
                </div>
                <div className="mt-5 flex justify-end">
                    <div className="relative">
                        <input type="text" id="message" className="input py-[1.5rem] input-bordered  w-80" placeholder="Your message" />
                        <button onClick={handleSubmit} className="btn right-0 top-[0.07rem] bg-gray-400 rounded-r-lg rounded-none absolute text-white">Submit</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Aboutus;