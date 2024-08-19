import { FaHotel } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer className="footer bg-gray-400 text-white p-5 lg:p-10 mt-12 lg:flex justify-between">
                    <aside className="">
                        <div>
                            <h3 className="btn flex -ml-4 text-white btn-ghost hover:bg-transparent text-2xl"><FaHotel className="text-2xl inline" />Hotel Link</h3>
                        </div>
                        <p className="">
                            Hotel Link Ltd.
                            <br />
                            Providing reliable service since 1992
                        </p>
                    </aside>
                    <nav className="flex flex-col lg:mt-0 mt-4">
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav className="flex flex-col">
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav className="flex flex-col">
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
            </footer>
            <footer className="text-white bg-gray-400 border-t py-3">
                <p className="text-center">&copy;: All rights reserved by Mr.Omi</p>
            </footer>
        </>
    );
};

export default Footer;