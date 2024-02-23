"use client";

import { verify } from "@/actions/auth";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FormStatusText from "./FormStatusText";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = useCallback(async () => {
    setError("");
    setSuccess("");

    if (!token) {
      setError("Missing token!");
      return;
    }

    try {
      const data = await verify(token);

      if (data.success) setSuccess(data.success);
      if (data.error) setError(data.error);
    } catch (error) {
      setError("Something went wrong!");
    }

    console.log(token);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <div>
      <h1>NewVerificationForm</h1>

      {!success && !error && <p>Loading...</p>}

      {/* FORM STATUS */}
      {(success || error) && (
        <FormStatusText
          status={success ? "success" : "error"}
          message={success ? success : error}
        />
      )}
    </div>
  );
};
export default NewVerificationForm;
