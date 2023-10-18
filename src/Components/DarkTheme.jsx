import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../Store/ThemeSlice";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import LightModeIcon from "@mui/icons-material/LightMode";
const DarkTheme = () => {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.darkTheme.darkTheme);
  return (
    <div
      className={
        darkTheme
          ? "flex justify-end w-16 h-8 bg-slate-400 rounded-3xl hover:cursor-pointer"
          : "flex justify-start w-16 h-8 bg-slate-400 rounded-3xl hover:cursor-pointer"
      }
      onClick={() => dispatch(themeActions.darkThemeToggle())}
    >
      <span
        className={`flex ${
          darkTheme ? "bg-gray-700" : "bg-zinc-100"
        } w-8 h-8 rounded-3xl items-center justify-center`}
      >
        {darkTheme ? (
          <DarkModeTwoToneIcon className="text-blue" />
        ) : (
          <LightModeIcon />
        )}
      </span>
    </div>
  );
};

export default DarkTheme;
