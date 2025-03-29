import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Signin } from "./WebPages/Signin";
import MoneyPage from "./WebPages/MoneyPage";
import MoneySend from "./WebPages/MoneySend";
import ProfileDetails from "./WebPages/ProfileDetails";
import { RecoilRoot } from "recoil";
import PasswordChange from "./WebPages/PasswordChange";
import MiniStatement from "./WebPages/MiniStatement";
import DeleteAccount from "./WebPages/DeleteAccount";
import { ForgetPassword } from "./WebPages/ForgetPassword";
import { Emailsignup } from "./WebPages/Emailsignup";
import { Verify } from "./WebPages/Verify";
import { Details } from "./WebPages/Details";
import { HomePage } from "./WebPages/HomePage";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/SignUp" element={<Emailsignup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/Verify" element={<Verify />} />
            <Route path="/Details" element={<Details />} />
            <Route path="/Account" element={<MoneyPage />} />
            <Route path="/SendMoney" element={<MoneySend />} />
            <Route path="/Profile" element={<ProfileDetails />} />
            <Route path="/ChangePassword" element={<PasswordChange />} />
            <Route path="/MiniStatement" element={<MiniStatement />} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/DeleteAccount" element={<DeleteAccount />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
