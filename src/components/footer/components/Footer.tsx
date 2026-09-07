import Link from "next/link";
import { footerSections, policy } from "../footer.constants";
import { Brand } from "./Brand";

export const Footer = () => {
  return (
    <footer className="lg:py-[90px] pt-[90px] pb-10 bg-dark-primary dark:bg-charcoal-black">
      <div className="container">
        <div className="max-w-[1180px] relative z-[1]">
          <div className="max-w-[940px]">
            <div className="grid lg:grid-cols-[345px_1fr_1fr_1fr] grid-cols-2 sm:gap-21 gap-x-8 gap-y-14">
              <Brand />
              {footerSections.map((section, id) => (
                <div key={id}>
                  <h2 className="text-lg font-semibold font-work-sans text-white mb-5">
                    {section.title}
                  </h2>
                  <ul className="flex flex-col gap-4">
                    {section.links.map((link, id) => (
                      <li key={id}>
                        <Link
                          href={link.href}
                          className="text-silver-gray text-lg transition-colors duration-300 hover:text-white dark:hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex sm:flex-row flex-col items-center justify-between lg:mt-12 mt-14">
            <div>
              <p className="text-white text-sm">
                &copy; {new Date().getFullYear()}{" "}
                {process.env.NEXT_PUBLIC_APP_NAME}. All rights reserved.
              </p>
            </div>
            <div>
              <ul className="flex gap-4">
                {policy.links.map((link, id) => (
                  <li key={id}>
                    <Link
                      href={link.href}
                      className="text-white text-sm underline dark:hover:text-primary transition-colors duration-300 ease-in-out"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Big brand text */}
      <div className="w-full overflow-hidden mt-16">
        <h1 className="text-center text-white font-extrabold text-[7vw] leading-none text-nowrap opacity-10 select-none">
          Frontend Template
        </h1>
      </div>
    </footer>
  );
};
