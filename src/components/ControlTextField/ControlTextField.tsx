import * as React from 'react';
import { Box, Collapse, TextField, TextFieldProps } from '@mui/material';
import { useController, FieldValues, Control, Path } from 'react-hook-form';
import classes from './ControlTextField.module.scss';

const DEFAULT_TRANSITION_DURATION = 300;

type ControlledTextFieldProps<T extends FieldValues> = {
  helperTextTransitionDuration?: number;
  name: Path<T>;
  control: Control<T>;
  rules?: any;
} & TextFieldProps;

export function ControlTextField<T extends FieldValues>({
  name,
  control,
  rules,
  helperTextTransitionDuration = DEFAULT_TRANSITION_DURATION,
  ...props
}: ControlledTextFieldProps<T>): React.ReactElement {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const [showError, setShowError] = React.useState(!!error?.message);
  const [errorText, setErrorText] = React.useState(error?.message || '');

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (error?.message) {
      setErrorText(error.message);
      setShowError(true);
    } else {
      setShowError(false);
      timeout = setTimeout(() => setErrorText(''), helperTextTransitionDuration + 100); // clear error text after transition done
    }

    return () => clearTimeout(timeout);
  }, [error?.message]);

  return (
    <Box>
      <TextField {...field} {...props} error={!!error} />

      <Collapse in={showError} timeout={helperTextTransitionDuration}>
        <Box className={classes['error-text-box']} sx={{ opacity: showError ? 1 : 0 }}>
          {errorText}
        </Box>
      </Collapse>
    </Box>
  );
}
