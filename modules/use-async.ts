import { useCallback, useEffect, useState } from "react";

export type UseAsyncStatus = "pending" | "error" | "success";

export function useAsync<ValueType>(
  callback: () => Promise<ValueType>,
  deps: React.DependencyList
): {
  status: UseAsyncStatus;
  error: any;
  value: ValueType | null;
} {
  const [status, setStatus] = useState<UseAsyncStatus>("pending");
  const [value, setValue] = useState<ValueType | null>(null);
  const [error, setError] = useState<any>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cachedCallback = useCallback(callback, deps);
  const execute = useCallback(() => {
    setStatus("pending");
    setValue(null);
    setError(null);
    Promise.resolve()
      .then(() => cachedCallback())
      .then(
        (value) => {
          setValue(value);
          setStatus("success");
        },
        (error) => {
          setError(error);
          setStatus("error");
        }
      );
  }, [cachedCallback]);
  useEffect(() => {
    execute();
  }, [execute]);
  return { status, value, error };
}
