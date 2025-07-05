import { UserProfile } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 flex items-center">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">Quản lý tài khoản</h1>
        <div className="overflow-hidden rounded-xl bg-white shadow-md border border-gray-200">
          <UserProfile
            routing="hash"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0",
                pageScrollBox: "p-6",
                headerTitle: "text-xl font-semibold text-gray-700",
                navbar: "hidden", // Example: hide internal navbar if not needed
              },
            }}
          />
        </div>
      </div>
    </div>
  );
} 