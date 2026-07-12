import Section from "@/components/container/genericContainer/Section";
import VendorOnboardingForm from "./VendorOnboardingForm";
import { Suspense } from "react";
import { RegistrationSkeleton } from "@/components/Skeletons";
/**
 * The top-level Page component for vendor registration.
 * Supports SRP: Handles routing and renders the main client component.
 * @returns {JSX.Element}
 */
export default function VendorRegisterPage() {
  return (
    <Section>
      <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* The interactive form is encapsulated within the Client Component */}
        <Suspense fallback={<RegistrationSkeleton/>}>
            <VendorOnboardingForm/>
        </Suspense>
      </div>
    </div>
    </Section>
  );
}