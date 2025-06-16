"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Simulação de dados de artigos
const articlesData = [
  // Renamed to avoid conflict
  {
    id: 1,
    title: "Otimizando Performance em Aplicações React",
    excerpt:
      "Técnicas avançadas para melhorar a performance de aplicações React, incluindo memoização, code splitting e renderização condicional.",
    content: `
      <p>A performance é um aspecto crucial no desenvolvimento de aplicações React modernas. Neste artigo, vamos explorar técnicas avançadas que podem ajudar a otimizar significativamente o desempenho das suas aplicações.</p>
      
      <h2>Memoização com React.memo, useMemo e useCallback</h2>
      <p>A memoização é uma técnica poderosa para evitar renderizações desnecessárias. O React oferece várias ferramentas para implementar memoização:</p>
      <ul>
        <li><strong>React.memo</strong>: Um HOC que memoriza o resultado da renderização de um componente.</li>
        <li><strong>useMemo</strong>: Um hook que memoriza o resultado de uma função.</li>
        <li><strong>useCallback</strong>: Um hook que memoriza uma função callback.</li>
      </ul>
      
      <h2>Code Splitting com React.lazy e Suspense</h2>
      <p>O code splitting permite dividir seu bundle em pedaços menores que são carregados sob demanda, reduzindo o tempo de carregamento inicial:</p>
      <pre><code class="language-jsx">
      const LazyComponent = React.lazy(() => import('./LazyComponent'));
      
      function App() {
        return (
          &lt;React.Suspense fallback={&lt;div>Loading...&lt;/div>}>
            &lt;LazyComponent />
          &lt;/React.Suspense>
        );
      }
      </code></pre>
      
      <h2>Renderização Condicional Otimizada</h2>
      <p>Implementar renderização condicional de forma eficiente pode evitar trabalho desnecessário:</p>
      <pre><code class="language-jsx">
      {shouldRender && &lt;ExpensiveComponent />}
      </code></pre>
      
      <h2>Virtualização de Listas Longas</h2>
      <p>Para listas com muitos itens, a virtualização renderiza apenas os itens visíveis na viewport:</p>
      <pre><code class="language-jsx">
      import { FixedSizeList } from 'react-window';
      
      function VirtualizedList({ items }) {
        const Row = ({ index, style }) => (
          &lt;div style={style}>
            {items[index]}
          &lt;/div>
        );
      
        return (
          &lt;FixedSizeList
            height={500}
            width={300}
            itemCount={items.length}
            itemSize={35}
          >
            {Row}
          &lt;/FixedSizeList>
        );
      }
      </code></pre>
      
      <h2>Conclusão</h2>
      <p>Implementar estas técnicas de otimização pode melhorar significativamente a performance da sua aplicação React, proporcionando uma experiência mais fluida para os usuários.</p>
    `,
    image: "/images/articles/react-logo-purple-bg.jpeg", // Updated
    date: "12 Mar 2023",
    readTime: "8 min",
    tags: ["React", "Performance", "JavaScript"],
    author: {
      name: "Lucas Medeiros", // Assuming you are the author
      avatar: "/profile-picture.jpeg", // Using your profile picture
      role: "Desenvolvedor Front-end Sênior",
    },
  },
  {
    id: 2,
    title: "Arquitetura de Componentes Escaláveis",
    excerpt:
      "Como estruturar componentes React para projetos de grande escala, utilizando padrões de design e práticas de componentização.",
    content: `
      <p>Desenvolver aplicações React escaláveis requer uma arquitetura de componentes bem planejada. Neste artigo, vamos explorar padrões de design e práticas que ajudam a criar componentes reutilizáveis e manuteníveis.</p>
      
      <h2>Padrão Compound Components</h2>
      <p>O padrão Compound Components permite criar componentes com uma API flexível e intuitiva:</p>
      <pre><code class="language-jsx">
      // Uso do componente
      &lt;Select>
        &lt;Select.Option value="option1">Opção 1&lt;/Select.Option>
        &lt;Select.Option value="option2">Opção 2&lt;/Select.Option>
      &lt;/Select>
      
      // Implementação
      const SelectContext = React.createContext();
      
      function Select({ children, ...props }) {
        const [selectedValue, setSelectedValue] = React.useState(null); // Added React.
        
        return (
          &lt;SelectContext.Provider value={{ selectedValue, setSelectedValue }}>
            &lt;div {...props}>{children}&lt;/div>
          &lt;/SelectContext.Provider>
        );
      }
      
      function Option({ value, children }) {
        const { selectedValue, setSelectedValue } = React.useContext(SelectContext); // Added React.
        
        return (
          &lt;div 
            onClick={() => setSelectedValue(value)}
            style={{ background: selectedValue === value ? 'lightblue' : 'white' }}
          >
            {children}
          &lt;/div>
        );
      }
      
      Select.Option = Option;
      </code></pre>
      
      <h2>Padrão Render Props</h2>
      <p>O padrão Render Props permite compartilhar código entre componentes React usando uma prop cujo valor é uma função:</p>
      <pre><code class="language-jsx">
      function DataFetcher({ render, url }) {
        const [data, setData] = React.useState(null); // Added React.
        const [loading, setLoading] = React.useState(true); // Added React.
        
        React.useEffect(() => { // Added React.
          fetch(url)
            .then(response => response.json())
            .then(data => {
              setData(data);
              setLoading(false);
            });
        }, [url]);
        
        return render({ data, loading });
      }
      
      // Uso
      &lt;DataFetcher 
        url="/api/data" 
        render={({ data, loading }) => (
          loading ? &lt;Spinner /> : &lt;DataDisplay data={data} />
        )}
      />
      </code></pre>
      
      <h2>Componentização Atômica</h2>
      <p>A componentização atômica divide a interface em níveis de componentes:</p>
      <ul>
        <li><strong>Átomos</strong>: Componentes básicos como botões, inputs, etc.</li>
        <li><strong>Moléculas</strong>: Combinações de átomos que formam componentes mais complexos.</li>
        <li><strong>Organismos</strong>: Combinações de moléculas que formam seções da interface.</li>
        <li><strong>Templates</strong>: Combinações de organismos que formam layouts.</li>
        <li><strong>Páginas</strong>: Instâncias específicas de templates.</li>
      </ul>
      
      <h2>Conclusão</h2>
      <p>Adotar estes padrões de arquitetura ajuda a criar componentes React mais flexíveis, reutilizáveis e manuteníveis, facilitando o desenvolvimento de aplicações escaláveis.</p>
    `,
    image: "/images/articles/pixel-art-hands-window.jpeg", // Updated
    date: "25 Jan 2023",
    readTime: "10 min",
    tags: ["Arquitetura", "React", "Design Patterns"],
    author: {
      name: "Lucas Medeiros",
      avatar: "/profile-picture.jpeg",
      role: "Desenvolvedor Front-end Sênior",
    },
  },
  {
    id: 3,
    title: "Testes Automatizados para Front-end",
    excerpt:
      "Estratégias eficientes para implementar testes unitários, de integração e end-to-end em aplicações front-end modernas.",
    content: `
      <p>Testes automatizados são essenciais para garantir a qualidade e a confiabilidade de aplicações front-end. Neste artigo, vamos explorar estratégias para implementar diferentes tipos de testes.</p>
      
      <h2>Testes Unitários com Jest e Testing Library</h2>
      <p>Testes unitários verificam o comportamento de unidades individuais de código:</p>
      <pre><code class="language-jsx">
      import { render, screen, fireEvent } from '@testing-library/react';
      import Counter from './Counter';
      
      test('incrementa o contador quando o botão é clicado', () => {
        render(&lt;Counter />);
        
        const button = screen.getByRole('button', { name: /incrementar/i });
        // const counter = screen.getByText(/contador: 0/i); // This line might be problematic if text changes
        
        fireEvent.click(button);
        
        expect(screen.getByText(/contador: 1/i)).toBeInTheDocument();
      });
      </code></pre>
      
      <h2>Testes de Integração</h2>
      <p>Testes de integração verificam como diferentes partes da aplicação funcionam juntas:</p>
      <pre><code class="language-jsx">
      import { render, screen, fireEvent, waitFor } from '@testing-library/react';
      import UserProfile from './UserProfile';
      import { fetchUserData } from './api'; // Assuming api.js exists
      
      jest.mock('./api');
      
      test('exibe os dados do usuário após o carregamento', async () => {
        fetchUserData.mockResolvedValue({ name: 'John Doe', email: 'john@example.com' });
        
        render(&lt;UserProfile userId="123" />);
        
        expect(screen.getByText(/carregando.../i)).toBeInTheDocument();
        
        await waitFor(() => {
          expect(screen.getByText(/john doe/i)).toBeInTheDocument();
          expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
        });
        
        expect(fetchUserData).toHaveBeenCalledWith('123');
      });
      </code></pre>
      
      <h2>Testes End-to-End com Cypress</h2>
      <p>Testes end-to-end simulam o comportamento do usuário em um ambiente real:</p>
      <pre><code class="language-bash">
      describe('Formulário de Login', () => {
        it('permite que um usuário faça login', () => {
          cy.visit('/login');
          
          cy.get('input[name="email"]').type('user@example.com');
          cy.get('input[name="password"]').type('password123');
          cy.get('button[type="submit"]').click();
          
          cy.url().should('include', '/dashboard');
          cy.contains('Bem-vindo, Usuário!').should('be.visible');
        });
        
        it('exibe uma mensagem de erro para credenciais inválidas', () => {
          cy.visit('/login');
          
          cy.get('input[name="email"]').type('user@example.com');
          cy.get('input[name="password"]').type('senha_errada');
          cy.get('button[type="submit"]').click();
          
          cy.contains('Email ou senha inválidos').should('be.visible');
          cy.url().should('include', '/login');
        });
      });
      </code></pre>
      
      <h2>Estratégias de Teste</h2>
      <p>Algumas estratégias para implementar testes de forma eficiente:</p>
      <ul>
        <li><strong>Pirâmide de Testes</strong>: Mais testes unitários, menos testes de integração, ainda menos testes end-to-end.</li>
        <li><strong>Testes Baseados em Comportamento</strong>: Teste o comportamento, não a implementação.</li>
        <li><strong>Mocks e Stubs</strong>: Use mocks para isolar o código que está sendo testado.</li>
        <li><strong>Continuous Integration</strong>: Execute os testes automaticamente em cada commit.</li>
      </ul>
      
      <h2>Conclusão</h2>
      <p>Implementar uma estratégia de testes abrangente ajuda a identificar problemas cedo, facilita refatorações e aumenta a confiança no código.</p>
    `,
    image: "/images/articles/abstract-code-lines.jpeg", // Updated
    date: "08 Dez 2022",
    readTime: "12 min",
    tags: ["Testes", "Jest", "Testing Library"],
    author: {
      name: "Lucas Medeiros",
      avatar: "/profile-picture.jpeg",
      role: "Desenvolvedor Front-end Sênior",
    },
  },
]

export default function ArticlePage({ params }: { params: { id: string } }) {
  const articleId = Number.parseInt(params.id)
  const article = articlesData.find((a) => a.id === articleId)

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-main pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-palette-white mb-4">Artigo não encontrado</h1>
          <p className="text-palette-white/80 mb-6">O artigo que você está procurando não existe.</p>
          <Link href="/artigos">
            <Button className="bg-palette-turquoise hover:bg-palette-turquoise/90 text-palette-darkBlue">
              Voltar para Artigos
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-main pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link href="/artigos" className="text-palette-turquoise hover:text-palette-turquoise/80 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Artigos
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-palette-turquoise mb-3">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {article.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {article.readTime}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-palette-white">{article.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="font-normal bg-palette-turquoise/10 text-palette-turquoise border-palette-turquoise/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] mb-8 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-palette-turquoise/30">
                <Image
                  src={article.author.avatar || "/placeholder.svg"}
                  alt={article.author.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-palette-white">{article.author.name}</div>
                <div className="text-sm text-palette-turquoise">{article.author.role}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-palette-white hover:text-palette-turquoise hover:bg-palette-darkBlue/50"
                title="Compartilhar"
              >
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Compartilhar</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-palette-white hover:text-palette-turquoise hover:bg-palette-darkBlue/50"
                title="Salvar"
              >
                <Bookmark className="h-5 w-5" />
                <span className="sr-only">Salvar</span>
              </Button>
            </div>
          </div>

          <Card className="border-0 bg-palette-navy/50 shadow-lg p-6 md:p-8 lg:p-10 mb-12">
            <div
              className="prose prose-lg prose-invert max-w-none 
                         prose-headings:text-palette-turquoise prose-headings:font-semibold
                         prose-a:text-palette-turquoise prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-palette-white prose-strong:font-semibold
                         prose-code:bg-palette-darkBlue prose-code:p-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                         prose-pre:bg-palette-darkBlue prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-x-auto
                         prose-blockquote:border-l-palette-turquoise prose-blockquote:pl-4 prose-blockquote:italic
                         prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-palette-turquoise
                         prose-ol:list-decimal prose-ol:pl-6 prose-li:marker:text-palette-turquoise"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </Card>

          <div className="border-t border-palette-turquoise/20 pt-8 mt-8">
            <h3 className="text-xl font-bold mb-6 text-palette-white">Artigos Relacionados</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {articlesData // Use renamed variable
                .filter((a) => a.id !== article.id)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Card
                    key={relatedArticle.id}
                    className="overflow-hidden border-0 bg-palette-navy/50 shadow-lg hover:shadow-xl hover:shadow-palette-turquoise/10 transition-all duration-300 group"
                  >
                    <Link href={`/artigos/${relatedArticle.id}`} className="block">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={relatedArticle.image || "/placeholder.svg"}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold mb-2 text-palette-white group-hover:text-palette-turquoise transition-colors">
                          {relatedArticle.title}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-palette-turquoise mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {relatedArticle.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {relatedArticle.readTime}
                          </div>
                        </div>
                        <div className="text-palette-turquoise group-hover:text-palette-turquoise/80 text-sm font-medium inline-flex items-center">
                          Ler artigo
                          <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
