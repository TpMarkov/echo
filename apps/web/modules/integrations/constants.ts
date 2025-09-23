export const INTEGRATIONS = [
  {
    id: "html",
    title: "HTML",
    icon: "/languages/html5.svg",
  },
  {
    id: "react",
    title: "React",
    icon: "/languages/react.svg",
  },
  {
    id: "javascript",
    title: "JavaScript",
    icon: "/languages/javascript.svg",
  },
  {
    id: "nextjs",
    title: "NextJS",
    icon: "/languages/nextjs.svg",
  },
];

export type IntegrationId = (typeof INTEGRATIONS)[number]["id"];

export const HTML_SCRIPT = `<script data-organization-id="{{ORGANIZATION_ID}}"></script>`;
export const REACT_SCRIPT = `<script data-organization-id="{{ORGANIZATION_ID}}"></script>`;
export const NEXTJS_SCRIPT = `<scriptdata-organization-id="{{ORGANIZATION_ID}}"></scriptdata-organization-id=>`;
export const JAVASCRIPT_SCRIPT = `<script data-organization-id="{{ORGANIZATION_ID}}"></script>`;
