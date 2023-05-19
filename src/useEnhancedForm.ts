import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  ENHANCED_FORM_FETCH_HEADER,
  FORM_DATA_PARAM_PREFIX,
} from "./respondToEnhancedForm";

export const FORM_ENHANCE_ATTRIBUTE = "data-enhance";

// TODO: add 'name' param
// TODO: add 'status' return
export default function useEnhancedForm<T = unknown>() {
  const router = useRouter();

  // TODO: rename me
  const submitData = Object.fromEntries(
    Object.entries(router.query)
      .filter(([key, _]) => key.startsWith(FORM_DATA_PARAM_PREFIX))
      .map(([key, value]) => [key.replace(FORM_DATA_PARAM_PREFIX, ""), value])
  );

  const [data, setData] = useState(submitData);

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>(
      `form[${FORM_ENHANCE_ATTRIBUTE}]`
    );

    form.onsubmit = async (event: SubmitEvent) => {
      event.preventDefault();

      const target = event.target as HTMLFormElement;

      const data = Object.fromEntries(
        new FormData(event.target as HTMLFormElement).entries()
      );

      const response = await fetch(target.action, {
        method: target.method ?? "POST",
        headers: {
          [ENHANCED_FORM_FETCH_HEADER]: "1",
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.type === "REDIRECT") {
          router.push(data.location);
        } else {
          setData(data.data);
        }
      } else {
        const data = await response.json();
        setData(data.data);
      }
    };
  }, [router]);

  return { data: data as T };
}
