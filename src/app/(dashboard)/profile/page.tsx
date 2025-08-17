import { Suspense } from "react";
import CardWrapper from "./_/components/CardWrapper";
import Fallback from "@/components/Fallback/fallback";

async function Profile() {
  return (
    <div>
      <h1 className="mb-8 text-xl text-secondary-500">داشبورد</h1>
      <Suspense fallback={<Fallback />}>
        <CardWrapper />
      </Suspense>
      <div>
        <h1 className="mb-4 text-xl text-secondary-500">آخرین پست ها</h1>
        <Suspense fallback={<Fallback />}>{/* <LatestPosts /> */}</Suspense>
      </div>
    </div>
  );
}
export default Profile;
