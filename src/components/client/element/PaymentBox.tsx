'use client'

import { useState } from "react";

function formatPrice(price: any) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

function PaymentBox() {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedPackage, setSelectedPackage] = useState("regular");
    const [price, setPrice] = useState(100000);

    const handlePackageChange = (event: any) => {
        setSelectedPackage(event.target.value);
        switch (event.target.value) {
            case "regular":
                setPrice(100000);
                break;
            case "vip":
                setPrice(180000);
                break;
            case "vvip":
                setPrice(260000);
                break;
            default:
                setPrice(0);
        }
    }

    const handleMethodChange = (event: any) => {
        setSelectedMethod(event.target.value);
    };
    return (
        <>
            <div className="font-[sans-serif] bg-white p-4 rounded mb-10"
                style={{
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(128, 128, 128, 0.4)',
                }}
            >
                <div className="lg:max-w-7xl max-w-xl mx-auto">
                    <div className="flex lg:flex-row flex-col gap-10">
                        <div className="lg:col-span-2 max-lg:order-1">
                            <form className="mt-16 max-w-lg">
                                <h2 className="text-2xl font-extrabold text-[#fff]">Payment method</h2>
                                <div className="grid gap-4 sm:grid-cols-3 mt-8">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="bri"
                                            name="method"
                                            value="bri"
                                            checked={selectedMethod === 'bri'}
                                            onChange={handleMethodChange}
                                            className="w-5 h-5 cursor-pointer"
                                            required
                                        />
                                        <label htmlFor="bri" className="ml-4 flex gap-2 cursor-pointer">
                                            <img
                                                loading="lazy"
                                                src="https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/BRI-256.png"
                                                className="w-20"
                                                alt="BRI"
                                            />
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="bca"
                                            name="method"
                                            value="bca"
                                            checked={selectedMethod === 'bca'}
                                            onChange={handleMethodChange}
                                            className="w-5 h-5 cursor-pointer"
                                            required
                                        />
                                        <label htmlFor="bca" className="ml-4 flex gap-2 cursor-pointer">
                                            <img
                                                loading="lazy"
                                                src="https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/BCA-512.png"
                                                className="w-20"
                                                alt="BCA"
                                            />
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="bni"
                                            name="method"
                                            value="bni"
                                            checked={selectedMethod === 'bni'}
                                            onChange={handleMethodChange}
                                            className="w-5 h-5 cursor-pointer"
                                            required
                                        />
                                        <label htmlFor="bni" className="ml-4 flex gap-2 cursor-pointer">
                                            <img
                                                loading="lazy"
                                                src="https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/BNI-256.png"
                                                className="w-20"
                                                alt="BNI"
                                            />
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="dana"
                                            name="method"
                                            value="dana"
                                            checked={selectedMethod === 'dana'}
                                            onChange={handleMethodChange}
                                            className="w-5 h-5 cursor-pointer"
                                            required
                                        />
                                        <label htmlFor="dana" className="ml-4 flex gap-2 cursor-pointer">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.antaranews.com/cache/1200x800/2022/04/25/dana.jpg"
                                                className="w-20 rounded"
                                                alt="DANA"
                                            />
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="shopeepay"
                                            name="method"
                                            value="shopeepay"
                                            checked={selectedMethod === 'shopeepay'}
                                            onChange={handleMethodChange}
                                            className="w-5 h-5 cursor-pointer"
                                            required
                                        />
                                        <label htmlFor="shopeepay" className="ml-4 flex gap-2 cursor-pointer">
                                            <img
                                                loading="lazy"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV1-oB6rUaAMf79iGNx6QmMsumaBSnsry_XqzJ0BfN5Q&s"
                                                className="w-20 rounded"
                                                alt="ShopeePay"
                                            />
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="gopay"
                                            name="method"
                                            value="gopay"
                                            checked={selectedMethod === 'gopay'}
                                            onChange={handleMethodChange}
                                            className="w-5 h-5 cursor-pointer"
                                            required
                                        />
                                        <label htmlFor="gopay" className="ml-4 flex gap-2 cursor-pointer">
                                            <img
                                                loading="lazy"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJvAb8G3ESJDDVNmVBWxT6yQORi2Y23ql_5kLykl2NyQ&s"
                                                className="w-20 rounded p-[4px] bg-white"
                                                alt="gopay"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <span className="flex mt-5 mb-2">Pilihan Paket :</span>
                                    <select
                                        name="paket" id=""
                                        className="text-black p-5 rounded"
                                        value={selectedPackage}
                                        onChange={handlePackageChange}
                                        required
                                    >
                                        <option value="regular">Regular</option>
                                        <option value="vip">VIP</option>
                                        <option value="vvip">VVIP</option>
                                    </select>
                                </div>
                                <div className="grid gap-6 mt-8">
                                    <input type="text" placeholder="Name"
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" required />
                                    <input type="text" placeholder="Email"
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" required />
                                    <div className="flex bg-white border-b-2 focus-within:border-[#333] overflow-hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 ml-3" viewBox="0 0 291.764 291.764">
                                            <path fill="#2394bc" d="m119.259 100.23-14.643 91.122h23.405l14.634-91.122h-23.396zm70.598 37.118c-8.179-4.039-13.193-6.765-13.193-10.896.1-3.756 4.24-7.604 13.485-7.604 7.604-.191 13.193 1.596 17.433 3.374l2.124.948 3.182-19.065c-4.623-1.787-11.953-3.756-21.007-3.756-23.113 0-39.388 12.017-39.489 29.204-.191 12.683 11.652 19.721 20.515 23.943 9.054 4.331 12.136 7.139 12.136 10.987-.1 5.908-7.321 8.634-14.059 8.634-9.336 0-14.351-1.404-21.964-4.696l-3.082-1.404-3.273 19.813c5.498 2.444 15.609 4.595 26.104 4.705 24.563 0 40.546-11.835 40.747-30.152.08-10.048-6.165-17.744-19.659-24.035zm83.034-36.836h-18.108c-5.58 0-9.82 1.605-12.236 7.331l-34.766 83.509h24.563l6.765-18.08h27.481l3.51 18.153h21.664l-18.873-90.913zm-26.97 54.514c.474.046 9.428-29.514 9.428-29.514l7.13 29.514h-16.558zM85.059 100.23l-22.931 61.909-2.498-12.209c-4.24-14.087-17.533-29.395-32.368-36.999l20.998 78.33h24.764l36.799-91.021H85.059v-.01z" data-original="#2394bc" />
                                            <path fill="#efc75e" d="M51.916 111.982c-1.787-6.948-7.486-11.634-15.226-11.734H.374L0 101.934c28.329 6.984 52.107 28.474 59.821 48.688l-7.905-38.64z" data-original="#efc75e" />
                                        </svg>
                                        <input type="number" placeholder="Number"
                                            className="px-4 py-3.5 bg-white text-[#333] w-full text-sm outline-none" required />
                                    </div>
                                    {selectedMethod === 'bri' || selectedMethod === 'bca' || selectedMethod === 'bni' ? 
                                        <div className="grid grid-cols-2 gap-6">
                                            <input type="number" placeholder="CVV"
                                                className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                        </div>
                                        :
                                        <></>
                                    }
                                    <div className="flex items-center">
                                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" required />
                                        <label htmlFor="remember-me" className="ml-3 block text-sm">
                                            I accept the <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-8">
                                    <button type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 text-[#333] rounded-md hover:bg-gray-200 duration-300">Back</button>
                                    <button type="submit" className="min-w-[150px] px-6 py-3.5 text-sm bg-[#2ecaea] text-white rounded-md hover:bg-[#fff] hover:text-[#2ecaea] duration-300">Confirm payment</button>
                                </div>
                            </form>
                        </div>
                        <div className="bg-gray-100 px-6 py-8 h-fit rounded-md">
                            <h2 className="text-5xl font-extrabold text-[#333]">{formatPrice(price)}</h2>
                            <ul className="text-[#333] mt-10 space-y-6">
                                <li className="flex flex-wrap gap-4 text-base">Paket {selectedPackage} <span className="ml-auto font-bold">{formatPrice(price)}</span></li>
                                <li className="flex flex-wrap gap-4 text-base font-bold border-t-2 pt-4">Total <span className="ml-auto">{formatPrice(price)}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentBox