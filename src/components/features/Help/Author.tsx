/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import { useAppStore } from "@/store/appStore";
import Dog from "@img/dog.jpg";
import Luke2 from "@img/family.jpg";
import Luke0 from "@img/lukebmay0.jpg";
import Luke1 from "@img/lukebmay1.jpg";
import clsx from "clsx";
import React from "react";

const Author: React.FC = () => {
  const cmpClass = "cmp_author";

  const isDarkMode = useAppStore((state) => state.isDarkMode);

  const boardFgColorDark = useAppStore((state) => state.boardFgColorDark);
  const boardFgColorLight = useAppStore((state) => state.boardFgColorLight);

  const currentFgColor = isDarkMode ? boardFgColorDark : boardFgColorLight;

  return (
    <div
      className={clsx("flex-1 mx-auto flex flex-col items-center h-full p-3 text-base", cmpClass)}
    >
      <h1
        className={clsx(
          "text-center",
          "font-bold",
          "tracking-wider",
          "text-[clamp(1.5rem,5vw,3rem)]",
          "whitespace-nowrap",
        )}
      >
        <a href="https://lukemay.com">Luke Benjamin May</a>
      </h1>
      <div
        className={clsx(
          "flex",
          "justify-around",
          "items-center",
          "w-full",
          "h-[clamp(30px,20vw,200px)]",
          "flex-none",
          "overflow-hidden",
        )}
        style={{ backgroundColor: currentFgColor }}
      >
        <img
          className={clsx(
            "h-[80%]",
            "aspect-square",
            "rounded-full",
            "object-cover",
            "border-solid",
            "border-[clamp(10px,1.8vw,16px)]",
            "border-[var(--color-base-100)]",
            "cursor-pointer",
          )}
          src={Luke0}
          onClick={() => (window.location.href = "https://lukemay.com")}
        />
        <img
          className={clsx(
            "h-[118%]",
            "aspect-square",
            "rounded-full",
            "object-cover",
            "border-solid",
            "border-[clamp(13px,3.2vw,25px)]",
            "border-[var(--color-base-100)]",
            "cursor-pointer",
          )}
          src={Luke1}
          onClick={() => (window.location.href = "https://lukemay.com")}
        />
        <img
          className={clsx(
            "h-[80%]",
            "aspect-square",
            "rounded-full",
            "object-cover",
            "border-[3vh]",
            "border-solid",
            "border-[clamp(10px,1.8vw,16px)]",
            "border-[var(--color-base-100)]",
            "cursor-pointer",
          )}
          src={Luke2}
          onClick={() => (window.location.href = "https://lukemay.com")}
        />
      </div>
      <div
        className={clsx("flex flex-col items-center flex-1 overflow-auto w-full md:px-8 lg:px-12 ")}
      >
        <br />
        <hr className="w-full" />
        <h3 className="text-center text-xl pt-5 pb-5">Professional Roles</h3>
        <hr className="w-full" />
        <br />
        <ul className="list-disc pl-6 space-y-2 text-left">
          <li>Software Engineer</li>
          <li>Full Stack Web Developer</li>
          <li>Systems Administrator</li>
          <li>IT Professional</li>
          <li>Graduate Educator in Computer Science</li>
          <li>YouTuber</li>
          <li>Business Owner/Operator</li>
          <li>Graphic Designer</li>
          <li>Automotive Repair &amp; Restoration</li>
        </ul>

        <br />
        <hr className="w-full" />
        <h3 className="text-center text-xl pt-5 pb-5">Languages &amp; Systems</h3>
        <hr className="w-full" />
        <br />
        <ul className="list-disc pl-6 space-y-2 text-left">
          <li>JavaScript - 10,000+ hrs</li>
          <li>Python - 10,000+ hrs</li>
          <li>Linux &amp; Shell Scripting - 10,000+ hrs</li>
          <li>Lua, Java, C, &amp; others...</li>
          <li>Cloud, VM's, Containers, Database Management, etc.</li>
        </ul>

        <br />
        <hr className="w-full" />
        <h3 className="text-center text-xl pt-5 pb-5">Organizations</h3>
        <hr className="w-full" />
        <br />
        <ul className="list-disc pl-6 space-y-2 text-left">
          <li>Indiana State University - Terre Haute, IN (Graduate Educator, CS Dept Sys Admin)</li>
          <li>Genesys - Indianapolis, IN (Engineer, Full Stack Web Developer)</li>
          <li>Interactive Intelligence - Indianapolis, IN (Software Engineer, Web Developer)</li>
          <li>
            Landsbaum Center - Union Hospital - Terre Haute, IN (IT Professional, Systems
            Management)
          </li>
          <li>M &amp; S Customs - Terre Haute, IN (Automotive Tech, Paint and Body Specialist)</li>
          <li>
            Graphic Content - Vinyl Solutions - Terre Haute, IN (Owner/Operator, Graphic Designer)
          </li>
        </ul>

        <br />
        <hr className="w-full" />
        <h3 className="text-center text-xl pt-5 pb-5">Education</h3>
        <hr className="w-full" />
        <br />
        <ul className="list-disc pl-6 space-y-2 text-left">
          <li>M.S. Computer Science (4.0) - Indiana State University</li>
        </ul>
        <br />
        <br />

        <div
          className={clsx(
            "flex",
            "justify-around",
            "items-center",
            "w-full",
            "h-[clamp(25px,14vw,135px)]",
            "flex-none",
            "overflow-hidden",
          )}
          style={{ backgroundColor: currentFgColor }}
        >
          <img
            className={clsx(
              "h-[118%]",
              "aspect-square",
              "rounded-full",
              "object-cover",
              "border-solid",
              "border-[clamp(10px,1.8vw,16px)]",
              "border-[var(--color-base-100)]",
              "cursor-pointer",
            )}
            src={Dog}
            onClick={() => (window.location.href = "https://lukemay.com")}
          />
        </div>
      </div>
    </div>
  );
};

export default Author;
