import { ReactNode } from "react";

const SectionTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-lg font-semibold text-primary dark:text-foreground uppercase tracking-[2px] font-work-sans border-s-4 border-shamrock-green ps-3 mb-5">
      {children}
    </h2>
  );
};

export default SectionTitle;
