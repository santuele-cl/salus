"use client";
import { signIn, signOut } from "@/auth";
import LoginForm from "@/app/_ui/auth/LoginForm";
import RegisterForm from "@/app/_ui/auth/RegisterForm";
import { Button } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextSchema } from "../_schemas/zod/schema";
import { z } from "zod";
import { addTime } from "@/actions/test";
const TestPage = () => {
  const { register, handleSubmit, formState, reset, control } = useForm<
    z.infer<typeof TextSchema>
  >({
    resolver: zodResolver(TextSchema),
    defaultValues: {
      // dateTime: new Date()  ,
    },
  });

  // console.log(dateTime);
  // console.log(formState);

  const onSubmit = (data: z.infer<typeof TextSchema>) => {
    const parse = TextSchema.safeParse(data);

    if (parse.success) {
      console.log(parse.data);
      console.log(data);

      addTime(data.dateTime);
    } else {
      console.log("parse error");
    }
  };

  return (
    <div>
      {/* <LoginForm />
      <RegisterForm />
      <form
        action={async () => {
          "use server";

          await signIn();
        }}
      >
        <Button type="submit">Sign in</Button>
      </form>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="dateTime"
            control={control}
            defaultValue={new Date()}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="Basic date time picker"
                // value={dateTime}
                // onChange={(e) => setDateTime(e)}
              />
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </LocalizationProvider>
      <DevTool control={control} />
    </div>
  );
};
export default TestPage;
