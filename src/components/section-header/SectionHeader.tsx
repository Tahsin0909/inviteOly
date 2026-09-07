import { ReactNode } from "react";

export const SectionHeader = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="max-w-[630px] mx-auto">
      <h1 className="md:text-6xl text-4xl font-bold text-center text-primary">
        {title}
      </h1>
      <p className="text-center text-gray-600 mt-2 mb-6">{children}</p>
    </div>
  );
};
