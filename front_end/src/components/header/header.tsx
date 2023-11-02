const rounded = {
    borderRadius: '25px',
  };
  
import { Link } from 'react-router-dom';
  import logo from '../img/logo.jpg';
const HeaderWebsite = () => {
    return  <div> <div className="menu flex items-center justify-between">
    <div className='flex'>
      <a href="/"><img style={rounded} src={logo} alt="logo" width="100px" /></a>

      <nav className='font-semibold p-4 pt-6 pl-18'>
        <ul className='flex text-[#2D4271] gap-12'>
          <a href="/">PolyTour</a>
          <a href="/tour">Tour</a>
          <a href="/news">Tin tức</a>
          <a href="">Khuyến mãi</a>
          <a href="/contact">Liên hệ</a>
        </ul>
      </nav>
    </div>
    <div className="search flex items-center">
      <input type="text" placeholder="Search..." className="border-yellow-300
border-[3px] px-2 py-2  rounded" />
      <button className="bg-blue-500 text-white py-2 px-3 rounded ml-2">Search</button>


      <div className="ml-2">
        <Link to="/signup">
          <button className="bg-green-500 text-white py-1 px-3 rounded">
            <i className="fas fa-user"></i>
          </button>
        </Link>
      </div>

    </div>
  </div>
  </div> 
};

export default HeaderWebsite;
