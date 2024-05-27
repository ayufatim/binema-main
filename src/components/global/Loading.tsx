const Loading = () => {
    return (
        <div className="fixed inset-0 top-0 left-0 justify-center items-center h-[100vh] w-[100vw] z-50 bg-black overflow-hidden touch-none">
            <div className="fixed top-[40%] left-[45vw] rounded-full h-20 w-20 bg-violet-200 animate-ping"></div>
        </div>
    );
};

export default Loading;