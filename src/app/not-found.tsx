import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Frontend Template";
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="text-center">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-6" />

        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          404
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          Page not found
        </p>

        <p className="text-gray-500">
          The page you are looking for does not exist.
        </p>

        <div className="mt-8 text-gray-400 text-sm">
          © {new Date().getFullYear()} {APP_NAME}
        </div>
      </div>
    </div>
  );
}