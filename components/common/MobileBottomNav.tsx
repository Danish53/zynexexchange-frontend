import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import {
  HiOutlineHome,
  HiOutlineChartBarSquare,
  HiOutlineBuildingStorefront,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { IoWalletOutline } from "react-icons/io5";

const MobileBottomNav = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { settings } = useSelector((state: RootState) => state.common);

  const navItems = [
    {
      key: "home",
      label: t("Home"),
      href: "/",
      icon: HiOutlineHome,
      active: router.pathname === "/",
    },
    {
      key: "trade",
      label: t("Trade"),
      href: "/exchange/dashboard",
      icon: HiOutlineChartBarSquare,
      active: router.pathname.startsWith("/exchange"),
    },
    {
      key: "markets",
      label: t("Markets"),
      href: "/markets",
      icon: HiOutlineBuildingStorefront,
      active: router.pathname.startsWith("/markets"),
    },
    ...(parseInt(settings?.p2p_module) === 1
      ? [
          {
            key: "p2p",
            label: t("P2P"),
            href: isLoggedIn ? "/p2p" : "/signin",
            icon: HiOutlineUserGroup,
            active: router.pathname.startsWith("/p2p"),
          },
        ]
      : []),
    {
      key: "wallet",
      label: t("Wallet"),
      href: isLoggedIn ? "/wallet-overview" : "/signin",
      icon: IoWalletOutline,
      active:
        router.pathname.startsWith("/wallet-overview") ||
        router.pathname.startsWith("/user/my-wallet"),
    },
  ];

  return (
    <>
      <nav
        className="tradex-fixed tradex-bottom-0 tradex-left-0 tradex-right-0 tradex-z-[1000] md:tradex-hidden tradex-bg-background-main tradex-border-t tradex-border-background-primary tradex-shadow-[0px_-2px_12px_0px_rgba(0,0,0,0.25)]"
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
        aria-label="Mobile bottom navigation"
      >
        <ul
          className="tradex-grid tradex-h-[64px] tradex-m-0 tradex-p-0 tradex-list-none"
          style={{
            gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))`,
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.key} className="tradex-h-full">
                <Link href={item.href}>
                  <a
                    className={`tradex-h-full tradex-flex tradex-flex-col tradex-items-center tradex-justify-center tradex-gap-1 tradex-no-underline tradex-transition-colors ${
                      item.active
                        ? "!tradex-text-primary"
                        : "tradex-text-body hover:tradex-text-title"
                    }`}
                  >
                    <Icon size={22} className="tradex-shrink-0" strokeWidth={1.8} />
                    <span className="tradex-text-[11px] tradex-leading-none tradex-font-medium tradex-whitespace-nowrap">
                      {item.label}
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div
        className="md:tradex-hidden"
        style={{
          height: "calc(64px + env(safe-area-inset-bottom))",
        }}
        aria-hidden
      />
    </>
  );
};

export default MobileBottomNav;
