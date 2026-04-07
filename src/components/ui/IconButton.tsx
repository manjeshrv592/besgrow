"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type IconButtonBaseProps = {
  /** The icon element (e.g. <CiMail />) displayed in the circle */
  icon: React.ReactNode;
  /** Additional classes for the outer element */
  className?: string;
  children: React.ReactNode;
};

type AsButton = IconButtonBaseProps &
  Omit<React.ComponentProps<"button">, "children"> & {
    href?: never;
  };

type AsLink = IconButtonBaseProps &
  Omit<React.ComponentProps<typeof Link>, "children"> & {
    href: string;
  };

type IconButtonProps = AsButton | AsLink;

const IconButton = ({
  icon,
  className,
  children,
  ...props
}: IconButtonProps) => {
  const iconRef = useRef<HTMLSpanElement>(null);
  const [iconSize, setIconSize] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (iconRef.current) {
        setIconSize(iconRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const sharedProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    className: cn(
      "bg-besgrow-green lg:text-besgrow-green border-besgrow-green relative flex cursor-pointer items-center gap-2 rounded-full border-2 px-[max(16px,1vw)] py-[max(6px,0.5vw)] text-white lg:bg-white",
      className,
    ),
    style: {
      paddingLeft: iconSize ? `${iconSize + 5}px` : undefined,
    },
  };

  const innerContent = (
    <>
      {/* Hover expand background */}
      <span
        className="bg-besgrow-green absolute -top-px -left-px hidden h-[calc(100%+2px)] rounded-full transition-all duration-300 ease-in-out lg:block"
        style={{
          width: hovered ? "calc(100% + 2px)" : `${iconSize}px`,
        }}
      />
      {/* Icon circle */}
      <span
        ref={iconRef}
        className="bg-besgrow-green top-0 left-0 z-10 flex aspect-square -translate-x-px -translate-y-px items-center justify-center rounded-full lg:absolute lg:h-[calc(100%+2px)] [&_svg]:h-[max(16px,1.3vw)] [&_svg]:w-[max(16px,1.3vw)]"
      >
        {icon}
      </span>
      {/* Label */}
      <span
        className={cn(
          "relative z-10 min-w-[50px] translate-y-[2px] text-center transition-colors duration-300",
          hovered && "text-white",
        )}
      >
        {children}
      </span>
    </>
  );

  if (props.href) {
    const { href, ...linkProps } = props as AsLink;
    return (
      <Link href={href} {...linkProps} {...sharedProps}>
        {innerContent}
      </Link>
    );
  }

  const buttonProps = props as AsButton;
  return (
    <button {...buttonProps} {...sharedProps}>
      {innerContent}
    </button>
  );
};

export default IconButton;
