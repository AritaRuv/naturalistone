"use client";
import PrivateRoute from "@/components/PrivateRoute";
import Profile from "./Profile";


export default function ProfilePage() {

  return (
    <>
      <PrivateRoute>
        <Profile/>
      </PrivateRoute>
    </>
  );
}
