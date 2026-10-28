export const SITE = {
  name: "Yogesh Jeevan",
  role: "Product designer",
  email: "yogeshjeevanv@gmail.com",
  linkedin: "https://www.linkedin.com/in/yogesh-jeevan-1a0002185/",
  behance: "https://www.behance.net/yogesh-jeevan",
  resume: "/Yogesh_Jeevan_Product_Designer.pdf",
  url: "https://yogeshjeevan.vercel.app",
};

export const NAV = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "Design system", href: "/design-system/", id: "design-system" },
  { label: "Visuals", href: "/visuals/", id: "visuals" },
  { label: "Story", href: "/#story", id: "story" },
  { label: "Experience", href: "/experience/", id: "experience" },
  { label: "Kind words", href: "/#words", id: "words" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

/** content strings come from the design files and may contain entities like &amp; */
export const html = (s: string) => ({ __html: s });
