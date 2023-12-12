import Loader from '@/components/Loader'

export default async function UserPostsSkeleton() {
  return (
    <div className="col-span-1 lg:w-[680px] x1:w-[800px] mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4">
      <Loader />
    </div>
  )
}
