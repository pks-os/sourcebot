import { RepositoryTable } from "./repositoryTable";
import { getOrgFromDomain } from "@/data/org";
import { PageNotFound } from "../components/pageNotFound";
import { Header } from "../components/header";
import { getOrgPublicInfo } from "@/actions";
import { isServiceError } from "@/lib/utils";
import { OrgRole } from "@sourcebot/db";

export default async function ReposPage({ params: { domain } }: { params: { domain: string } }) {
    const org = await getOrgFromDomain(domain);
    if (!org) {
        return <PageNotFound />
    }

    const orgPublicInfo = await getOrgPublicInfo(domain);
    if (isServiceError(orgPublicInfo)) {
        return <PageNotFound />
    }
    
    const displayAdminInfo = !orgPublicInfo.isPublic || orgPublicInfo.userRole === OrgRole.OWNER;

    return (
        <div>
            <Header>
                <h1 className="text-3xl">Repositories</h1>
            </Header>
            <div className="flex flex-col items-center">
                <div className="w-full">
                    <RepositoryTable displayAdminInfo={displayAdminInfo} />
                </div>
            </div>
        </div>
    )
}
