import { useCallback, useEffect, useState } from "react";

export type UseAsyncStatus = "pending" | "error" | "success";
export type UseAsyncOptions = { immediate?: boolean };

export function useAsync<ValueType>(
  fn: () => Promise<ValueType>,
  { immediate = true }: UseAsyncOptions = {}
): {
  execute: () => Promise<void>;
  status: UseAsyncStatus;
  error: any;
  value: ValueType | null;
} {
  const [status, setStatus] = useState<UseAsyncStatus>("pending");
  const [value, setValue] = useState<ValueType | null>(null);
  const [error, setError] = useState<any>(null);
  const execute = useCallback(async () => {
    setStatus("pending");
    setValue(null);
    setError(null);
    fn().then(
      (value) => {
        setValue(value);
        setStatus("success");
      },
      (error) => {
        setError(error);
        setStatus("error");
      }
    );
  }, [fn]);
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { execute, status, value, error };
}
