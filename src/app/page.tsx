import Link from "next/link";

const Page = () => {
  return (
    <div>
      <p>Better Auth OAuth Proxy Test</p>

      <Link href={"/sign-in"}>
        <div className="bg-blue-100">Sign-in</div>
      </Link>
    </div>
  );
};

export default Page;
