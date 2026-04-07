import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Container from "@/components/layout/Container";
import { GoLocation } from "react-icons/go";
import { LuMail, LuPhone } from "react-icons/lu";
import { BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { client } from "@/sanity/client";
import { footerQuery } from "@/sanity/queries";

const footerFallback = {
  addressTitle: "The Netherlands",
  address:
    "Besgrow Europe B.V. De Vesting 26-A 7722 GA Dalfsen The Netherlands",
  email: "info@besgrow-europe.com",
  phone: "+31 (0)321-745748",
  copyrightText: `© ${new Date().getFullYear()} Besgrow - Gerealiseerd door NUGTR`,
};

export default async function Footer() {
  const footerData = await client.fetch(footerQuery);

  const addressTitle = footerData?.addressTitle || footerFallback.addressTitle;
  const address = footerData?.address || footerFallback.address;
  const email = footerData?.email || footerFallback.email;
  const phone = footerData?.phone || footerFallback.phone;
  const copyrightText =
    footerData?.copyrightText || footerFallback.copyrightText;
  const facebookUrl = footerData?.facebookUrl || "#";
  const twitterUrl = footerData?.twitterUrl || "#";
  const instagramUrl = footerData?.instagramUrl || "#";
  const linkedinUrl = footerData?.linkedinUrl || "#";

  return (
    <footer className="relative py-[2vw]">
      <div className="absolute inset-x-0 top-[10%] bottom-0">
        <Image
          src="/img/footer-bg.png"
          alt=""
          fill
          className="object-cover object-top"
        />
      </div>
      <Container className="relative z-10">
        <div className="mb-4">
          <Image
            src="/img/nav-logo.png"
            alt="Besgrow logo"
            className="max-w-[64px]"
            width={236}
            height={376}
          />
        </div>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:justify-between">
          <div className="text-besgrow-green">
            <span className="mb-2 inline-block text-[max(1rem,1vw)] font-semibold">
              {addressTitle}
            </span>
            <div className="flex gap-2">
              <span className="mt-[2px]">
                <GoLocation size={20} />
              </span>
              <address className="max-w-[300px] not-italic">{address}</address>
            </div>
          </div>
          <div>
            <div className="mb-2 font-semibold">Contact</div>
            <div className="mb-1 flex items-center gap-2">
              <span>
                <LuMail size={18} />
              </span>
              <a className="font-semibold" href={`mailto:${email}`}>
                {email}
              </a>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <span>
                <LuPhone size={18} />
              </span>
              <a
                className="font-semibold"
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              >
                {phone}
              </a>
            </div>
            <div className="mb-2 text-center font-semibold lg:text-left">
              Social Media
            </div>
            <nav>
              <ul className="flex justify-center gap-4 lg:justify-start">
                <li>
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-8 items-center justify-center rounded-full bg-[#184E14] text-white transition-all duration-100 ease-in hover:bg-white hover:text-[#184e14]"
                  >
                    <FaFacebookF fill="currentColor" />
                  </a>
                </li>
                <li>
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-8 items-center justify-center rounded-full bg-[#184E14] text-white transition-all duration-100 ease-in hover:bg-white hover:text-[#184e14]"
                  >
                    <BsTwitter fill="currentColor" />
                  </a>
                </li>
                <li>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-8 items-center justify-center rounded-full bg-[#184E14] text-white transition-all duration-100 ease-in hover:bg-white hover:text-[#184e14]"
                  >
                    <BsInstagram fill="currentColor" />
                  </a>
                </li>
                <li>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-8 items-center justify-center rounded-full bg-[#184E14] text-white transition-all duration-100 ease-in hover:bg-white hover:text-[#184e14]"
                  >
                    <FaLinkedinIn fill="currentColor" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div>
          <nav className="mb-4 flex justify-center">
            <ul className="footer-nav flex flex-col items-center gap-4 lg:flex-row">
              <li>
                <Link className="relative font-semibold pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full" href="/terms-and-conditions">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link className="relative font-semibold pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full" href="/delivery-terms">
                  Terms of Delivery
                </Link>
              </li>
              <li>
                <Link className="relative font-semibold pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full" href="/privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link className="relative font-semibold pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full" href="/cookie-settings">
                  Cookie Settings
                </Link>
              </li>
            </ul>
          </nav>
          <p className="text-center text-xs">{copyrightText}</p>
        </div>
      </Container>
    </footer>
  );
}
