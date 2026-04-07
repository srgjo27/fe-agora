import {
    HandThumbUpIcon,
    HandThumbDownIcon,
} from "@heroicons/react/24/outline";

interface ThreadVoteRailProps {
    voteCount: number;
    onVote: (voteType: number) => void;
    isVoting: boolean;
}

export function ThreadVoteRail({
    voteCount,
    onVote,
    isVoting,
}: ThreadVoteRailProps) {
    return (
        <div className="sticky top-8 flex flex-col items-center gap-2">
            <div className="flex flex-col items-center bg-white border border-slate-200 rounded-full p-1">
                <button
                    onClick={() => onVote(1)}
                    disabled={isVoting}
                    className="p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-50"
                    title="Upvote"
                >
                    <HandThumbUpIcon className="w-6 h-6 text-slate-400 hover:text-blue-600" />
                </button>

                <span
                    className={`font-bold text-sm py-1 ${voteCount > 0
                        ? "text-blue-600"
                        : voteCount < 0
                            ? "text-red-500"
                            : "text-slate-500"
                        }`}
                >
                    {voteCount}
                </span>

                <button
                    onClick={() => onVote(-1)}
                    disabled={isVoting}
                    className="p-2.5 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
                    title="Downvote"
                >
                    <HandThumbDownIcon className="w-6 h-6 text-slate-400 hover:text-red-600" />
                </button>
            </div>
        </div>
    );
}
