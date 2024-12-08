import { ContactMe } from '@/components/ContactMe'
import { title } from '@/components/primitives'

export default function ConocemePage() {
  return (
    <div className="flex flex-col gap-8 ">
      <div className="w-full">
        <h1 className={`${title()} text-center py-4`}>Contactame</h1>
      </div>
      <div className="flex flex-1 justify-center items-center flex-col lg:flex-row w-full bg-red">
        <div className="order-2 lg:order-1 lg:mr-4 mb-4 lg:mb-0">asdafas</div>
        <div className="order-1 lg:order-2 w-[400px]  h-[600px] ">
          <ContactMe />
        </div>
      </div>
    </div>
  )
}
