"use client";

import { PortableText as PortableTextReact } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

// Custom components for rendering Portable Text blocks
const components = {
  types: {
    image: ({
      value,
    }: {
      value: { asset: { _ref: string }; alt?: string };
    }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="relative my-6 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ""}
            fill
            className="object-cover"
          />
        </div>
      );
    },
    twoColumnGrid: ({
      value,
    }: {
      value: { left?: PortableTextBlock[]; right?: PortableTextBlock[] };
    }) => {
      return (
        <div className="text-besgrow-green grid grid-cols-2 gap-8">
          <div>
            {value.left && (
              <PortableTextReact value={value.left} components={components} />
            )}
          </div>
          <div>
            {value.right && (
              <PortableTextReact value={value.right} components={components} />
            )}
          </div>
        </div>
      );
    },
    brochureButton: ({
      value,
    }: {
      value: { label?: string; file?: { asset?: { _ref: string } } };
    }) => {
      // We render a styled button - the file URL will need to be resolved
      const label = value.label || "Download Brochure";
      return (
        <div className="my-8">
          <button
            className="bg-besgrow-green inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-2 font-semibold text-white transition-colors hover:opacity-90"
            type="button"
          >
            {label}
          </button>
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="h4 mb-[1vw]">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-besgrow-green mb-2 text-[max(16px,1.2vw)] font-bold">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-besgrow-green mb-2 text-[max(16px,1.2vw)] font-bold">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-besgrow-green mb-4">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href: string };
    }) => (
      <a
        href={value?.href}
        className="text-besgrow-green underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="text-besgrow-green mb-4 list-disc pl-6">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="text-besgrow-green mb-4 list-decimal pl-6">{children}</ol>
    ),
  },
};

interface PortableTextProps {
  value: PortableTextBlock[];
  className?: string;
}

export default function PortableText({ value, className }: PortableTextProps) {
  if (!value) return null;
  return (
    <div className={className}>
      <PortableTextReact value={value} components={components} />
    </div>
  );
}
