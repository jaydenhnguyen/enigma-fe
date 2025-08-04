import * as React from 'react';
import { Autocomplete, AutocompleteRenderGroupParams, Chip } from '@mui/material';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete';
import { useDebouncedCallback } from 'src/shared/hooks';
import { DEFAULT_PAGINATION_PAGE_NUM } from 'src/shared/constants';
import { LoadingSelectOptions, SearchInput } from './components';

export type SelectOption = {
  id: string | number;
  label: string;
  value: any;
  [key: string]: any;
};

type Props = {
  label?: string;
  placeholder?: string;
  value?: SelectOption | SelectOption[] | null;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  searchDelay?: number;
  minSearchLength?: number;
  size?: 'small' | 'medium';

  options: SelectOption[];
  totalCount?: number;
  loading?: boolean;
  hasNextPage?: boolean;

  onChange: (value: SelectOption | SelectOption[] | null) => void;
  onSearchChange?: (query: string) => void;
  onLoadMore?: (params: { query: string; page: number }) => void;

  renderOption: (props: React.HTMLAttributes<HTMLLIElement>, option: SelectOption) => React.ReactNode;
  getOptionLabel?: (option: SelectOption) => string;
  isOptionEqualToValue?: (option: SelectOption, value: SelectOption) => boolean;
  groupBy?: (option: SelectOption) => string;
  renderGroup?: (params: AutocompleteRenderGroupParams) => React.ReactNode;
};

export function AppSelectWithSearch({
  label,
  placeholder,
  value = null,
  multiple = false,
  disabled = false,
  required = false,
  searchDelay = 300,
  minSearchLength = 1,
  size,
  options,
  loading = false,
  hasNextPage = false,

  onChange,
  onSearchChange,
  onLoadMore,
  renderOption,
  getOptionLabel = (option) => option?.label || '',
  isOptionEqualToValue = (option, value) => option.id === value.id,
  groupBy,
  renderGroup,
}: Props): React.ReactElement {
  const [inputValue, setInputValue] = React.useState('');
  const [page, setPage] = React.useState(DEFAULT_PAGINATION_PAGE_NUM);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const listBoxRef = React.useRef<HTMLUListElement>(null);

  const debouncedSearch = useDebouncedCallback(
    (q: string) => {
      setPage(1);
      onSearchChange?.(q);
    },
    searchDelay,
    [onSearchChange],
  );

  const handleInputChange = (_: any, newInputValue: string, reason: string) => {
    if (reason === 'input') {
      setInputValue(newInputValue);
      if (newInputValue.length >= minSearchLength) {
        debouncedSearch(newInputValue);
      }
    }
  };

  const handleScroll = (event: React.SyntheticEvent) => {
    const listBoxNode = event.currentTarget as HTMLUListElement;
    const { scrollTop, scrollHeight, clientHeight } = listBoxNode;

    if (
      scrollTop + clientHeight >= scrollHeight - 20 &&
      hasNextPage &&
      !loading &&
      !isLoadingMore &&
      inputValue.length >= minSearchLength
    ) {
      const nextPage = page + 1;
      setPage(nextPage);
      setIsLoadingMore(true);
      onLoadMore?.({ query: inputValue, page: nextPage });
    }
  };

  const enhancedOptions = React.useMemo(() => {
    let result = [...options];
    if (isLoadingMore) {
      result.push({
        id: '__loading__',
        label: 'Loading...',
        value: null,
        isLoading: true,
      } as SelectOption);
    }
    return result;
  }, [options, isLoadingMore]);

  const renderMultipleSelectedValue = React.useCallback(
    (value: SelectOption | SelectOption[], getItemProps: (val: any) => any): React.ReactNode => {
      return value.map((option: string, index: number) => {
        const { key, ...itemProps } = getItemProps({ index });
        return <Chip variant="outlined" label={option} key={key} {...itemProps} />;
      });
    },
    [],
  );

  const renderSingleSelectedValues = React.useCallback(
    (value: SelectOption | SelectOption[], getItemProps: () => any): React.ReactNode => {
      return <Chip label={value} {...getItemProps()} />;
    },
    [],
  );

  const renderInput = React.useCallback(
    (params: AutocompleteRenderInputParams) => {
      return (
        <SearchInput
          params={params}
          label={label}
          placeholder={placeholder}
          required={required}
          size={size}
          isLoading={loading}
        />
      );
    },
    [label, placeholder, required, size, loading],
  );

  return (
    <Autocomplete
      open={true}
      filterSelectedOptions
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={enhancedOptions}
      multiple={multiple}
      disabled={disabled}
      loading={loading}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      groupBy={groupBy}
      renderGroup={renderGroup}
      filterOptions={(x) => x}
      noOptionsText="No option found..."
      renderInput={(params) => renderInput(params)}
      renderOption={(props, option) => {
        if (option['isLoading']) return <LoadingSelectOptions />;
        return renderOption(props, option);
      }}
      renderValue={(value, getItemProps) => {
        if (multiple) return renderMultipleSelectedValue(value, getItemProps);
        else return renderSingleSelectedValues(value, getItemProps as any);
      }}
      sx={{
        '& .MuiAutocomplete-listbox .MuiListSubheader-root': {
          position: 'sticky',
          top: 0,
          zIndex: 1,
          background: 'inherit',
        },
      }}
      slotProps={{
        listbox: {
          onScroll: handleScroll,
          ref: listBoxRef,
          style: { maxHeight: 300 },
        },
      }}
    />
  );
}
