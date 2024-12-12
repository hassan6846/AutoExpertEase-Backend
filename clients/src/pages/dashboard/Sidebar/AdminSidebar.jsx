import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiUpload, BiLogOutCircle } from 'react-icons/bi';
import { BsBox2, BsFillMapFill,BsListTask,BsBookmarkCheck} from 'react-icons/bs';
import { BiSolidUser,BiCar, BiAddToQueue,} from 'react-icons/bi';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { FaHandsHelping } from 'react-icons/fa';
import { defaultUserImg } from '../../../constants/ImageConstants';
import './AdminSidebar.css';

const sidebarItems = [

  {
    title: 'Stats',
    icon: <BsFillMapFill />,
    link: '/stats',
  },


  {
    title: 'All Products',
    icon: <BsBox2 />,
    link: '/products',
  },
  {
    title: 'All Cars',
    icon: <BiCar />,
    link: '/cars',
  },


  {
    title: 'Product Requests',
    icon: <AiOutlineAppstoreAdd />,
    link: '/products/add',
  },

  {
    title: 'Users Manegment',
    icon: <BiSolidUser />,
    link: '/users',
  },

  {
    title: 'Vendor Requests',
    icon: <FaHandsHelping />,
    link: '/vendorrequest',
  },


  {
    title: 'Expert Requests',
    icon: <FaHandsHelping />,
    link: '/expertrequests',
  },
  {
    title: 'Logout',
    icon: <BiLogOutCircle />,
    link: '/logout',
  },
];

const AdminSidebar = () => {
  const [toggled, setToggled] = useState(false);

  function SidebarTOGGLE() {
    setToggled(!toggled);
  }

  const divClassName = toggled ? 'user_profile_aside_toggle' : 'user_profile_aside';

  return (
    <aside className={divClassName}>
      <div onClick={SidebarTOGGLE} className="aside_user_toggle">
        <MdOutlineKeyboardArrowLeft className="aside_icon_toggle" />
      </div>
      {/* user Profile IMAGE */}
      <div className="aside_profiel_image_cover">
        <img className={toggled ? 'aside_user_profile_img_toggle' : 'aside_user_profile_img'} src={defaultUserImg} alt="profile_img" />
        <BiUpload className="upload_icon_aside" />
      </div>
      {/* IMAGE DIV ENDS HERE */}
      
      {sidebarItems.map((item, index) => (
        <div key={index} className={toggled ? 'aside_link_flex_toggled' : 'aside_link_flex'}>
          <p className={toggled ? 'aside_heading_sidebar_toggled' : 'aside_heading_sidebar'}>{item.title}</p>
          <Link to={item.link} className="aside_links">
            {item.icon}
            <span className={toggled ? 'icon_text_aside_toggled' : 'icon_text_aside'}>{item.title}</span>
          </Link>
        </div>
      ))}
    </aside>
  );
};

export default AdminSidebar;
