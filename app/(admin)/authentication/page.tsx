import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className=" bg-[url('/img/font.png')] bg-cover bg-center min-h-screen flex flex-col pt-[56px] ">
      <div className=" mx-auto flex items-center pb-[56px]">
        <Image src="/img/C@merMap.png" width={126} height={126} alt="logo" />
      </div>
      <LoginForm />
    </div>
  );
}
