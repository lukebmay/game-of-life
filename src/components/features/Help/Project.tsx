/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import clsx from "clsx";
import React from "react";

const Project: React.FC = () => {
  const cmpClass = "cmp_project";

  return (
    <div
      className={clsx(
        "flex-1 mx-auto max-w-3xl px-4 md:px-8 lg:px-12 pb-3 overflow-auto text-base leading-loose",
        cmpClass,
      )}
    >
      <br />
      <h3 className="text-center text-xl pt-5 pb-5">Description</h3>
      <br />
      <p className="indent-6">
        <a
          className="link link-primary"
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        >
          Conway's Game of Life
        </a>{" "}
        is a classic computer science simulation that is relatively simple to code (less than 30
        minutes to write the game engine itself). The challenge of this project was to use the
        latest professional web development technologies and to use best practices to push React
        rendering speeds to the edge of the framework's capabilities. React is decidedly not the
        right choice for rendering the game board itself if speed and efficiency are the goals.
        However, at least one of the primary goals of this project was to see how far I could push
        React rendering speeds. There are certainly always things that can be improved and minor
        bugs to be worked out, as is the case in all software projects, but overall, this has been
        an extremely satisfying project to work on.
      </p>

      <br />
      <h3 className="text-center text-xl pt-5 pb-5">Primary Goals</h3>
      <br />
      <ol className="list-decimal pl-6 space-y-2">
        <li>Push React rendering speeds to the limit.</li>
        <li>Brush up on professional level web development.</li>
        <li>Try some of the latest tech.</li>
        <li>Make a mobile friendly application.</li>
        <li>Add a meaningful project to my portfolio.</li>
        <li>Have fun!!! 😄</li>
      </ol>

      <br />
      <h3 className="text-center text-xl pt-5 pb-5">Technologies</h3>
      <br />
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          <a className="link link-primary" href="https://www.typescriptlang.org/">
            TypeScript
          </a>{" "}
          - Super-set of JavaScript enabling strong typing.
        </li>
        <li>
          <a className="link link-primary" href="https://react.dev/">
            React
          </a>{" "}
          - Professional framework for web components and data binding (among many other things).
        </li>
        <li>
          <a className="link link-primary" href="https://tailwindcss.com/">
            Tailwind
          </a>{" "}
          - Declarative CSS framework.
        </li>
        <li>
          <a className="link link-primary" href="https://daisyui.com/">
            DaisyUI
          </a>{" "}
          - Tailwind-based library for common UI components.
        </li>
        <li>
          <a className="link link-primary" href="https://zustand-demo.pmnd.rs/">
            Zustand
          </a>{" "}
          - Lightweight, fast, and scalable state management library.
        </li>
        <li>
          <a className="link link-primary" href="https://vite.dev/">
            Vite
          </a>{" "}
          - Web development build system.
        </li>
        <li>
          <a className="link link-primary" href="https://neovim.io/">
            Neovim (btw)
          </a>{" "}
          - Highly customizable terminal-based text editor.
        </li>
      </ol>

      <br />
      <h3 className="text-center text-xl pt-5 pb-5">
        Source Code <br />
        <br />
        <a className="link link-secondary" href="https://github.com/lukebmay/game-of-life">
          Luke B. May - Game of Life
        </a>
      </h3>

      <br />
      <h3 className="text-center text-xl pt-5 pb-5">Use of AI </h3>
      <br />
      <p className="indent-6">
        The primary use of AI in this project was as a reference to understand how various libraries
        and technologies work, much like how you would use a search engine (but with faster and more
        specific results). I did allow it to indirectly perform small tedious modifications to
        certain code blocks, but beyond that the code is all mine, as is the overall design and
        structure of this project. I also did use it extensively to understand some configuration
        files and settings, and to challenge my understanding of current best practices.
      </p>
      <br />
      <h3 className="text-center text-xl pt-5 pb-5">Musings on AI in General</h3>
      <br />
      <p className="indent-6">
        My personal take on AI's coding ability (as of early 2026) is that it's functionally
        equivalent to a C/C+ university student, but at least 1000x faster. With enough time, most C
        students can create something functional, though the work is often significantly lacking in
        the necessary levels of professional design and quality needed for long-term maintainability
        and profitability. As AI improves, it increasingly becomes a necessary tool to facilitate
        more rapid and accurate development. However, it is not yet, IMO, particularly close to
        replacing mid to senior level engineers.
      </p>
      <br />
      <p className="indent-6">
        Despite AI currently being a reasonable substitution for some entry level positions,
        continued investment in these positions will be necessary and will continue to pay off as
        more senior roles eventually need replacements. It will be critical to have advanced
        engineers and developers appropriately overseeing, guiding, and pushing back on the AI tools
        used to help develop our critical systems for a long time to come.
      </p>

      <br />
    </div>
  );
};

export default Project;
