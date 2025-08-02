import { RecordWithAnyValue } from "@/interfaces/global";

const generateListData = (
  data: RecordWithAnyValue[],
  { key, value }: { key: string; value: string }
) => {
  return data.map((record) => ({
    key: record[key] || "",
    value: record[value] || "",
    ...record,
  }));
};

export default generateListData;
