import logoImg from '../assets/logo.png';

function Logo({ textColor = "text-black" }) {
  return (
      <button className="flex items-center gap-2">
        <img src={logoImg} alt="logo" className="w-8 h-auto" />
        <span className={`-ml-5 pt-2 font-u-extra text-2xl ${textColor}`}>
          ZapShift
        </span>
      </button>
  );
}

export default Logo;
