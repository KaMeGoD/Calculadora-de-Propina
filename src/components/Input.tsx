
import '../stylesheet/input.css'
import { useState } from 'react';

interface InputsProps{
  title : string;
  image: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  mode: boolean;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const InputVal: React.FC<InputsProps> = ({ value, title, image, onChange, mode, onKeyDown, onPaste })=>{
  const inputType = value === 0 ? 'text' : 'number' ;
  const [active, setActive] = useState(false);

  const handleOnFocus = () =>{
    setActive(true)
  }
  const handleOnBlur = () =>{
    setActive(false)
  }


    return(
      <>
        <h2>{title}</h2>
        <div className={`input ${active?'active': ''}`}>
          <label  htmlFor={mode?'bill':'person'}>
            <img 
              src={image}
            />
          </label>
          

          <input 
            id={mode?'bill':'person'}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder= {mode?'0':'Personas'}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
          />
        </div>
      </>
    );
};

export default InputVal;