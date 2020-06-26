import React from "react";
import validators from "../formValidators";

const Inputs = ({formMetaData, formInputs, onInputChangeHanlder, onInputBlurHandler}) => {

    const checkIsRequired = (rules) => {
        let isRequired = false;
        for(let x = 0; x < rules.length; x++){
            if(rules[x].rule === validators.required){
                isRequired = true;
                break;
            }
        }
        return isRequired;
    }

    const renderFormInputs = () => {

        const inputJSXArr = [];

        for(let inputName in formMetaData){
            const inputObj = formMetaData[inputName];

            const isValid = formInputs[inputName].isValid;
            const isTouched = formInputs[inputName].isTouched;
            const value = formInputs[inputName].value;
            const error = formInputs[inputName].error;
            const isRequired = checkIsRequired(formMetaData[inputName].rules);

            inputJSXArr.push(
                <div key={inputName} className={'input-wrp'}>
                    <label>{inputObj.label} {isRequired ? <span className={'req-icon'}>*</span> : <span className={'optional'}>( Optional )</span>}</label>
                    {error && isTouched
                        ? <div className={'error-text'}>{error}</div>
                        : null
                    }
                    <input
                        className={!isValid && isTouched ? 'input-error' : ''}
                        type={inputObj.type}
                        name={inputName}
                        onChange={onInputChangeHanlder}
                        onBlur={onInputBlurHandler}
                        value={value}
                    />
                </div>
            )
        }
        return inputJSXArr;
    }

    return renderFormInputs();
}

export default Inputs;