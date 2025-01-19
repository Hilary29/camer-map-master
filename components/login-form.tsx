/* import Link from "next/link" */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  return (
    <div>
      <Card className="mx-auto w-[25%] min-w-[306px] bg-[#ffffff17] border-none">
        <CardHeader>
          <CardTitle className="text-2xl text-white mx-auto">
            Authentification
          </CardTitle>
          <CardDescription>
            {/* Enter your email below to login to your account */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 font-regular text-paragraph-md font-inter">
            <div className="grid gap-2">
              <Label
                htmlFor="id"
                className="font-semibold text-paragraph-md font-inter text-white"
              >
                ID 
              </Label>
              <Input id="id" type="id" placeholder="" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label
                  htmlFor="password"
                  className="font-semibold text-paragraph-md font-inter text-white"
                >
                  Mot de passe
                </Label>
                {/*               <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button
              type="submit"
              className="w-full font-semibold font-inter hover:bg-primary-700 bg-primary-800"
            >
              Login
            </Button>
            {/*           <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
          </div>
          {/*         <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
