import React from 'react';

const InputField = ({
  type = 'text',
  name,
  value,
  onChange,
  label,
  required = false,
  textarea = false,
  options = [],
}) => {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm !outline-none sm:text-sm"
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm !outline-none sm:text-sm"
        >
          <option value="">Select {label}</option>
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
          required={required}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm !outline-none sm:text-sm"
        />
      )}
    </>
  );
};

export default InputField;
