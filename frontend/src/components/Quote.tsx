import React from "react";

const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center items-center">
      <div className="">
        <div className="max-w-lg text-left text-2xl font-bold">
          "The customer service I received was exceptional. The support team
          went above and beyond to address my concerns."
        </div>
        <div className="max-w-lg text-xl font-semibold text-left mt-2">
        Julius Winnfield
        </div>
        <div className="max-w-lg text-md text-left ">
        CEO, Acme Inc
        </div>
      </div>
    </div>
  );
};

export default Quote;
