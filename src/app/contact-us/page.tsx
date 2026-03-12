"use client";

import Container from "@/components/layout/Container";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import IconButton from "@/components/ui/IconButton";
import { CiMail } from "react-icons/ci";
import { LuUser, LuPhone, LuBuilding2, LuMessageSquare } from "react-icons/lu";

const ContactUsPage = () => {
  return (
    <section className="h-screen">
      <Image
        src="/img/beautiful-landscape-with-blue-sky.jpg"
        alt="Beautiful landscape with blue sky"
        fill
        quality={75}
        className="object-cover"
        priority
      />
      <Image
        src="/img/growscape.png"
        alt="Branches illustrations"
        height={500}
        width={2000}
        quality={75}
        className="absolute bottom-0 h-[600px] w-full object-cover object-top"
        priority
      />
      <Container className="relative z-20 h-full">
        <div className="flex h-full gap-24">
          <div className="flex flex-1 flex-col gap-8 py-[12vh]">
            <div>
              <h1 className="h3">Contact Us</h1>
              <p className="text-besgrow-green mb-4 font-semibold">
                We&apos;re here to help—share your thoughts or inquiries with
                us, and we&apos;ll get back to you soon!
              </p>
              <p className="text-besgrow-green">
                Innovation drives everything we do. We continuously invest in
                research and development, exploring the power of micro-organisms
                and biostimulants to create smarter, more effective solutions.
                By anticipating market trends and listening closely to our
                customers, we deliver products that don&apos;t just perform—they
                elevate growing results.
              </p>
            </div>
            <div className="relative flex-1 overflow-hidden">
              <Image
                src="/img/contact-us.png"
                alt="Contact Us"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative flex basis-[27%] flex-col justify-end border border-y-neutral-300 py-[12vh]">
            <Image
              alt="fawn image"
              className="object-cover"
              src="/img/leaves-vertical.jpg"
              fill
            />
            <div className="mb-4 text-center">
              <h4 className="font-ronnia text-besgrow-green text-[max(16px,1.2vw)]">
                We&apos;d like to hear from you
              </h4>
              <span className="text-besgrow-green">Contact Us</span>
            </div>
            <div className="px-4">
              <form className="flex flex-col gap-4">
                <div className="relative">
                  <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                    <LuUser size={18} strokeWidth={1.5} />
                  </span>
                  <Input
                    placeholder="Name"
                    className="h-10 rounded-md border-neutral-500 bg-white pl-10"
                  />
                </div>
                <div className="relative">
                  <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                    <CiMail size={20} strokeWidth={0.5} />
                  </span>
                  <Input
                    type="email"
                    placeholder="Email ID"
                    className="h-10 rounded-md border-neutral-500 bg-white pl-10"
                  />
                </div>
                <div className="relative">
                  <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                    <LuPhone size={18} strokeWidth={1.5} />
                  </span>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    className="h-10 rounded-md border-neutral-500 bg-white pl-10"
                  />
                </div>
                <div className="relative">
                  <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                    <LuBuilding2 size={18} strokeWidth={1.5} />
                  </span>
                  <Input
                    placeholder="Company Name"
                    className="h-10 rounded-md border-neutral-500 bg-white pl-10"
                  />
                </div>
                <div className="relative">
                  <span className="text-muted-foreground absolute top-3 left-3">
                    <LuMessageSquare size={18} strokeWidth={1.5} />
                  </span>
                  <Textarea
                    placeholder="Message"
                    className="min-h-32 rounded-md border-neutral-500 bg-white pl-10"
                  />
                </div>
                <div className="flex justify-center pt-2">
                  <IconButton
                    className="text-center"
                    type="submit"
                    icon={
                      <CiMail
                        className="translate-y-0.5 text-white"
                        strokeWidth={1}
                      />
                    }
                  >
                    Send
                  </IconButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactUsPage;
