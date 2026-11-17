// Bump RESUME_V whenever the PDF changes, so browsers never show a cached older copy.
const RESUME_V = "2026-11-17b";

export const SITE = {
  name: "Yogesh Jeevan",
  role: "Product designer",
  email: "yogeshjeevanv@gmail.com",
  linkedin: "https://www.linkedin.com/in/yogesh-jeevan-1a0002185/",
  resume: `/Yogesh_Jeevan_Product_Designer.pdf?v=${RESUME_V}`,
  resumeImg: `/img/v2/resume.webp?v=${RESUME_V}`,
  url: "https://yogeshjeevan.cc.cd",
};

/** content strings may contain entities like &amp; */
export const html = (s: string) => ({ __html: s });
