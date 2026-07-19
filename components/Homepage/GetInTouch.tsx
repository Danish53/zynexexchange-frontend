import React from "react";
import useTranslation from "next-translate/useTranslation";
import { useAppTitle } from "helpers/hooks";

const GetInTouch = ({ landing, featureListdata }: any) => {
  const { t } = useTranslation("common");
  const appTitle = useAppTitle();
  return (
    <>
      {parseInt(landing?.landing_sixth_section_status) === 1 && (
        <section className="tradex-relative tradex-pt-10 md:tradex-pt-[120px] tradex-overflow-hidden">
          <div className="tradex-bg-primary/30 tradex-w-[300px] tradex-h-[300px] tradex-rounded-full tradex-left-0 tradex-top-0 tradex-absolute z-[1] tradex-blur-[140px] tradex-hidden md:tradex-block"></div>
          <img
            src="/get_in_touch.png"
            alt=""
            className="tradex-absolute tradex-left-0 tradex-top-0 tradex-max-h-[580px] z-[2] tradex-hidden md:tradex-block"
          />
          <div className="tradex-container tradex-space-y-6 md:tradex-space-y-10 tradex-relative">
            <div className="tradex-text-center">
              <h3 className="tradex-text-[22px] tradex-leading-[28px] md:tradex-text-[32px] md:tradex-leading-[48px] xl:tradex-text-[48px] xl:tradex-leading-[60px] !tradex-text-title tradex-font-bold tradex-tracking-[-0.02em]">
                {landing?.landing_feature_title ||
                  "Get In Touch. Stay In Touch"}
              </h3>
            </div>
            <div className="tradex-grid tradex-grid-cols-2 md:tradex-grid-cols-2 xl:tradex-grid-cols-4 tradex-gap-3 md:tradex-gap-6">
              {featureListdata.map((item: any, index: any) => (
                <a
                  href={item.feature_url || "/"}
                  target="_blank"
                  rel="noreferrer"
                  key={index}
                  className="tradex-flex tradex-flex-col tradex-items-center tradex-justify-center tradex-gap-y-2 md:tradex-gap-y-4 tradex-py-5 md:tradex-py-8 tradex-px-2 md:tradex-px-3 tradex-bg-background-card tradex-rounded-xl tradex-border tradex-border-background-primary md:tradex-min-w-[312px] md:tradex-min-h-[246px] tradex-shadow-[2px_2px_50px_0px_#0000000F] tradex-transition-all tradex-duration-[260ms] tradex-ease-[cubic-bezier(0.42,0,0.58,1)] tradex-delay-[0s] hover:-tradex-translate-y-2 hover:tradex-border-primary/40"
                >
                  <div className="tradex-flex tradex-flex-col tradex-gap-y-2 md:tradex-gap-y-6 tradex-items-center tradex-justify-center">
                    <img
                      src={item?.feature_icon || "/get_in_touch_icon.png"}
                      className="tradex-max-w-[40px] tradex-max-h-[40px] md:tradex-max-w-[60px] md:tradex-max-h-[60px] tradex-w-full tradex-h-full tradex-object-cover tradex-object-center"
                      alt=""
                    />
                    <p className="tradex-text-xs md:tradex-text-2xl md:tradex-leading-[30px] !tradex-text-title tradex-font-bold tradex-text-center">
                      {item?.feature_title || t("Careers")}
                    </p>
                  </div>
                  <p className="tradex-text-[10px] md:tradex-text-sm md:tradex-leading-5 !tradex-text-body tradex-text-center tradex-line-clamp-3 md:tradex-line-clamp-none">
                    {item?.description ||
                      t(` Help build the future of technology. Start your new
                        career at ${appTitle}`)}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GetInTouch;
