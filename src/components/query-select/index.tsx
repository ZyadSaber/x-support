import { useCallback, useState } from "react";
import Select, { SharedSelectProps, OptionType } from "@/components/select"
import useFetch from "@/hooks/useFetch";
import { RecordWithAnyValue } from "@/interfaces/global"

interface QuerySelectProps extends SharedSelectProps {
    endPoint: string;
}

const QuerySelect = ({ endPoint, ...props }: QuerySelectProps) => {
    const [options, setOptions] = useState<OptionType[]>([])

    const handleApiResponse = useCallback((data?: OptionType[], error?: string | unknown) => {
        if (error) {
            return
        }
        setOptions(data || [])
    }, [])

    const { isLoading } = useFetch({
        endpoint: endPoint,
        callOnFirstRender: true,
        onResponse: handleApiResponse
    })

    return (
        <Select
            loading={isLoading}
            options={options}
            {...props}
        />
    )
}

export default QuerySelect