"use client";

import { openContact } from "@/components/ContactDialog";

export default function ContactButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button onClick={openContact} className={className}>
      {children}
    </button>
  );
}
