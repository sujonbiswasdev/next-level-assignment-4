import { ChangePasswordForm } from '@/components/modules/auth/ChangePassword'
import VerifyOtp from '@/components/modules/auth/EmailVerifyOtp'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import { getSession } from '@/services/auth.service'
import React from 'react'

const Page = async() => {
    const userinfo= await getSession()
  return (
    <div className="w-full max-w-2xl mx-auto px-3 py-8 sm:px-6 mt-6 md:mt-10 lg:mt-14 xl:mt-18 flex space-x-3 space-y-3 gap-5">
      <React.Suspense fallback={<div>Loading settings...</div>}>
        <ErrorBoundary fallback={<div>Something went wrong in settings.</div>}>
          <ChangePasswordForm />
          <VerifyOtp email={userinfo?.data?.email} type="email-verification" />
        </ErrorBoundary>
      </React.Suspense>
    </div>
  )
}

export default Page