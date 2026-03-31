"use client";

import { PortableText as PortableTextReact } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import IconButton from "./ui/IconButton";
import { BsDownload } from "react-icons/bs";

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
        <div className="relative my-6 h-[400px] max-h-[400px] w-full overflow-hidden">
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
        <div className="text-besgrow-green grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* <div className="grid grid-cols-2 gap-8 text-neutral-700"> */}
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
      const label = value.label || "Download Brochure";

      let fileUrl = "";
      if (value.file?.asset?._ref) {
        // e.g. "file-1234abc-pdf" -> "1234abc.pdf"
        const [, id, ext] = value.file.asset._ref.split("-");
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
        if (projectId && dataset && id && ext) {
          fileUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
        }
      }

      return (
        <div className="my-8 flex justify-start">
          {fileUrl ? (
            <IconButton
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={
                <BsDownload
                  className="translate-y-0.5 text-white lg:translate-none"
                  strokeWidth={1}
                />
              }
            >
              {label}
            </IconButton>
          ) : (
            <IconButton
              type="button"
              icon={
                <BsDownload
                  className="translate-y-0.5 text-white lg:translate-none"
                  strokeWidth={1}
                />
              }
            >
              {label}
            </IconButton>
          )}
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
    normal: ({ children, value }: any) => {
      // Check if the paragraph is completely empty (a line break in Sanity)
      // Sanity usually represents empty lines as a block with a single child that has text == ""
      const isEmpty =
        !value ||
        (value.children &&
          value.children.length === 1 &&
          value.children[0].text === "");

      return (
        // <p className={`text-besgrow-green ${isEmpty ? "mb-3" : "mb-1"}`}>
        <p className={`text-neutral-700 ${isEmpty ? "mb-3" : "mb-1"}`}>
          {!isEmpty && children}
        </p>
      );
    },
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
