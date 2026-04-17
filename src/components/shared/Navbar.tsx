"use client";

import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProfileCard from "./ProfileCard";
import { CartModal } from "../Cardmodel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TUser } from "@/types/user.type";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  user: TUser | null;
}
export interface User<T> {
  user: {
    data: T;
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://res.cloudinary.com/drmeagmkl/image/upload/v1772007286/logo_rcsr8h.png",
    alt: "logo",
    title: "FoodHub",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "meals", url: "/meals" },
    { title: "providers", url: "/providers" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
  user,
}: Navbar1Props) => {
  const userinfo = user as TUser;
  return (
    <section
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-border",
        "px-1 sm:px-4 ",
        className
      )}
      style={{ maxWidth: "1480px" }}
    >
      <div
        className={cn(
          "w-full mx-auto flex flex-col relative px-0 md:px-2 lg:px-4",
        )}
        style={{ maxWidth: 1480 }}
      >
        {/* Desktop Menu */}
        <nav
          className={cn(
            "hidden lg:flex w-full items-center justify-between min-h-[60px] py-2 gap-2"
          )}
        >
          <div className="flex items-center min-w-fit">
            {/* Logo */}
            <a
              href={logo.url}
              className="flex items-center gap-2 min-w-[40px]"
              tabIndex={0}
            >
              <img
                src={logo.src}
                className="w-[38px] h-[38px] md:w-[44px] md:h-[44px] lg:w-[50px] lg:h-[50px] aspect-square dark:invert object-contain min-w-[32px] max-h-[56px] rounded-full"
                alt={logo.alt}
                style={{
                  objectFit: "contain",
                  height: "auto",
                  width: "100%",
                  minWidth: 32,
                  maxHeight: 56,
                }}
              />
              <span className="hidden xs:inline text-base md:text-lg font-semibold tracking-tighter leading-tight max-w-[150px] truncate">
                {logo.title}
              </span>
            </a>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <NavigationMenu>
              <NavigationMenuList className="text-base lg:text-[20px] flex flex-row gap-2 items-center">
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-fit">
            <CartModal />
            {userinfo ? (
              <>
                <ProfileCard profile={user as TUser} />
              </>
            ) : (
              <div className="flex gap-2 min-w-fit">
                <Button asChild variant="outline" size="sm" className="px-3 md:px-5 text-xs md:text-sm">
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>
                <Button asChild size="sm" className="px-3 md:px-5 text-xs md:text-sm">
                  <a href={auth.signup.url}>{auth.signup.title}</a>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex lg:hidden w-full flex-row items-center justify-between mt-1 mb-1 py-1">
          {/* Logo */}
          <a
            href={logo.url}
            className="flex items-center gap-2 min-w-[32px]"
            tabIndex={0}
          >
            <img
              src={logo.src}
              className="max-h-8 min-w-[32px] aspect-square dark:invert object-contain"
              alt={logo.alt}
              style={{
                objectFit: "contain",
                width: 36,
                maxHeight: 36,
              }}
            />
            <span className="hidden xs:inline text-sm font-semibold tracking-tighter">{logo.title}</span>
          </a>
          <div className="flex items-center gap-2">
            {/* NavigationMenu hidden on <lg */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="ml-1 sm:ml-2">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto p-0 min-w-[72vw] sm:min-w-[320px] md:min-w-[350px] max-w-full">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2 my-3">
                      <img
                        src={logo.src}
                        className="max-h-8 min-w-[32px] aspect-square dark:invert object-contain"
                        alt={logo.alt}
                      />
                      <span className="hidden xs:inline text-base font-semibold tracking-tighter">{logo.title}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-2"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  {userinfo ? (
                    <div className="py-2">
                      <ProfileCard profile={user as TUser} />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline" className="text-sm">
                        <a href={auth.login.url}>{"Login"}</a>
                      </Button>
                      <Button asChild className="text-sm">
                        <a href={auth.signup.url}>{auth.signup.title}</a>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            {/* Cart on mobile */}
            <div className="flex items-center ml-1">
              <CartModal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Desktop navigation menu item with responsive text and spacing
const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="text-base lg:text-[20px] px-2 md:px-3">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground w-[90vw] max-w-md md:max-w-xl p-2">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-full max-w-[340px]">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  const currentPath = usePathname();
  const isActive = currentPath === item.url;
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        className={cn(
          "group inline-flex h-12 min-w-[70px] md:min-w-[90px] md:w-auto items-center justify-center rounded-full shadow transition-all duration-200 px-4 md:px-6 text-sm md:text-[17px] font-semibold tracking-wide",
          isActive
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
            : "bg-white text-gray-700 hover:bg-blue-50 hover:from-blue-500/10 hover:to-purple-500/10 hover:text-blue-700"
        )}
        asChild
        style={{
          border: isActive ? "2px solid #7C3AED" : "1.5px solid #E5E7EB",
          boxShadow: isActive
            ? "0 4px 20px 0 rgba(124,58,237,0.10)"
            : "0 1px 4px 0 rgba(0,0,0,0.04)",
        }}
      >
        <Link
          href={item.url}
          className={cn(
            "w-full h-full flex items-center justify-center",
            isActive ? "" : "transition-colors"
          )}
        >
          <span
            className={cn(
              "relative",
              isActive
                ? "after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:rounded-md after:content-['']"
                : ""
            )}
          >
            {item.title}
          </span>
        </Link>
      </NavigationMenuLink>
 
    </NavigationMenuItem>
  );
};

// Mobile: Collapsible with good touch padding and breakpoints
const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-[15px] md:text-base py-1 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }
  return (
    <a
      key={item.title}
      href={item.url}
      className="block w-full py-2 text-[15px] md:text-base font-semibold pl-1"
    >
      {item.title}
    </a>
  );
};

// Used in dropdowns and mobile for full width/clickable menu items
const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className={cn(
        "flex flex-row gap-4 rounded-md py-2 px-2 md:py-3 md:px-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground",
        "items-center",
        "w-full"
      )}
      href={item.url}
    >
      {item.icon && <div className="text-foreground">{item.icon}</div>}
      <div className="flex-1">
        <div className="text-xs md:text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-xs md:text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar };