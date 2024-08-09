import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { FaQuestion } from "react-icons/fa";
import { Map, Marker } from "pigeon-maps";
import { Helmet } from "react-helmet";

const Contactus = () => {
    const { user } = useContext(AuthContext);
    const handleSubmit = e => {
        e.preventDefault();
        const message = e.target.message;
        if (message.value) {
            Swal.fire({
                title: 'Success!',
                text: 'Press the button to continue',
                icon: 'success',
                confirmButtonText: 'Continue'
            })
            message.value = '';
        }
    }
    const [hue, setHue] = useState(0);
    const color = `hsl(${hue % 360}deg 39% 70%)`
    return (
        <div className="xl:ml-6 mx-3 xl:mr-4 my-8">
            <Helmet>
                <title>Hotel Link || Contact Us</title>
            </Helmet>
            <h3 className="text-center text-3xl font-bold mt-12">Contact Us</h3>
            <div className="hero bg-base-200 my-4 rounded-2xl py-5">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Send a message!</h1>
                        <p className="py-6">
                            We are providing our customers the best hotel rooms since we have started our jurney. It will be our pleasure to provide answer of your questions. Here you can send a message to us. We will try to reply within 7 days.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Name</span>
                                </label>
                                <input type="name" name="name" placeholder="name" className="input input-bordered" defaultValue={user?.displayName} required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <input type="email" defaultValue={user.email} name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Message</span>
                                </label>
                                <textarea name="message" placeholder="message" className="textarea textarea-bordered" required></textarea>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-gray-400 text-white">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <h3 className="text-center text-3xl my-7 font-bold">Frequently asked questions</h3>
                <div className="flex lg:flex-row flex-col gap-x-6">
                    <div className="w-full lg:w-1/2">
                        <div className="w-full h-full bg-gray-400 text-white rounded-2xl flex justify-center items-center text-center">
                            <FaQuestion className="text-[30rem] lg:py-0 py-3" />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="collapse collapse-plus mt-2 bg-base-200">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title text-xl font-medium">What is the process for booking a hotel through Hotel Link, and how do I know if my reservation is confirmed?</div>
                            <div className="collapse-content">
                                <p>Booking through Hotel Link is a straightforward process. First, search for hotels based on your desired location, dates, and preferences. Once you find a suitable option, you can view detailed information, including room types, rates, and amenities. After selecting your room, you will be prompted to enter your personal details and payment information. Once your payment is processed, you will receive a confirmation email with your booking details, including a unique confirmation number. You can also view your booking status in your account dashboard.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus mt-2 bg-base-200">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium">Are there any hidden fees or additional charges when booking through Hotel Link?</div>
                            <div className="collapse-content">
                                <p>We strive to provide transparent pricing. The rates you see on our website are inclusive of all standard fees. However, certain hotels might have additional charges, such as resort fees or taxes, which will be clearly disclosed before you finalize your booking. We aim to make sure that any potential extra costs are communicated upfront to avoid surprises. If you have any concerns about charges, please contact our support team for clarification.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus mt-2 bg-base-200">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium">What criteria do you use to select and list hotels on Hotel Link?</div>
                            <div className="collapse-content">
                                <p>We have a rigorous selection process to ensure that all hotels listed on our website meet high standards of quality and service. Our team evaluates hotels based on various factors including location, amenities, customer reviews, and overall reputation. We also consider feedback from previous guests to ensure that the hotels consistently provide a satisfactory experience. Regular inspections and audits are conducted to maintain our quality standards.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus mt-2 bg-base-200">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium">How can I modify or cancel my reservation if my plans change, and what are your policies regarding cancellations or changes?</div>
                            <div className="collapse-content">
                                <p>If you need to modify or cancel your reservation, you can do so through your account on our website or by contacting our customer support team. Our cancellation and modification policies vary depending on the hotel and the rate type you selected. Some rates are non-refundable and cannot be changed, while others offer more flexibility. Be sure to review the terms and conditions associated with your booking to understand the specific policies. If you need assistance, our support team is available to guide you through the process.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus mt-2 bg-base-200">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium">What should I do if I experience issues or problems with my hotel stay, and how can your service assist in resolving them</div>
                            <div className="collapse-content">
                                <p>If you encounter any issues during your stay, such as problems with the room or service, we recommend addressing them directly with the hotel staff as they can often resolve issues on the spot. If the problem persists or if you are unable to resolve it directly, please contact our customer support team as soon as possible. We will work with the hotel on your behalf to address your concerns and seek a resolution. Your satisfaction is important to us, and we are committed to ensuring that any issues are handled promptly and effectively.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <h3 className="text-center text-3xl my-7 font-bold">Our Location</h3>
                <div className='w-full mx-auto rounded-2xl'>
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
        </div>
    );
};

export default Contactus;