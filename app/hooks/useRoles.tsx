import { useEffect, useState } from "react";
import { api } from "../lib/axios";

export function useRoles() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    api.get("/role/getall").then((res) => {
      setRoles(
        res.data.filter(
          (r: any) => r.role_name !== "ADMIN"
        )
      );
    });
  }, []);

  return roles;
}
