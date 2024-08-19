import { useContext } from "react";
import { FaHotel } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
    const navigate = useNavigate();
    const { createUser, updateUser, login, user, logOut, googleLogin } = useContext(AuthContext);
    const links = <>
        <li className="font-medium"><NavLink to='/'>Home</NavLink></li>
        <li className="font-medium"><NavLink to='/rooms'>Rooms</NavLink></li>
        <li className="font-medium"><NavLink to='/aboutus'>About Us</NavLink></li>
        <li className="font-medium"><NavLink to='/contactus'>Contact Us</NavLink></li>
        <li className="font-medium"><button onClick={() => user ? navigate('/mybookings') : document.getElementById('my_modal_4').showModal()}>My Bookings</button></li>
    </>;
    const handleSignup = e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const photo = document.getElementById('photo').value;
        const email = document.getElementById('emaill').value;
        const password = document.getElementById('passwordd').value;
        createUser(email, password)
            .then(() => {
                // console.log(result.user)
                updateUser(name, photo)
                    .then(() => {
                        console.log('Updated successfully')
                        Swal.fire({
                            title: 'Success',
                            text: 'Press the button to continue',
                            icon: 'success',
                            confirmButtonText: 'Continue'
                        })
                        window.location = window.location.href;
                    })
                    .catch(error => {
                        console.error(error)
                    })
            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    title: 'error',
                    text: 'We faced some error',
                    icon: 'error',
                    confirmButtonText: 'Try again'
                })
            })
    }
    const handleLogin = e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password)
            .then(() => {
                // console.log(result.user)
                Swal.fire({
                    title: 'Success',
                    text: 'Press the button to continue',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                })
            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    title: 'error',
                    text: 'We faced some error',
                    icon: 'error',
                    confirmButtonText: 'Try again'
                })
            })
    }
    const handleGoogle = () => {
        googleLogin()
            .then(() => {
                Swal.fire({
                    title: 'Success',
                    text: 'Press the button to continue',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                })
            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    title: 'error',
                    text: 'We faced some error',
                    icon: 'error',
                    confirmButtonText: 'Try again'
                })
            })
    }
    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log('Logout successfully')
                navigate('/')
            })
            .catch(error => console.error(error))
    }
    return (
        <div className="navbar bg-[#00000044] w-full px-0 lg:px-5 relative top-0 z-30 border-b text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
                        {links}
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link to='/' className="btn btn-ghost text-xl"><FaHotel className="text-xl" />Hotel Link</Link>
            </div>
            <div className="navbar-end">

                {user ?
                    <div className="dropdown -mt-1 dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li className="my-3 text-lg font-semibold text-center">{user.displayName}</li>
                            <li><button onClick={handleLogout} className="btn">Logout</button></li>
                        </ul>
                    </div> :
                    <div className="flex">
                        <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn btn-ghost  ml-4btn-circle">Register</button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box text-black">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-center text-2xl">Register</h3>
                                <form className="text-center my-8">
                                    <div className="grid grid-cols-4 gap-y-4 items-center">
                                        <span className="font-medium col-span-1">Name: </span>
                                        <input type="name" id="name" placeholder="Your name" className="input col-span-3 input-bordered" required />
                                        <span className="font-medium col-span-1">Photo: </span>
                                        <input type="name" id="photo" placeholder="Your photo URL" className="input col-span-3 input-bordered" required />
                                        <span className="font-medium col-span-1">Email: </span>
                                        <input type="email" id="emaill" placeholder="Your email" className="input col-span-3 input-bordered" required />
                                        <span className="font-medium">Password: </span>
                                        <input type="password" id="passwordd" placeholder="Your password" className="input col-span-3 input-bordered" required />
                                        <input type="submit" onClick={handleSignup} className="btn bg-gray-400 col-span-4 text-white" value="Register" />
                                    </div>
                                </form>
                            </div>
                        </dialog>

                        <button onClick={() => document.getElementById('my_modal_4').showModal()} className="btn btn-ghost  ml-4btn-circle">Login</button>
                        <dialog id="my_modal_4" className="modal">
                            <div className="modal-box text-black">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-center text-2xl">Login</h3>
                                <form className="text-center my-8">
                                    <div className="grid grid-cols-4 gap-y-4 items-center">
                                        <span className="font-medium col-span-1">Email: </span>
                                        <input type="email" id="email" placeholder="Your email" className="input col-span-3 input-bordered" required />
                                        <span className="font-medium">Password: </span>
                                        <input type="password" id="password" placeholder="Your password" className="input col-span-3 input-bordered" required />
                                        <input type="submit" onClick={handleLogin} className="btn bg-gray-400 col-span-4 text-white" value="Login" />
                                    </div>
                                </form>
                                <div className="flex justify-center items-center -mt-3 mb-3">
                                    <div className="bg-gray-500 w-[50px] h-[1px]"></div>
                                    <div className="text-lg font-semibold mx-2">Or</div>
                                    <div className="bg-gray-500 w-[50px] h-[1px]"></div>
                                </div>
                                <div className="mx">
                                    <button onClick={handleGoogle} className="btn relative rounded-full w-full"><FcGoogle className="text-3xl absolute top-2 left-2" /> Continue with Google</button>
                                </div>
                            </div>
                        </dialog>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;