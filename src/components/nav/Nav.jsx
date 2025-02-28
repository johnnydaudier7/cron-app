import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavDisplay from "./NavDisplay";
const Nav = () => {
  const [activeTab, setActiveTab] = useState("daily");

  const tabs = ["daily", "weekly", "monthly", "custom"];

  const location = useLocation();

  useEffect(() => {
    const currentLocation = location.pathname.replace("/", "");

    if (!tabs.includes(currentLocation)) {
      return;
    } else {
      setActiveTab(currentLocation);
    }
  }, [activeTab, location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <NavDisplay
      tabs={tabs}
      activeTab={activeTab}
      handleTabClick={handleTabClick}
    />
  );
};
export default Nav;
