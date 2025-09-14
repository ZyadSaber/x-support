import { useCallback, useState } from "react"
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordFieldProps {
    name?: string;
    value: string;
    onChange?: (name: string, value: string) => void;
    disabled?: boolean;
    label?: string;
    className?: string;
    required?: boolean;
    placeholder?: string;
}

const PasswordField = ({
    name,
    value,
    onChange,
    disabled,
    label,
    className,
    required,
    placeholder
}: PasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPasswordChange = useCallback(() => {
        setShowPassword(prev => !prev)
    }, [])

    const handleChange = useCallback(event => {
        onChange(name, event?.target?.value)
    }, [name, onChange])

    return (
        <div className={cn(
            "space-y-2",
            className
        )}>
            <Label htmlFor={name} className="text-sm font-medium">
                {label}
            </Label>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                    id={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className="pl-10 pr-10 h-11 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                    required={required}
                    disabled={disabled}
                />
                <button
                    type="button"
                    onClick={handleShowPasswordChange}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    disabled={disabled}
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>
            </div>
        </div>
    )
}

export default PasswordField