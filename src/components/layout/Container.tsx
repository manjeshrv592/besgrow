import { cn } from "@/lib/utils";

type Alignment = "center" | "left" | "right";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";

type ResponsiveAlignment = {
    default: Alignment;
} & Partial<Record<Breakpoint, Alignment>>;

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
    alignment?: Alignment | ResponsiveAlignment;
};

const marginClasses: Record<string, Record<Alignment, string>> = {
    default: { center: "mx-auto", left: "mr-auto ml-0", right: "ml-auto mr-0" },
    sm: { center: "sm:mx-auto", left: "sm:mr-auto sm:ml-0", right: "sm:ml-auto sm:mr-0" },
    md: { center: "md:mx-auto", left: "md:mr-auto md:ml-0", right: "md:ml-auto md:mr-0" },
    lg: { center: "lg:mx-auto", left: "lg:mr-auto lg:ml-0", right: "lg:ml-auto lg:mr-0" },
    xl: { center: "xl:mx-auto", left: "xl:mr-auto xl:ml-0", right: "xl:ml-auto xl:mr-0" },
    "2xl": { center: "2xl:mx-auto", left: "2xl:mr-auto 2xl:ml-0", right: "2xl:ml-auto 2xl:mr-0" },
    "3xl": { center: "3xl:mx-auto", left: "3xl:mr-auto 3xl:ml-0", right: "3xl:ml-auto 3xl:mr-0" },
    "4xl": { center: "4xl:mx-auto", left: "4xl:mr-auto 4xl:ml-0", right: "4xl:ml-auto 4xl:mr-0" },
    "5xl": { center: "5xl:mx-auto", left: "5xl:mr-auto 5xl:ml-0", right: "5xl:ml-auto 5xl:mr-0" },
    "6xl": { center: "6xl:mx-auto", left: "6xl:mr-auto 6xl:ml-0", right: "6xl:ml-auto 6xl:mr-0" },
    "7xl": { center: "7xl:mx-auto", left: "7xl:mr-auto 7xl:ml-0", right: "7xl:ml-auto 7xl:mr-0" },
    "8xl": { center: "8xl:mx-auto", left: "8xl:mr-auto 8xl:ml-0", right: "8xl:ml-auto 8xl:mr-0" },
    "9xl": { center: "9xl:mx-auto", left: "9xl:mr-auto 9xl:ml-0", right: "9xl:ml-auto 9xl:mr-0" },
};

const widthClasses: Record<string, Record<Alignment, string>> = {
    default: {
        center: "max-w-[95%]",
        left: "max-w-[97.5%]",
        right: "max-w-[97.5%]",
    },
    sm: {
        center: "sm:max-w-[95%]",
        left: "sm:max-w-[97.5%]",
        right: "sm:max-w-[97.5%]",
    },
    md: {
        center: "md:max-w-[90%]",
        left: "md:max-w-[95%]",
        right: "md:max-w-[95%]",
    },
    lg: {
        center: "lg:max-w-[85%]",
        left: "lg:max-w-[92.5%]",
        right: "lg:max-w-[92.5%]",
    },
    xl: {
        center: "xl:max-w-[85%]",
        left: "xl:max-w-[92.5%]",
        right: "xl:max-w-[92.5%]",
    },
    "2xl": {
        center: "2xl:max-w-[85%]",
        left: "2xl:max-w-[92.5%]",
        right: "2xl:max-w-[92.5%]",
    },
    "3xl": {
        center: "3xl:max-w-[85%]",
        left: "3xl:max-w-[92.5%]",
        right: "3xl:max-w-[92.5%]",
    },
    "4xl": {
        center: "4xl:max-w-[85%]",
        left: "4xl:max-w-[92.5%]",
        right: "4xl:max-w-[92.5%]",
    },
    "5xl": {
        center: "5xl:max-w-[85%]",
        left: "5xl:max-w-[92.5%]",
        right: "5xl:max-w-[92.5%]",
    },
    "6xl": {
        center: "6xl:max-w-[85%]",
        left: "6xl:max-w-[92.5%]",
        right: "6xl:max-w-[92.5%]",
    },
    "7xl": {
        center: "7xl:max-w-[85%]",
        left: "7xl:max-w-[92.5%]",
        right: "7xl:max-w-[92.5%]",
    },
    "8xl": {
        center: "8xl:max-w-[85%]",
        left: "8xl:max-w-[92.5%]",
        right: "8xl:max-w-[92.5%]",
    },
    "9xl": {
        center: "9xl:max-w-[85%]",
        left: "9xl:max-w-[92.5%]",
        right: "9xl:max-w-[92.5%]",
    },
};

function getAlignmentClasses(alignment: Alignment | ResponsiveAlignment): string[] {
    // Simple string — apply as default (no breakpoint prefix)
    if (typeof alignment === "string") {
        return [
            marginClasses.default[alignment],
            widthClasses.default[alignment],
            widthClasses.md[alignment],
            widthClasses.lg[alignment],
        ];
    }

    // Responsive object
    const classes: string[] = [];

    // Always apply default
    const defaultAlign = alignment.default;
    classes.push(marginClasses.default[defaultAlign]);
    classes.push(widthClasses.default[defaultAlign]);

    // Apply breakpoint overrides
    const breakpoints: Breakpoint[] = ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"];

    // Track the "current" alignment as we go up breakpoints to apply width classes
    let currentAlign = defaultAlign;

    for (const bp of breakpoints) {
        if (alignment[bp]) {
            currentAlign = alignment[bp];
            classes.push(marginClasses[bp][currentAlign]);
        }
        // Always apply width class for this breakpoint based on current alignment
        classes.push(widthClasses[bp][currentAlign]);
    }

    return classes;
}

export default function Container({ children, className, alignment = "center" }: ContainerProps) {
    return (
        <div className={cn("", ...getAlignmentClasses(alignment), className)}>
            {children}
        </div>
    );
}
