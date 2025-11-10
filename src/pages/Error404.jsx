import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Error404 = () => {
  return (
    <>
      <div className="bg-slate-50 flex flex-col items-center justify-center pt-28 px-8 md:px-0">
        <h1 className="font-bold text-slate-800 text-2xl md:text-4xl">
          404 - Page Not Found
        </h1>
        <DotLottieReact
          src="/404 Error - Doodle animation.lottie"
          loop
          autoplay
          className="sm:w-[500px] sm:h-[400px] lg:w-[700px] lg:h-[500px] mt-4"
        />
      </div>
    </>
  );
};

export default Error404;
