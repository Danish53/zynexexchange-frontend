import Link from "next/link";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { getWalletOverviewDataApi } from "service/wallet-overview";
import { MdOutlineSwapHoriz, MdHistory } from "react-icons/md";
import { RiLuggageDepositLine, RiUserSettingsLine } from "react-icons/ri";
import { BiStore } from "react-icons/bi";
import { IoWalletOutline } from "react-icons/io5";
import { GiMiner } from "react-icons/gi";
import { IoIosGift } from "react-icons/io";

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
      icon: MdOutlineSwapHoriz,
    },
    {
      key: "deposit",
      label: t("Deposit"),
      href: authHref("/user/my-wallet/deposit"),
      icon: RiLuggageDepositLine,
    },
    {
      key: "market",
      label: t("Markets"),
      href: "/markets",
      icon: BiStore,
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
      icon: GiMiner,
    },
    {
      key: "history",
      label: t("History"),
      href: authHref("/user/wallet-history?type=deposit"),
      icon: MdHistory,
    },
    {
      key: "kyc",
      label: t("KYC"),
      href: authHref("/user/personal-verification"),
      icon: RiUserSettingsLine,
    },
    {
      key: "gift-cards",
      label: t("Gift Cards"),
      href: authHref("/gift-cards"),
      icon: IoIosGift,
    },
  ];

  return (
    <section className="md:tradex-hidden tradex-px-4 tradex-py-6 tradex-space-y-5">
      {loggedin && (
        <div className="tradex-rounded-2xl tradex-bg-background-main tradex-border tradex-border-background-primary tradex-shadow-[2px_2px_23px_0px_#6C6C6C0D] tradex-p-5 tradex-space-y-4">
          <p className="tradex-text-sm tradex-leading-4 tradex-font-semibold !tradex-text-body tradex-mb-0">
            {t("Est. Total Value")} ({settings?.currency_symbol || "$"})
          </p>
          <div>
            <p className="tradex-text-sm !tradex-text-body tradex-mb-1">
              {t("Total Assets")}:
            </p>
            <h3 className="tradex-text-2xl tradex-leading-7 tradex-font-bold !tradex-text-title tradex-mb-0">
              {settings?.currency_symbol || "$"}
              {totalUsd !== null ? parseFloat(totalUsd).toFixed(2) : "0.00"}
            </h3>
          </div>
          <Link href="/user/my-wallet/deposit">
            <a className="tradex-flex tradex-items-center tradex-justify-center tradex-gap-1 tradex-w-full tradex-h-[48px] tradex-rounded-xl tradex-bg-primary !tradex-text-white tradex-text-base tradex-font-bold tradex-no-underline hover:tradex-opacity-90">
              + {t("Add Funds")}
            </a>
          </Link>
        </div>
      )}

      <div className="tradex-grid tradex-grid-cols-4 tradex-gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link href={action.href} key={action.key}>
              <a className="tradex-flex tradex-flex-col tradex-items-center tradex-justify-center tradex-gap-2 tradex-py-4 tradex-rounded-xl tradex-bg-background-main tradex-border tradex-border-background-primary tradex-no-underline hover:tradex-border-primary tradex-transition-colors">
                <span className="tradex-w-11 tradex-h-11 tradex-rounded-full tradex-bg-primary tradex-flex tradex-items-center tradex-justify-center">
                  <Icon size={22} className="tradex-text-white" />
                </span>
                <span className="tradex-text-xs tradex-leading-none tradex-font-medium !tradex-text-title tradex-whitespace-nowrap">
                  {action.label}
                </span>
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default MobileQuickActions;
