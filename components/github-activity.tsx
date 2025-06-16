"use client"

import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Star, ArrowRight, Users, BookCopy } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
}

interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

const GITHUB_USERNAME = "lucasrmed"

export default function GitHubActivity() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simulação de dados de contribuição (o gráfico de contribuição real é complexo de buscar via API simples)
  const contributionData = Array.from({ length: 52 * 7 }, () => Math.floor(Math.random() * 5))

  useEffect(() => {
    async function fetchGitHubData() {
      setLoading(true)
      setError(null)
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=owner`),
        ])

        if (!userResponse.ok) {
          throw new Error(`Erro ao buscar usuário: ${userResponse.statusText} (status: ${userResponse.status})`)
        }
        const userData: GitHubUser = await userResponse.json()
        setUser(userData)

        if (!reposResponse.ok) {
          throw new Error(`Erro ao buscar repositórios: ${reposResponse.statusText} (status: ${reposResponse.status})`)
        }
        const reposData: GitHubRepo[] = await reposResponse.json()
        setRepos(reposData)
      } catch (err: any) {
        console.error("Falha ao buscar dados do GitHub:", err)
        setError(err.message || "Não foi possível carregar os dados do GitHub.")
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-destructive">Erro ao Carregar Atividade do GitHub</h2>
          <p className="text-palette-white/80">{error}</p>
          <p className="text-palette-white/80 mt-2">
            Por favor, verifique o nome de usuário do GitHub ou tente novamente mais tarde.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="github-activity" className="py-20 bg-palette-navy/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Github className="h-8 w-8 text-palette-turquoise" />
            <h2 className="text-3xl md:text-4xl font-bold text-palette-white">Minha Atividade no GitHub</h2>
          </div>
          <p className="text-xl text-palette-white/80">
            Acompanhe minhas contribuições, projetos e atividades na comunidade open source.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="h-64 bg-palette-darkBlue/50 animate-pulse rounded-lg"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-palette-darkBlue/50 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        ) : (
          user && (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* User Profile Card */}
              <Card className="md:col-span-1 bg-palette-darkBlue border-palette-turquoise/20 shadow-xl p-6 flex flex-col items-center text-center py-6 leading-[1.7rem]">
                {user.avatar_url && (
                  <Image
                    src={user.avatar_url || "/placeholder.svg"}
                    alt={user.name || user.login}
                    width={120}
                    height={120}
                    className="md:col-span-1 bg-palette-darkBlue border-palette-turquoise/20 shadow-xl p-6 flex flex-col items-center text-center py-6 border-4 rounded"
                  />
                )}
                <h3 className="text-2xl font-bold text-palette-white">{user.name || user.login}</h3>
                <p className="text-palette-turquoise">@{user.login}</p>
                {user.bio && <p className="text-sm text-palette-white/70 mt-2 mb-4">{user.bio}</p>}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm mt-4">
                  <div className="flex items-center text-palette-white/90">
                    <BookCopy className="h-4 w-4 mr-1 text-palette-turquoise" /> {user.public_repos} Repositórios
                  </div>
                  <div className="flex items-center text-palette-white/90">
                    <Users className="h-4 w-4 mr-1 text-palette-turquoise" /> {user.followers} Seguidores
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 border-palette-turquoise text-palette-turquoise hover:bg-palette-turquoise/10 w-full"
                >
                  <Link href={user.html_url} target="_blank" rel="noopener noreferrer">
                    Ver Perfil no GitHub <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>

              {/* Repositories and Contribution Graph */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-palette-white">Repositórios Recentes</h3>
                  {repos.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {repos.map((repo) => (
                        <Card
                          key={repo.id}
                          className="bg-palette-darkBlue border-palette-turquoise/20 shadow-lg hover:shadow-palette-turquoise/20 transition-shadow"
                        >
                          <CardContent className="p-4">
                            <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                              <h4 className="font-bold text-palette-turquoise truncate hover:underline">{repo.name}</h4>
                            </Link>
                            <p className="text-xs text-palette-white/70 h-10 my-1 overflow-hidden line-clamp-2">
                              {repo.description || "Sem descrição."}
                            </p>
                            <div className="flex items-center justify-between text-xs text-palette-white/60 mt-2">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 mr-1 text-yellow-400" /> {repo.stargazers_count}
                              </div>
                              {repo.language && (
                                <div className="flex items-center">
                                  <div className={`h-2 w-2 rounded-full mr-1 bg-palette-turquoise`}></div>{" "}
                                  {/* Simple language indicator */}
                                  {repo.language}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-palette-white/70">Nenhum repositório encontrado.</p>
                  )}
                </div>

                {/* Contribution Graph Simulation */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-palette-white">Atividade de Contribuição </h3>
                  <Card className="bg-palette-darkBlue border-palette-turquoise/20 shadow-lg">
                    <CardContent className="p-4 md:p-6">
                      <div className="grid grid-cols-52 gap-0.5 md:gap-1 overflow-x-auto pb-2">
                        {Array.from({ length: 52 }).map((_, weekIndex) => (
                          <div key={weekIndex} className="grid grid-rows-7 gap-0.5 md:gap-1">
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                              const intensity = contributionData[weekIndex * 7 + dayIndex]
                              let bgColor = "bg-palette-navy/50" // Base for empty
                              if (intensity === 1) bgColor = "bg-palette-turquoise/20"
                              else if (intensity === 2) bgColor = "bg-palette-turquoise/40"
                              else if (intensity === 3) bgColor = "bg-palette-turquoise/70"
                              else if (intensity >= 4) bgColor = "bg-palette-turquoise"
                              return (
                                <div
                                  key={dayIndex}
                                  className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-sm ${bgColor}`}
                                  title={`${intensity} contribuições`}
                                />
                              )
                            })}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-palette-white/60">
                        <div>Menos</div>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-palette-navy/50 rounded-sm"></div>
                          <div className="w-2 h-2 bg-palette-turquoise/20 rounded-sm"></div>
                          <div className="w-2 h-2 bg-palette-turquoise/40 rounded-sm"></div>
                          <div className="w-2 h-2 bg-palette-turquoise/70 rounded-sm"></div>
                          <div className="w-2 h-2 bg-palette-turquoise rounded-sm"></div>
                        </div>
                        <div>Mais</div>
                      </div>
                    </CardContent>
                  </Card>
                  <p className="md:col-span-1 bg-palette-darkBlue border-palette-turquoise/20 shadow-xl p-6 flex flex-col items-center text-center py-6 leading-[1.7rem] leading-[1.65rem] leading-[1.6rem] leading-[1.55rem] leading-6 leading-[1.45rem] leading-[1.4rem] leading-[1.35rem] leading-[1.3rem] leading-5 leading-[1.2rem] leading-[1.15rem] leading-[1.1rem]">
                    {""}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}
