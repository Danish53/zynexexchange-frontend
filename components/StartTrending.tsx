import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";

export default function StartTrending() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  return (
    <section className="tradex-mx-3 md:tradex-mx-2 xl:tradex-mx-0 tradex-pt-10 md:tradex-pt-[120px] -tradex-mb-[40px] md:-tradex-mb-[80px]">
      <div
        className={`tradex-bg-primary tradex-container tradex-flex tradex-flex-col tradex-items-center tradex-justify-center tradex-gap-4 md:tradex-gap-8 tradex-rounded-2xl tradex-py-8 md:tradex-py-10 tradex-px-4 tradex-min-h-[140px] md:tradex-min-h-[220px] tradex-relative tradex-overflow-hidden tradex-shadow-[2px_2px_50px_0px_#0000001A]`}
      >
        <img
          src="/start_trend_left.png"
          className="tradex-absolute tradex-left-0 tradex-opacity-40 md:tradex-opacity-100"
          alt=""
        />
        <h2 className="tradex-text-[18px] tradex-leading-[26px] md:tradex-text-[40px] md:tradex-leading-[60px] tradex-font-bold !tradex-text-white tradex-relative tradex-z-10 tradex-text-center tradex-px-2">
          {t("Start Your Crypto Journey Now!")}
        </h2>

        <div className="tradex-flex tradex-flex-col sm:tradex-flex-row tradex-gap-3 sm:tradex-gap-6 tradex-items-stretch sm:tradex-items-center tradex-relative tradex-z-10 tradex-w-full sm:tradex-w-auto">
          {!isLoggedIn && (
            <Link href="/signup">
              <button className="tradex-w-full sm:tradex-w-auto tradex-px-6 tradex-py-3 md:tradex-px-10 md:tradex-py-4 tradex-rounded-xl tradex-bg-white tradex-text-black tradex-text-sm md:tradex-text-base tradex-font-bold tradex-transition-transform hover:tradex-scale-105">
                {t("Sign Up")}
              </button>
            </Link>
          )}
          <a
            href={
              router.locale !== "en"
                ? `/${router.locale}/exchange/dashboard`
                : "/exchange/dashboard"
            }
            className="tradex-w-full sm:tradex-w-auto"
          >
            <button className="tradex-w-full sm:tradex-w-auto tradex-px-6 tradex-py-3 md:tradex-px-10 md:tradex-py-4 tradex-rounded-xl tradex-bg-white tradex-text-black tradex-text-sm md:tradex-text-base tradex-font-bold tradex-transition-transform hover:tradex-scale-105">
              {t("Trade Now")}
            </button>
          </a>
        </div>
        <img
          src="/start_trend_right.png"
          className="tradex-absolute tradex-right-0 tradex-opacity-40 md:tradex-opacity-100"
          alt=""
        />
      </div>
    </section>
  );
}
