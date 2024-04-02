export const SAMPLE_PATIENT_DATA = {
  id: "USER1",
  username: "clyde03",
  email: "lemon256san@gmail.com",
  password: "password123",
  role: "PATIENT",
  consent: true,
  profile: {
    create: {
      id: "PROFILE1",
      isEmployee: false,
      isPatient: true,
      patient: {
        create: {
          id: "PATIENT1",
          fname: "clyde",
          mname: "arrogante",
          lname: "santuele",
          gender: "MALE",
          age: 23,
          bdate: "2023-12-27T10:48:22Z",
          bplace: "makati",
          civilStatus: "SINGLE",
          occupation: "Software engineer",
          contactInfo: {
            create: {
              id: "CONTACT1",
              phone: "09999999999",
              email: "lemon256san@gmail.com",
              address: {
                create: {
                  id: "ADDR1",
                  houseNumber: "1",
                  street: "seagull",
                  barangay: "rizal",
                  city: "taguig",
                  region: "ncr",
                  province: "metro manila",
                  country: "philippines",
                  zipCode: "1234",
                },
              },
            },
          },
          allergies: {
            create: [
              {
                name: "Peanut Allergy",
                description: "Allergic reaction to peanuts",
                severity: "HIGH",
              },
              {
                name: "Penicillin Allergy",
                description: "Allergic reaction to penicillin antibiotics",
                severity: "MEDIUM",
              },
              {
                name: "Dust Allergy",
                description: "Allergic reaction to dust mites",
                severity: "LOW",
              },
            ],
          },
          visits: {
            create: [
              {
                accompaniedBy: "Parent",
                chiefComplaint: "Fever and Cough",
                hpi: "Patient has been experiencing fever and cough for the past three days. No improvement with over-the-counter medications.",
                vitals: {
                  create: {
                    heightInCm: 170,
                    weightInKg: 70,
                    bloodPressure: "120/80",
                    pulseRate: "90",
                    respiratoryRate: "20",
                    bodyTemperatureInCelsius: 38.5,
                    oxygenSaturation: "98%",
                    checkedById: "NURSE1",
                  },
                },
                physicalExamination: {
                  create: [
                    {
                      physicalPart: "HEAD_AND_NECK",
                      isNormal: true,
                      remarks: "No abnormalities observed.",
                    },
                  ],
                },
                diagnosis: {
                  create: [
                    {
                      condition: "Upper Respiratory Tract Infection",
                      diagnosisDate: "2024-03-01T10:00:00Z",
                      treatment: "Prescribed antibiotics and rest.",
                      physicianId: "1",
                    },
                  ],
                },
                prescriptions: {
                  create: [
                    {
                      drugName: "Amoxicillin",
                      dosage: 500,
                      frequencyPerDay: 3,
                      durationInDays: 7,
                      notes: "Take with food.",
                      physicianId: "1",
                      drugsId: "1",
                    },
                  ],
                },
                laboratoryRequest: {
                  create: [
                    {
                      labProcedureId: "LP100001",
                      requestingPhysicianId: "DOC1",
                    },
                  ],
                },
                serviceDepartmentId: "1",
              },
              {
                accompaniedBy: "Spouse",
                chiefComplaint: "Abdominal Pain",
                hpi: "Patient presents with severe abdominal pain localized to the right lower quadrant. Pain started two days ago and has been progressively worsening.",
                vitals: {
                  create: {
                    heightInCm: 165,
                    weightInKg: 60,
                    bloodPressure: "110/70",
                    pulseRate: "80",
                    respiratoryRate: "18",
                    bodyTemperatureInCelsius: 37.0,
                    oxygenSaturation: "99%",
                    checkedById: "NURSE1",
                  },
                },
                physicalExamination: {
                  create: {
                    physicalPart: "ABDOMEN",
                    isNormal: false,
                    remarks: "Tenderness in the right lower quadrant.",
                  },
                },
                diagnosis: {
                  create: {
                    condition: "Appendicitis",
                    diagnosisDate: "2024-03-01T11:30:00Z",
                    treatment: "Emergency surgery required.",
                    physicianId: "2",
                  },
                },
                prescriptions: {
                  create: {
                    drugName: "Morphine",
                    dosage: 10,
                    frequencyPerDay: 1,
                    durationInDays: 1,
                    notes: "Pain relief for surgery.",
                    physicianId: "2",
                    drugsId: "2",
                  },
                },
                laboratoryRequest: {
                  create: {
                    labProcedureId: "LP100001",
                    requestingPhysicianId: "DOC1",
                  },
                },
                serviceDepartmentId: "2",
              },
              {
                accompaniedBy: "Sibling",
                chiefComplaint: "Sore Throat",
                hpi: "Patient complains of a sore throat with difficulty swallowing. No fever or cough reported.",
                vitals: {
                  create: {
                    heightInCm: 175,
                    weightInKg: 65,
                    bloodPressure: "115/75",
                    pulseRate: "75",
                    respiratoryRate: "16",
                    bodyTemperatureInCelsius: 36.5,
                    oxygenSaturation: "97%",
                    checkedById: "NURSE1",
                  },
                },
                physicalExamination: {
                  create: {
                    physicalPart: "MOUTH_AND_THROAT",
                    isNormal: true,
                    remarks:
                      "Mild inflammation, likely due to viral infection.",
                  },
                },
                diagnosis: {
                  create: {
                    condition: "Pharyngitis",
                    diagnosisDate: "2024-03-01T13:45:00Z",
                    treatment: "Prescribed analgesics and throat lozenges.",
                    physicianId: "3",
                  },
                },
                prescriptions: {
                  create: {
                    drugName: "Paracetamol",
                    dosage: 500,
                    frequencyPerDay: 3,
                    durationInDays: 5,
                    notes: "For relief of sore throat pain.",
                    physicianId: "3",
                    drugsId: "3",
                  },
                },
                laboratoryRequest: {
                  create: {
                    labProcedureId: "LP100001",
                    requestingPhysicianId: "DOC1",
                  },
                },
                serviceDepartmentId: "3",
              },
            ],
          },
        },
      },
    },
  },
};
