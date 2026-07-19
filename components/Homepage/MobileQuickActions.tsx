import Link from "next/link";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { getWalletOverviewDataApi } from "service/wallet-overview";
import {
  HiOutlineArrowsRightLeft,
  HiOutlineArrowDownTray,
  HiOutlineBuildingStorefront,
  HiOutlineGift,
  HiOutlineClock,
  HiOutlineUserCircle,
  HiOutlineChartBarSquare,
} from "react-icons/hi2";
import { IoWalletOutline } from "react-icons/io5";

const MobileQuickActions = ({ loggedin }: { loggedin: boolean }) => {
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);
  const [totalUsd, setTotalUsd] = useState<string | null>(null);

  useEffect(() => {
    if (!loggedin) return;
    getWalletOverviewDataApi("")
      .then((response: any) => {
        if (response?.success) {
          setTotalUsd(response?.data?.total_usd ?? "0");
        }
      })
      .catch(() => {});
  }, [loggedin]);

  const authHref = (href: string) => (loggedin ? href : "/signin");

  const actions = [
    {
      key: "convert",
      label: t("Convert"),
      href: authHref("/user/swap-coin"),
      icon: HiOutlineArrowsRightLeft,
    },
    {
      key: "deposit",
      label: t("Deposit"),
      href: authHref("/user/my-wallet/deposit"),
      icon: HiOutlineArrowDownTray,
    },
    {
      key: "market",
      label: t("Markets"),
      href: "/markets",
      icon: HiOutlineBuildingStorefront,
    },
    {
      key: "assets",
      label: t("Assets"),
      href: authHref("/wallet-overview"),
      icon: IoWalletOutline,
    },
    {
      key: "staking",
      label: t("Staking"),
      href: authHref("/staking"),
      icon: HiOutlineChartBarSquare,
    },
    {
      key: "history",
      label: t("History"),
      href: authHref("/user/wallet-history?type=deposit"),
      icon: HiOutlineClock,
    },
    {
      key: "kyc",
      label: t("KYC"),
      href: authHref("/user/personal-verification"),
      icon: HiOutlineUserCircle,
    },
    {
      key: "gift-cards",
      label: t("Gift Cards"),
      href: authHref("/gift-cards"),
      icon: HiOutlineGift,
    },
  ];

  return (
    <section className="md:tradex-hidden tradex-relative tradex-z-20 tradex-px-4 tradex-pt-2 tradex-pb-8">
      <div className="tradex-rounded-2xl tradex-bg-background-main tradex-border tradex-border-background-primary tradex-shadow-[0_8px_32px_rgba(0,0,0,0.12)] tradex-p-4 tradex-space-y-5">
        {loggedin && (
          <div className="tradex-rounded-xl tradex-bg-background-primary/60 tradex-p-4 tradex-space-y-3">
            <p className="tradex-text-xs tradex-leading-4 tradex-font-medium !tradex-text-body tradex-mb-0 tradex-uppercase tradex-tracking-wide">
              {t("Est. Total Value")} ({settings?.currency_symbol || "$"})
            </p>
            <h3 className="tradex-text-[28px] tradex-leading-8 tradex-font-bold !tradex-text-title tradex-mb-0 tradex-tracking-[-0.02em]">
              {settings?.currency_symbol || "$"}
              {totalUsd !== null ? parseFloat(totalUsd).toFixed(2) : "0.00"}
            </h3>
            <Link href="/user/my-wallet/deposit">
              <a className="tradex-flex tradex-items-center tradex-justify-center tradex-gap-1.5 tradex-w-full tradex-h-[46px] tradex-rounded-xl tradex-bg-primary !tradex-text-white tradex-text-sm tradex-font-bold tradex-no-underline hover:tradex-opacity-90 tradex-shadow-[0_6px_20px_rgba(var(--primary-color),0.35)]">
                + {t("Add Funds")}
              </a>
            </Link>
          </div>
        )}

        <div className="tradex-grid tradex-grid-cols-4 tradex-gap-2.5">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link href={action.href} key={action.key}>
                <a className="tradex-flex tradex-flex-col tradex-items-center tradex-justify-start tradex-gap-2 tradex-py-3 tradex-px-1 tradex-rounded-xl tradex-bg-background-primary/40 tradex-border tradex-border-transparent tradex-no-underline active:tradex-scale-95 tradex-transition-transform">
                  <span className="tradex-w-10 tradex-h-10 tradex-rounded-full tradex-bg-primary tradex-flex tradex-items-center tradex-justify-center tradex-shrink-0 tradex-shadow-[0_4px_12px_rgba(var(--primary-color),0.3)]">
                    <Icon size={18} className="tradex-text-white" />
                  </span>
                  <span className="tradex-text-[10px] tradex-leading-[12px] tradex-font-medium !tradex-text-title tradex-text-center tradex-line-clamp-2">
                    {action.label}
                  </span>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MobileQuickActions;
