import {
  CircleStackIcon,
  CubeTransparentIcon,
  CurrencyDollarIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";

// Main
export const MAIN_DATA = [
  {
    name: "Happy Jolly #61",
    price: 350,
    time: "16: 21: 01",
    image: "/images/df2f0e1f-fc01-4ecb-b3d7-d8dd27dd0d59.webp",
    rotation: "-rotate-[12deg]",
    scale: "scale-[.8]",
    direction: "left-0 right-[unset] lg:left-[unset] lg:right-[120px]",
  },
  {
    name: "Galaxy Fold",
    price: 900,
    time: "12: 21: 01",
    image: "/images/KakaoTalk_20240922_215005920_04.webp",
    zIndex: "z-10",
    direction: "right-[unset] lg:right-[60px]",
  },
  {
    name: "Galaxy Flip",
    price: 600,
    time: "08: 21: 01",
    image: "/images/11.jfif",
    rotation: "rotate-[12deg]",
    scale: "scale-[.8]",
    direction: "right-0",
  },
];
export const FAQ_DATA = [
  {
    name: "What is GU Shop?",
    description: `Galaxy University Shop is a shopping space specializing in smart devices for college students.
To make your busy campus life more efficient and smarter, you can find the latest Galaxy smartphones, tablets, laptops, and wearable devices in one place.`,
    icon: CircleStackIcon,
    color: "bg-violet-500",
  },
  {
    name: "Why should you choose the GU Shop?",
    description: `Most electronics stores offer a wide range of home appliances, but GU shop is tailored specifically for college students. We focus on what you need to succeed in your studies and daily life! In addition, GU shop provides a wide range of devices designed to perfectly support students in both their studies and daily lives, with special benefits and discounts available exclusively for college students.`,
    icon: WalletIcon,
    color: "bg-orange-500",
  },
  // {
  //   name: "How much do Happy Jolly cost?",
  //   description: `The prices vary depending on the rarity and edition of each NFT, but they start at around 0.01 ETH. That's a great deal for such unique and beautiful digital art that will make a great addition to your collection. Don't miss out on this opportunity to own a piece of Happy Jolly's world! Come and check out my listings on OpenSea now.`,
  //   icon: CurrencyDollarIcon,
  //   color: "bg-green-500",
  // },
  {
    name: "Does GU shop have an offline store?",
    description: "GU shop is based on an online store.",
    icon: CubeTransparentIcon,
    color: "bg-blue-500",
  },
];
