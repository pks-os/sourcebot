import { NavigationMenu } from "./components/navigationMenu";
import { SearchBar } from "./components/searchBar";
import { Separator } from "@/components/ui/separator";
import { UpgradeToast } from "./components/upgradeToast";
import Link from "next/link";
import { getOrgFromDomain } from "@/data/org";
import { PageNotFound } from "./components/pageNotFound";
import { Footer } from "@/app/components/footer";
import { SourcebotLogo } from "../components/sourcebotLogo";
import { RepositorySnapshot } from "./components/repositorySnapshot";
import { KeyboardShortcutHint } from "./components/keyboardShortcutHint";
import { UnityLogo } from "../components/unityLogo";

export default async function Home({ params: { domain } }: { params: { domain: string } }) {
    const org = await getOrgFromDomain(domain);
    if (!org) {
        return <PageNotFound />
    }

    return (
        <div className="flex flex-col items-center overflow-hidden min-h-screen">
            <NavigationMenu
                domain={domain}
            />
            <UpgradeToast />
            <div className="flex flex-col justify-center items-center mt-8 mb-8 md:mt-18 w-full px-5">
                <div className="mb-10 flex flex-col items-center">
                    <UnityLogo
                        className="h-32 w-auto mb-2"
                    />
                    <div className="flex items-center mt-2">
                        <h1 className="text-white text-3xl font-bold">Code Search</h1>
                        <span className="text-[#999999] text-sm ml-3 mt-1 flex items-center">
                            powered by{" "}
                            <Link href="https://sourcebot.dev" className="ml-1">
                                <SourcebotLogo size="large" className="h-8 w-auto inline-block" />
                            </Link>
                        </span>
                    </div>
                </div>
                <SearchBar
                    autoFocus={true}
                    className="mt-4 w-full max-w-[800px]"
                />
                <div className="mt-8">
                    <RepositorySnapshot />
                </div>
                <div className="flex flex-col items-center w-fit gap-6">
                    <Separator className="mt-5" />
                    <span className="font-semibold">Search examples</span>
                    <div className="grid grid-cols-1 gap-5">
                        <QueryExample>
                            <Query query="Properties\s*\{ file:\.shader$">{`Properties\\s*\\{`} <Highlight>file:</Highlight>\.shader$</Query> <QueryExplanation>(shader property blocks - filter by file)</QueryExplanation>
                        </QueryExample>
                        <QueryExample>
                            <Query query="Debug\.Log\(.*\) lang:csharp">Debug\.Log\(.*\) <Highlight>lang:</Highlight>csharp</Query> <QueryExplanation>(find all debug logs - filter by language)</QueryExplanation>
                        </QueryExample>
                        <QueryExample>
                            <Query query={`"void Update()"`}>{`"void Update()"`}</Query> <QueryExplanation>(exact match)</QueryExplanation>
                        </QueryExample>
                        <QueryExample>
                            <Query query="using\sUnityEngine repo:msukkari/A-Distant-Path">using UnityEngine <Highlight>repo:</Highlight>msukkari/A-Distant-Path</Query> <QueryExplanation>(find all UnityEngine imports in a specific repo)</QueryExplanation>
                        </QueryExample>
                    </div>
                    <div className="text-sm">
                        <span className="dark:text-gray-300">Reference guide: </span><KeyboardShortcutHint shortcut="⌘" /> <KeyboardShortcutHint shortcut="/" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

const HowToSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <div className="flex flex-col gap-1">
            <span className="dark:text-gray-300 text-sm mb-2 underline">{title}</span>
            {children}
        </div>
    )

}

const Highlight = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className="text-highlight">
            {children}
        </span>
    )
}

const QueryExample = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className="text-sm font-mono">
            {children}
        </span>
    )
}

const QueryExplanation = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className="text-gray-500 dark:text-gray-400 ml-3">
            {children}
        </span>
    )
}

const Query = ({ query, children }: { query: string, children: React.ReactNode }) => {
    return (
        <Link
            href={`/search/search?query=${query}`} // @nocheckin: This is a temporary fix to ensure the query is encoded correctly.
            className="cursor-pointer hover:underline"
        >
            {children}
        </Link>
    )
}
