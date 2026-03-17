import { Nokora, Figtree } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { GoLocation } from "react-icons/go";
import { LuMail, LuPhone } from "react-icons/lu";
import { client } from "@/sanity/client";
import { preFooterQuery, footerQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { BsInstagram, BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const nokora = Nokora({
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700", "900"],
  display: "swap",
  variable: "--font-nokora",
});

const ronnia = localFont({
  src: [
    {
      path: "../../public/fonts/RonniaBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ronnia",
});

// Fallback data
const preFooterFallback = {
  text: "Besgrow is a young and dynamic company, specialized in the production of high quality growing and landscaping substrates from sustainable, renewable resources",
};

const footerFallback = {
  addressTitle: "The Netherlands",
  address:
    "Besgrow Europe B.V. De Vesting 26-A 7722 GA Dalfsen The Netherlands",
  email: "info@besgrow-europe.com",
  phone: "+31 (0)321-745748",
  copyrightText: `© ${new Date().getFullYear()} Besgrow - Gerealiseerd door NUGTR`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [preFooterData, footerData] = await Promise.all([
    client.fetch(preFooterQuery),
    client.fetch(footerQuery),
  ]);

  // Pre-footer values
  const preFooterText = preFooterData?.text || preFooterFallback.text;
  const preFooterBgSrc = preFooterData?.backgroundImage
    ? urlFor(preFooterData.backgroundImage).width(1920).quality(75).url()
    : "/img/fallen-leaves.jpg";

  // Footer values
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
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body className={`${nokora.variable} antialiased`}>
        <Header />
        {children}
        <section className="relative py-[15vw] lg:py-[6vw]">
          <Image
            src={preFooterBgSrc}
            alt="Fallen leaves"
            fill
            className="object-cover brightness-50"
          />
          <Container>
            <div className="relative z-10 mx-auto max-w-[50vw] text-center text-white">
              {preFooterText}
            </div>
          </Container>
        </section>
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
                  <address className="max-w-[300px] not-italic">
                    {address}
                  </address>
                </div>
              </div>
              <div>
                <div className="mb-2 font-semibold">Contact</div>
                <div className="mb-1 flex items-center gap-2">
                  <span>
                    <LuMail strokeWidth={1} size={18} />
                  </span>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <span>
                    <LuPhone strokeWidth={1} size={18} />
                  </span>
                  <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
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
                        className="flex size-8 items-center justify-center rounded-full bg-neutral-100"
                      >
                        <BsFacebook fill="#4a8844" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-8 items-center justify-center rounded-full bg-neutral-100"
                      >
                        <BsTwitter fill="#4a8844" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-8 items-center justify-center rounded-full bg-neutral-100"
                      >
                        <BsInstagram fill="#4a8844" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-8 items-center justify-center rounded-full bg-neutral-100"
                      >
                        <BsLinkedin fill="#4a8844" />
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
                    <Link className="font-semibold" href="#">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link className="font-semibold" href="#">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link className="font-semibold" href="#">
                      Cookie Settings
                    </Link>
                  </li>
                </ul>
              </nav>
              <p className="text-center text-xs">{copyrightText}</p>
            </div>
          </Container>
        </footer>
      </body>
    </html>
  );
}
