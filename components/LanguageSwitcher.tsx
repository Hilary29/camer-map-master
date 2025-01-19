import React, { useState, useRef } from "react";
import { GlobeIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("fr");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLanguageChange = (lang: React.SetStateAction<string>) => {
    setLanguage(lang);
    setDropdownOpen(false);
    console.log("Langue sélectionnée :", lang);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center bg-transparent hover:bg-[#ffffff1b] border  p-1.5 rounded-md text-white-50 cursor-pointer"
      >
        <GlobeIcon className="h-6 w-5 mr-2" />
        {language.toUpperCase()}
      </button>

      {dropdownOpen && (
        <ul
          ref={dropdownRef}
          className="absolute top-full mt-2 left-0 bg-[#ffffff60] backdrop-blur-md border border-white rounded-md "
        >
          <li
            onClick={() => handleLanguageChange("fr")}
            className="cursor-pointer px-5 py-1 hover:bg-[#ffffff76]  transition"
          >
            <Link href={"/fr"}>FR</Link>
          </li>
          <li
            onClick={() => handleLanguageChange("en")}
            className="cursor-pointer px-5 py-1  hover:bg-[#ffffff76]  transition"
          >
            <Link href={"/en"}>EN</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
