import {RiMenu2Fill } from "react-icons/ri";
import {AiOutlineDashboard} from "react-icons/ai";
import { HiViewGrid } from "react-icons/hi";
import { FaStaylinked } from "react-icons/fa6";
import { LuWarehouse } from "react-icons/lu";

export const data = [
    {
      id:1,
      icon: <HiViewGrid size={17} className={styles.icons} />,
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      id:2,
      icon: <FaStaylinked size={17} className={styles.icons} />,
      name: "All Products",
      path: "/dashboard/all-products",
    },

    {
      id:3,
      icon: <LuWarehouse size={17} className={styles.icons} />,
      name: "Orders",
      path: "/dashboard/orders",
    },
   
    {
      id:3,
      icon: <LuWarehouse size={17} className={styles.icons} />,
      name: "Users",
      path: "/dashboard/users",
    },
   
   
  ];
export default adminNavLinks;
