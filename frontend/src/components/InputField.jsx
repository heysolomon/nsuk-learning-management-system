/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { ErrorMessage, useField } from 'formik';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function InputField({
  type,
  label,
  styling,
  responsive = true,
  inputStyle,
  options,
  border = true,
  tag,
  height,
  required = false,
  ...props
}) {
  const [field, meta] = useField(props);
  const [passwordType, setPasswordType] = useState(type);

  // Show and Hide Password Function
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };
  return (
    <div className={`${styling} w-full`}>
      <label htmlFor={field.name} className="mb-[4px] text-[14px]">
        {label}
        {required && <span className="text-[#F43F5E] text-[14px] font-[500]"> *</span>}
      </label>

      <div
        className={`flex items-center appearance-none form-input border-[#E2E8F0] focus-within:border-[#A5B4FC] focus-within:ring-[#A5B4FC] focus-within:ring-1 rounded-[4px] w-full text-[14px] ${
          meta.touched && meta.error && 'border-red-700 ring-red-100 ring-1'
        } ${height}`}
      >
        {/* checks if it's an input, textarea or selct tag */}
        {tag === 'input' ? (
          <>
            <input
              {...field}
              name={field.name}
              id={field.name}
              placeholder={props.placeholder}
              autoComplete="off"
              type={type === 'password' ? passwordType : type}
              className="w-full h-full border-none focus:border-none focus-within:outline-none focus:ring-0 p-0 focus:border-0 text-[14px]"
            />

            {type === 'password' && (
              <span
                onClick={togglePassword}
                className="mr-3 cursor-pointer"
                aria-hidden="true"
              >
                {passwordType === 'password' ? (
                  <AiOutlineEyeInvisible className="w-[16px] md:w-[24px]" />
                ) : (
                  <AiOutlineEye className="w-[16px] md:w-[24px]" />
                )}
              </span>
            )}
          </>
        ) : tag === 'select' ? (
          <select
            name={props.name}
            className={`w-full h-full focus:outline-none bg-transparent py-[8px] placeholder:text-black5 text-black5 text-mukta font-[400] ${inputStyle}`}
            {...field}
          >
            {options.map((option) => (
              <option
                value={option.name}
                key={option.id}
                className="w-full"
                disabled={option.isDisabled}
              >
                {option.name}
              </option>
            ))}
          </select>
        ) : tag === 'textarea' ? (
          <textarea
            name={props.name}
            id=""
            cols={100}
            rows="4"
            className={`w-full h-full focus:outline-none bg-transparent py-[8px] placeholder:text-black5 text-black5 text-mukta font-[400] resize-none ${inputStyle}`}
            placeholder={props.placeholder}
            {...field}
          />
        ) : (
          ''
        )}
      </div>
      <ErrorMessage
        className="text-red-700 text-xs mt-0"
        component="div"
        name={field.name}
      />
    </div>
  );
}

export default InputField;
