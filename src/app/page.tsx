import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Share, Upload, Sparkles, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 w-[36rem] h-[36rem] rounded-full bg-gradient-to-br from-teal-300/40 to-indigo-300/30 blur-3xl opacity-70 transform rotate-12"></div>
      <div className="pointer-events-none absolute right-[-10rem] bottom-[-8rem] w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-rose-300/30 to-teal-200/30 blur-2xl opacity-60"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 flex flex-col items-center text-center">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center justify-center mb-6 p-4 rounded-full bg-white/30 backdrop-blur-sm border border-white/20 shadow-sm">
            <Package className="text-teal-600 h-8 w-8" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-800">
            Asset Management, refined
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Upload, organize and share your digital assets with speed and clarity. Built for teams that value simplicity and control.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery">
              <Button
                aria-label="Browse gallery"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
              >
                <Upload className="w-5 h-5" />
                Browse Gallery
              </Button>
            </Link>

            <Link href="/upload">
              <Button
                aria-label="Upload assets"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg border border-teal-200 bg-white text-teal-700 shadow-sm hover:bg-teal-50 transition"
              >
                <Sparkles className="w-5 h-5" />
                Get Started
              </Button>
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-500">
            <Users className="w-4 h-4 text-slate-400" />
            <span>No credit card required • 14 day free trial</span>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl z-10">
          <Card className="flex flex-col items-stretch bg-white/60 backdrop-blur-md border border-white/20 shadow-md hover:shadow-2xl transform transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="flex flex-col items-center pt-8 pb-2">
              <div className="p-4 rounded-full bg-gradient-to-br from-teal-50 to-teal-100 mb-3">
                <Package className="w-7 h-7 text-teal-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-teal-700">Organize</CardTitle>
            </CardHeader>
            <CardContent className="text-center px-6 pb-8">
              <p className="text-sm text-slate-600 mb-4">
                Smart tagging, collections and custom metadata make finding assets effortless.
              </p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-700">Tags</span>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">Collections</span>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">Filters</span>
              </div>
              <Button className="mx-auto inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-sm hover:from-teal-600 hover:to-teal-700">
                Try Organizing
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-stretch bg-white/60 backdrop-blur-md border border-white/20 shadow-md hover:shadow-2xl transform transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="flex flex-col items-center pt-8 pb-2">
              <div className="p-4 rounded-full bg-gradient-to-br from-teal-50 to-teal-100 mb-3">
                <Upload className="w-7 h-7 text-teal-600 animate-bounce-slow" />
              </div>
              <CardTitle className="text-lg font-semibold text-teal-700">Upload</CardTitle>
            </CardHeader>
            <CardContent className="text-center px-6 pb-8">
              <p className="text-sm text-slate-600 mb-4">
                Fast, resumable uploads with previews and instant optimization.
              </p>
              <div className="w-3/4 mx-auto bg-slate-100 rounded-full h-2 overflow-hidden mb-4">
                <div className="h-2 bg-teal-500 w-3/5 transition-all duration-500" />
              </div>
              <Button className="mx-auto inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-sm hover:from-teal-600 hover:to-teal-700">
                Upload Now
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-stretch bg-white/60 backdrop-blur-md border border-white/20 shadow-md hover:shadow-2xl transform transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="flex flex-col items-center pt-8 pb-2">
              <div className="p-4 rounded-full bg-gradient-to-br from-teal-50 to-teal-100 mb-3">
                <Share className="w-7 h-7 text-teal-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-teal-700">Share</CardTitle>
            </CardHeader>
            <CardContent className="text-center px-6 pb-8">
              <p className="text-sm text-slate-600 mb-4">
                Secure links, permission controls and collaboration built for teams.
              </p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">Public</span>
                <span className="text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-700">Private</span>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">Expiring</span>
              </div>
              <Button className="mx-auto inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-teal-500 text-teal-700 bg-white shadow-sm hover:bg-teal-50">
                Share Asset
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature highlight strip */}
        <div className="mt-12 w-full max-w-4xl bg-white/40 backdrop-blur-sm border border-white/20 rounded-xl py-6 px-6 shadow-inner flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-teal-100 text-teal-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-slate-800">Built for performance</div>
              <div className="text-sm text-slate-600">Optimized storage, CDN delivery and fast previews.</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-600">Trusted by teams of all sizes</div>
            <Button className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-teal-200 bg-white text-teal-700 shadow-sm hover:bg-teal-50">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
