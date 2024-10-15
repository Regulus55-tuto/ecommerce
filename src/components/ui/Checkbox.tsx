// import React from "react";

// interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   labelText?: string;
//   className?: string;
//   ariaInvalid?: boolean;
//   type: string;
//   error?: string;
//   value?: string;
//   disabled?: boolean;
//   inputClassName?: string;
//   htmlFor?: string;
// }

// const LABEL_CLASS = `duration absolute top-px left-5 scale-75 bg-white px-1 transition-all origin-left
// peer-placeholder-shown:top-7 peer-placeholder-shown:left-2
// peer-focus:top-px peer-focus:scale-75  pointer-events-none	`;

// const Checkbox = React.forwardRef<HTMLInputElement, IProps>(
//   (
//     {
//       labelText,
//       className,
//       type,
//       ariaInvalid,
//       error,
//       value,
//       disabled,
//       inputClassName,
//       htmlFor,
//       ...props
//     },
//     ref
//   ) => {
//     return (
//       <>
//         <div
//           className={`${error ? "animate-shake" : ""} ${
//             className ?? ""
//           } relative`}
//         >
//           <input
//             ref={ref}
//             {...props}
//             className={`peer rounded-lg ${error ? "border-red-500" : ""} ${
//               inputClassName ?? ""
//             }`}
//             type={type}
//             aria-invalid={!ariaInvalid ? undefined : error ? "true" : "false"}
//             value={value}
//             disabled={disabled}
//           />
//           {/* <label htmlFor={htmlFor} className={LABEL_CLASS}>
//             {labelText}
//           </label> */}
//           {error && (
//             <small
//               role="alert"
//               className={`${error ? "animate-shake" : ""} text-red-500`}
//             >
//               {error}
//             </small>
//           )}
//         </div>
//       </>
//     );
//   }
// );

// Checkbox.displayName = "Checkbox";

// export default Checkbox;

import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  className?: string;
  ariaInvalid?: boolean;
  type: string;
  error?: string;
  value?: string;
  disabled?: boolean;
  inputClassName?: string;
}

const LABEL_CLASS = `pl-10 duration absolute left-2 scale-75 bg-yellow-200 transition-all origin-left	
peer-placeholder-shown:top-7 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-500
peer-focus:top-px  peer-focus:scale-75 peer-checked:text-violet-500 pointer-events-none	`;

const Checkbox = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      labelText,
      className,
      type,
      ariaInvalid,
      error,
      value,
      disabled,
      inputClassName,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div
          className={`${error ? "animate-shake" : ""} ${
            className ?? ""
          } relative`}
        >
          <input
            ref={ref}
            {...props}
            className={`text-gray-700 peer w-full origin-left h-20 rounded-lg ${
              error ? "border-red-500" : ""
            } ${inputClassName ?? ""}`}
            type={type}
            aria-invalid={!ariaInvalid ? undefined : error ? "true" : "false"}
            value={value}
            disabled={disabled}
          />
          <label className={LABEL_CLASS}>{labelText}</label>
          {error && (
            <small
              role="alert"
              className={`${error ? "animate-shake" : ""} text-red-500`}
            >
              {error}
            </small>
          )}
        </div>
      </>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
