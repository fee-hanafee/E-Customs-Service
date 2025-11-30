"use client";

import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function TextFieldHook({ 
  name, 
  label, 
  control,
  rules,
  size = "small",
  ...props 
}) {
  const formContext = useFormContext();
  const { control: contextControl, formState: { errors } } = formContext || {};
  
  // Use provided control or context control
  const fieldControl = control || contextControl;
  
  // Get error message - รองรับ nested field names เช่น "customerDetail.telephone"
  const getNestedError = (errors, fieldName) => {
    if (!fieldName || !errors) return null;
    const parts = fieldName.split('.');
    let current = errors;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return null;
      }
    }
    return current;
  };

  const errorMessage = name 
    ? (() => {
        const error = getNestedError(errors, name);
        return error?.message || (error ? "กรุณากรอกข้อมูลให้ถูกต้อง" : null);
      })()
    : null;
  
  // Generate unique ID for the input field
  const fieldId = name ? `field-${name.replace(/\./g, '-')}` : undefined;
  
  if (!fieldControl) {
    console.warn("TextFieldHook must be used within FormProvider or provide control prop");
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {label && (
          <label htmlFor={fieldId} style={{ fontSize: '0.75rem', fontWeight: 500 }}>
            {label}
          </label>
        )}
        <TextField
          {...props}
          id={fieldId}
          name={name}
          size={size}
          error={!!errorMessage}
          helperText={errorMessage}
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '0.875rem',
              height: '32px',
            },
            '& .MuiInputBase-input': {
              padding: '6px 12px',
              fontSize: '0.875rem',
            },
            ...props.sx,
          }}
        />
      </div>
    );
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      {label && (
        <label htmlFor={fieldId} style={{ fontSize: '0.75rem', fontWeight: 500 }}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={fieldControl}
        rules={rules}
        render={({ field }) => {
          // แยก type และ inputProps ออกจาก props เพื่อไม่ให้ field override
          const { type, inputProps, ...restProps } = props;
          return (
          <TextField
            {...restProps}
            {...field}
            type={type} // ใช้ type จาก props โดยตรง
            id={fieldId}
            size={size}
            value={field.value ?? ""} // แก้ไข: ใช้ empty string แทน undefined
            error={!!errorMessage}
            helperText={errorMessage}
            inputProps={inputProps} // ใช้ inputProps จาก props
            onBlur={(e) => {
              field.onBlur();
              if (props.onBlur) {
                props.onBlur(e);
              }
            }}
            onChange={(e) => {
              // ถ้ามี custom onChange ให้เรียกก่อนเพื่อแก้ไข event
              let modifiedEvent = e;
              if (props.onChange) {
                const result = props.onChange(e);
                // ถ้า return event ใหม่ให้ใช้ event นั้น
                if (result && result.target) {
                  modifiedEvent = result;
                }
              }
              // เรียก field.onChange ด้วย event ที่แก้ไขแล้ว
              field.onChange(modifiedEvent);
            }}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.875rem',
                height: '32px',
              },
              '& .MuiInputBase-input': {
                padding: '6px 12px',
                fontSize: '0.875rem',
              },
              ...props.sx,
            }}
          />
          );
        }}
      />
    </div>
  );
}