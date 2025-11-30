"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

export default function AutocompleteHook({ 
  name, 
  label, 
  control,
  rules,
  size = "small",
  options = [],
  getOptionLabel,
  isOptionEqualToValue,
  inputProps,
  ...props 
}) {
  const formContext = useFormContext();
  const { control: contextControl, formState: { errors } } = formContext || {};
  
  // Use provided control or context control
  const fieldControl = control || contextControl;
  
  // Get error message - รองรับ nested field names เช่น "customerDetail.provinceTh"
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
    console.warn("AutocompleteHook must be used within FormProvider or provide control prop");
    
    // สร้าง renderOption ที่ใช้ value หรือ key เป็น unique identifier
    const renderOption = (props, option) => {
      const key = option?.key || option?.value || option?.label || option?.toString() || '';
      return (
        <li {...props} key={key}>
          {getOptionLabel ? getOptionLabel(option) : (option?.label || option?.value || option?.toString() || '')}
        </li>
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {label && (
          <label htmlFor={fieldId} style={{ fontSize: '0.75rem', fontWeight: 500 }}>
            {label}
          </label>
        )}
        <Autocomplete
          {...props}
          id={fieldId}
          options={options}
          getOptionLabel={getOptionLabel || ((option) => option?.label || option?.toString() || '')}
          isOptionEqualToValue={isOptionEqualToValue || ((option, value) => option === value || option?.value === value?.value)}
          renderOption={props.renderOption || renderOption}
          size={size}
          sx={{
            '& .MuiAutocomplete-option': {
              fontSize: '0.65rem',
              minHeight: '28px',
              padding: '4px 12px',
            },
            '& .MuiAutocomplete-listbox': {
              padding: '4px 0',
            },
            ...props.sx,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...(inputProps && { inputProps: { ...params.inputProps, ...inputProps } })}
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
          )}
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
        render={({ field: { onChange, value, ...field } }) => {
          // Handle freeSolo: if value is a string and not in options, treat it as free text
          const getValue = () => {
            if (value === null || value === undefined || value === '') return null;
            if (props.freeSolo && typeof value === 'string') {
              // Check if value exists in options
              const foundOption = options.find(opt => {
                if (isOptionEqualToValue) {
                  return isOptionEqualToValue(opt, value);
                }
                return opt?.value === value || opt === value;
              });
              return foundOption || value;
            }
            return value;
          };

          // สร้าง renderOption ที่ใช้ value หรือ key เป็น unique identifier
          const renderOption = (props, option) => {
            const key = option?.key || option?.value || option?.label || option?.toString() || '';
            return (
              <li {...props} key={key}>
                {getOptionLabel ? getOptionLabel(option) : (option?.label || option?.value || option?.toString() || '')}
              </li>
            );
          };

          return (
            <Autocomplete
              {...props}
              {...field}
              id={fieldId}
              options={options}
              value={getValue()}
              getOptionLabel={getOptionLabel || ((option) => {
                if (typeof option === 'string') return option;
                return option?.label || option?.value || option?.toString() || '';
              })}
              isOptionEqualToValue={isOptionEqualToValue || ((option, value) => {
                if (typeof option === 'string' && typeof value === 'string') {
                  return option === value;
                }
                return option === value || option?.value === value?.value;
              })}
              renderOption={props.renderOption || renderOption}
              size={size}
              sx={{
                '& .MuiAutocomplete-option': {
                  fontSize: '0.65rem',
                  minHeight: '28px',
                  padding: '4px 12px',
                },
                '& .MuiAutocomplete-listbox': {
                  padding: '4px 0',
                },
                ...props.sx,
              }}
              onChange={(event, newValue) => {
                // For freeSolo, if newValue is a string, store it directly
                const valueToStore = props.freeSolo && typeof newValue === 'string' 
                  ? newValue 
                  : (newValue?.value !== undefined ? newValue.value : newValue);
                onChange(valueToStore);
                if (props.onChange) {
                  props.onChange(event, newValue);
                }
              }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...(inputProps && { inputProps: { ...params.inputProps, ...inputProps } })}
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
            )}
          />
          );
        }}
      />
    </div>
  );
}

