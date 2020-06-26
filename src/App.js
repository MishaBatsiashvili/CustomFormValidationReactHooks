import React, {useState} from 'react';
import './normalize.css';
import './App.css';

import validators from "./formValidators";
import Inputs from './components/Inputs'

const App = () => {
    //state
    const [formIsValid, setFormIsValid] = useState(false);
    const [formInputs, setFormInputs] = useState({
        firstName: {
            value: "",
            isValid: false,
            isTouched: false,
            error: "",
        },
        lastName: {
            value: "",
            isValid: false,
            isTouched: false,
            error: "",
        },
        phone: {
            value: "",
            isValid: false,
            isTouched: false,
            error: "",
        },
        email: {
            value: "",
            isValid: false,
            isTouched: false,
            error: "",
        },
    })
    ///.

    const validateForm = (finalFormInputsState) => {
        let localFormIsValid = true;
        //loop over input objects
        for(let inputName in finalFormInputsState){
            //store values
            const rules = formMetaData[inputName].rules;
            const curValue = finalFormInputsState[inputName].value;

            const [newFormInputsState, curInputObj] = getCopiedStateForInput(inputName, finalFormInputsState);
            curInputObj.error = '';
            curInputObj.isValid = true;
            finalFormInputsState = newFormInputsState;

            //loop over input object's rules
            for(let x = 0; x < rules.length; x++){
                const ruleTest = rules[x].rule(curValue);
                if(!ruleTest){
                    //set rule's message if ruleTest failed
                    curInputObj.error = rules[x].message;
                    curInputObj.isValid = false;
                    localFormIsValid = false;
                    break;
                }
            }
        }

        setFormInputs(finalFormInputsState);

        // we need this value on submit, so there is no need to store it in state
        return localFormIsValid;
    }

    const validateInput = (finalFormInputsState, inputName) => {

        const rules = formMetaData[inputName].rules;
        const curValue = finalFormInputsState[inputName].value;

        const [newFormInputsState, curInputObj] = getCopiedStateForInput(inputName, finalFormInputsState);
        curInputObj.error = '';
        curInputObj.isValid = true;
        for(let x = 0; x < rules.length; x++){
            const ruleTest = rules[x].rule(curValue);
            if(!ruleTest){
                //set rule's message if ruleTest failed
                curInputObj.error = rules[x].message;
                curInputObj.isValid = false;
                break;
            }
        }

        setFormInputs(newFormInputsState);
    }

    const getCopiedStateForInput = (fieldName, baseState) => {
        baseState = baseState || formInputs;
        const obj = {
            ...baseState,
            [fieldName]: {...baseState[fieldName]}
        };
        return [obj, obj[fieldName]];
    }

    const onInputChangeHanlder = (e) => {
        const [newFormInputsState, curInputObj] = getCopiedStateForInput(e.target.name);
        curInputObj.value = e.target.value;

        validateInput(newFormInputsState, e.target.name);
    }

    const onInputBlurHandler = (e) => {
        const [newFormInputsState, curInputObj] = getCopiedStateForInput(e.target.name);
        curInputObj.isTouched = true;
        //set new state
        setFormInputs(newFormInputsState);
        validateInput(newFormInputsState, e.target.name);
    }

    const allInputsTouched = () => {
        let finalFormInputsState
        for(let inputName in formInputs){
            const [newFormInputsState, curInputObj] = getCopiedStateForInput(inputName, finalFormInputsState);
            curInputObj.isTouched = true;
            finalFormInputsState = newFormInputsState;
        }
        return finalFormInputsState;
    }

    const onFormSubmitHandler = e => {
        e.preventDefault();
        let finalFormInputsState = allInputsTouched(formInputs);
        const formIsValid = validateForm(finalFormInputsState);

        if(formIsValid){
            alert('Form Sent!');
        } else {
            console.log('form invalid');
        }
    }


    return (
      <div className={"form-wrp"}>
        <form onSubmit={onFormSubmitHandler} className="form">
            <Inputs
                formMetaData={formMetaData}
                formInputs={formInputs}
                onInputChangeHanlder={onInputChangeHanlder}
                onInputBlurHandler={onInputBlurHandler}
            />
            <button className={'submit-btn'}>Submit</button>
        </form>
      </div>
  );
}



const formMetaData = {
    firstName: {
        rules: [
            {rule: validators.required, message: "First Name is required"}
        ],
        type: 'text',
        label: 'First Name',
    },

    lastName: {
        rules: [
            {rule: validators.required, message: "Last Name is required"}
        ],
        type: 'text',
        label: 'Last Name',
    },

    phone: {
        rules: [
            {rule: validators.required, message: "Phone is required"},
            {rule: validators.number, message: "Invalid Phone Number"},
        ],
        type: 'text',
        label: 'Phone',
    },

    email: {
        rules: [
            {rule: validators.email, message: "Invalid Email"}
        ],
        type: 'email',
        label: 'Email',
    },
}

export default App;
