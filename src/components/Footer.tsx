import React from "react";
import { Github, Heart } from "lucide-react";
import { useI18n } from "@/context/I18nContext";
import { PROJECT_INFO } from "@/constants";

export const Footer: React.FC = () => {
  const { t } = useI18n();

  const linkStyle: React.CSSProperties = {
    color: "var(--color-accent)",
    textDecoration: "none",
    transition: "all 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px"
  };

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "var(--color-text)";
  };

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "var(--color-accent)";
  };

  return (
    <footer
      className="mt-8 py-4 border-t border-opacity-20"
      style={{ borderColor: "var(--color-grid)" }}
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex flex-col items-center gap-2 text-sm">
          <div
            className="flex items-center gap-1"
            style={{ color: "var(--color-text)" }}
          >
            <span>{t("footer.madeBy")}</span>
            <Heart
              className="w-3 h-3"
              style={{ color: "var(--color-accent)" }}
            />
            <a
              href={PROJECT_INFO.REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              {PROJECT_INFO.AUTHOR}
            </a>
          </div>

          <div className="flex items-center gap-3 text-xs opacity-75">
            <span style={{ color: "var(--color-text)" }}>
              © {PROJECT_INFO.YEAR} {PROJECT_INFO.NAME}
            </span>

            <span style={{ color: "var(--color-grid)" }}>•</span>

            <a
              href={PROJECT_INFO.REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
              title={t("footer.viewOnGitHub")}
            >
              <Github className="w-3 h-3" />
              <span>{t("footer.openSource")}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
