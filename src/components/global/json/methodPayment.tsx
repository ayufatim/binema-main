export interface PaymentMethod {
    value: string;
    src: string;
}

const paymentMethods: PaymentMethod[] = [
    {
        "value": "BRI",
        "src": "https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/BRI-256.png"
    },
    {
        "value": "BCA",
        "src": "https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/BCA-512.png"
    },
    {
        "value": "BNI",
        "src": "https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/BNI-256.png"
    },
    {
        "value": "Dana",
        "src": "https://cdn.antaranews.com/cache/1200x800/2022/04/25/dana.jpg"
    },
    {
        "value": "ShopeePay",
        "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV1-oB6rUaAMf79iGNx6QmMsumaBSnsry_XqzJ0BfN5Q&s"
    },
    {
        "value": "GoPay",
        "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJvAb8G3ESJDDVNmVBWxT6yQORi2Y23ql_5kLykl2NyQ&s"
    }
]

export default paymentMethods