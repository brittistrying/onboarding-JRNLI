import { Button } from "@/components/ui/button";

interface ButtonConfig {
  text?: string;
  disabled?: boolean;
  visible?: boolean;
  action?: () => void;
}

interface NavProps {
  back?: ButtonConfig;
  skip?: ButtonConfig;
  next?: ButtonConfig;
}

export function Nav({ back, skip, next }: NavProps) {
  const nothing = () => {};

  // Default visible to true if not specified
  const backVisible = back && back.visible !== undefined ? back.visible : true;
  const skipVisible = skip && skip.visible !== undefined ? skip.visible : true;
  const nextVisible = next && next.visible !== undefined ? next.visible : true;

  return (
    <div>
      {/* Buttons */}
      <div className="grid grid-cols-3 mt-6 items-center">
        <div
          className={`flex justify-start ${!backVisible ? "invisible" : ""}`}
        >
          {back && (
            <Button
              variant={back.disabled ? "outline" : "secondary"}
              onClick={back.action || nothing}
              disabled={back.disabled}
            >
              {back.text || "Back"}
            </Button>
          )}
        </div>

        <div
          className={`flex justify-center ${!skipVisible ? "invisible" : ""}`}
        >
          {skip && (
            <span
              onClick={skip.action || nothing}
              className="underline text-[#0D090A] cursor-pointer"
            >
              {skip.text || "Skip"}
            </span>
          )}
        </div>

        <div className={`flex justify-end ${!nextVisible ? "invisible" : ""}`}>
          {next && (
            <Button
              variant={next.disabled ? "outline" : "secondary"}
              onClick={next.action || nothing}
              disabled={next.disabled}
            >
              {next.text || "Continue"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
