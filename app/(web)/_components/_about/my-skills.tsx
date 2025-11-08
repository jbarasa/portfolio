import Image from "next/image";
import { ReactNode } from "react";

type MySkillsProps = {
  skill: ReactNode;
  skillImage: string;
  why: ReactNode;
  how: ReactNode;
};

export default function MySkills({
  skill,
  skillImage,
  why,
  how,
}: MySkillsProps) {
  return (
    <div className="flex max-w-2xl flex-col gap-4 p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-[100%] md:h-20 md:w-20">
        <Image
          src={skillImage}
          alt={`${skill} Logo`}
          className="h-12 w-12 rounded-[100%] object-cover md:h-20 md:w-20"
          width={100}
          height={100}
        />
      </div>
      <div className="pt-1 md:pt-2">
        <h2 className="text-lg font-bold md:text-xl">{skill}</h2>
        <div className="mt-2 max-w-fit rounded-4xl bg-gray-100 px-2 md:mt-3">
          <h4 className="text-xs font-semibold text-gray-500 md:text-sm">
            Why
          </h4>
        </div>
        {why}
        <div className="mt-4 max-w-fit rounded-4xl bg-gray-100 px-2">
          <h4 className="text-xs font-semibold text-gray-500 md:text-sm">
            How
          </h4>
        </div>
        {how}
      </div>
    </div>
  );
}
