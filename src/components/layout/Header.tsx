"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { GoChevronDown } from "react-icons/go";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import IconButton from "../ui/IconButton";
import { CiMail } from "react-icons/ci";
import { Button } from "../ui/button";

const languages = [
  { value: "en", label: "English", flag: "/img/flags/english.svg" },
  { value: "nl", label: "Dutch", flag: "/img/flags/dutch.svg" },
  { value: "fr", label: "French", flag: "/img/flags/french.svg" },
  { value: "de", label: "German", flag: "/img/flags/german.svg" },
  { value: "pl", label: "Polish", flag: "/img/flags/polish.svg" },
  { value: "es", label: "Spanish", flag: "/img/flags/spanish.svg" },
];

interface HeaderProps {
  productsHref?: string;
  locale: Locale;
}

const LanguageSwitcher = ({ currentLocale }: { currentLocale: Locale }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as Locale });
  };

  return (
    <span>
      <Select value={currentLocale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[84px] gap-2">
          {(() => {
            const currentLang =
              languages.find((l) => l.value === currentLocale) || languages[0];
            return (
              <div className="flex items-center gap-1.5">
                <Image
                  className="size-5 rounded-full object-cover"
                  src={currentLang.flag}
                  alt={currentLang.label}
                  width={20}
                  height={20}
                />
                <span className="translate-y-px uppercase">
                  {currentLang.value}
                </span>
              </div>
            );
          })()}
        </SelectTrigger>
        <SelectContent position="popper" align="end" sideOffset={6}>
          <SelectGroup>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                <Image
                  className="size-5 rounded-full object-cover"
                  src={lang.flag}
                  alt={lang.label}
                  width={20}
                  height={20}
                />
                <span className="capitalize">{lang.label}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </span>
  );
};

const Header = ({ productsHref = "/products", locale }: HeaderProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname() || "";

  useEffect(() => {
    let previousScrollPosition =
      typeof window !== "undefined" ? window.scrollY : 0;

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (
        currentScrollPosition > previousScrollPosition &&
        currentScrollPosition > 100
      ) {
        setIsVisible(false); // Hide on scroll down
      } else if (previousScrollPosition > currentScrollPosition) {
        setIsVisible(true); // Show on scroll up
      }

      previousScrollPosition = currentScrollPosition;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (href: string) =>
    `transition-colors duration-200 hover:text-besgrow-green ${
      isActive(href) ? "text-besgrow-green" : ""
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 transition-all duration-300 ease-in-out lg:grid lg:grid-cols-[1fr_max-content_1fr] ${
          isVisible || mobileNavOpen ? "translate-y-0" : "-translate-y-full"
        } bg-transparent`}
      >
        <Link href="/">
          <Image
            className="h-[5vw] min-h-12 w-auto"
            src="/img/nav-logo.png"
            alt="Besgrow Logo"
            width={236}
            height={376}
          />
        </Link>
        <button
          onClick={() => setMobileNavOpen(true)}
          className={`fixed top-2 left-1/2 z-60 flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 lg:hidden ${
            mobileNavOpen ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <span className="flex translate-y-[2px] flex-col items-center justify-center">
            <GoChevronDown size={20} />
            <GoChevronDown size={20} className="mt-[-26px]" />
          </span>
        </button>
        {/* Overlay - fades in/out */}
        <div
          onClick={() => setMobileNavOpen(false)}
          className={`fixed top-0 left-0 z-40 h-screen w-screen bg-black/80 transition-opacity duration-300 lg:hidden ${
            mobileNavOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          &nbsp;
        </div>
        {/* Nav - slides in from top */}
        <nav
          className={`fixed top-0 left-1/2 z-50 mx-auto w-full -translate-x-1/2 rounded-b-3xl bg-white px-8 py-4 font-semibold text-neutral-700 transition-transform duration-300 ease-in-out lg:relative lg:top-auto lg:left-auto lg:block lg:w-auto lg:translate-y-0 lg:translate-none lg:rounded-full lg:border lg:border-neutral-200 lg:bg-white lg:py-2 ${
            mobileNavOpen
              ? "translate-y-0"
              : "-translate-y-full lg:translate-y-0"
          }`}
        >
          <ul className="flex justify-center gap-6 lg:gap-[3vw]">
            <li>
              <Link
                href="/"
                className={linkClass("/")}
                onClick={() => setMobileNavOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={productsHref}
                className={linkClass("/products")}
                onClick={() => setMobileNavOpen(false)}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/distributors?region=europe"
                className={linkClass("/distributors")}
                onClick={() => setMobileNavOpen(false)}
              >
                Distributors
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className={linkClass("/about-us")}
                onClick={() => setMobileNavOpen(false)}
              >
                About Us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center justify-end gap-2 text-right">
          <span className="lg:hidden">
            <Button size="icon" asChild>
              <Link href="/contact-us">
                <CiMail strokeWidth={1} />
              </Link>
            </Button>
          </span>
          <span className="hidden -translate-x-27 lg:block">
            <IconButton
              href="/contact-us"
              icon={
                <CiMail
                  className="translate-y-0.5 lg:translate-none lg:text-white"
                  strokeWidth={1}
                />
              }
            >
              Contact Us
            </IconButton>
          </span>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </header>
    </>
  );
};

export default Header;
