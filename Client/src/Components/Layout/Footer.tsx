import { FaInstagram, FaFacebook, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa"
import { Link } from "react-router-dom"

const Footer = () => {

  const socialLinks = [

    {label: "instagram", icon: <FaInstagram />, URL : "#"},
    {label: "Facebook", icon: <FaFacebook />, URL : "https://web.facebook.com/profile.php?id=100074411341844"},
    {label: "linkedin", icon: <FaLinkedin />, URL : "www.linkedin.com/in/arnold-wanza-b51654330"},
    {label: "tiktok", icon: <FaTiktok />, URL : "https://www.tiktok.com/@its._arnold_"},
    {label: "twitter", icon: <FaTwitter />, URL : "https://x.com/Itsarnold001"},
    {label: "youtube", icon: <FaYoutube />, URL : "https://www.youtube.com/@_arnold._.001"},
  ]

  return (
    <div className='bottom-0 bg-gray-600 z-40 w-full'>
      <div className="flex flex-col sm:flex-row justify-center text-white">
        <div className="flex flex-col p-6">
          <h1 className="font-semibold mb-0.5">Useful links</h1>
          <Link to="/" className="text-sm hover:underline text-gray-300">Track your order</Link>
          <Link to="/" className="text-sm hover:underline text-gray-300">How to order</Link>
          <Link to="/" className="text-sm hover:underline text-gray-300">Pick-up stations</Link>
          <Link to="/" className="text-sm hover:underline text-gray-300">Black Friday</Link>
          <Link to="/" className="text-sm hover:underline text-gray-300">Report a product</Link>
          <Link to="/" className="text-sm hover:underline text-gray-300">Product Policies</Link>
          <Link to="/" className="text-sm hover:underline text-gray-300">Help center</Link>
          <Link to="/" className="text-sm hover:underline text-gray-300">Chat with us</Link>         
        </div>
        <div className="flex flex-col p-6">
          <h1 className="font-semibold mb-0.5">Make money with us</h1>
          <Link to="/" className="text-sm hover:underline text-gray-300">Advertise on us</Link>
          <Link to="/" className="text-sm hover:underline text-gray-300">Sell a product</Link>
          <Link to="/" className="text-sm hover:underline text-gray-300">Become an affiliate</Link>
          <Link to="/" className="text-sm hover:underline text-gray-300">Own shares</Link>
          <Link to="/" className="text-sm hover:underline text-gray-300">Real estate</Link>
        </div>
        <div className="flex flex-col p-6">
          <h1 className="font-semibold mb-0.5">About us</h1>
          <Link to="/" className="text-sm hover:underline text-gray-300">Privacy policy</Link>
          <Link to="/" className="text-sm hover:underline text-gray-300">Terms & conditions</Link>
          <Link to="/" className="text-sm hover:underline text-gray-300">Cookies policy</Link>
        </div>
      </div>
      <div>
        <div className="">
          <p className="font-semibold text-white m-2">JOIN US ON: </p>
          <div className="flex gap-3 text-white ml-7">
            {socialLinks.map((media) => (
              <a
                key={media.label}
                href={media.URL}
                className="mx-2 text-xl hover:text-blue-400 scale-110 transition-transform mt-4"
                target="__blank"
                rel="noreferrer"
              >
                {media.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-700 flex flex-col justify-center items-center p-3 mt-4">
        <p className="text-gray-300">Arnold Sellers| MALL</p>
        <span className="text-gray-300">Copyright 2026, All rights reserved.</span>
      </div>
    </div>
  )
}


export default Footer