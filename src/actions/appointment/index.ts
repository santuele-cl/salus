"use server"

import { db } from "@/app/_lib/db"
import { AppointmentSchema } from "@/app/_schemas/zod/schema"
import { unstable_noStore } from "next/cache"
import { z } from "zod"

export async function getAppointments() {
    unstable_noStore()
    try {
        const appointments = await db.appointments.findMany()
        if(!appointments) return { error: "No appointments found!"}
        return {success: "Fetch successful!", data: appointments}

    } catch (error) {
        return {error: "An error has occured!. Appointments not fetched!"}
    }
}

export async function createAppointment(values: z.infer<typeof AppointmentSchema>) {
    const parsedFields = AppointmentSchema.safeParse(values)
    
    if(!parsedFields.success) return { error: "Parse Error!"}
    
    const data = parsedFields.data
    console.log(data)

    try {
        const newAppointment = await db.appointments.create({data})
        if(!newAppointment) return {error: "Appointment not created!"}
        return {success: "Appointment saved!", data: newAppointment}

    } catch (error) {
        return {error: "An error has occured!. Appointment not saved!"}
    }
}

export async function updateAppointment(values: Partial<z.infer<typeof AppointmentSchema>>, id: string) {
    const parsedFields = AppointmentSchema.partial().safeParse(values)
    console.log(parsedFields)
    if(!parsedFields.success) return { error: "Parse Error!"}
    
    const data = parsedFields.data

    try {
        const newAppointment = await db.appointments.update({where: {id},data})
        if(!newAppointment) return {error: "Appointment not saved!"}

        return {success: "Appointment saved!", data: newAppointment}

    } catch (error) {
        return {error: "An error has occured!. Appointment not updated!"}
    }
}

export async function deleteAppointment(id:string) {
    if(!id) return {error: "Missing appointment ID!"}

    try {
        const existingAppointment = await db.appointments.delete({where: {id}})
        if(!existingAppointment) return {error: "Appointment not found!"}

        return {success: ""}
    } catch (error) {
        return {error: "An error has occured!. Appointment not deleted!"}
    }
    
}