import UserRegistration from "@/components/auth/UserRegistration";
import VendorRegistrationForm from "@/app/vendor/register/VendorRegistrationForm";
import Section from "@/components/container/genericContainer/Section";

/**
 * The top-level Page component for vendor registration.
 * Supports SRP: Handles routing and renders the main client component.
 * @returns {JSX.Element}
 */
export default function VendorRegisterPage() {
  return (
   <Section> 
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* The interactive form is encapsulated within the Client Component */}
        <UserRegistration/>
      </div>
    </div>
  </Section>
  );
}