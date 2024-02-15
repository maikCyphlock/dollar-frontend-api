import { geolocation, next } from "@vercel/edge";
import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export const config = {
  // Only run the middleware on the admin route
  matcher: ["/", "/admin", "/about"],
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const { city, country } = geolocation(request);

  // Si es una nueva visita, incrementamos el contador y almacenamos la información de la visita

  const visites = await redis.zincrby("visits", 1, country);
  const pagesview = await redis.lpush("pagesview", {
    url: url.pathname,
    city,
    country,
    timestamp: new Date().toISOString(),
  });

  return next();
}
