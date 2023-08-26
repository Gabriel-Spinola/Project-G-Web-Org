import { ModelsApiCode } from "@/lib/database/table.types";
import { useEffect } from "react";

export function FindProject(setData: any, id: string) {
  useEffect(function () {
    async function fetchData() {
      const response = await fetch(`/api/services/find-unique/?id=${id}&modelCode=${ModelsApiCode.Project}`, {
        method: 'POST',
      });

      if (response.ok) {
        const { data } = await response.json()

        setData(data);
      }
    }

    fetchData();
  }, [id])
}