"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const GradientBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 -z-10" />
);

const FloatingShape = ({ className }: { className?: string }) => (
  <motion.div
    className={`absolute bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 90, 0],
    }}
    transition={{
      duration: 20,
      ease: "easeInOut",
      repeat: Infinity,
    }}
  />
);

const AnimatedImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <motion.div
    className={`relative overflow-hidden rounded-2xl shadow-lg ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Image src={src} alt={alt} fill className="object-cover" />
  </motion.div>
);

const AnimatedText = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

export default function About() {
  return (
    <div className="min-h-screen relative overflow-hidden pt-4">
      <AnimatedText delay={1.4}>
        <Button
          className="absolute left-[5%] z-50 bg-gradient-to-br from-purple-600 to-pink-600"
          asChild
        >
          <Link href="/">
            <MoveLeft className="mr-1"/>
            {/* Retour à la page d'accueil */}
          </Link>
        </Button>
      </AnimatedText>

      <GradientBackground />
      <FloatingShape className="h-64 w-64 left-[-5%] top-1/4" />
      <FloatingShape className="h-96 w-96 right-[-10%] top-1/2" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 space-y-8">
            <AnimatedText>
              <h1 className="text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Bassirou Hamdine Sy
              </h1>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Bassirou Hamdine Sy incarne l'excellence, la discipline et le
                leadership au sein de l'administration sénégalaise. Ce jeune
                professionnel, après un parcours remarquable à l'École Nationale
                d'Administration (ENA), a su se distinguer par sa rigueur, son
                dynamisme et son engagement au service du développement. Fort
                d’une expérience de neuf ans dans l’administration sénégalaise,
                il s’est affirmé comme un acteur clé dans la gestion et la
                coordination des ressources financières et administratives.
              </p>
            </AnimatedText>
            <AnimatedText delay={0.4}>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Doté d’un esprit analytique aiguisé et d’une capacité à relever
                des défis complexes, M. Sy a occupé avec brio des postes
                stratégiques, notamment en tant que responsable ou directeur
                administratif et financier dans diverses structures. Ces rôles,
                exigeant à la fois une expertise technique et une vision
                stratégique, lui ont permis de contribuer de manière
                significative à l'amélioration des processus de gestion, à la
                transparence financière et à l'efficacité organisationnelle.
              </p>
            </AnimatedText>
            <AnimatedText delay={0.6}>
              <p className="text-xl text-gray-700 leading-relaxed">
                Ceux qui ont eu le privilège de collaborer avec Bassirou Hamdine
                Sy louent non seulement sa compétence professionnelle, mais
                aussi ses qualités humaines. Il se distingue par une capacité
                exceptionnelle à inspirer confiance, à motiver ses équipes et à
                créer un climat de travail basé sur la collaboration et
                l’excellence. Sa rigueur, combinée à une éthique de travail
                irréprochable, en fait une référence et un modèle pour les
                jeunes générations aspirant à exceller dans la fonction
                publique.
              </p>
            </AnimatedText>
            <AnimatedText delay={0.8}>
              <p className="text-xl text-gray-700 leading-relaxed">
                Bassirou Hamdine Sy est bien plus qu’un cadre administratif
                talentueux : il est un bâtisseur de solutions, un visionnaire
                déterminé à contribuer au progrès et à la modernisation des
                structures étatiques. À travers son parcours, il illustre
                parfaitement comment l’engagement, le dynamisme et le
                professionnalisme peuvent transformer positivement
                l’administration publique. Le Sénégal peut être fier de compter
                parmi ses fils un homme de sa trempe, engagé dans la quête d’une
                gouvernance efficace et d’un développement durable.
              </p>
            </AnimatedText>
          </div>
          <div className="md:col-span-5 space-y-6">
            <AnimatedImage
              src="/hamdin1.jpeg"
              alt="Bassirou Hamdine Sy"
              className="h-[870px] object-bottom"
            />
            <div className="grid grid-cols-2 gap-4">
              <AnimatedImage
                src="/hamdin2.jpeg"
                alt="Community Work"
                className="h-[250px]"
              />
              <AnimatedImage
                src="/guede.jpeg"
                alt="Leadership"
                className="h-[250px]"
              />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>
  );
}