import Header from "@/components/header"
import Hero from "@/components/hero"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Articles from "@/components/articles"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import GitHubActivity, { type GitHubUser, type GitHubRepo } from "@/components/github-activity"
import { Suspense } from "react"

const GITHUB_USERNAME = "lucasrmed"

async function getGitHubData(): Promise<{ user: GitHubUser | null; repos: GitHubRepo[]; error: string | null }> {
  const headers: HeadersInit = {
    "User-Agent": "Vercel-v0-App", // GitHub API recommends setting a User-Agent
  }

  if (process.env.GITHUB_PAT) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_PAT}`
    console.log("Using GITHUB_PAT for GitHub API authentication.")
  } else {
    console.warn(
      "GITHUB_PAT environment variable not set. GitHub API requests will be unauthenticated and may be rate-limited.",
    )
  }

  const fetchOptions = {
    headers: headers,
    next: { revalidate: 3600 }, // Revalidate data every hour
  }

  try {
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, fetchOptions)
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=owner`,
      fetchOptions,
    )

    const responses = [
      { name: "user", response: userResponse },
      { name: "repos", response: reposResponse },
    ]
    const errors: string[] = []

    for (const { name, response } of responses) {
      if (response.status === 403) {
        const responseBody = await response.json().catch(() => ({})) // Add catch for non-JSON 403s
        if (responseBody.message && responseBody.message.includes("rate limit exceeded")) {
          const errorMessage =
            "Atingido o limite de taxa da API do GitHub. Para resolver, configure a variável de ambiente GITHUB_PAT com um Personal Access Token do GitHub."
          // Return immediately as this is a critical, blocking error
          return { user: null, repos: [], error: errorMessage }
        }
      }
      if (!response.ok) {
        errors.push(`Erro ao buscar dados de '${name}': ${response.status} ${response.statusText}`)
      }
    }

    if (errors.length > 0) {
      return { user: null, repos: [], error: errors.join("; ") }
    }

    // Ensure responses are ok before parsing, though rate limit check handles 403
    const user = userResponse.ok ? await userResponse.json() : null
    const repos = reposResponse.ok ? await reposResponse.json() : []

    if (!user && !errors.some((e) => e.includes("user"))) {
      // If user is null but no specific user error, it might be from a general issue
      errors.push("Falha ao obter dados do usuário do GitHub após verificação de status.")
    }

    if (errors.length > 0) {
      // Re-check errors after attempting to parse JSON
      return { user: null, repos: [], error: errors.join("; ") }
    }

    return { user, repos, error: null }
  } catch (err: any) {
    console.error("Falha ao buscar dados do GitHub (servidor):", err)
    return {
      user: null,
      repos: [],
      error: "Não foi possível carregar os dados do GitHub devido a um erro inesperado no servidor.",
    }
  }
}

export default async function Home() {
  // Corrected: Removed backslash before {
  const { user, repos, error: gitHubError } = await getGitHubData()

  return (
    <div className="min-h-screen bg-gradient-main">
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-20 text-center text-palette-white">
              Carregando dados do GitHub...
            </div>
          }
        >
          <GitHubActivity user={user} repos={repos} initialError={gitHubError} />
        </Suspense>
        <Articles />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
