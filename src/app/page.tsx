"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sprout,
  Calculator,
  BarChart,
  Percent,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const smoothScroll = (e: any) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      document.querySelector(href)?.scrollIntoView({
        behavior: 'smooth',
      });
    };
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });
  
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll);
      });
    };
  }, []);

  const handleCalculatorClick = () => {
    setIsLoading(true);
    // Simular loading - remova este setTimeout em produção
    setTimeout(() => setIsLoading(false), 1000);
  };
  return (
    <div className="min-h-screen bg-background">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(0,0,0,.01) 0, transparent 4px), 
            radial-gradient(circle at center, rgba(0,0,0,.01) 0, transparent 4px)
          `,
          backgroundSize: "100px 100px",
          backgroundPosition: "0 0, 50px 50px",
        }}
      />
      {/* Navigation - Mais clean e moderna */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full bg-background/60 backdrop-blur-xl z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <Sprout className="w-5 h-5" />
              <span className="font-medium tracking-tight">
                Calculadora IVG
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Recursos
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Como Funciona
              </a>
              <a
                href="#faq"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                FAQ
              </a>
              <Link href="/calculator">
                <Button
                  variant="ghost"
                  size="sm"
                  className="group relative overflow-hidden"
                  onClick={handleCalculatorClick}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">⚪</span>
                      Carregando...
                    </span>
                  ) : (
                    <>
                      Calculadora
                      <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-40 pb-32 overflow-hidden"
      >
        {/* Efeitos de gradiente animados */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[1000px] h-[1000px] -top-[500px] -right-[500px] rounded-full bg-gradient-to-r from-primary/5 via-primary/2 to-primary/5 blur-3xl animate-pulse" />
          <div className="absolute w-[1000px] h-[1000px] -bottom-[500px] -left-[500px] rounded-full bg-gradient-to-r from-primary/5 via-primary/2 to-primary/5 blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-[85rem] mx-auto">
            <div className="grid lg:grid-cols-7 lg:gap-16 items-center">
              {/* Content */}
              <motion.div
                className="lg:col-span-3 space-y-8"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center space-x-2 text-sm">
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary inline-flex items-center">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Calculadora Online
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-4">
                    Calcule o IVG e a Taxa Germinação
                    <span className="text-primary block mt-2">
                      com Precisão
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Ferramenta científica para pesquisadores e profissionais
                    calcularem o Índice de Velocidade de Germinação de forma
                    rápida e precisa.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/calculator">
                    <Button
                      size="lg"
                      className="group relative overflow-hidden h-14 px-8 hover:scale-105 transition-all duration-300"
                      onClick={handleCalculatorClick}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <span className="animate-spin mr-2">⚪</span>
                          Carregando...
                        </span>
                      ) : (
                        <>
                          <span className="relative z-10">Começar Agora</span>
                          <div className="absolute inset-0 translate-x-[100%] group-hover:translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000" />
                          <ArrowRight className="relative z-10 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Hero Image/Illustration Side */}
              <motion.div
                className="lg:col-span-4 mt-10 lg:mt-0"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="relative">
                  {/* Background Elements com animação */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent rounded-3xl animate-pulse" />

                  {/* Main Calculator Preview */}
                  <div className="relative backdrop-blur-sm bg-background/80 rounded-3xl border shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                    {/* Culture Selection */}
                    <motion.div
                      className="mb-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-muted-foreground">
                            Cultura Selecionada
                          </div>
                          <div className="bg-primary/10 px-3 py-1 rounded-full text-sm text-primary">
                            Soja
                          </div>
                        </div>
                        <div className="bg-muted/50 rounded-2xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Sprout className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">Soja</div>
                              <div className="text-sm text-muted-foreground">
                                Glycine max
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Temperatura ideal: 25°C
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="space-y-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <div className="grid grid-cols-3 gap-6 mb-8">
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">
                            Total Sementes
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            100
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">
                            Dias
                          </div>
                          <div className="text-2xl font-bold">07</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">
                            Temperatura
                          </div>
                          <div className="text-2xl font-bold">25°C</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="space-y-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <div className="space-y-8">
                        {/* Progress Bars */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Dia 1
                              </span>
                              <span className="font-medium">45%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: "45%" }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Dia 2
                              </span>
                              <span className="font-medium">30%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: "30%" }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Dia 3
                              </span>
                              <span className="font-medium">15%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: "15%" }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Results Cards */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-4 border border-primary/10">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-medium">IVG</div>
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <BarChart className="w-4 h-4 text-primary" />
                              </div>
                            </div>
                            <div className="text-3xl font-bold">67.5%</div>
                          </div>
                          <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-4 border border-primary/10">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-medium">
                                Germinação
                              </div>
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Percent className="w-4 h-4 text-primary" />
                              </div>
                            </div>
                            <div className="text-3xl font-bold">90%</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating Badges com animação */}
                    <motion.div
                      className="absolute -right-3 top-1/3 transform translate-x-1/2 rotate-12"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      {/* Resto do conteúdo dos badges permanece o mesmo */}
                      <div className="absolute -left-3 bottom-1/3 transform -translate-x-1/2 -rotate-12">
                        <div className="bg-background rounded-2xl shadow-lg p-3 border">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">Preciso</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute -right-3 top-2/4 transform translate-x-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      <div className="absolute -right-3 top-1/3 transform translate-x-1/2 rotate-12">
                        <div className="bg-background rounded-2xl shadow-lg p-3 border flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-sm font-medium">
                            Calculando
                          </span>
                        </div>
                      </div>
                    </motion.div>
                    <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent rounded-3xl blur-2xl animate-pulse" />
                  </div>

                  {/* Decorative Elements com animação */}
                  <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent rounded-3xl blur-2xl animate-pulse" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="py-32 bg-muted/50 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Background decorativo */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background/0" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="max-w-2xl mx-auto text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Recursos</h2>
            <p className="text-muted-foreground">
              Ferramentas precisas para suas análises de germinação
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Calculator className="w-10 h-10" />,
                title: "Cálculo Preciso do IVG",
                description:
                  "Calcule o Índice de Velocidade de Germinação seguindo metodologias científicas.",
              },
              {
                icon: <Percent className="w-10 h-10" />,
                title: "Porcentagem de Germinação",
                description:
                  "Obtenha automaticamente a porcentagem de germinação das suas amostras.",
              },
              {
                icon: <BarChart className="w-10 h-10" />,
                title: "Visualização Clara",
                description:
                  "Veja seus resultados apresentados de forma clara e organizada, com gráficos e tabelas.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background border-none shadow-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <motion.div
                      className="mb-2 p-2.5 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle className="text-xl font-semibold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Como Funciona Section - Design moderno */}

      <motion.section
        id="how-it-works"
        className="py-32 bg-background relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at center, currentColor 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-muted-foreground">
              Processo simples e rápido para calcular seus índices
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Selecione a Cultura",
                  description:
                    "Escolha a cultura que você está analisando, por exemplo: Soja, Milho, Feijão...",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                  ),
                },
                {
                  step: "02",
                  title: "Insira os Dados",
                  description:
                    "Digite o número de sementes germinadas em cada dia de contagem do seu experimento.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  ),
                },
                {
                  step: "03",
                  title: "Processamento",
                  description:
                    "Nossa calculadora processa automaticamente os dados usando fórmulas científicas validadas.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
                      />
                    </svg>
                  ),
                },
                {
                  step: "04",
                  title: "Resultados",
                  description:
                    "Visualize o IVG e a porcentagem de germinação das suas amostras instantaneamente.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                      />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Step Card */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm relative h-full hover:shadow-lg transition-all duration-300 group border">
                    {/* Step Number */}
                    <motion.div
                      className="absolute -top-4 left-8"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      <div className="bg-muted rounded-full px-4 py-1 text-sm transition-colors duration-300">
                        {item.step}
                      </div>
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      className="mb-6 mt-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                        {item.icon}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  {index < 3 && (
                    <motion.div
                      className="hidden md:block absolute top-1/2 -right-7 text-muted-foreground/30"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}

      <motion.section 
  id="faq" 
  className="py-32 bg-muted/50 relative overflow-hidden"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  {/* Background com padrão sutil */}
  <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background/0" />

  <div className="container mx-auto px-4 relative">
    <motion.div 
      className="max-w-2xl mx-auto text-center mb-16"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
      <p className="text-muted-foreground">
        Tire suas dúvidas sobre a calculadora
      </p>
    </motion.div>

    <div className="max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="space-y-4">
        {[
          {
            question: "O que é o Índice de Velocidade de Germinação (IVG)?",
            answer:
              "O IVG é um índice que mede a velocidade de germinação das sementes. Ele é calculado somando-se o número de sementes germinadas em cada dia, dividido pelo respectivo dia da contagem. Quanto maior o valor do IVG, maior é a velocidade de germinação.",
          },
          {
            question: "Como é calculado o IVG?",
            answer:
              "O IVG é calculado usando a fórmula: IVG = (G1/N1) + (G2/N2) + ... + (Gn/Nn), onde G1, G2, Gn = número de sementes germinadas a cada dia e N1, N2, Nn = número de dias após o início do teste.",
          },
          {
            question: "Como é calculada a porcentagem de germinação?",
            answer:
              "A porcentagem de germinação é calculada dividindo o número total de sementes germinadas pelo número total de sementes utilizadas no teste, multiplicado por 100. Exemplo: (Total de Sementes Germinadas ÷ Total de Sementes) × 100.",
          },
          {
            question: "Por que devo selecionar a cultura antes do cálculo?",
            answer:
              "A seleção da cultura é importante pois cada espécie tem suas particularidades quanto ao processo de germinação, incluindo temperatura ideal, período de avaliação e critérios específicos para considerar uma semente como germinada.",
          },
          {
            question: "Quais culturas estão disponíveis para cálculo?",
            answer:
              "Atualmente oferecemos suporte para as principais culturas agrícolas como: Soja, Milho, Feijão, Arroz, Trigo, entre outras. A lista completa está disponível na calculadora.",
          },
          {
            question: "Os cálculos são precisos?",
            answer:
              "Sim! Nossa calculadora utiliza fórmulas cientificamente validadas e amplamente utilizadas em pesquisas e análises de germinação, seguindo as metodologias estabelecidas para cada cultura.",
          },
        ].map((faq, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <AccordionItem value={`item-${index}`} className="bg-background border rounded-xl overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-medium">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-0">
                <div className="pl-10 text-muted-foreground">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  </div>
</motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Background decorativo animado */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-primary/5" />
          <div
            className="absolute top-0 left-0 w-full h-full animate-pulse"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            className="relative"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Gradientes decorativos */}
            <div className="absolute -left-12 -top-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70 animate-pulse" />
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70 animate-pulse delay-500" />

            {/* Conteúdo principal */}
            <div className="relative bg-background/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border shadow-2xl hover:shadow-primary/10 transition-all duration-500">
              <div className="max-w-4xl mx-auto">
                {/* Badge superior */}
                <motion.div
                  className="mb-8 flex justify-center"
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                    <span className="flex h-2 w-2">
                      <span className="absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    Ferramenta Gratuita
                  </div>
                </motion.div>

                {/* Título e descrição */}
                <motion.div
                  className="text-center mb-12"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent">
                    Comece seus cálculos agora
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    Obtenha resultados precisos para suas análises de germinação{" "}
                    <br className="hidden md:block" />
                    em questão de minutos
                  </p>
                </motion.div>

                {/* Botão de ação */}
                <motion.div
                  className="flex justify-center mb-12"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link href="/calculator">
                    <Button
                      size="lg"
                      className="group h-14 px-8 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-primary/20"
                      onClick={handleCalculatorClick}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <span className="animate-spin mr-2">⚪</span>
                          Carregando...
                        </span>
                      ) : (
                        <>
                          <span>Acessar Calculadora</span>
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </Button>
                  </Link>
                </motion.div>

                {/* Métricas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t">
                  {[
                    {
                      value: "Gratuito",
                      description: "Sem custos",
                      icon: <ArrowUpRight className="w-4 h-4" />,
                    },
                    {
                      value: "Preciso",
                      description: "Fórmulas validadas",
                      icon: <CheckCircle2 className="w-4 h-4" />,
                    },
                    {
                      value: "Rápido",
                      description: "Resultados instantâneos",
                      icon: <BarChart className="w-4 h-4" />,
                    },
                    {
                      value: "Simples",
                      description: "Fácil de usar",
                      icon: <Calculator className="w-4 h-4" />,
                    },
                  ].map((metric, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <div className="text-center p-4 rounded-2xl transition-all duration-200 hover:bg-muted/50">
                        <div className="mb-1 flex items-center justify-center gap-2">
                          <span className="font-bold text-lg">
                            {metric.value}
                          </span>
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {metric.icon}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {metric.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sprout className="w-5 h-5" />
              <span className="font-medium tracking-tight">
                Calculadora IVG
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Calculadora IVG. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
