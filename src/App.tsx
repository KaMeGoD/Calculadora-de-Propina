import InputVal from "./components/Input";
import BtnTips from "./components/Buttons";
import logoUser from "./assets/images/icon-person.svg";
import logoDollar from "./assets/images/icon-dollar.svg";
import Tips from "./components/Results";
import React, { useState } from "react";
import "normalize.css";
import "./App.css";

const App = () => {
  const [bill, setBill] = useState("");
  const [numberPeople, setNumberPeople] = useState("");
  const [custom, setCustom] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  let activity: boolean;
  const btns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button');

  const handleReset = () => {
    setBill("");
    setNumberPeople("");
    setCustom("");
    setTipAmount(0);

    btns.forEach((e:HTMLButtonElement) => {
      e.classList.remove('selected')
    });
  };

  const handleBillAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const billAmount = e.target.value;
    if (billAmount.length <= 7 && billAmount.slice(0,1) !=="0"  ) {
      setBill(billAmount);
      setTipAmount((parseInt(billAmount) * parseInt(custom)) / 100 || 0);
    }

    if (billAmount === "" && parseInt(billAmount) > 0 ) {
      setBill(billAmount);
    } else if (billAmount.length === 10) {
      setBill("");
    }
  };



  const handleNumberPeople = (e: React.ChangeEvent<HTMLInputElement>) => {
    const peopleAmount = e.target.value;
    if (peopleAmount === "" || peopleAmount.length <= 2 && parseInt(peopleAmount) > 0 && parseInt(peopleAmount) <= 25 && peopleAmount.slice(0,1) !=="0") {
      setNumberPeople(peopleAmount);
    } else if (peopleAmount.length === 1) {
      setNumberPeople("");
    }
  };
  

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const allowedCharsRegex = /^[0-9\b]+$/;
      const key = event.key;
  
      // Permitir el uso del botón de retroceso
      if (key === "Backspace") {
        return;
      }
  
      // Verificar si es una letra o un carácter no permitido
      if (!allowedCharsRegex.test(key)) {
        event.preventDefault();
      }
    };


  const handleCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const customPercentage = e.target.value;
    if (
      customPercentage === "" ||
      (customPercentage.length <= 3 && parseInt(customPercentage) <= 100 && customPercentage.slice(0,1) !== "0")
    ) {
      setCustom(customPercentage);
      setTipAmount((parseInt(bill) * parseInt(customPercentage)) / 100 || 0);
    } else if (customPercentage.length === 1) {
      setCustom("");
    }
    
  };

  const handleBtnTips = (tipsPercentage: number) => {
    setTipAmount((parseInt(bill) * tipsPercentage) / 100 || 0);
  };

  const totalAmount = Math.trunc(tipAmount / parseInt(numberPeople) || 0);
  const amountXPerson = Math.trunc(parseInt(bill) / parseInt(numberPeople) + totalAmount || 0 );
  
  const roundToNearest = (value: number) : number =>{
    
    const remainder = value % 10;
    if(remainder >= 5 ){
      return Math.ceil(value/10) *10;

    }else{
      return Math.floor(value/10)*10;
    }
  }
  const totalRounded = roundToNearest(totalAmount);
  const amountRounded = roundToNearest(amountXPerson);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) =>{
    e.preventDefault();
  }
  

  if (amountXPerson === 0) {
    activity = false;
  } else {
    activity = true;
  }

  return (
    <>
      <div className="card">
        <div className="card_left">
          <InputVal
            title="Cuenta"
            image={logoDollar}
            value={bill}
            onChange={handleBillAmount}
            mode={true}
            onKeyDown={handleKeyPress}
            onPaste={handlePaste}
          />
          <BtnTips
            btnPercentage={handleBtnTips}
            value={custom}
            onChange={handleCustom}
            onKeyDown={handleKeyPress}
            onPaste={handlePaste}
          />
          <InputVal
            title="Numero de Personas"
            image={logoUser}
            value={numberPeople}
            onChange={handleNumberPeople}
            mode={false}
            onKeyDown={handleKeyPress}
            onPaste={handlePaste}
          />
        </div>
        <div className="card_right">
          <Tips tipsAmount={totalRounded} total={amountRounded} />
          <button
            onClick={handleReset}
            className={`${activity ? "btn-reset" : "btn-desactivad"}`}
          >
            reset
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
