import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#282D44] text-white py-12">
      <div className="container mx-auto px-4">
      <div className="flex items-center py-4">     
             <Image
             src='/img/C@merMap.png' 
             width={126}
             height={126}
             alt="logo"
             />                   
        </div>        
        <div className="border-t border-[#E1E1E1] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm md:text-base">
              © 2024. All Rights Reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="hover:underline">Terms & Condition</a>
              <span className="text-[#F8F8F8]">•</span>
              <a href="#" className="hover:underline">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

