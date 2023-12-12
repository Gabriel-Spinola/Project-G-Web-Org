/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

export default function ProfileCardSkeleton() {
  return (
    <section
      id="Wrapper"
      className="flex h-[208px] min-w-full max-w-full items-center gap-[32px] py-0 px-[64px]"
    >
      {/* NOTE - Profile pic */}
      <div id="profile-avatar-wrapper">{/* <Avatar /> */}</div>

      {/* NOTE - Card info */}
      <div
        id="profile-info-wrapper"
        className="flex flex-row items-center w-[100%] h-[161px] gap-[75%] text-darker-white z-[1]"
      >
        <div id="info-name-wrapper" className="flex flex-col gap-4">
          <span className="h-[32px] w-[280px] bg-[#A0AEC0]" />
          <span className="h-[24px] w-[180px] bg-[#A0AEC0]" />
        </div>
      </div>
    </section>
  )
}
