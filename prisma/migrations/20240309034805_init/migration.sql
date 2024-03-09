-- CreateEnum
CREATE TYPE "PhysicalPart" AS ENUM ('HEAD_AND_NECK', 'CHEST', 'ABDOMEN', 'BACK', 'UPPER_EXTREMITIES', 'LOWER_EXTREMITIES', 'GENITALS', 'SKIN', 'EYES', 'EARS', 'NOSE', 'MOUTH_AND_THROAT', 'OTHER');

-- CreateEnum
CREATE TYPE "AlcoholUse" AS ENUM ('NONE', 'SOCIAL', 'MODERATE', 'HEAVY');

-- CreateEnum
CREATE TYPE "TobaccoUse" AS ENUM ('NEVER', 'CURRENT', 'FORMER');

-- CreateEnum
CREATE TYPE "DrugUse" AS ENUM ('NONE', 'RECREATIONAL', 'CHRONIC');

-- CreateEnum
CREATE TYPE "ExerciseHabits" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'VIGOROUS');

-- CreateEnum
CREATE TYPE "DietHabits" AS ENUM ('HEALTHY', 'BALANCED', 'UNHEALTHY');

-- CreateEnum
CREATE TYPE "LivingConditions" AS ENUM ('URBAN', 'RURAL', 'HOMELESS', 'INSTITUTIONALIZED', 'OTHER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'PREFER_NOT_TO_SAY', 'OTHER');

-- CreateEnum
CREATE TYPE "CivilStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'SEPARATED', 'OTHER');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PATIENT', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "MedicalField" AS ENUM ('CARDIOLOGY', 'DERMATOLOGY', 'ENDOCRINOLOGY', 'GASTROENTEROLOGY', 'HEMATOLOGY', 'INFECTIOUS_DISEASE', 'NEPHROLOGY', 'NEUROLOGY', 'ONCOLOGY', 'OPHTHALMOLOGY', 'ORTHOPEDICS', 'OTOLARYNGOLOGY', 'PEDIATRICS', 'PSYCHIATRY', 'PULMONOLOGY', 'RADIOLOGY', 'RHEUMATOLOGY', 'UROLOGY', 'OTHER');

-- CreateEnum
CREATE TYPE "AllergySeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "LaboratoryRequestStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'PATIENT',
    "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "consent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isEmployee" BOOLEAN NOT NULL DEFAULT false,
    "isPatient" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeRole" (
    "id" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "mname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "bdate" TIMESTAMP(3) NOT NULL,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,
    "clinicalDepartmentId" TEXT,
    "serviceDepartmentId" TEXT,
    "employeeRoleId" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fname" TEXT NOT NULL,
    "mname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "nameSuffix" TEXT,
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,
    "bdate" TIMESTAMP(3) NOT NULL,
    "bplace" TEXT NOT NULL,
    "civilStatus" "CivilStatus" NOT NULL DEFAULT 'SINGLE',
    "occupation" TEXT,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaccination" (
    "id" TEXT NOT NULL,
    "vaccineName" TEXT NOT NULL,
    "administeredAt" TIMESTAMP(3) NOT NULL,
    "administeredBy" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "nextDueDate" TIMESTAMP(3),
    "patientId" TEXT,

    CONSTRAINT "Vaccination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyMedicalHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "condition" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "ageOfOnset" INTEGER,
    "patientId" TEXT,

    CONSTRAINT "FamilyMedicalHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialHistory" (
    "id" TEXT NOT NULL,
    "alcoholUse" "AlcoholUse" NOT NULL DEFAULT 'NONE',
    "tobaccoUse" "TobaccoUse" NOT NULL DEFAULT 'NEVER',
    "drugUse" "DrugUse" NOT NULL DEFAULT 'NONE',
    "exerciseHabits" "ExerciseHabits" NOT NULL DEFAULT 'VIGOROUS',
    "dietHabits" "DietHabits" NOT NULL DEFAULT 'HEALTHY',
    "occupation" TEXT,
    "livingConditions" "LivingConditions" NOT NULL DEFAULT 'URBAN',
    "patientId" TEXT,

    CONSTRAINT "SocialHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaboratoryRequest" (
    "id" TEXT NOT NULL,
    "status" "LaboratoryRequestStatus" NOT NULL DEFAULT 'PENDING',
    "dateRequested" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "labProcedureId" TEXT,
    "requestingPhysicianId" TEXT NOT NULL,
    "visitId" TEXT,
    "patientId" TEXT,

    CONSTRAINT "LaboratoryRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaboratoryResults" (
    "id" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "testDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT,
    "laboratoryRequestId" TEXT NOT NULL,

    CONSTRAINT "LaboratoryResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL,
    "laboratoryResultId" TEXT NOT NULL,
    "parameter" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "referenceRange" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allergies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "severity" "AllergySeverity" NOT NULL DEFAULT 'LOW',
    "dateDiagnosed" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT,

    CONSTRAINT "Allergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrugCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DrugCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrugForm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "DrugForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drugs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "drugCategoryId" TEXT,
    "drugFormId" TEXT,
    "strength" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "priceInCents" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Drugs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presciption" (
    "id" TEXT NOT NULL,
    "drugsId" TEXT,
    "dosage" INTEGER NOT NULL,
    "frequencyPerDay" INTEGER,
    "takenEveryHour" INTEGER,
    "durationInDays" INTEGER NOT NULL,
    "notes" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT,
    "visitId" TEXT,
    "physicianId" TEXT,

    CONSTRAINT "Presciption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "employeedId" TEXT,
    "patientId" TEXT,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "barangay" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contactInfoId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionInfo" (
    "id" TEXT NOT NULL,
    "medicalField" "MedicalField" DEFAULT 'OTHER',
    "specifyField" TEXT,
    "licenseNumber" TEXT,
    "dateRegistered" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "employeeId" TEXT,

    CONSTRAINT "ProfessionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicalDepartment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "head" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClinicalDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceDepartment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "head" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "accompaniedBy" TEXT,
    "chiefComplaint" TEXT NOT NULL,
    "hpi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceDepartmentId" TEXT,
    "patientId" TEXT,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhysicalExamination" (
    "id" TEXT NOT NULL,
    "physicalPart" "PhysicalPart",
    "specifyIfOther" TEXT,
    "isNormal" BOOLEAN NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visitId" TEXT,
    "patientId" TEXT,

    CONSTRAINT "PhysicalExamination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaboratoryProcedures" (
    "id" TEXT NOT NULL,
    "procedureName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "labProcedureCategoryId" TEXT,

    CONSTRAINT "LaboratoryProcedures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaboratoryProcedureCategory" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LaboratoryProcedureCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnosis" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "diagnosisDate" TIMESTAMP(3) NOT NULL,
    "treatment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT,
    "visitId" TEXT,
    "physicianId" TEXT,

    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vitals" (
    "id" TEXT NOT NULL,
    "heightInCm" INTEGER NOT NULL,
    "weightInKg" INTEGER NOT NULL,
    "bloodPressure" TEXT NOT NULL,
    "pulseRate" TEXT NOT NULL,
    "respiratoryRate" TEXT NOT NULL,
    "bodyTemperatureInCelsius" INTEGER NOT NULL,
    "oxygenSaturation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "checkedById" TEXT NOT NULL,
    "visitId" TEXT NOT NULL,
    "patientId" TEXT,

    CONSTRAINT "Vitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorConfirmation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TwoFactorConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFactorToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeRole_roleName_key" ON "EmployeeRole"("roleName");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_profileId_key" ON "Employee"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_profileId_key" ON "Patient"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialHistory_patientId_key" ON "SocialHistory"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "LaboratoryResults_laboratoryRequestId_key" ON "LaboratoryResults"("laboratoryRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "DrugCategory_name_key" ON "DrugCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DrugForm_name_key" ON "DrugForm"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Drugs_name_key" ON "Drugs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_employeedId_key" ON "ContactInfo"("employeedId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_patientId_key" ON "ContactInfo"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionInfo_employeeId_key" ON "ProfessionInfo"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicalDepartment_name_key" ON "ClinicalDepartment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceDepartment_name_key" ON "ServiceDepartment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LaboratoryProcedureCategory_categoryName_key" ON "LaboratoryProcedureCategory"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "Vitals_visitId_key" ON "Vitals"("visitId");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorConfirmation_userId_key" ON "TwoFactorConfirmation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_token_key" ON "TwoFactorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_email_token_key" ON "TwoFactorToken"("email", "token");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_clinicalDepartmentId_fkey" FOREIGN KEY ("clinicalDepartmentId") REFERENCES "ClinicalDepartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_serviceDepartmentId_fkey" FOREIGN KEY ("serviceDepartmentId") REFERENCES "ServiceDepartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employeeRoleId_fkey" FOREIGN KEY ("employeeRoleId") REFERENCES "EmployeeRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccination" ADD CONSTRAINT "Vaccination_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMedicalHistory" ADD CONSTRAINT "FamilyMedicalHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialHistory" ADD CONSTRAINT "SocialHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaboratoryRequest" ADD CONSTRAINT "LaboratoryRequest_labProcedureId_fkey" FOREIGN KEY ("labProcedureId") REFERENCES "LaboratoryProcedures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaboratoryRequest" ADD CONSTRAINT "LaboratoryRequest_requestingPhysicianId_fkey" FOREIGN KEY ("requestingPhysicianId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaboratoryRequest" ADD CONSTRAINT "LaboratoryRequest_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaboratoryRequest" ADD CONSTRAINT "LaboratoryRequest_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaboratoryResults" ADD CONSTRAINT "LaboratoryResults_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaboratoryResults" ADD CONSTRAINT "LaboratoryResults_laboratoryRequestId_fkey" FOREIGN KEY ("laboratoryRequestId") REFERENCES "LaboratoryRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_laboratoryResultId_fkey" FOREIGN KEY ("laboratoryResultId") REFERENCES "LaboratoryResults"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergies" ADD CONSTRAINT "Allergies_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drugs" ADD CONSTRAINT "Drugs_drugCategoryId_fkey" FOREIGN KEY ("drugCategoryId") REFERENCES "DrugCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drugs" ADD CONSTRAINT "Drugs_drugFormId_fkey" FOREIGN KEY ("drugFormId") REFERENCES "DrugForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presciption" ADD CONSTRAINT "Presciption_drugsId_fkey" FOREIGN KEY ("drugsId") REFERENCES "Drugs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presciption" ADD CONSTRAINT "Presciption_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presciption" ADD CONSTRAINT "Presciption_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presciption" ADD CONSTRAINT "Presciption_physicianId_fkey" FOREIGN KEY ("physicianId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInfo" ADD CONSTRAINT "ContactInfo_employeedId_fkey" FOREIGN KEY ("employeedId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactInfo" ADD CONSTRAINT "ContactInfo_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionInfo" ADD CONSTRAINT "ProfessionInfo_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_serviceDepartmentId_fkey" FOREIGN KEY ("serviceDepartmentId") REFERENCES "ServiceDepartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalExamination" ADD CONSTRAINT "PhysicalExamination_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalExamination" ADD CONSTRAINT "PhysicalExamination_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaboratoryProcedures" ADD CONSTRAINT "LaboratoryProcedures_labProcedureCategoryId_fkey" FOREIGN KEY ("labProcedureCategoryId") REFERENCES "LaboratoryProcedureCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_physicianId_fkey" FOREIGN KEY ("physicianId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_checkedById_fkey" FOREIGN KEY ("checkedById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFactorConfirmation" ADD CONSTRAINT "TwoFactorConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
