import { motion, useAnimation } from "framer-motion";
import ImageComponent from "components/common/ImageComponent";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import PlaceBottomRight from "components/gradient/placeBottomRight";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { TiArrowRight } from "react-icons/ti";
import AnimateCoverSvg from "components/AnimateCoverSvg";
import AnimateVTwo from "components/AnimateVTwo";
import TextAnimation from "components/TextAnimation";

const Cover = ({ landing, loggedin, landing_banner_image }: any) => {
  const { landing_title, landing_description } = landing;
  const router = useRouter();
  const { t } = useTranslation("common");
  const textControls = useAnimation();
  const imageControls = useAnimation();

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        delay: index * 0.5,
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    }),
  };

  useEffect(() => {
    textControls.start("visible");
    setTimeout(() => {
      imageControls.start("visible");
    }, 1500);
  }, [textControls, imageControls]);

  return (
    <div>
      {parseInt(landing?.landing_first_section_status) === 1 && (
        <section className="tradex-bg-background-primary tradex-min-h-[auto] md:tradex-min-h-[660px] tradex-relative tradex-overflow-hidden">
          <div className="tradex-bg-primary/30 tradex-w-full tradex-h-[280px] md:tradex-h-[385px] tradex-rounded-full tradex-left-0 tradex-top-0 tradex-absolute z-[1] tradex-blur-[140px]"></div>

          <img
            src="./banner_top_left.png"
            className="tradex-absolute tradex-top-0 tradex-left-0 tradex-hidden md:tradex-block"
            alt=""
          />
          <div className="tradex-container tradex-pt-6 md:tradex-pt-[80px] tradex-pb-8 md:tradex-pb-[140px] tradex-flex tradex-flex-col lg:tradex-flex-row tradex-items-center tradex-relative tradex-z-10 tradex-gap-5 md:tradex-gap-0">
            <div className="xl:tradex-min-w-[700px] tradex-max-w-[700px] tradex-space-y-5 md:tradex-space-y-8 xl:tradex-space-y-[60px] tradex-w-full">
              <div className="tradex-space-y-3 md:tradex-space-y-6">
                <h1 className="tradex-text-[28px] tradex-leading-[36px] md:tradex-text-[48px] md:tradex-leading-[64px] xl:tradex-text-[64px] xl:tradex-leading-[80px] !tradex-text-title tradex-font-bold tradex-tracking-[-0.02em]">
                  {landing_title ? (
                    <TextAnimation text={landing_title} />
                  ) : (
                    <>
                      <TextAnimation text={`Make Easy Your`} />
                      <span className="!tradex-text-primary">
                        {t("Buy Sell & Trade")}
                      </span>
                      <span>{t(" Crypto Currency")}</span>
                    </>
                  )}
                </h1>
                <p className="tradex-max-w-[633px] tradex-text-sm tradex-leading-5 md:tradex-text-base md:tradex-leading-6 !tradex-text-body">
                  {landing_description ||
                    t(`Uncover the ultimate synergy of trading and investment success
                  with our all-in-one platform – where seamless functionality
                  meets informed decision-making`)}
                </p>
              </div>
              {!loggedin && (
                <Link
                  href={
                    router.locale !== "en"
                      ? `/${router.locale}/signup`
                      : "/signup"
                  }
                >
                  <a className="tradex-w-full sm:tradex-w-fit tradex-px-6 tradex-py-3.5 md:tradex-px-8 md:tradex-py-4 tradex-bg-primary tradex-flex tradex-justify-center tradex-gap-2 tradex-items-center tradex-rounded-xl !tradex-text-white hover:tradex-opacity-90 tradex-shadow-[0_8px_24px_rgba(var(--primary-color),0.35)]">
                    <span className="tradex-text-sm md:tradex-text-base tradex-leading-6 tradex-font-semibold">
                      {t("Register Now")}
                    </span>
                    <span>
                      <TiArrowRight size={24} />
                    </span>
                  </a>
                </Link>
              )}
            </div>
            <div className="tradex-flex tradex-justify-center tradex-w-full">
              {landing_banner_image ? (
                <img
                  src={landing_banner_image || "./cover_img.png"}
                  alt=""
                  className="tradex-max-h-[260px] sm:tradex-max-h-[340px] md:tradex-max-h-[480px] tradex-w-auto tradex-object-contain"
                />
              ) : (
                <div className="hero-animate-wrap 2xl:-tradex-mt-[58px]">
                  <AnimateCoverSvg />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cover;
