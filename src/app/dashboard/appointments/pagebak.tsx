"use client";
import { getMonth } from "@/app/_ui/dashboard/_utils/days";

const AppointmentPage = () => {
  const months = getMonth();
  console.table(months);
  return <div>{JSON.stringify(months.length)}</div>;
};
export default AppointmentPage;
