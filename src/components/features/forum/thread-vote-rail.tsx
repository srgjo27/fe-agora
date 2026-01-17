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
            <div className="flex flex-col items-center bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full p-1.5 shadow-lg">
                <button
                    onClick={() => onVote(1)}
                    disabled={isVoting}
                    className="p-2.5 rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all disabled:opacity-50"
                    title="Upvote"
                >
                    <HandThumbUpIcon className="w-6 h-6 text-green-500" />
                </button>

                <span
                    className={`font-bold text-sm py-1 ${voteCount > 0
                            ? "text-green-500"
                            : voteCount < 0
                                ? "text-red-400"
                                : "text-gray-400"
                        }`}
                >
                    {voteCount}
                </span>

                <button
                    onClick={() => onVote(-1)}
                    disabled={isVoting}
                    className="p-2.5 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                    title="Downvote"
                >
                    <HandThumbDownIcon className="w-6 h-6 text-red-500" />
                </button>
            </div>
        </div>
    );
}
