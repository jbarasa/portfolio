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
    <div className="p-4 flex flex-col gap-4 border border-gray-500 shadow-xs shadow-gray-50 rounded-3xl max-w-2xl">
      <div className="rounded-[100%] w-20 h-20 flex items-center justify-center">
        <Image
          src={skillImage}
          alt={`${skill} Logo`}
          className="w-20 height-20 rounded-[100%] object-cover"
          width={100}
          height={100}
        />
      </div>
      <div className="pt-8">
        <h2 className="text-xl font-bold">{skill}</h2>
        <div className=" bg-gray-100  px-2 max-w-fit rounded-4xl mt-4">
          <h4 className="font-semibold text-gray-500 text-sm">Why</h4>
        </div>
        {why}
        <div className=" bg-gray-100  px-2 max-w-fit rounded-4xl mt-4">
          <h4 className="font-semibold text-gray-500 text-sm">How</h4>
        </div>
        {how}
      </div>
    </div>
  );
}
