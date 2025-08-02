import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Error = () => {
    const navigate=useNavigate();
  const imgUrl =
    "https://static.uacdn.net/production/_next/static/images/error.svg?q=75&auto=format%2Ccompress&w=828";
  return (
    <div className="flex flex-col items-center justify-center p-10 gap-4">
      <div>
        <img src={imgUrl} alt="" />
      </div>
      <div className="font-bold text-3xl">Oops! Page not found...</div>
      <div>Looks like you're looking for something that doesn't exist.</div>
      <div>
        <Button onClick={()=>navigate("/")}>Home</Button>
      </div>
    </div>
  );
};
