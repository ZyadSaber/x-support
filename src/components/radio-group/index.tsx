import { useCallback } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface OptionType {
    label: string,
    key: string
}

interface RadioGroupButtonProps {
    label?: string;
    onChange: (name: string, value: string) => void
    value: string;
    name: string;
    options: OptionType[]
    disabled?: boolean
}

const RadioGroupButton = ({
    label,
    options,
    name,
    onChange,
    value,
    disabled
}: RadioGroupButtonProps) => {

    const handleChange = useCallback((event) => {
        onChange(name, event?.target?.value)
    }, [name, onChange])

    return (
        <RadioGroup className="flex items-center mb-1.5" disabled={disabled}>
            <Label htmlFor="option-one" className="text-[18px]">{`${label}:`}</Label>
            {
                options.map(({ label, key }, index) => (
                    <div key={index} className="flex items-center space-x-2" onClick={handleChange}>
                        <RadioGroupItem value={key} id="option-one" checked={value === key} />
                        <Label htmlFor="option-one">{label}</Label>
                    </div>
                ))
            }
        </RadioGroup>
    )
}

export default RadioGroupButton