import React from "react";
import { Stepper } from "react-form-stepper";

const Header = ({ activeStep }) => {
  return (
    <header className="w-screen flex justify-between items-center relative shadow-md bg-orange-200 md:px-16 px-4">
      <div className="">
        <p className="text-orange-600 text-2xl font-bold sm:block">
          Mansuri<span className="text-black">Mart</span>
        </p>
      </div>
      <div className="w-full">
        <Stepper
          steps={[
            { label: "Cart" },
            { label: "Address & Shipping" },
            { label: "Pyment" },
          ]}
          activeStep={activeStep}
          styleConfig={{
            activeBgColor: "red",
            inactiveBgColor: "red",
            completedBgColor: "green",
          }}
          connectorStyleConfig={{
            disabledColor: "green",
          }}
        />
      </div>
    </header>
  );
};

export default Header;
