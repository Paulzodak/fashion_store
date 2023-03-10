import * as React from "react";
import { TfiClose as CloseBtn } from "react-icons/tfi";
import { motion } from "framer-motion";
import Image from "next/image";
import user from "../../assets/navbar/user.png";
import { CiSettings as SettingsIcon } from "react-icons/ci";
import { useRouter } from "next/router";
import { Button } from "../atoms/Button";
export interface ISideNavProps {}

export function SideNav(props: any) {
  const router = useRouter();
  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,

      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const items = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 1.2 } },
  };
  return (
    <>
      {!props.setShowNav && (
        <motion.div
          initial={{ rotate: -180 }}
          animate={{
            rotate: 0,
            transition: {
              duration: 1,
            },
          }}
          exit={{ rotate: -180 }}
          className="relative float-right m-5 "
        >
          <CloseBtn
            onClick={() => props.setShowSideNav(false)}
            // className="relative float-right m-5"
            size="1.5rem"
          />
        </motion.div>
      )}
      <div
        onClick={() => router.push("/auth/login")}
        className="w-[25%] m-5 h-10"
      >
        <Button animate={false} loading={false} text="Login/Sign"></Button>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className=" mt-20 mx-4 "
      >
        {props.navItems.map((item: any) => {
          return (
            <motion.div
              className={`hover:border-l-4 hover:border-btnGreen cursor-pointer duration-150 ease-out mb-8 grid grid-cols-[0.7fr_6fr] px-2 ${
                item.route === router.query.keyword &&
                "border-l-4 border-btnGreen text-btnGreen"
              }`}
              variants={items}
              onClick={() => {
                router.push({
                  pathname: item.route,
                  query: { keyword: item.route },
                });
              }}
            >
              {item.icon}
              <div className="">{item.name}</div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className=" w-full absolute bottom-0 py-2 grid grid-cols-[1fr_4fr_1fr] border-t-2">
        <div className="w-11 h-11 relative mx-4  rounded-full shadow-md border">
          <Image className="rounded-full" src={user} alt={"user"} fill />
        </div>
        <div className="">
          <h1 className="text-lg font-bold">User</h1>
          <h4 className="text-sm">View profile</h4>
        </div>
        <SettingsIcon size="1.5rem" className="mx-auto mt-2" />
      </div>
    </>
  );
}
