export default async function UserPostsSkeleton() {
  return (
    <section
      id="PostWrapper"
      className="flex flex-col lg:w-[680px] x1:w-[800px]"
    >
      <div
        className={`w-full my-8 p-8 bg-gradient-to-tl bg-medium-gray text-darker-white hover:font-semibold rounded-xl hover:scale-[101%] text-start text-lg`}
      >
        Faça uma Publicação
      </div>
      <div className="w-full p-4 shadow-lg-[#00000065] bg-pure-white h-[600px] rounded-xl"></div>
    </section>
  )
}
