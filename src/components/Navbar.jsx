import {Link, NavLink} from 'react-router';
import {useAuth} from '../hooks/useAuth';
import Logo from './Logo';
import ButtonLink from './ButtonLink';
import Spinner from '../components/Spinner';
import defaultPic from '../assets/icons/dp.jpg';



function Navbar() {

    const {user, logoutUser} = useAuth();

    const menuLink = (
        <>
            <li><a>Services</a></li>
            <li><NavLink to='/coverage'>Coverage</NavLink></li>
            <li><a>About Us</a></li>
            <li><a>Pricing</a></li>
            <li><a>Blog</a></li>
            <li><a>Contact</a></li>
        </>
    )

    return (

        <div className="navbar w-11/12 mx-auto flex-col sm:flex-row rounded-xl bg-white shadow-sm">

            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-u-med">
                    {menuLink}
                </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl"><Logo></Logo></Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-u-med text-base">
                    {menuLink}
                </ul>
            </div>


            <div className="navbar-end justify-center sm:justify-end space-x-7 mr-5 sm:mr-7">

                 {
                    user ? (
                        <>
                        {/* user logged in  */}
                            <div className="dropdown dropdown-end">
                                <div className='flex justify-center items-center'>
                                    <div className='mr-3'>
                                        <p className='text-base font-u-bold'>{user.displayName}</p>
                                    </div>
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-12 h-auto rounded-full">
                                            <img className="w-full h-auto" src={user?.photoURL || defaultPic} alt={user?.displayName || 'Default Profile Pic'} />
                                        </div>
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li onClick={logoutUser} className='bg-error'><a>Logout</a></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/auth" className="btn rounded-md font-u-bold text-base">Sign In</Link>
                            <Link to="/auth/register" className=""><ButtonLink></ButtonLink></Link>
                        </>
                    )
                 }

                
            </div>
    </div>
    );
}

export default Navbar;

