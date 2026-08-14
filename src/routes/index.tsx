import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const LANDING_URL = "/landing/index.html";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "70 años | Gualtieri e Hijos" },
      {
        name: "description",
        content:
          "Gualtieri e Hijos celebra 70 años de historia, compromiso y acompañamiento a sus clientes en la logística de granos.",
      },
      { property: "og:title", content: "70 años en movimiento | Gualtieri e Hijos" },
      {
        property: "og:description",
        content: "Celebramos 70 años de historia, compromiso y acompañamiento a nuestros clientes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// La landing está maquetada en HTML + Bootstrap 5 + JS (public/landing/).
// Esta ruta simplemente redirige a ese archivo.
function Index() {
  useEffect(() => {
    window.location.replace(LANDING_URL);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <a href={LANDING_URL} className="text-sm underline">
        Ir a la landing 70 años
      </a>
    </div>
  );
}
