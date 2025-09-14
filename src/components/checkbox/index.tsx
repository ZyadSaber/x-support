import { useCallback } from "react"
import { Checkbox as StyledCheckbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CheckboxProps {
    name?: string;
    value: string;
    onChange?: (name: string, value: string) => void;
    disabled?: boolean;
    label?: string;
    className?: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    icon?: React.ReactNode;
}

const Checkbox = (
    {
        name,
        value,
        onChange,
        disabled,
        label,
        className,
        type,
        icon,
        required,
        placeholder
    }: CheckboxProps
) => {

    const handleChange = useCallback(event => {
        onChange(name, event?.target?.value)
    }, [name, onChange])

    return (
        <div className="flex items-center mb-1.5 gap-2">
            <StyledCheckbox id={name} />
            <Label className="text-[18px] font-light" htmlFor={name}>{label}</Label>
        </div>
    )
}

export default Checkbox