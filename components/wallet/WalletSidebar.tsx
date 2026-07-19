import { STATUS_ACTIVE } from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
const profileTabs = [
  {
    name: "My Profile",
    url: `/user/profile`,
  },
  {
    name: "Edit Profile",
    url: `/user/edit-profile`,
  },
  {
    name: "Phone Verification",
    url: `/user/phone-verification`,
  },
  {
    name: "Security",
    url: `/user/security`,
  },
  {
    name: "KYC Verification",
    url: `/user/personal-verification`,
  },
  {
    name: "Bank List",
    url: `/user/bank/list`,
  },
  {
    name: "Change Password",
    url: `/user/change-password`,
  },
];
export default function WalletSidebar() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { settings } = useSelector((state: RootState) => state.common);

  const isTransferShow =
    Number(settings?.enable_future_trade) === STATUS_ACTIVE ||
    Number(settings.p2p_module) === STATUS_ACTIVE;

  const walletTabs = [
    { name: "Overview", url: "/wallet-overview", show: true },
    { name: "Spot", url: "/user/my-wallet", show: true },
    {
      name: "Futures",
      url: "/futures/wallet-list",
      show: Number(settings?.enable_future_trade) === 1,
    },
    {
      name: "P2P",
      url: "/p2p/p2p-wallet",
      show: parseInt(settings.p2p_module) === 1,
    },
    { name: "Transfer", url: "/transfer", show: isTransferShow },
    { name: "Check Deposit", url: "/user/check-deposit", show: true },
    {
      name: "Deposit History",
      url: "/user/wallet-history?type=deposit",
      show: true,
    },
    {
      name: "Withdrawal History",
      url: "/user/wallet-history?type=withdrawal",
      show: true,
    },
    {
      name: "Transaction History",
      url: "/user/transaction-history",
      show: true,
    },
  ];

  return (
    <div className=" tradex-h-fit tradex-bg-background-main tradex-rounded-2xl tradex-border tradex-border-background-primary tradex-shadow-[2px_2px_23px_0px_#6C6C6C0D] tradex-px-4 tradex-pt-4 lg:tradex-pt-12 tradex-pb-4 lg:tradex-pb-6 tradex-space-y-8">
      <div className=" tradex-flex tradex-flex-row lg:tradex-flex-col tradex-gap-2 lg:tradex-gap-4 tradex-overflow-x-auto lg:tradex-overflow-visible tradex-pb-1 lg:tradex-pb-0 tradex-scrollbar-none">
        {walletTabs
          .filter((tab) => tab.show)
          .map((tab, index) => (
            <Link href={tab.url} key={index}>
              <a
                className={` tradex-inline-block tradex-w-auto lg:tradex-w-full tradex-whitespace-nowrap lg:tradex-whitespace-normal tradex-py-2.5 lg:tradex-py-3 tradex-px-4 lg:tradex-px-2.5 tradex-rounded-lg tradex-bg-background-primary !tradex-text-title tradex-text-sm md:tradex-text-base lg:tradex-text-xl tradex-leading-6 tradex-font-medium tradex-transition-colors ${
                  router.pathname == tab.url &&
                  "!tradex-bg-primary !tradex-text-white"
                }`}
              >
                {t(tab.name)}
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
}
