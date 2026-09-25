import Link from "next/link";

export default function NotFound() {
  return <div className="mx-auto flex min-h-[72vh] max-w-lg flex-col items-center justify-center px-5 text-center">
    <div className="library-icon"><span className="font-display text-2xl italic">404</span></div>
    <h1 className="mt-6 font-display text-4xl italic text-[#f7f1e7]">This track skipped town.</h1>
    <p className="mt-3 text-xs leading-6 text-[#746d7c]">The page may not exist anymore, or the artist may have removed the track.</p>
    <Link href="/" className="featured-button mt-6">Back to Gara Music</Link>
  </div>;
}
