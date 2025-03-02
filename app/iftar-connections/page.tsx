"use client";

import { Calendar } from "lucide-react";

import { VideoDialog } from "./VideoDialog";

export default function IftarConnectionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black text-gray-900 dark:text-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50 dark:bg-black">
          <div className="container px-4 md:px-6">
            <div className="">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-emerald-100 dark:bg-emerald-900 px-3 py-1 text-sm text-emerald-600 dark:text-emerald-300">
                  Coming Soon
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Iftar Connections
                  </h1>
                  <p className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl">
                    Building community through shared meals during Ramadhan.
                    Connect with others, share your traditions, and experience
                    the joy of breaking fast together ✨.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Launching Next</span>
                    </div>
                  </div>
                </div>
                <div className="mx-auto w-full max-w-[600px] sm:w-full lg:order-last">
                  <VideoDialog />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What to Expect
                </h2>
                <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed to bring people together during the
                  holy month of Ramadan.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Community Connections</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Connect with Muslims in your area to share iftar meals and
                    build lasting friendships.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                    <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
                    <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
                    <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Volunteer Activities</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Participate in local volunteering opportunities focused on
                    serving Iftar meals.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Event Planning</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Organize and discover iftar gatherings in your community
                    with our easy-to-use platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-black">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-emerald-100 dark:bg-emerald-900 px-3 py-1 text-sm text-emerald-600 dark:text-emerald-300">
                  Stay Updated
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Be the first to know when we launch
                </h2>
                <p className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get ready for amaizing connections and unforgettable
                  experiences!.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
