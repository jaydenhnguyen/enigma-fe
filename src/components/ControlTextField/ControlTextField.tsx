import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useController, FieldValues, Control, Path } from 'react-hook-form';

type ControlledTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: any;
} & TextFieldProps;

export function ControlTextField<T extends FieldValues>({
  name,
  control,
  rules,
  ...props
}: ControlledTextFieldProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return <TextField {...field} {...props} error={!!error} helperText={error?.message} />;
}
