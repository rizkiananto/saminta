import React from "react";
import PublicTemplate from "@/templates/PublicTemplate";

export default function Layout({children} : {children: React.ReactNode}) {
  return (
    <PublicTemplate>
      {children}
    </PublicTemplate>
  )
}