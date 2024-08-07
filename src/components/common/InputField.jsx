import React from 'react';

const InputField = ({
  type = 'text',
  name,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  textarea = false,
  options = [],
}) => {
  return (
    <>
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="placeholder:font-normal pr-4 border-none outline-none min-h-10 placeholder:text-xs lg:placeholder:text-sm placeholder:text-white text-white font-normal text-xs lg:text-sm w-full !p-3 sm:!p-[15.5px_16px_19px_16px] rounded-lg bg-black-olive"
        >
          <option value="" className='!p-3 sm:!p-[15.5px_16px_19px_16px]'>{label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="placeholder:font-normal pr-4 border-none outline-none placeholder:text-xs lg:placeholder:text-sm placeholder:text-white text-white font-normal text-xs lg:text-sm w-full p-3 sm:p-[15.5px_16px_19px_16px] rounded-lg bg-black-olive"
        />
      )}
    </>
  );
};

export default InputField;
