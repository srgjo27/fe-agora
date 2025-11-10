import { Button } from "./button";
import { Card, CardContent } from "./card";

interface PageErrorButton {
  label: string;
  onClick: () => void;
  variant?: "outline" | "ghost" | "primary" | "secondary" | "destructive";
  className?: string;
}

interface PageErrorOptions {
  error?: string;
  title?: string;
  mainButton?: PageErrorButton;
  secondaryButton?: PageErrorButton;
  customButtons?: PageErrorButton[];
}

export const PageError = ({
  error,
  title = "ERROR",
  mainButton,
  secondaryButton,
  customButtons,
}: PageErrorOptions) => (
  <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
    <Card className="bg-gray-800/50 border-red-500/30 max-w-md backdrop-blur-xl">
      <CardContent className="text-center py-8 font-mono">
        <div className="w-16 h-16 bg-gray-700 border border-red-500/30 rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-red-400 text-2xl font-bold">!</span>
        </div>
        <h3 className="text-red-400 text-lg font-semibold mb-2">
          &gt; {title}
        </h3>
        {error && (
          <p className="text-red-300 text-sm bg-gray-800/50 p-3 rounded border border-red-500/20 mb-6">
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col space-y-2">
          {(mainButton || secondaryButton) && (
            <div className="flex space-x-2 justify-center">
              {mainButton && (
                <Button
                  onClick={mainButton.onClick}
                  variant={mainButton.variant || "outline"}
                  className={
                    mainButton.className ||
                    "border-red-500/30 text-red-400 hover:bg-red-500/10 font-mono"
                  }
                >
                  {mainButton.label}
                </Button>
              )}
              {secondaryButton && (
                <Button
                  onClick={secondaryButton.onClick}
                  variant={secondaryButton.variant || "outline"}
                  className={
                    secondaryButton.className ||
                    "border-gray-500/30 text-gray-400 hover:bg-gray-500/10 font-mono"
                  }
                >
                  {secondaryButton.label}
                </Button>
              )}
            </div>
          )}

          {/* Custom buttons */}
          {customButtons && customButtons.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {customButtons.map((button, index) => (
                <Button
                  key={index}
                  onClick={button.onClick}
                  variant={button.variant || "outline"}
                  className={
                    button.className ||
                    "border-gray-500/30 text-gray-400 hover:bg-gray-500/10 font-mono"
                  }
                >
                  {button.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
);
