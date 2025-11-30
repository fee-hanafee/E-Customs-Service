"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";

export default function CheckboxHook({ 
  name, 
  label, 
  control,
  rules,
  size = "small",
  labelPlacement = "end",
  ...props 
}) {
  const formContext = useFormContext();
  const { control: contextControl, formState: { errors } } = formContext || {};
  
  // Use provided control or context control
  const fieldControl = control || contextControl;
  
  // Get error message - รองรับ nested field names เช่น "customerDetail.isActive"
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
    console.warn("CheckboxHook must be used within FormProvider or provide control prop");
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <FormControlLabel
          control={
            <Checkbox
              {...props}
              id={fieldId}
              name={name}
              size={size}
              sx={{
                fontSize: '0.875rem',
                ...props.sx,
              }}
            />
          }
          label={label}
          labelPlacement={labelPlacement}
          sx={{
            '& .MuiFormControlLabel-label': {
              fontSize: '0.75rem',
            },
          }}
        />
        {errorMessage && (
          <FormHelperText error sx={{ margin: 0, fontSize: '0.75rem' }}>
            {errorMessage}
          </FormHelperText>
        )}
      </div>
    );
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      <Controller
        name={name}
        control={fieldControl}
        rules={rules}
        render={({ field }) => {
          return (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    {...props}
                    {...field}
                    id={fieldId}
                    size={size}
                    checked={field.value ?? false}
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
                      field.onChange(modifiedEvent.target.checked);
                    }}
                    sx={{
                      fontSize: '0.75rem',
                      ...props.sx,
                    }}
                  />
                }
                label={label}
                labelPlacement={labelPlacement}
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.75rem',
                  },
                }}
              />
              {errorMessage && (
                <FormHelperText error sx={{ margin: 0, marginLeft: '34px', fontSize: '0.75rem' }}>
                  {errorMessage}
                </FormHelperText>
              )}
            </>
          );
        }}
      />
    </div>
  );
}

