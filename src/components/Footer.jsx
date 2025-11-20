import Logo from "./Logo";

// icons
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";



function Footer() {


  return (
     <div className="w-11/12 mx-auto bg-black rounded-xl">
        <div className="footer footer-horizontal footer-center p-20">
            <Logo textColor="text-white"></Logo>
            <p className="text-white text-base sm:px-30">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            
            <span className="block w-full border-b-2 border-dashed border-gray-500"></span>

            <nav className="grid grid-flow-row sm:grid-flow-col gap-4 text-white">
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>

            <span className="block w-full border-b-2 border-dashed border-gray-500"></span>

            <nav>
                <div className="grid grid-flow-col gap-4">
                <a href="#">
                    <FaLinkedin className="text-[#0077B5] text-3xl"></FaLinkedin>
                </a>
                <a href="#">
                    <FaSquareXTwitter className="text-white text-3xl"></FaSquareXTwitter>
                </a>
                <a href="#">
                    <FaSquareFacebook className="text-[#1877F2] text-3xl"></FaSquareFacebook>
                </a>
                <a href="#">
                    <FaYoutube className="text-[#FF0000] text-3xl"></FaYoutube>
                </a>
                </div>
            </nav>

        </div>
     </div>
  );
}

export default Footer;

