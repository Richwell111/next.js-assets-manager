"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { LogOut, Package } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";


const Header = () => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  const { data: session, isPending } = useSession();
  const user = session?.user;
  const isAdminUser = user?.role === "admin";
  const router =  useRouter()

  const handleLogout = async() => {
    // Implement logout functionality here
    await signOut({
      fetchOptions:{
        onSuccess: () => {
          router.push('/login')
      }
    }
    })
  }

  // Hide header on the login page
  if (isLoginPage) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-teal-500">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-teal-600">
              Assets Manager
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 ml-6">
            {!isPending && user && isAdminUser ? null : (
              <Link
                href="/gallery"
                className="text-sm font-medium hover:text-teal-600 transition-colors"
              >
                Gallery
              </Link>
            )}

            {/* Normal user navigation */}
            {!isPending && user && !isAdminUser && (
              <>
                <Link
                  className="text-sm font-medium hover:text-teal-600 transition-colors"
                  href="/dashboard/assets"
                >
                  Assets
                </Link>
                <Link
                  className="text-sm font-medium hover:text-teal-600 transition-colors"
                  href="/dashboard/purchases"
                >
                  My Purchases
                </Link>
              </>
            )}

            {/* Admin navigation */}
            {!isPending && user && isAdminUser && (
              <>
                <Link
                  className="text-sm font-medium hover:text-teal-600 transition-colors"
                  href="/admin/asset-approval"
                >
                  Asset Approval
                </Link>
                <Link
                  className="text-sm font-medium hover:text-teal-600 transition-colors"
                  href="/admin/settings"
                >
                  Settings
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Right side: Login or User */}
        <div className="flex items-center gap-4">
          {isPending ? null : user ? (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar>
                      <AvatarImage className="h-8 w-8 border border-slate-300" />
                      <AvatarFallback>
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name ?? "User"}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="font-medium">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-teal-500 text-white hover:bg-teal-600">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
