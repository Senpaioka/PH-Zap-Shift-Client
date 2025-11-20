import { FaArrowRight } from "react-icons/fa6";


function ButtonLink({ rounded = "rounded-md" }) {
  return (
     <div className="flex justify-center items-center">
        <button className={`btn w-full bg-primary text-base font-u-bold ${rounded}`}>Sign Up</button>
        <span className="bg-black px-3 py-2 rounded-full"><FaArrowRight className="-rotate-45 inline-block text-primary"></FaArrowRight></span>
     </div>
  );
}

export default ButtonLink;

