import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
    <SignIn
  appearance={{
    variables: {
      colorPrimary: "#2563eb",
      colorText: "#111827",
    },
    elements: {
      formFieldInput: "bg-gray-200 focus:ring-2 focus:ring-blue-500",
      button: "bg-indigo-600 text-white hover:bg-indigo-700",
    },
  }}
/>
</div>

  )
}