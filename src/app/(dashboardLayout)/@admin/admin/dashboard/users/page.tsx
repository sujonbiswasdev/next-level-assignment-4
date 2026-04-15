import { getAllusers } from '@/actions/user.actions';
import UserTable from '@/components/modules/users/usertable';
import { Ipagination } from '@/types/pagination.type';
import { TResponseUserData } from '@/types/user.type';
import React from 'react';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import ErrorFallback from '@/components/shared/ErrorFallback';

const Userpage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search = await searchParams;
  let res;

  try {
    res = await getAllusers(search);
  } catch (error) {
    return (
      <ErrorFallback
        title="Unable to Load Users"
        message="Sorry, we couldn't retrieve the user list at this time. Please refresh the page or try again later. If the problem persists, contact support."
      />
    );
  }

  if (!res?.success || !res?.data) {
    return (
      <ErrorFallback
        title="No Users Found"
        message="We could not find any users to display right now. Please check your filters or try again soon. If you think this is an error, please contact support."
      />
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          title="Error Displaying Users"
          message="An unexpected error occurred while displaying the user list. Please try again later or reach out to support if the issue continues."
        />
      }
    >
      <div>
        <UserTable
          users={
            res.data as TResponseUserData<{ accounts: { password: string } }>[]
          }
          pagination={res.pagination as Ipagination}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Userpage;
