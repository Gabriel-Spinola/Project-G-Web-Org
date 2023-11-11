import { CircularProgress } from '@chakra-ui/react'

export default async function UserPostsSkeleton() {
  return (
    <div className="col-span-1 lg:w-[680px] x1:w-[800px] mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4">
      <CircularProgress isIndeterminate color="black" size={8} />
    </div>
  )
}
