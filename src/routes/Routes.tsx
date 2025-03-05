// src/routes/Routes.tsx
import { Navigate, Route, Routes } from "react-router";
import AppLayout from "../layout/AppLayout";
import ForgotPassword from "../pages/AuthPages/ForgotPassword";
import SignIn from "../pages/AuthPages/SignIn";
import Blank from "../pages/Blank";
import Branches from "../pages/Branches/Branches";
import UsersBranches from "../pages/Branches/Users";
import Calendar from "../pages/Calendar";
import BarChart from "../pages/Charts/BarChart";
import LineChart from "../pages/Charts/LineChart";
import Home from "../pages/Dashboard/Home";
import FormElements from "../pages/Forms/FormElements";
import Merchants from "../pages/Merchants/Merchants";
import UsersMarchants from "../pages/Merchants/Users";
import NotFound from "../pages/OtherPage/NotFound";
import Partners from "../pages/Partners/Partners";
import UsersPartners from "../pages/Partners/Users";
import BasicTables from "../pages/Tables/BasicTables";
import Terminals from "../pages/Terminals/Terminals";
import UsersTerminals from "../pages/Terminals/Users";
import Alerts from "../pages/UiElements/Alerts";
import Avatars from "../pages/UiElements/Avatars";
import Badges from "../pages/UiElements/Badges";
import Buttons from "../pages/UiElements/Buttons";
import Images from "../pages/UiElements/Images";
import Videos from "../pages/UiElements/Videos";
import UserProfiles from "../pages/UserProfiles";
import { useAuthStore } from "../store/useAuthStore";
import Users from "../pages/Users/Users";

const RoutesComponent = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <Routes>
      {/* Dashboard Layout */}
      {isAuthenticated && (
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/partners/:id" element={<UsersPartners />} />
          <Route path="/merchants" element={<Merchants />} />
          <Route path="/merchants/:id" element={<UsersMarchants />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/branches/:id" element={<UsersBranches />} />
          <Route path="/terminals" element={<Terminals />} />
          <Route path="/terminals/:id" element={<UsersTerminals />} />
          <Route path="/users" element={<Users />} />

          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/form-elements" element={<FormElements />} />
          <Route path="/basic-tables" element={<BasicTables />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      )}

      {/* Auth Layout */}
      {!isAuthenticated && (
        <>
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </>
      )}

      {/* Fallback Route */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default RoutesComponent;
