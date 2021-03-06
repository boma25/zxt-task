/** @format */

import React from "react";
import { IoLogoBitbucket } from "react-icons/io";
import { asideList } from "../../utils/data";
import LoginForm from "../loginForm";
import NavItem from "./navitem";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useAppSelector } from "../../store/hooks";
import { appState } from "../../store/slice/appslice";

interface props {
  setIsOpen: any;
  isOpen: boolean;
}
const Layout: React.FC<props> = ({ children, setIsOpen, isOpen }) => {
  const { isLoggedIn } = useAppSelector(appState);

  const _handleClose = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="flex" data-testid="layout">
        <div
          className={` ${
            !isOpen ? "-left-40" : "left-0"
          } md:w-2/12 bg-white fixed md:static top-0 z-10 md:z-0  h-screen duration-500  pt-12`}
        >
          <div className="flex items-center justify-center pb-16">
            <IoLogoBitbucket className="text-blue-500 lg:text-xl" />
            <p className="font-bold lg:text-xl text-blue-500">ZXT-TASK</p>
            <AiOutlineCloseCircle
              className="lg:hidden ml-3 text-blue-500"
              onClick={_handleClose}
            />
          </div>
          {asideList.map((value, index) => (
            <NavItem
              {...value}
              key={`aside-${index}`}
              active={index === 0}
              onClick={_handleClose}
            />
          ))}
        </div>

        <div className="pt-12 flex flex-col items-center md:w-10/12 md:pr-12 h-screen overflow-auto">
          {children}
        </div>
      </div>

      {!isLoggedIn && <LoginForm testId="login-form" />}
    </>
  );
};

export default Layout;
