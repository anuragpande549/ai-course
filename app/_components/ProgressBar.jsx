"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";


export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    // Start progress bar when route changes
    NProgress.start();

    // Small delay so it animates nicely
    const timer = setTimeout(() => {
      NProgress.done();
    }, 30);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
