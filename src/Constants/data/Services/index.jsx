import { LiaCarSideSolid } from "react-icons/lia";
import { GiReturnArrow } from "react-icons/gi";
import { FaAmazonPay } from "react-icons/fa";
import { RiExchangeDollarLine } from "react-icons/ri";
export const servicesData = [
    {
        id:1,
        name:'Free Shipping',
        description:" However, it's essential to learn the right English vocabulary",
        icon:<LiaCarSideSolid size={30}/>,
        bgColor:'rgba(247, 101, 101, 0.4)'
    },
    {
        id:2,
        name:'Easy Returns',
        description:" You can return the product purchased from us within 3 days",
        icon:<GiReturnArrow size={30}/>,
        bgColor:'rgba(140, 240, 140, 0.3'
    },
    {
        id:3,
        name:'Secure Payment',
        description:" With us, you can safely pay with a plastic card",
        icon:<FaAmazonPay size={30}/>,
        bgColor:'rgba(240, 240, 58, 0.3)'
    },
    {
        id:4,
        name:'Guarantee',
        description:" We provide a 3-year warranty for all products",
        icon:<RiExchangeDollarLine size={30}/>,
        bgColor:'rgba(132, 101, 243, 0.3)'
    }
]