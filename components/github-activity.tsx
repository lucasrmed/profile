"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Star, ArrowRight, Users, BookCopy, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Tipos exportados para serem usados em app/page.tsx
export interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
}

export interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

interface GitHubActivityProps {
  user: GitHubUser | null
  repos: GitHubRepo[]
  initialError: string | null
}

// Simulação de dados de contribuição
const contributionData = Array.from({ length: 52 * 7 }, () => Math.floor(Math.random() * 5))

export default function GitHubActivity({ user, repos, initialError }: GitHubActivityProps) {
  if (initialError) {
    return (
      <section id="github-activity" className="py-20 bg-palette-navy/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-destructive">
            <AlertTriangle className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Erro ao Carregar Atividade do GitHub</h2>
          </div>
          <p className="text-palette-white/80 max-w-2xl mx-auto">{initialError}</p>
        </div>
      </section>
    )
  }

  if (!user) {
    return (
      <section id="github-activity" className="py-20 bg-palette-navy/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-destructive">
            <AlertTriangle className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Dados do Usuário Indisponíveis</h2>
          </div>
          <p className="text-palette-white/80">
            Não foi possível carregar os dados do usuário do GitHub. Verifique a conexão ou tente mais tarde.
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

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="md:col-span-1 bg-palette-darkBlue border-palette-turquoise/20 shadow-xl p-6 flex flex-col items-center text-center">
            {user.avatar_url && (
              <Image
                src={user.avatar_url || "/placeholder.svg"}
                alt={user.name || user.login}
                width={120}
                height={120}
                className="rounded-full border-4 border-palette-turquoise/30 mb-4"
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

          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-palette-white">Repositórios Recentes</h3>
              {repos && repos.length > 0 ? (
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
                              <div className={`h-2 w-2 rounded-full mr-1 bg-palette-turquoise`}></div>
                              {repo.language}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-palette-darkBlue border-palette-turquoise/20 shadow-lg">
                  <CardContent className="p-4 text-center text-palette-white/70">
                    Nenhum repositório recente encontrado ou falha ao carregar.
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-palette-white">Atividade de Contribuição</h3>
              <Card className="bg-palette-darkBlue border-palette-turquoise/20 shadow-lg">
                <CardContent className="p-4 md:p-6">
                  <div className="grid grid-cols-52 gap-0.5 md:gap-1 overflow-x-auto pb-2">
                    {Array.from({ length: 52 }).map((_, weekIndex) => (
                      <div key={weekIndex} className="grid grid-rows-7 gap-0.5 md:gap-1">
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                          const intensity = contributionData[weekIndex * 7 + dayIndex]
                          let bgColor = "bg-palette-navy/50"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
