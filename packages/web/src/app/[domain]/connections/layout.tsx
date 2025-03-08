import { prisma } from "@/prisma";
import { NavigationMenu } from "../components/navigationMenu";
import { PageNotFound } from "../components/pageNotFound";
import { auth } from "@/auth";
import { getOrgFromDomain } from "@/data/org";

export default async function Layout({
    children,
    params: { domain },
}: Readonly<{
    children: React.ReactNode;
    params: { domain: string };
}>) {
    const org = await getOrgFromDomain(domain);

    if (!org) {
        return <PageNotFound />
    }

    const session = await auth();
    if (!session) {
        return <PageNotFound />
    }


    const membership = await prisma.userToOrg.findUnique({
        where: {
            orgId_userId: {
                orgId: org.id,
                userId: session.user.id
            }
        }
    });

    if (!membership) {
        return <PageNotFound />
    }

    return (
        <div className="min-h-screen flex flex-col">
            <NavigationMenu domain={domain} />
            <main className="flex-grow flex justify-center p-4 bg-backgroundSecondary relative">
                <div className="w-full max-w-6xl p-6">{children}</div>
            </main>
        </div>
    )
}