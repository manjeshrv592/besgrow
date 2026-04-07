"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import IconButton from "@/components/ui/IconButton";
import { CiMail } from "react-icons/ci";
import { LuUser, LuPhone, LuBuilding2, LuMessageSquare } from "react-icons/lu";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[+]?[\d\s\-()]{7,20}$/, "Please enter a valid phone number"),
  company: z.string().min(1, "Company name is required"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // TODO: Replace with actual API call (e.g. send email)
      console.log("Contact form submitted:", data);

      // Simulate a short delay as if sending
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });

      reset();
    } catch {
      toast.error("Failed to send message", {
        description: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      {/* Name */}
      <div>
        <div className="relative">
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 left-[1em] flex items-center justify-center">
            <LuUser size="1.2em" strokeWidth={1.5} />
          </span>
          <Input
            placeholder="Name"
            className="rounded-md border-neutral-500 bg-white pl-[3em]"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="mt-1 px-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <div className="relative">
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 left-[1em] flex items-center justify-center">
            <CiMail size="1.4em" strokeWidth={0.5} />
          </span>
          <Input
            type="email"
            placeholder="Email ID"
            className="rounded-md border-neutral-500 bg-white pl-[3em]"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="mt-1 px-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <div className="relative">
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 left-[1em] flex items-center justify-center">
            <LuPhone size="1.2em" strokeWidth={1.5} />
          </span>
          <Input
            type="tel"
            placeholder="Phone Number"
            className="rounded-md border-neutral-500 bg-white pl-[3em]"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </div>
        {errors.phone && (
          <p className="mt-1 px-1 text-xs text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Company */}
      <div>
        <div className="relative">
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 left-[1em] flex items-center justify-center">
            <LuBuilding2 size="1.2em" strokeWidth={1.5} />
          </span>
          <Input
            placeholder="Company Name"
            className="rounded-md border-neutral-500 bg-white pl-[3em]"
            aria-invalid={!!errors.company}
            {...register("company")}
          />
        </div>
        {errors.company && (
          <p className="mt-1 px-1 text-xs text-red-600">{errors.company.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <div className="relative">
          <span className="text-muted-foreground absolute top-[1em] left-[1em]">
            <LuMessageSquare size="1.2em" strokeWidth={1.5} />
          </span>
          <Textarea
            placeholder="Message"
            className="min-h-32 rounded-md border-neutral-500 bg-white pl-[3em]"
            aria-invalid={!!errors.message}
            {...register("message")}
          />
        </div>
        {errors.message && (
          <p className="mt-1 px-1 text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-center pt-2">
        <IconButton
          className="text-center"
          type="submit"
          disabled={isSubmitting}
          icon={<CiMail className="text-white" strokeWidth={1} />}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </IconButton>
      </div>
    </form>
  );
}
