import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import GggAuthBtn from "./ggg-auth-btn";
import Image from "next/image";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  BookmarkSquareIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

import {
  GiAtlas,
  GiCharacter,
  GiOpenChest,
  GiReceiveMoney,
} from "react-icons/gi";
import { IoPeople } from "react-icons/io5";

import { StyledTooltip } from "./styled-tooltip";
import SearchBar from "./search-bar";
import { usePoeStackAuth } from "../contexts/user-context";
import { usePoeLeagueCtx } from "../contexts/league-context";
import ThemeChanger from "./theme-changer";
import LeagueSelect from "@components/league-select";

export default function StyledNavBar() {
  const windowWidth = useWindowSize();

  const breakpoint = 1125;

  return <DesktopNavBar />;
}

function DesktopNavBar() {
  const { profile } = usePoeStackAuth();
  const { league } = usePoeLeagueCtx();

  const navigation = [
    {
      name: "Ladder",
      href: `/poe/characters?league=${league}`,
      current: false,
    },
    {
      name: "Stash",
      href: "/poe/stash/snapshot/profiles",
      current: false,
    },
    {
      name: "Profile",
      href: `/poe/characters/${profile?.userId}`,
      current: false,
    },
    {
      name: "Economy",
      href: `/poe/economy/${league}?tag=currency`,
      current: false,
    },
    {
      name: "Atlas",
      href: `/poe/atlas?league=${league}`,
      current: false,
    },
    {
      name: "TFT Bulk Tool",
      href: `/tft/bulk-tool`,
      current: false,
    },
  ];

  return (
    <>
      <div className="h-screen fixed flex flex-col bg-surface-primary gap-y-5">
        <div className="flex justify-items-center h-16 w-full">
          <Link href={"/"}>
            <Image
              height={48}
              width={130}
              src={"/logo_white_name.png"}
              alt={"PoeStack"}
            />
          </Link>
        </div>
        {/* Profile */}

        {/* Navgiation */}
        <ul role="list" className="">
          {navigation.map((item) => (
            <li
              key={item.name}
              className="block py-2 pr-2 text-sm font-semibold leading-6 text-gray-400 rounded-md hover:bg-color-primary "
            >
              <Link
                href={item.href}
                className={`
                    ${item.current ? "bg-gray-50" : ""}
                    block rounded-md py-2 pr-2 pl-10 text-sm font-semibold leading-6 text-gray-200`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Settings with no Options */}

        <div className="flex-1"></div>

        {/* Settings with Options */}
        <div className="block w-40 py-2 pl-10 pr-2 space-y-4 text-sm font-semibold leading-6 rounded-md">
          <Link
            href={`http://discord.com/invite/zqeTWZvb76`}
            className=""
            legacyBehavior
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-content-accent"
            >
              Join the Discord
            </a>
          </Link>
          <ThemeChanger />
          <LeagueSelect />
          <GggAuthBtn />
        </div>
      </div>
    </>
  );
}

function useWindowSize() {
  const [width, setWidth] = useState(undefined);
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowWidth;
}
