export default function CustomerCard({customer}: any) {
  if (!customer) {
    return <div>Select a customer to view details</div>;
  }

  return (
    <div>
      <div className="px-4 py-1 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Customer Card
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Details about the customer.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customer.name}
            </dd>
          </div>
          <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customer.phone}
            </dd>
          </div>
          <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customer.email}
            </dd>
          </div>
          <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Birthday
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customer.birthday}
            </dd>
          </div>
          <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Note
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customer.note}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
