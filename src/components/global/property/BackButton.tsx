import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from 'react-icons/io';

function BackButton() {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    return (
        <button
            onClick={handleBackClick}
            className='absolute top-[5%] left-[2%]'
        >
            <IoMdArrowRoundBack className='w-[50px] h-[50px]' />
        </button>
    );
}

export default BackButton;
