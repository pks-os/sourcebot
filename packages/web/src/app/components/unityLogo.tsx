import unityLogoLight from "@/public/unity_logo_light.png";
import unityLogoDark from "@/public/unity_logo_dark.png";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UnityLogoProps {
    className?: string;
}

export const UnityLogo = ({ className }: UnityLogoProps) => {
    return (
        <>
            <Image
                src={unityLogoDark}
                className={cn("h-16 w-auto hidden dark:block", className)}
                alt={"Unity logo"}
                priority={true}
            />
            <Image
                src={unityLogoLight}
                className={cn("h-16 w-auto block dark:hidden", className)}
                alt={"Unity logo"}
                priority={true}
            />
        </>
    )
};