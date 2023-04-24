import { HTMLAttributes, useState } from "react";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { MAIN_TITLE } from "../common/constants";
import type { MyPage } from "./_app.route";
import {
  MemesPage_MemesDocument,
  MemesPage_MemesQuery,
} from "./memes.generated";

const MemesPage: MyPage = () => {
  const { error, data: { memes } = {} } = useQuery(MemesPage_MemesDocument);
  if (error) throw error;
  const [selectedMeme, setSelectedMeme] = useState<string | null>(null);
  useEscListener(() => setSelectedMeme(null));
  return (
    <>
      <Head>
        <title>{`Memes - ${MAIN_TITLE}`}</title>
      </Head>
      <div className="prose max-w-full text-center">
        <h1>Memes</h1>
      </div>
      {selectedMeme && (
        <MemeCard
          meme={memes?.nodes.find((meme) => meme.id === selectedMeme)!}
          isFullscreen
          onClick={() => setSelectedMeme(null)}
        />
      )}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {memes?.nodes.map((meme) => (
            <MemeCard
              key={meme.id}
              meme={meme}
              onClick={() => setSelectedMeme(meme.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

type MemeCardProps = {
  meme: NonNullable<MemesPage_MemesQuery["memes"]>["nodes"][0];
  isFullscreen?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const MemeCard: React.FC<MemeCardProps> = ({
  meme,
  isFullscreen = false,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={
        "card card-compact bordered bg-base-100 shadow-xl cursor-pointer transition-all " +
        (isFullscreen
          ? "fixed left-8 right-8 top-8 bottom-8 z-10"
          : "hover:scale-110")
      }
    >
      <figure className={"transition-all " + (isFullscreen ? "" : "h-48")}>
        <img
          alt={meme.caption}
          src={meme.image}
          className="w-full h-full object-contain"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{meme.caption}</h2>
        <div>
          <p>{new Date(meme.createdAt!).toDateString()}</p>
          <p>by {meme.owner?.name}</p>
        </div>
      </div>
    </div>
  );
};

function useEscListener(callback: () => void) {
  const listener = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      callback();
    }
  };
  globalThis.document?.addEventListener("keydown", listener);
  return () => globalThis.document?.removeEventListener("keydown", listener);
}

export default MemesPage;
