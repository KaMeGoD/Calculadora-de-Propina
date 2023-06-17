import React, { useState } from "react";
import "../stylesheet/btn.css";

interface PropsBtn {
  btnPercentage: (type: number) => void;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const BtnTips: React.FC<PropsBtn> = ({ btnPercentage, value, onChange, onKeyDown, onPaste  }) => {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [selectedCustom, setSelectedCustom] = useState(false);
  

  const handleOnFocusCustom = () =>{
    setSelectedCustom(true);
  }
  const handleOnblurCustom = () =>{
    setSelectedCustom(false);
  }

  const handleOnFocus = (percentage: number) => {
    setSelectedButton(percentage);
  };


  

  return (
    <>
      <h2 className="title">Seleccionar Propina %</h2>
      <div className="btnTips">
        <button
          className={`btnTip ${selectedButton === 5 ? "selected" : ""}`}
          onClick={() => {
            btnPercentage(5);
            handleOnFocus(5);
          }}
        >
          5%
        </button>
        <button
          className={`btnTip ${selectedButton === 10 ? "selected" : ""}`}
          onClick={() => {
            btnPercentage(10);
            handleOnFocus(10);
          }}
        >
          10%
        </button>
        <button
          className={`btnTip ${selectedButton === 15 ? "selected" : ""}`}
          onClick={() => {
            btnPercentage(15);
            handleOnFocus(15);
          }}
        >
          15%
        </button>
        <button
          className={`btnTip ${selectedButton === 25 ? "selected" : ""}`}
          onClick={() => {
            btnPercentage(25);
            handleOnFocus(25);
          }}
        >
          25%
        </button>
        <button
          className={`btnTip ${selectedButton === 50 ? "selected" : ""}`}
          onClick={() => {
            btnPercentage(50);
            handleOnFocus(50);
          }}
        >
          50%
        </button>
        
        <input
          className={`custom ${selectedCustom?'active':''}`}
          onFocus={() => {
              handleOnFocus(NaN)
              handleOnFocusCustom()
            }}
          onBlur={() => {
            setSelectedButton(null)
            handleOnblurCustom()
          }}
          type="number"
          placeholder="Propina"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
        />
      </div>
      


    </>
    
  );
};

export default BtnTips;
