import { useEffect, useState } from "react";
import Sidebar from "../utils/Sidebar";
import Header from "../utils/Header";
import DashboardHome from "./DashboardPage";

import { Navigate, Route, Routes } from "react-router-dom";
import BannersList from "./banner/BannerList";
import AddBanner from "./banner/AddBanner";
import EditBanner from "./banner/EditBanner";
import AboutusList from "./aboutus/AboutusList";
import AddAboutus from "./aboutus/AddAboutus";
import EditAboutus from "./aboutus/EditAboutus";
import ServiceSectionList from "./serviceSection/ServiceSectionList";
import AddServices from "./serviceSection/AddServices";
import EditService from "./serviceSection/EditService";
import AddServicebar from "./serviceSection/AddServiceBar";
import ServiceBarList from "./serviceSection/ServiceBarList";
import EditServiceBar from "./serviceSection/EditServiceBar";
import ArchitechList from "./architechGrowth/ArchitechList";
import AddArchitech from "./architechGrowth/AddArchitech";
import EditArchitech from "./architechGrowth/EditArchitech";
import NewsList from "./news/NewsList";
import AddNews from "./news/AddNews";
import EditNews from "./news/EditNews";
import AddSettings from "./settings/AddSettings";
import EditSettings from "./settings/EditSettings";
import GlobalList from "./globalPresence/GlobalList";
import AddGlobal from "./globalPresence/AddGlobal";
import EditGlobal from "./globalPresence/EditGlobal";
import JourneyList from "./journey/JourneyList";
import AddJourney from "./journey/AddJourney";
import EditJourney from "./journey/EditJourney";
import BusinessList from "./business/BusinessList";
import AddBusiness from "./business/AddBusiness";
import EditBusiness from "./business/EditBusiness";
import AddJourneySteps from "./journey/AddJourneySteps";
import JourneyStepsList from "./journey/JourneyStepsList";
import EditJourneySteps from "./journey/EditJourneySteps";
import ChairmanMsgList from "./chairmanmsg/ChairmanMsgList";
import AddChairmanMsg from "./chairmanmsg/AddChairmanMsg";
import EditChairmanMsg from "./chairmanmsg/EditChairmanMsg";
import LastdecadeList from "./lastdecade/LastdecadeList";
import AddLastdecade from "./lastdecade/AddLastdecade";
import EditLastdecade from "./lastdecade/EditLastdecade";
import ContactusList from "./contactus/ContactusList";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const [title, setTitle] = useState("Dashboard");

  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const titles = {
      home: "Dashboard",
      banners: "Banners Management",
      posts: "Posts Management",
      users: "Users Management",
      settings: "Settings",
    };
    setTitle(titles[activeMenu] || "Dashboard");
  }, [activeMenu]);

  const renderContent = () => {
    switch (activeMenu) {
      case "home":
        return <DashboardHome />;
      case "banners":
        return <BannersTable />;
      case "posts":
        return (
          <div className="bg-white rounded-lg shadow p-6">Posts Content</div>
        );
      case "users":
        return (
          <div className="bg-white rounded-lg shadow p-6">Users Content</div>
        );
      case "settings":
        return (
          <div className="bg-white rounded-lg shadow p-6">Settings Content</div>
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        user={user}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title={title} setIsOpen={setIsOpen} user={user} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="home" replace />} />
            <Route path="home" element={<DashboardHome />} />
            <Route path="banners" element={<BannersList />} />
            <Route path="banners/add" element={<AddBanner />} />
            <Route path="banners/edit/:id" element={<EditBanner />} />

            <Route path="aboutus" element={<AboutusList />} />
            <Route path="aboutus/add" element={<AddAboutus />} />
            <Route path="aboutus/edit" element={<EditAboutus />} />

            <Route path="service" element={<ServiceSectionList />} />
            <Route path="service/add" element={<AddServices />} />
            <Route path="service/edit/:id" element={<EditService />} />

            <Route path="servicebar" element={<ServiceBarList />} />
            <Route path="servicebar/add" element={<AddServicebar />} />
            <Route path="servicebar/edit/:id" element={<EditServiceBar />} />

            <Route path="architech" element={<ArchitechList />} />
            <Route path="architech/add" element={<AddArchitech />} />
            <Route path="architech/edit/:id" element={<EditArchitech />} />

            <Route path="business" element={<BusinessList />} />
            <Route path="business/add" element={<AddBusiness />} />
            <Route path="business/edit/:id" element={<EditBusiness />} />

            <Route path="journey" element={<JourneyList />} />
            <Route path="journey/add" element={<AddJourney />} />
            <Route path="journey/edit/:id" element={<EditJourney />} />

            <Route path="journeysteps" element={<JourneyStepsList />} />
            <Route path="journeysteps/add" element={<AddJourneySteps />} />
            <Route
              path="journeysteps/edit/:id"
              element={<EditJourneySteps />}
            />

            <Route path="globalPresence" element={<GlobalList />} />
            <Route path="globalPresence/add" element={<AddGlobal />} />
            <Route path="globalPresence/edit/:id" element={<EditGlobal />} />

            <Route path="news" element={<NewsList />} />
            <Route path="news/add" element={<AddNews />} />
            <Route path="news/edit/:id" element={<EditNews />} />

            <Route path="lastdecade" element={<LastdecadeList />} />
            <Route path="lastdecade/add" element={<AddLastdecade />} />
            <Route path="lastdecade/edit/:id" element={<EditLastdecade />} />

            <Route path="chairmanmsg" element={<ChairmanMsgList />} />
            <Route path="chairmanmsg/add" element={<AddChairmanMsg />} />
            <Route path="chairmanmsg/edit/:id" element={<EditChairmanMsg />} />

            <Route path="contactus" element={<ContactusList />} />
            <Route path="settings" element={<EditSettings />} />

            {/* <Route path="/dashboard/users" element={<UsersPage />} /> */}
            {/* <Route path="/dashboard/settings" element={<SettingsPage />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
}
