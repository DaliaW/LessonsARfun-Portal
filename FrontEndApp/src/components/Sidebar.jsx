import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { SiGoogleclassroom } from "react-icons/si";
import { RiHomeHeartLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { FiBookOpen } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import React, { useState } from "react";
import sidebarBg from "../assets/bg.jpg";

const Sidebar = () => {
  const [icons, setIcons] = useState({
    Home: false,
    CreateLesson: false,
    MyLessons: false,
    MyClasses: false,
    InteractiveARboard: false,
  });

  const routeChange = (path) => {
    document.location.href = window.location.origin + `/${path}`;
  };

  const showTag = (name) => {
    setIcons({
      ...icons,
      [name]: true,
    });
  };

  const hideTag = (name) => {
    setIcons({
      ...icons,
      [name]: false,
    });
  };

  return (
    <ProSidebar image={sidebarBg} collapsed={true} className="custom-sidebar">
      <h3 className="title">📚' AR fun</h3>
      <Menu iconShape="round">
        <MenuItem
          icon={<RiHomeHeartLine />}
          onMouseEnter={() => showTag("Home")}
          onMouseLeave={() => hideTag("Home")}
          onClick={() => routeChange("home")}
        >
          {icons.Home ? " Home" : ""}
        </MenuItem>
      </Menu>
      <Menu iconShape="round">
        <MenuItem
          icon={<IoCreateOutline />}
          onMouseEnter={() => showTag("CreateLesson")}
          onMouseLeave={() => hideTag("CreateLesson")}
          onClick={() => routeChange("CreateLesson/assets")}
        >
          {icons.CreateLesson ? "Create a Lesson" : ""}
        </MenuItem>
      </Menu>
      <Menu iconShape="round">
        <MenuItem
          icon={<FiBookOpen />}
          onMouseEnter={() => showTag("MyLessons")}
          onMouseLeave={() => hideTag("MyLessons")}
          onClick={() => routeChange("MyLessons")}
        >
          {icons.MyLessons ? "My Lessons" : ""}
        </MenuItem>
      </Menu>
      <Menu iconShape="round">
        <MenuItem
          icon={<SiGoogleclassroom />}
          onMouseEnter={() => showTag("MyClasses")}
          onMouseLeave={() => hideTag("MyClasses")}
          onClick={() => routeChange("MyClasses")}
        >
          {icons.MyClasses ? "My Classes" : ""}
        </MenuItem>
      </Menu>
      <Menu iconShape="round">
        <MenuItem
          icon={<FaChalkboardTeacher />}
          onMouseEnter={() => showTag("InteractiveARboard")}
          onMouseLeave={() => hideTag("InteractiveARboard")}
          onClick={() =>
            (document.location.href = `https://my-ar-interactive-board.netlify.app/`)
          }
        >
          {icons.InteractiveARboard ? "Interactive AR board" : ""}
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
