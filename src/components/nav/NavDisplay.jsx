import { NavLink } from "react-router-dom";

const NavDisplay = ({ tabs, activeTab, handleTabClick }) => {
  return (
    <div className="cron-scheduler">
      <nav className="tabs flex border-b border-gray-700 mb-5">
        {tabs.map((tab) => (
          <NavLink
            to={tab}
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`py-3 px-5 cursor-pointer ${
              activeTab === tab
                ? "border-b-2 border-blue-700 font-bold"
                : "border-none font-normal"
            }`}
          >
            {tab}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default NavDisplay;
