import Link from "next/link";
import React from "react";

export default function AdsSection({ landing }: any) {
  if (Number(landing?.landing_advertisement_section_status) !== 1) return null;

  return (
    <div className="tradex-container tradex-pt-[60px] md:tradex-pt-[120px]">
      <Link href={`${landing?.landing_advertisement_url ?? "#"}`}>
        <img
          src={
            landing?.landing_advertisement_image
              ? landing?.landing_advertisement_image
              : ""
          }
          className=" tradex-rounded-xl tradex-max-h-[490px] tradex-w-full tradex-object-cover tradex-object-center cursor-pointer mt-0 tradex-shadow-[2px_2px_50px_0px_#0000000F] tradex-transition-transform tradex-duration-300 hover:tradex-scale-[1.01]"
        />
      </Link>
    </div>
  );
}
