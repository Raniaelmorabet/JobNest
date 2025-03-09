import AuthUI from "@/components/Auth-ui"
// import MobileAuthUI from "@/components/mobile-auth-ui"

export default function Auth() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <AuthUI />
      {/* <MobileAuthUI /> */}
    </main>
  )
}

