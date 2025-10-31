import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getAllCategoriesAction } from "@/actions/admin-actions";
import { getPublicAssetsAction } from "@/actions/dashboard-actions";
import { Button } from "@/components/ui/button";

interface GalleryPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // restrict admin access
  if (session && session.user?.role === "admin") redirect("/");

  // ✅ await searchParams (required in Next.js 15+)
  const resolvedSearchParams = await searchParams;
  const categoryId = resolvedSearchParams.category
    ? Number.parseInt(resolvedSearchParams.category)
    : undefined;
    // console.log(resolvedSearchParams);
    // console.log(categoryId);
    
    

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[65vh]">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
        </div>
      }
    >
      <GalleryContent categoryId={categoryId} />
    </Suspense>
  );
}

async function GalleryContent({ categoryId }: { categoryId?: number }) {
  const categories = await getAllCategoriesAction();
  const assets = await getPublicAssetsAction(categoryId);

  return (
    <div className="min-h-screen container px-4 bg-white">
      {/* Category filter buttons */}
      <div className="sticky top-0 z-30 bg-white border-b py-3 px-4">
        <div className="container flex overflow-x-auto gap-2">
          <Button
            variant={!categoryId ? "default" : "outline"}
            size="sm"
            className={!categoryId ? "bg-black text-white" : ""}
          >
            <Link href="/gallery">All</Link>
          </Button>
          {categories.map((c) => (
            <Button
              key={c.id}
              variant={categoryId === c.id ? "default" : "outline"}
              size="sm"
              className={categoryId === c.id ? "bg-black text-white" : ""}
              asChild
            >
              <Link href={`/gallery?category=${c.id}`}>{c.name}</Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Asset grid */}
      <div className="container py-12">
        {assets.length === 0 ? (
          <p className="text-xl text-center font-bold">
            No assets uploaded! Please check again later.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {assets.map(({ asset, categoryName, userName }) => (
              <Link
                href={`/gallery/${asset.id}`}
                key={asset.id}
                className="block"
              >
                <div className="group relative overflow-hidden rounded-lg aspect-square">
                  <Image
                    src={asset.fileUrl}
                    alt={asset.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-medium text-lg">
                        {asset?.title}
                      </h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-white/80 text-sm">
                          {userName}
                        </span>
                        {categoryName && (
                          <span className="bg-white/25 text-white text-xs px-2 py-1 rounded-full">
                            {categoryName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
// import { Loader2 } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { Suspense } from "react";
// import { getAllCategoriesAction } from "@/actions/admin-actions";
// import { getPublicAssetsAction } from "@/actions/dashboard-actions";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// interface GalleryPageProps {
//   searchParams: Promise<{
//     category?: string;
//   }>;
// }

// export default async function GalleryPage({ searchParams }: GalleryPageProps) {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   // restrict admin access
//   if (session && session.user?.role === "admin") redirect("/");

//   // ✅ await searchParams (Next.js 15+ requirement)
//   const resolvedSearchParams = await searchParams;
//   const categoryId = resolvedSearchParams.category
//     ? Number.parseInt(resolvedSearchParams.category)
//     : undefined;

//   return (
//     <Suspense fallback={<GallerySkeleton />}>
//       <GalleryContent categoryId={categoryId} />
//     </Suspense>
//   );
// }

// async function GalleryContent({ categoryId }: { categoryId?: number }) {
//   const categories = await getAllCategoriesAction();
//   const assets = await getPublicAssetsAction(categoryId);

//   return (
//     <div className="min-h-screen container px-4 bg-white">
//       {/* Category Filter Bar */}
//       <div className="sticky top-0 z-30 bg-white border-b py-3 px-4">
//         <div className="container flex overflow-x-auto gap-2">
//           <Button
//             variant={!categoryId ? "default" : "outline"}
//             size="sm"
//             className={cn(!categoryId && "bg-black text-white")}
//           >
//             <Link href="/gallery">All</Link>
//           </Button>
//           {categories.map((c) => (
//             <Button
//               key={c.id}
//               variant={categoryId === c.id ? "default" : "outline"}
//               size="sm"
//               className={cn(categoryId === c.id && "bg-black text-white")}
//               asChild
//             >
//               <Link href={`/gallery?category=${c.id}`}>{c.name}</Link>
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Gallery Grid */}
//       <div className="container py-12">
//         {assets.length === 0 ? (
//           <p className="text-xl text-center font-bold">
//             No assets uploaded! Please check again later.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {assets.map(({ asset, categoryName, userName }) => (
//               <Link
//                 href={`/gallery/${asset.id}`}
//                 key={asset.id}
//                 className="block"
//               >
//                 <div className="group relative overflow-hidden rounded-lg aspect-square">
//                   <Image
//                     src={asset.fileUrl}
//                     alt={asset.title}
//                     fill
//                     className="object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <div className="absolute bottom-0 left-0 right-0 p-4">
//                       <h3 className="text-white font-medium text-lg">
//                         {asset?.title}
//                       </h3>
//                       <div className="flex justify-between items-center mt-2">
//                         <span className="text-white/80 text-sm">
//                           {userName}
//                         </span>
//                         {categoryName && (
//                           <span className="bg-white/25 text-white text-xs px-2 py-1 rounded-full">
//                             {categoryName}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* 🧱 Skeleton Loader Component */
// function GallerySkeleton() {
//   return (
//     <div className="min-h-screen container px-4 py-12">
//       <div className="animate-pulse space-y-8">
//         {/* Skeleton for category buttons */}
//         <div className="flex gap-3 overflow-x-auto">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <div key={i} className="h-8 w-20 bg-gray-200 rounded-full"></div>
//           ))}
//         </div>

//         {/* Skeleton for grid items */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
//           {Array.from({ length: 8 }).map((_, i) => (
//             <div
//               key={i}
//               className="rounded-lg overflow-hidden bg-gray-200 aspect-square"
//             ></div>
//           ))}
//         </div>

//         {/* Small loading text and icon */}
//         <div className="flex justify-center items-center gap-2 pt-10 text-gray-500">
//           <Loader2 className="h-5 w-5 animate-spin" />
//           <p>Loading gallery...</p>
//         </div>
//       </div>
//     </div>
//   );
// }
