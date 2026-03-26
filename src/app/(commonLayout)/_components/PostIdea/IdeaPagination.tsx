// "use client";

// import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";
// import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { PaginationProps } from "@/interface/pagination.interface";


// export default function Pagination({ totalPages, currentPage }: PaginationProps) {
//     const pathname = usePathname();
//     const searchParams = useSearchParams();
//     const createPageURL = (pageNumber: number | string) => {
//         const params = new URLSearchParams(searchParams);
//         params.set("page", pageNumber.toString());
//         return `${pathname}?${params.toString()}`;
//     };
//     const getPageNumbers = () => {
//         const pages = [];
//         if (totalPages <= 5) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//         } else {
//             if (currentPage <= 3) {
//                 pages.push(1, 2, 3, "...", totalPages);
//             } else if (currentPage >= totalPages - 2) {
//                 pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
//             } else {
//                 pages.push(1, "...", currentPage, "...", totalPages);
//             }
//         }
//         return pages;
//     };

//     if (totalPages <= 1) return null;

//     return (
//         <nav className="flex items-center justify-center gap-2 mt-10">
//             {/* Previous Button */}
//             <Button
//                 variant="outline"
//                 size="icon"
//                 asChild
//                 disabled={currentPage <= 1}
//                 className={`rounded-xl ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
//             >
//                 <Link href={createPageURL(currentPage - 1)}>
//                     <ChevronLeft size={18} />
//                 </Link>
//             </Button>

//             {/* Page Numbers */}
//             <div className="flex items-center gap-1">
//                 {getPageNumbers().map((page, index) => (
//                     <div key={index}>
//                         {page === "..." ? (
//                             <span className="px-2 text-gray-400">
//                                 <MoreHorizontal size={18} />
//                             </span>
//                         ) : (
//                             <Button
//                                 variant={currentPage === page ? "default" : "ghost"}
//                                 asChild
//                                 className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === page
//                                     ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
//                                     : "text-gray-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600"
//                                     }`}
//                             >
//                                 <Link href={createPageURL(page)}>{page}</Link>
//                             </Button>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             {/* Next Button */}
//             <Button
//                 variant="outline"
//                 size="icon"
//                 asChild
//                 disabled={currentPage >= totalPages}
//                 className={`rounded-xl ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
//             >
//                 <Link href={createPageURL(currentPage + 1)}>
//                     <ChevronRight size={18} />
//                 </Link>
//             </Button>
//         </nav>
//     );
// }