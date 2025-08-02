import { RecordWithAnyValue } from "@/interfaces/global";

export interface OptionType extends RecordWithAnyValue {
  key: string;
  value: string;
}

export interface SharedSelectProps {
  onChange?: (name: string, value: string) => void;
  name?: string;
  value: string;
  disabled?: boolean;
  label?: string;
  className?: string;
  placeholder?: string;
  loading?: boolean;
}

export interface SelectProps extends SharedSelectProps {
  options: OptionType[];
}
