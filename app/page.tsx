"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative isolate px-6 -mt-36 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="relative mx-auto max-w-2xl lg:py-56 carte-membre">
          <div className="sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-2 sm:px-3 py-1 text-sm leading-6 text-gray-700 ring-1 ring-gray-900/10 hover:ring-gray-900/20 text-center max-sm:mt-16">
              Rejoindre le mouvement.{" "}
              <Link
                href="/devenir-membre"
                className="font-semibold text-green-600 text-sm"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                Devenir Membre <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center max-md:mt-8">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl max-sm:mt-4">
              Bassirou Hamedine SY
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700 text-justify">
              Bassirou Hamedine SY, Parrain du mouvement Nafore Men, incarne l'excellence, la discipline et le
              leadership au sein de l'administration sénégalaise. Ce jeune
              professionnel, après un parcours remarquable à l'École Nationale
              d'Administration (ENA), a su se distinguer par sa rigueur, son
              dynamisme et son engagement au service du développement.
            </p>
            {/* <p className="mt-6 text-lg leading-8 text-gray-700">
              Fort d'une expérience de neuf ans dans l'administration
              sénégalaise, il s'est affirmé comme un acteur clé dans la gestion
              et la coordination des ressources financières et administratives.
            </p> */}
            <div className="mt-10 flex items-center justify-center gap-x-6"></div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
