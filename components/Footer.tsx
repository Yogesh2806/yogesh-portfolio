import { Star } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 Yogesh Jeevan · Chennai, India</span>
      <span><Star size={18} /> Designed by Yogesh, built with Claude</span>
      <a href="#top" data-sound="swish">Back to top ↑</a>
    </footer>
  );
}
