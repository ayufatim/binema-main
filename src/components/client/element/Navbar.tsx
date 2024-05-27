import SigninButton from "@/components/global/SigninButton";
import SearchBox from "@/components/client/element/SearchBox";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FaBell, FaBookmark, FaShoppingCart } from "react-icons/fa";
import { getAllPayment } from "@/utils/actions/get-all-payment";
import getCurrentUser from "@/utils/actions/get-current-user";
import NotificationNav from "./NotificationNav";

const Navbar = async () => {
    const session = await getServerSession(authOptions);
    const payment = await getAllPayment()
    const currentUser = await getCurrentUser()

    const paymentUserId = payment.filter((pay: any) => (pay.userId) == currentUser?.id)
    const successfulPayments = payment.filter(pay => pay.status === 'success');

    return (
        <div className="absolute inset-0 z-30 h-fit">
            <div className="flex flex-row w-full justify-between py-5 px-7 items-center"
                style={{
                    backgroundColor: 'rgba(128, 128, 128, 0.2)',
                }}
            >
                <div className="flex">
                    <img src="https://res.cloudinary.com/dutlw7bko/image/upload/v1715650495/Cinema/Logo/Cuplikan_layar_2024-05-14_083355_jr8lu6.png" className="w-[60px] rounded-lg h-full" alt="" />
                </div>
                <div className="flex flex-row gap-3 sm:gap-5 items-center">
                    <a href="/favorites"><FaBookmark className="w-[28px] h-[28px] duration-300 hover:text-[#d4b60f]" /></a>
                    <a href="#" className="w-fit h-fit">
                        {paymentUserId.length > 0 && successfulPayments.length > 0
                            ? (
                                <>
                                    <NotificationNav pay={successfulPayments} />
                                </>
                            )
                            : <></>
                        }
                    </a>
                    <a href="/cart"><FaShoppingCart className="w-[30px] h-[30px] duration-300 hover:text-[#d4b60f]" /></a>
                    <SigninButton />
                </div>
            </div>
            <div className="flex flex-row block w-full justify-between px-5 pb-5 pt-3"
                style={{
                    backgroundColor: 'rgba(128, 128, 128, 0.2)',
                }}
            >
                <div className="flex">
                    <ul className="flex flex-row items-center gap-2">
                        <li
                            className="navbar__li rounded-lg"
                            style={{
                                backdropFilter: 'blur(8px)',
                                backgroundColor: 'rgba(128, 128, 128, 0.4)',
                            }}

                        >
                            <a href="/about" className="p-[10px]">About</a>
                        </li>
                        {session?.user.role === 'admin' ?
                            <li
                                className="navbar__li rounded-lg"
                                style={{
                                    backdropFilter: 'blur(8px)',
                                    backgroundColor: 'rgba(128, 128, 128, 0.4)',
                                }}
                            >
                                <a href="/admin" className="p-[10px]">Admin</a>
                            </li>
                            :
                            <></>
                        }
                    </ul>
                </div>
                <SearchBox />
            </div>
        </div>
    )
}

export default Navbar